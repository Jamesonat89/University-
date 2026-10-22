/*
 * Shopify provider (catalogue + checkout) — ready for when you move to Shopify
 * ----------------------------------------------------------------------------
 * Uses the public Shopify Storefront API, so this same website keeps its look
 * while Shopify handles products, stock, payments and — with Shopify POS —
 * your in-person EPOS tills, all sharing one stock count.
 *
 * To switch on:
 *   1. In Shopify admin create a custom app with Storefront API access
 *      (scopes: unauthenticated_read_product_listings, unauthenticated_write_checkouts,
 *       unauthenticated_read_checkouts).
 *   2. Fill in config.commerce.shopify (storeDomain + storefrontToken).
 *   3. Set catalogueProvider and checkoutProvider to "shopify".
 *
 * Mapping: Shopify "Product type" becomes the shop category; "Compare-at price"
 * becomes the "was" price; products tagged "featured" show on the home page.
 * NOTE: not yet tested against a live store — test on a development store first.
 */
window.JBF = window.JBF || {};
JBF.providers = JBF.providers || { catalogue: {}, checkout: {} };

(function (JBF) {
  "use strict";

  var FALLBACK_COLOURS = ["#2f6fd6", "#e2583e", "#6b3fa0", "#1f9d8a", "#d9a21b", "#c2477a"];

  function cfg() { return JBF.config.commerce.shopify; }

  function gql(query, variables) {
    var c = cfg();
    if (!c.storeDomain || !c.storefrontToken) {
      return Promise.reject(new Error("Shopify is selected but storeDomain / storefrontToken are not set in config.js"));
    }
    return fetch("https://" + c.storeDomain + "/api/" + c.apiVersion + "/graphql.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": c.storefrontToken
      },
      body: JSON.stringify({ query: query, variables: variables || {} })
    }).then(function (r) { return r.json(); }).then(function (json) {
      if (json.errors) throw new Error(json.errors.map(function (e) { return e.message; }).join("; "));
      return json.data;
    });
  }

  function slug(s) { return String(s || "other").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }

  var PRODUCT_FIELDS =
    "id handle title vendor productType description tags availableForSale " +
    "featuredImage { url altText } " +
    "variants(first: 1) { nodes { id availableForSale price { amount } compareAtPrice { amount } } }";

  function normalise(n) {
    var v = (n.variants && n.variants.nodes[0]) || {};
    var compare = v.compareAtPrice ? Number(v.compareAtPrice.amount) : null;
    return {
      id: n.handle,
      title: n.title,
      brand: n.vendor || "",
      category: slug(n.productType),
      price: v.price ? Number(v.price.amount) : 0,
      rrp: compare,
      stock: (v.availableForSale || n.availableForSale) ? 99 : 0,
      image: n.featuredImage ? n.featuredImage.url : "",
      description: n.description || "",
      tags: n.tags || [],
      featured: (n.tags || []).map(function (t) { return t.toLowerCase(); }).indexOf("featured") !== -1,
      ageRange: "",
      variantId: v.id || null,
      _productType: n.productType || "Other"
    };
  }

  var cache = null;
  function loadAll() {
    if (cache) return cache;
    var handle = cfg().collectionHandle;
    var products = [];
    function page(after) {
      var q = handle
        ? "query($h:String!,$after:String){ collection(handle:$h){ products(first:100, after:$after){ pageInfo{hasNextPage endCursor} nodes{" + PRODUCT_FIELDS + "} } } }"
        : "query($after:String){ products(first:100, after:$after){ pageInfo{hasNextPage endCursor} nodes{" + PRODUCT_FIELDS + "} } }";
      return gql(q, { h: handle, after: after || null }).then(function (data) {
        var conn = handle ? (data.collection ? data.collection.products : { nodes: [], pageInfo: {} }) : data.products;
        products = products.concat(conn.nodes.map(normalise));
        if (conn.pageInfo.hasNextPage) return page(conn.pageInfo.endCursor);
        return products;
      });
    }
    cache = page(null);
    return cache;
  }

  JBF.providers.catalogue.shopify = {
    listProducts: loadAll,
    getProduct: function (id) {
      return loadAll().then(function (all) {
        return all.find(function (p) { return p.id === id; }) || null;
      });
    },
    listCategories: function () {
      return loadAll().then(function (all) {
        var seen = {};
        var known = {};
        (JBF.categories || []).forEach(function (c) { known[c.id] = c; known[slug(c.name)] = c; });
        all.forEach(function (p) { if (!seen[p.category]) seen[p.category] = p._productType; });
        return Object.keys(seen).map(function (id, i) {
          var k = known[id];
          return { id: id, name: k ? k.name : seen[id], colour: k ? k.colour : FALLBACK_COLOURS[i % FALLBACK_COLOURS.length] };
        });
      });
    }
  };

  JBF.providers.checkout.shopify = {
    placeOrder: function (order) {
      var lines = order.items.map(function (i) {
        if (!i.variantId) throw new Error("Basket item '" + i.title + "' has no Shopify variant — please empty your basket and add it again.");
        return { merchandiseId: i.variantId, quantity: i.qty };
      });
      var mutation =
        "mutation($input: CartInput!){ cartCreate(input:$input){ cart{ id checkoutUrl } userErrors{ field message } } }";
      return gql(mutation, {
        input: {
          lines: lines,
          note: order.notes || "",
          buyerIdentity: { email: order.customer.email }
        }
      }).then(function (data) {
        var res = data.cartCreate;
        if (res.userErrors && res.userErrors.length) throw new Error(res.userErrors[0].message);
        return { reference: order.reference, redirectUrl: res.cart.checkoutUrl };
      });
    }
  };
})(window.JBF);
