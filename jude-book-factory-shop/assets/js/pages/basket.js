(function (JBF) {
  "use strict";
  var ui = JBF.ui;
  var cart = JBF.commerce.cart;
  var categories = [];

  function impactLine(amount) {
    var n = JBF.commerce.booksFunded(amount);
    if (n >= 1) return "Your basket could help fund about <strong>" + n + " new " + (n === 1 ? "book" : "books") + "</strong> for children.";
    return "Every purchase helps fund brand new books for children in hospitals and hospices.";
  }

  function render() {
    var items = cart.items();
    var host = document.getElementById("basket");
    if (!items.length) {
      host.innerHTML = '<div class="empty" style="grid-column:1/-1"><h2>Your basket is empty</h2>' +
        "<p>Let's find something wonderful.</p>" +
        '<a class="btn btn-primary" href="shop.html">Go to the shop</a></div>';
      return;
    }
    var subtotal = cart.subtotal();
    host.innerHTML =
      '<section class="panel" aria-labelledby="items-h"><h2 id="items-h" class="visually-hidden">Items</h2><ul class="line-items">' +
      items.map(function (i) {
        var cat = ui.categoryById(categories, i.category);
        return '<li class="line-item">' +
          '<div class="thumb">' + ui.productImage(i, cat) + "</div>" +
          "<div><h3><a href=\"product.html?id=" + encodeURIComponent(i.id) + '">' + ui.esc(i.title) + "</a></h3>" +
          '<div class="small">' + JBF.money(i.price) + " each</div>" +
          '<div class="line-controls">' +
          '<div class="qty"><button type="button" data-dec="' + ui.esc(i.id) + '" aria-label="Decrease quantity of ' + ui.esc(i.title) + '">−</button>' +
          '<input type="number" min="0" max="' + (i.maxQty || 99) + '" value="' + i.qty + '" data-qty="' + ui.esc(i.id) + '" aria-label="Quantity of ' + ui.esc(i.title) + '">' +
          '<button type="button" data-inc="' + ui.esc(i.id) + '" aria-label="Increase quantity of ' + ui.esc(i.title) + '">+</button></div>' +
          '<button type="button" class="link-btn" data-remove="' + ui.esc(i.id) + '">Remove</button></div></div>' +
          '<div class="line-total">' + JBF.money(i.price * i.qty) + "</div></li>";
      }).join("") + "</ul></section>" +
      '<aside class="panel summary" aria-labelledby="sum-h"><h2 id="sum-h">Order summary</h2>' +
      '<div class="totals"><div><span>Subtotal</span><span>' + JBF.money(subtotal) + "</span></div>" +
      '<div class="small"><span>Delivery</span><span>Chosen at checkout</span></div></div>' +
      '<a class="btn btn-primary btn-block" href="checkout.html">Checkout</a>' +
      '<p class="small" style="margin-top:12px">Free click &amp; collect in Sheffield, or UK delivery.</p>' +
      (JBF.config.shop.showImpactEstimate ? '<div class="impact-note"><span>' + impactLine(subtotal) + "</span></div>" : "") +
      "</aside>";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var host = document.getElementById("basket");
    host.addEventListener("click", function (e) {
      var t = e.target.closest("button");
      if (!t) return;
      var id;
      if ((id = t.getAttribute("data-remove"))) cart.remove(id);
      else if ((id = t.getAttribute("data-inc"))) { var a = cart.items().find(function (i) { return i.id === id; }); if (a) cart.setQty(id, a.qty + 1); }
      else if ((id = t.getAttribute("data-dec"))) { var b = cart.items().find(function (i) { return i.id === id; }); if (b) cart.setQty(id, b.qty - 1); }
    });
    host.addEventListener("change", function (e) {
      var id = e.target.getAttribute("data-qty");
      if (id) cart.setQty(id, e.target.value);
    });
    cart.onChange(render);
    JBF.commerce.listCategories().then(function (c) { categories = c; render(); }).catch(render);
  });
})(window.JBF);
