/*
 * "Enquiry" checkout provider
 * ---------------------------
 * Takes no card details. The order is either:
 *   - POSTed as JSON to a form service (config.commerce.enquiry.formEndpoint), or
 *   - opened in the customer's email app, addressed to the charity.
 * The charity then confirms stock and sends a payment link (SumUp, Stripe,
 * PayPal, Square…) or takes payment on collection.
 */
window.JBF = window.JBF || {};
JBF.providers = JBF.providers || { catalogue: {}, checkout: {} };

(function (JBF) {
  "use strict";

  function orderText(order) {
    var lines = [];
    lines.push("Order reference: " + order.reference);
    lines.push("");
    lines.push("Items:");
    order.items.forEach(function (i) {
      lines.push("  " + i.qty + " x " + i.title + " (" + JBF.money(i.price) + " each) = " + JBF.money(i.price * i.qty));
    });
    lines.push("");
    lines.push("Subtotal: " + JBF.money(order.subtotal));
    lines.push("Delivery: " + order.delivery.label + " — " + JBF.money(order.delivery.price));
    lines.push("TOTAL: " + JBF.money(order.total));
    lines.push("");
    lines.push("Name: " + order.customer.name);
    lines.push("Email: " + order.customer.email);
    if (order.customer.phone) lines.push("Phone: " + order.customer.phone);
    if (order.delivery.id === "standard") {
      lines.push("Delivery address:");
      lines.push("  " + [order.address.line1, order.address.line2, order.address.town, order.address.postcode].filter(Boolean).join(", "));
    }
    if (order.notes) {
      lines.push("");
      lines.push("Notes / gift message: " + order.notes);
    }
    lines.push("");
    lines.push("Marketing consent: " + (order.customer.marketing ? "Yes" : "No"));
    return lines.join("\n");
  }

  JBF.providers.checkout.enquiry = {
    orderText: orderText,
    placeOrder: function (order) {
      var cfg = JBF.config.commerce.enquiry || {};
      var to = JBF.config.charity.email;

      if (cfg.formEndpoint) {
        return fetch(cfg.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({
            _subject: "New shop order " + order.reference,
            reference: order.reference,
            email: order.customer.email,
            summary: orderText(order),
            order: order
          })
        }).then(function (res) {
          if (!res.ok) throw new Error("The order could not be sent (status " + res.status + ").");
          return {
            reference: order.reference,
            message: "Thank you! We've received your order and will email " + order.customer.email +
              " shortly with a secure payment link and delivery details."
          };
        });
      }

      var subject = encodeURIComponent("Shop order " + order.reference);
      var body = encodeURIComponent(orderText(order));
      return Promise.resolve({
        reference: order.reference,
        mailto: "mailto:" + to + "?subject=" + subject + "&body=" + body,
        message: "Nearly there! Your email app should open with your order filled in — just press send. " +
          "We'll reply with a secure payment link and delivery details."
      });
    }
  };
})(window.JBF);
