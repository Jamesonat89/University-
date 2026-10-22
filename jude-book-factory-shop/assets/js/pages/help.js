(function (JBF) {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    var c = JBF.config;
    document.querySelectorAll("[data-donate]").forEach(function (a) { a.href = c.charity.donateUrl; });
    document.querySelectorAll("[data-email]").forEach(function (a) { a.href = "mailto:" + c.charity.email; a.textContent = c.charity.email; });
    var s = c.shop.delivery.standard;
    var el = document.querySelector("[data-delivery-standard]");
    if (el && s && s.enabled) {
      el.textContent = JBF.money(s.price) + (s.freeOver ? ", or free on orders over " + JBF.money(s.freeOver) : "");
    }
  });
})(window.JBF);
