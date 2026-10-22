/*
 * Commerce core
 * -------------
 * The pages never talk to a product source or payment system directly —
 * they call JBF.commerce. That means you can swap the local catalogue
 * for Shopify (or another EPOS / e-commerce platform) by adding a provider
 * file and changing two words in config.js, without touching any page.
 *
 * A catalogue provider must implement:
 *   listProducts()        -> Promise<Product[]>
 *   getProduct(id)        -> Promise<Product|null>
 *   listCategories()      -> Promise<Category[]>
 *
 * A checkout provider must implement:
 *   placeOrder(order)     -> Promise<{ reference, message?, redirectUrl? }>
 *
 * Product shape (normalised):
 *   { id, title, brand, category, price, rrp, stock, image, description,
 *     tags[], featured, ageRange, variantId }
 */
window.JBF = window.JBF || {};

(function (JBF) {
  "use strict";

  JBF.providers = JBF.providers || { catalogue: {}, checkout: {} };

  // ---------- Safe storage (works in private windows / file://) ----------
  var memoryStore = {};
  var storage = {
    get: function (key) {
      try {
        var v = window.localStorage.getItem(key);
        return v === null ? memoryStore[key] || null : v;
      } catch (e) {
        return memoryStore[key] || null;
      }
    },
    set: function (key, value) {
      memoryStore[key] = value;
      try { window.localStorage.setItem(key, value); } catch (e) { /* ignore */ }
    },
    remove: function (key) {
      delete memoryStore[key];
      try { window.localStorage.removeItem(key); } catch (e) { /* ignore */ }
    }
  };
  JBF.storage = storage;

  // ---------- Money ----------
  JBF.money = function (amount) {
    var cfg = JBF.config.shop;
    try {
      return new Intl.NumberFormat(cfg.locale, { style: "currency", currency: cfg.currency }).format(amount);
    } catch (e) {
      return "£" + Number(amount).toFixed(2);
    }
  };

  function round2(n) { return Math.round(n * 100) / 100; }

  // ---------- Provider lookup ----------
  function catalogue() {
    var name = JBF.config.commerce.catalogueProvider;
    var p = JBF.providers.catalogue[name];
    if (!p) throw new Error("Unknown catalogue provider: " + name);
    return p;
  }
  function checkoutProvider() {
    var name = JBF.config.commerce.checkoutProvider;
    var p = JBF.providers.checkout[name];
    if (!p) throw new Error("Unknown checkout provider: " + name);
    return p;
  }

  // ---------- Basket ----------
  var CART_KEY = "jbf_basket_v1";
  var listeners = [];

  function readCart() {
    try {
      var raw = storage.get(CART_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }
  function writeCart(items) {
    storage.set(CART_KEY, JSON.stringify(items));
    listeners.forEach(function (fn) { try { fn(items); } catch (e) { /* ignore */ } });
  }

  var cart = {
    items: readCart,
    count: function () {
      return readCart().reduce(function (n, i) { return n + i.qty; }, 0);
    },
    subtotal: function () {
      return round2(readCart().reduce(function (s, i) { return s + i.price * i.qty; }, 0));
    },
    add: function (product, qty) {
      qty = Math.max(1, parseInt(qty, 10) || 1);
      var items = readCart();
      var existing = items.find(function (i) { return i.id === product.id; });
      var max = typeof product.stock === "number" ? product.stock : 99;
      if (existing) {
        existing.qty = Math.min(existing.qty + qty, max);
        existing.price = product.price; // keep price fresh
      } else {
        items.push({
          id: product.id,
          variantId: product.variantId || null,
          title: product.title,
          brand: product.brand,
          category: product.category,
          price: product.price,
          image: product.image || "",
          maxQty: max,
          qty: Math.min(qty, max)
        });
      }
      writeCart(items);
    },
    setQty: function (id, qty) {
      var items = readCart();
      var item = items.find(function (i) { return i.id === id; });
      if (!item) return;
      qty = parseInt(qty, 10) || 0;
      if (qty <= 0) {
        items = items.filter(function (i) { return i.id !== id; });
      } else {
        item.qty = Math.min(qty, item.maxQty || 99);
      }
      writeCart(items);
    },
    remove: function (id) { cart.setQty(id, 0); },
    clear: function () { writeCart([]); },
    onChange: function (fn) { listeners.push(fn); }
  };

  // Keep multiple tabs in sync
  window.addEventListener("storage", function (e) {
    if (e.key === CART_KEY) listeners.forEach(function (fn) { fn(readCart()); });
  });

  // ---------- Delivery ----------
  function deliveryOptions(subtotal) {
    var d = JBF.config.shop.delivery;
    var out = [];
    if (d.collection && d.collection.enabled) {
      out.push({ id: "collection", label: d.collection.label, price: d.collection.price || 0, note: d.collection.note || "" });
    }
    if (d.standard && d.standard.enabled) {
      var free = d.standard.freeOver && subtotal >= d.standard.freeOver;
      out.push({
        id: "standard",
        label: d.standard.label,
        price: free ? 0 : d.standard.price,
        note: d.standard.freeOver ? (free ? "Free delivery unlocked!" : "Free over " + JBF.money(d.standard.freeOver)) : ""
      });
    }
    return out;
  }

  // ---------- Impact estimate ----------
  function booksFunded(amount) {
    var s = JBF.config.shop;
    if (!s.showImpactEstimate || !s.costPerBook) return 0;
    return Math.floor((amount * (s.averageMarginPercent / 100)) / s.costPerBook);
  }

  function makeReference() {
    var prefix = (JBF.config.commerce.enquiry && JBF.config.commerce.enquiry.orderPrefix) || "JBF";
    var d = new Date();
    var stamp = d.getFullYear().toString().slice(2) +
      String(d.getMonth() + 1).padStart(2, "0") +
      String(d.getDate()).padStart(2, "0");
    var rand = Math.random().toString(36).slice(2, 6).toUpperCase();
    return prefix + "-" + stamp + "-" + rand;
  }

  // ---------- Public API ----------
  JBF.commerce = {
    listProducts: function () { return catalogue().listProducts(); },
    getProduct: function (id) { return catalogue().getProduct(id); },
    listCategories: function () { return catalogue().listCategories(); },
    cart: cart,
    deliveryOptions: deliveryOptions,
    booksFunded: booksFunded,
    makeReference: makeReference,
    placeOrder: function (order) { return checkoutProvider().placeOrder(order); },
    checkoutProviderName: function () { return JBF.config.commerce.checkoutProvider; }
  };
})(window.JBF);
