(function (JBF) {
  "use strict";
  var ui = JBF.ui;

  function stockText(p) {
    if (p.stock <= 0) return '<p class="stock out">Sold out — check back soon</p>';
    if (p.stock <= 3) return '<p class="stock low">Only ' + p.stock + " left</p>";
    return '<p class="stock in">In stock</p>';
  }

  document.addEventListener("DOMContentLoaded", function () {
    var id = ui.param("id");
    var host = document.getElementById("product");
    Promise.all([JBF.commerce.getProduct(id), JBF.commerce.listCategories(), JBF.commerce.listProducts()]).then(function (res) {
      var p = res[0], categories = res[1], all = res[2];
      if (!p) {
        host.innerHTML = '<div class="empty" style="grid-column:1/-1"><h1>Product not found</h1><p>It may have sold out or been removed.</p><a class="btn btn-primary" href="shop.html">Back to the shop</a></div>';
        return;
      }
      var cat = ui.categoryById(categories, p.category);
      document.title = p.title + " — Book Factory Shop";
      document.getElementById("crumb").innerHTML =
        '<a href="shop.html">Shop</a> › <a href="shop.html?category=' + encodeURIComponent(cat.id) + '">' + ui.esc(cat.name) + "</a> › " + ui.esc(p.title);

      var save = p.rrp && p.rrp > p.price;
      var sample = JBF.config.shop.demoMode && /^sample-/.test(p.id) ? '<span class="badge badge-sample">Sample</span>' : "";
      host.innerHTML =
        '<div class="product-media">' + sample + ui.productImage(p, cat) + "</div>" +
        '<div class="product-info">' +
        (p.brand ? '<span class="card-brand">' + ui.esc(p.brand) + "</span>" : "") +
        "<h1>" + ui.esc(p.title) + "</h1>" +
        '<p><span class="price">' + JBF.money(p.price) + "</span>" +
        (save ? '<span class="price-was">RRP ' + JBF.money(p.rrp) + '</span><span class="saving">Save ' + JBF.money(p.rrp - p.price) + "</span>" : "") +
        "</p>" + stockText(p) +
        (p.stock > 0
          ? '<form class="buy-row" id="buy">' +
            '<div class="qty"><button type="button" data-step="-1" aria-label="Decrease quantity">−</button>' +
            '<label class="visually-hidden" for="qty">Quantity</label><input id="qty" type="number" inputmode="numeric" min="1" max="' + p.stock + '" value="1">' +
            '<button type="button" data-step="1" aria-label="Increase quantity">+</button></div>' +
            '<button class="btn btn-primary" type="submit">Add to basket</button></form>'
          : '<p><a class="btn btn-ghost" href="shop.html">Browse other treasures</a></p>') +
        "<p>" + ui.esc(p.description) + "</p>" +
        '<div class="impact-note"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.5-9.2C1 8.4 3.2 5 6.6 5c2 0 3.4 1.1 5.4 3 2-1.9 3.4-3 5.4-3C20.8 5 23 8.4 21.5 11.8 19.5 16.4 12 21 12 21z"/></svg>' +
        "<span>Profit from this purchase helps fund brand new books, goody bags and creative workshops for children.</span></div>" +
        '<ul class="meta-list">' +
        "<li>Category: " + ui.esc(cat.name) + "</li>" +
        (p.ageRange ? "<li>Suitable for ages: " + ui.esc(p.ageRange) + "</li>" : "") +
        "<li>Sourced from an independent brand via Faire</li>" +
        "</ul></div>";

      var form = document.getElementById("buy");
      if (form) {
        var qty = document.getElementById("qty");
        form.addEventListener("click", function (e) {
          var b = e.target.closest("[data-step]");
          if (!b) return;
          var v = (parseInt(qty.value, 10) || 1) + parseInt(b.getAttribute("data-step"), 10);
          qty.value = Math.max(1, Math.min(p.stock, v));
        });
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          var n = Math.max(1, Math.min(p.stock, parseInt(qty.value, 10) || 1));
          JBF.commerce.cart.add(p, n);
          ui.toast(n + " × " + ui.esc(p.title) + ' added. <a href="basket.html">View basket</a>');
        });
      }

      var related = all.filter(function (x) { return x.category === p.category && x.id !== p.id && x.stock > 0; });
      if (related.length < 4) related = related.concat(all.filter(function (x) { return x.category !== p.category && x.stock > 0; }));
      document.getElementById("related-grid").innerHTML = related.slice(0, 4).map(function (x) { return ui.productCard(x, categories); }).join("");
    }).catch(function (err) {
      host.innerHTML = '<p class="notice notice-error">Sorry, we couldn\'t load this product. ' + ui.esc(err.message) + "</p>";
    });
  });
})(window.JBF);
