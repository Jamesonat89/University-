(function (JBF) {
  "use strict";
  var ui = JBF.ui;
  var cart = JBF.commerce.cart;

  function selectedDelivery(options) {
    var checked = document.querySelector('input[name="delivery"]:checked');
    return options.find(function (o) { return checked && o.id === checked.value; }) || options[0];
  }

  function renderSummary() {
    var items = cart.items();
    var subtotal = cart.subtotal();
    var options = JBF.commerce.deliveryOptions(subtotal);
    var d = selectedDelivery(options);
    var total = subtotal + (d ? d.price : 0);
    document.getElementById("summary").innerHTML =
      '<h2>Your order</h2><ul class="line-items">' +
      items.map(function (i) {
        return '<li class="totals" style="margin:0;padding:6px 0"><div><span>' + i.qty + " × " + ui.esc(i.title) + "</span><span>" + JBF.money(i.price * i.qty) + "</span></div></li>";
      }).join("") + "</ul>" +
      '<div class="totals"><div><span>Subtotal</span><span>' + JBF.money(subtotal) + "</span></div>" +
      "<div><span>Delivery</span><span>" + (d ? (d.price ? JBF.money(d.price) : "Free") : "—") + "</span></div>" +
      '<div class="grand"><span>Total</span><span>' + JBF.money(total) + "</span></div></div>";
    return { subtotal: subtotal, delivery: d, total: Math.round(total * 100) / 100 };
  }

  function renderDelivery() {
    var options = JBF.commerce.deliveryOptions(cart.subtotal());
    var current = document.querySelector('input[name="delivery"]:checked');
    var cur = current ? current.value : options[0] && options[0].id;
    document.getElementById("delivery-options").innerHTML = options.map(function (o) {
      return '<label class="radio-card"><input type="radio" name="delivery" value="' + o.id + '"' + (o.id === cur ? " checked" : "") + ">" +
        '<span class="rc-main"><strong>' + ui.esc(o.label) + "</strong>" + (o.note ? '<span class="small">' + ui.esc(o.note) + "</span>" : "") + "</span>" +
        "<strong>" + (o.price ? JBF.money(o.price) : "Free") + "</strong></label>";
    }).join("");
    toggleAddress();
  }

  function toggleAddress() {
    var d = document.querySelector('input[name="delivery"]:checked');
    var needs = d && d.value === "standard";
    var box = document.getElementById("address");
    box.hidden = !needs;
    box.querySelectorAll("[data-required]").forEach(function (el) { el.required = needs; });
  }

  function providerNote() {
    var p = JBF.commerce.checkoutProviderName();
    var el = document.getElementById("pay-note");
    if (p === "enquiry") {
      el.innerHTML = "<span><strong>How payment works:</strong> we'll check your items are ready, then email you a secure payment link " +
        "(or you can pay when you collect). No card details are entered on this page.</span>";
    } else if (p === "shopify") {
      el.innerHTML = "<span>You'll be taken to our secure checkout to pay by card, Apple Pay or Google Pay.</span>";
    }
    var email = JBF.config.charity.email || "";
    if (p === "enquiry" && /example/.test(email)) {
      document.getElementById("setup-warning").hidden = false;
    }
  }

  function showConfirmation(order, result) {
    var main = document.getElementById("checkout-root");
    var books = JBF.commerce.booksFunded(order.subtotal);
    var text = JBF.providers.checkout.enquiry && JBF.providers.checkout.enquiry.orderText(order);
    main.innerHTML =
      '<div class="confirm"><span class="eyebrow">Order ' + ui.esc(order.reference) + "</span>" +
      "<h1>Thank you, " + ui.esc(order.customer.name.split(" ")[0]) + "!</h1>" +
      "<p>" + ui.esc(result.message || "") + "</p>" +
      (result.mailto
        ? '<p><a class="btn btn-primary" id="mailto" href="' + ui.esc(result.mailto) + '">Open my email to send the order</a></p>' +
          '<p class="small">Email app didn\'t open? Copy the details below and send them to <a href="mailto:' + ui.esc(JBF.config.charity.email) + '">' +
          ui.esc(JBF.config.charity.email) + "</a>.</p><pre>" + ui.esc(text) + "</pre>"
        : "") +
      (books >= 1 ? '<p class="impact-note" style="justify-content:center"><span>You\'ve helped fund about ' + books + " new " + (books === 1 ? "book" : "books") + " for children.</span></p>" : "") +
      '<p style="margin-top:24px"><a class="btn btn-ghost" href="shop.html">Keep shopping</a></p></div>';
    if (result.mailto) window.location.href = result.mailto;
    window.scrollTo(0, 0);
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!cart.items().length) {
      document.getElementById("checkout-root").innerHTML =
        '<div class="empty" style="margin:40px 0 72px"><h1>Your basket is empty</h1><a class="btn btn-primary" href="shop.html">Go to the shop</a></div>';
      return;
    }
    renderDelivery();
    renderSummary();
    providerNote();

    var form = document.getElementById("checkout-form");
    form.addEventListener("change", function (e) {
      if (e.target.name === "delivery") { toggleAddress(); renderSummary(); }
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var err = document.getElementById("form-error");
      err.hidden = true;
      if (!form.checkValidity()) { form.reportValidity(); return; }

      var totals = renderSummary();
      var f = form.elements;
      var order = {
        reference: JBF.commerce.makeReference(),
        createdAt: new Date().toISOString(),
        items: cart.items().map(function (i) {
          return { id: i.id, variantId: i.variantId, title: i.title, price: i.price, qty: i.qty };
        }),
        subtotal: totals.subtotal,
        delivery: totals.delivery,
        total: totals.total,
        customer: {
          name: f.name.value.trim(),
          email: f.email.value.trim(),
          phone: f.phone.value.trim(),
          marketing: f.marketing.checked
        },
        address: {
          line1: f.line1.value.trim(), line2: f.line2.value.trim(),
          town: f.town.value.trim(), postcode: f.postcode.value.trim().toUpperCase()
        },
        notes: f.notes.value.trim()
      };

      var btn = document.getElementById("place-order");
      btn.disabled = true;
      btn.textContent = "Sending…";
      JBF.commerce.placeOrder(order).then(function (result) {
        if (result.redirectUrl) { window.location.href = result.redirectUrl; return; }
        cart.clear();
        showConfirmation(order, result);
      }).catch(function (ex) {
        err.textContent = "Sorry, something went wrong: " + ex.message + " Please try again or email us.";
        err.hidden = false;
        btn.disabled = false;
        btn.textContent = "Place order";
      });
    });
  });
})(window.JBF);
