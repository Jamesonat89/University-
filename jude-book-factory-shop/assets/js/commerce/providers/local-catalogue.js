/*
 * Local catalogue provider — reads JBF.products / JBF.categories from assets/js/products.js.
 * Works offline and when the site is opened straight from a folder.
 */
window.JBF = window.JBF || {};
JBF.providers = JBF.providers || { catalogue: {}, checkout: {} };

(function (JBF) {
  "use strict";

  function normalise(p) {
    return {
      id: String(p.id),
      title: p.title || "Untitled",
      brand: p.brand || "",
      category: p.category || "",
      price: Number(p.price) || 0,
      rrp: p.rrp ? Number(p.rrp) : null,
      stock: typeof p.stock === "number" ? p.stock : 0,
      image: p.image || "",
      description: p.description || "",
      tags: Array.isArray(p.tags) ? p.tags : [],
      featured: !!p.featured,
      ageRange: p.ageRange || "",
      variantId: null
    };
  }

  JBF.providers.catalogue.local = {
    listProducts: function () {
      return Promise.resolve((JBF.products || []).map(normalise));
    },
    getProduct: function (id) {
      var p = (JBF.products || []).find(function (x) { return String(x.id) === String(id); });
      return Promise.resolve(p ? normalise(p) : null);
    },
    listCategories: function () {
      return Promise.resolve((JBF.categories || []).slice());
    }
  };
})(window.JBF);
