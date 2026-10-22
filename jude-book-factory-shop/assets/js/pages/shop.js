(function (JBF) {
  "use strict";
  var ui = JBF.ui;

  var state = {
    category: ui.param("category") || "all",
    q: ui.param("q") || "",
    sort: ui.param("sort") || "featured",
    inStock: false
  };
  var products = [], categories = [];

  function syncUrl() {
    try {
      var p = new URLSearchParams();
      if (state.category !== "all") p.set("category", state.category);
      if (state.q) p.set("q", state.q);
      if (state.sort !== "featured") p.set("sort", state.sort);
      var qs = p.toString();
      history.replaceState(null, "", window.location.pathname + (qs ? "?" + qs : ""));
    } catch (e) { /* file:// in some browsers */ }
  }

  function matches(p) {
    if (state.category !== "all" && p.category !== state.category) return false;
    if (state.inStock && p.stock <= 0) return false;
    if (state.q) {
      var hay = (p.title + " " + p.brand + " " + p.description + " " + p.tags.join(" ")).toLowerCase();
      return state.q.toLowerCase().split(/\s+/).every(function (w) { return hay.indexOf(w) !== -1; });
    }
    return true;
  }

  function saving(p) { return p.rrp && p.rrp > p.price ? (p.rrp - p.price) / p.rrp : 0; }

  var sorters = {
    featured: function (a, b) {
      return (b.stock > 0) - (a.stock > 0) || (b.featured - a.featured) || a.title.localeCompare(b.title);
    },
    "price-asc": function (a, b) { return a.price - b.price; },
    "price-desc": function (a, b) { return b.price - a.price; },
    saving: function (a, b) { return saving(b) - saving(a); },
    az: function (a, b) { return a.title.localeCompare(b.title); }
  };

  function renderChips() {
    var all = [{ id: "all", name: "Everything" }].concat(categories);
    document.getElementById("cat-chips").innerHTML = all.map(function (c) {
      return '<button type="button" class="chip" data-cat="' + ui.esc(c.id) + '" aria-pressed="' + (state.category === c.id) + '">' + ui.esc(c.name) + "</button>";
    }).join("");
  }

  function render() {
    var list = products.filter(matches).sort(sorters[state.sort] || sorters.featured);
    var grid = document.getElementById("product-grid");
    var count = document.getElementById("result-count");
    count.textContent = list.length + (list.length === 1 ? " product" : " products");
    if (!list.length) {
      grid.innerHTML = "";
      document.getElementById("empty").hidden = false;
    } else {
      document.getElementById("empty").hidden = true;
      grid.innerHTML = list.map(function (p) { return ui.productCard(p, categories); }).join("");
    }
    var cat = categories.find(function (c) { return c.id === state.category; });
    document.getElementById("shop-title").textContent = cat ? cat.name : "Shop everything";
    syncUrl();
  }

  document.addEventListener("DOMContentLoaded", function () {
    var search = document.getElementById("search");
    var sort = document.getElementById("sort");
    var stock = document.getElementById("in-stock");
    search.value = state.q;
    sort.value = state.sort;

    document.getElementById("cat-chips").addEventListener("click", function (e) {
      var b = e.target.closest("[data-cat]");
      if (!b) return;
      state.category = b.getAttribute("data-cat");
      renderChips();
      render();
    });
    var t;
    search.addEventListener("input", function () {
      clearTimeout(t);
      t = setTimeout(function () { state.q = search.value.trim(); render(); }, 150);
    });
    document.getElementById("filter-form").addEventListener("submit", function (e) { e.preventDefault(); state.q = search.value.trim(); render(); });
    sort.addEventListener("change", function () { state.sort = sort.value; render(); });
    stock.addEventListener("change", function () { state.inStock = stock.checked; render(); });
    document.getElementById("clear-filters").addEventListener("click", function () {
      state = { category: "all", q: "", sort: "featured", inStock: false };
      search.value = ""; sort.value = "featured"; stock.checked = false;
      renderChips(); render();
    });

    Promise.all([JBF.commerce.listProducts(), JBF.commerce.listCategories()]).then(function (res) {
      products = res[0]; categories = res[1];
      if (state.category !== "all" && !categories.some(function (c) { return c.id === state.category; })) state.category = "all";
      renderChips();
      render();
    }).catch(function (err) {
      document.getElementById("product-grid").innerHTML =
        '<p class="notice notice-error">Sorry, we couldn\'t load products right now. ' + ui.esc(err.message) + "</p>";
    });
  });
})(window.JBF);
