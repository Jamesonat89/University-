(function (JBF) {
  "use strict";
  var ui = JBF.ui;

  document.addEventListener("DOMContentLoaded", function () {
    var imp = JBF.config.impact || {};
    document.querySelectorAll("[data-impact]").forEach(function (el) {
      var v = imp[el.getAttribute("data-impact")];
      if (v) el.textContent = v;
    });
    document.querySelectorAll("[data-donate]").forEach(function (a) { a.href = JBF.config.charity.donateUrl; });

    var grid = document.getElementById("featured-grid");
    var tiles = document.getElementById("cat-tiles");
    if (!grid && !tiles) return; // e.g. Our story page reuses this script for impact figures

    Promise.all([JBF.commerce.listProducts(), JBF.commerce.listCategories()]).then(function (res) {
      var products = res[0], categories = res[1];
      var featured = products.filter(function (p) { return p.featured && p.stock > 0; });
      if (featured.length < 4) {
        featured = featured.concat(products.filter(function (p) { return featured.indexOf(p) === -1 && p.stock > 0; }));
      }
      if (grid) grid.innerHTML =
        featured.slice(0, featured.length >= 8 ? 8 : 4).map(function (p) { return ui.productCard(p, categories); }).join("");

      if (tiles) tiles.innerHTML = categories.map(function (c) {
        var n = products.filter(function (p) { return p.category === c.id; }).length;
        return '<a class="cat-tile" style="--tile:' + ui.esc(c.colour) + '" href="shop.html?category=' + encodeURIComponent(c.id) + '">' +
          ui.esc(c.name) + ' <span class="small">(' + n + ')</span></a>';
      }).join("");
    }).catch(function (err) {
      if (grid) grid.innerHTML =
        '<p class="notice notice-error">Sorry, we couldn\'t load products right now. ' + ui.esc(err.message) + "</p>";
    });
  });
})(window.JBF);
