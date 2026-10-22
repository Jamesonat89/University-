/*
 * Shared UI: header, footer, product cards, placeholder artwork, toasts.
 */
window.JBF = window.JBF || {};

(function (JBF) {
  "use strict";

  var cfg = JBF.config;

  // ---------- helpers ----------
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function param(name) {
    try { return new URLSearchParams(window.location.search).get(name); } catch (e) { return null; }
  }
  function root() {
    // Pages in sub-folders (e.g. admin/) set data-root="../" on <body>
    return (document.body && document.body.getAttribute("data-root")) || "";
  }

  JBF.ui = { esc: esc, param: param, root: root };

  // ---------- Theme ----------
  var THEME_KEY = "jbf_theme";
  function applyTheme(t) {
    if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
    else document.documentElement.removeAttribute("data-theme");
  }
  applyTheme(JBF.storage.get(THEME_KEY));

  function currentTheme() {
    var t = document.documentElement.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  // ---------- Artwork ----------
  var ICONS = {
    books: '<path d="M30 38c10-6 22-6 30 0v40c-8-6-20-6-30 0z" /><path d="M90 38c-10-6-22-6-30 0v40c8-6 20-6 30 0z" />',
    toys: '<rect x="30" y="56" width="26" height="26" rx="4"/><rect x="64" y="56" width="26" height="26" rx="4"/><rect x="47" y="28" width="26" height="26" rx="4"/>',
    gifts: '<rect x="30" y="50" width="60" height="34" rx="4"/><rect x="26" y="40" width="68" height="14" rx="4"/><path d="M60 40v44" stroke-width="6"/><path d="M60 40c-6-14-22-14-18-2 2 4 12 2 18 2zM60 40c6-14 22-14 18-2-2 4-12 2-18 2z"/>',
    stationery: '<path d="M36 84l6-20 40-40 14 14-40 40z"/><path d="M36 84l20-6"/>',
    cards: '<rect x="26" y="38" width="68" height="46" rx="5"/><path d="M28 42l32 22 32-22" />',
    wellbeing: '<path d="M60 86C40 72 26 60 26 46c0-9 7-16 16-16 8 0 14 5 18 11 4-6 10-11 18-11 9 0 16 7 16 16 0 14-14 26-34 40z"/>'
  };
  var STAR = "M0,-6 L1.6,-1.8 6,-1.8 2.4,1 3.8,5.6 0,2.8 -3.8,5.6 -2.4,1 -1.6,-1.8 -6,-1.8Z";

  function categoryById(categories, id) {
    return (categories || []).find(function (c) { return c.id === id; }) || { id: id, name: id, colour: "#2f6fd6" };
  }

  function seed(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
    return h;
  }

  function placeholderArt(product, category) {
    var colour = (category && category.colour) || "#2f6fd6";
    var icon = ICONS[product.category] || ICONS.books;
    var s = seed(product.id);
    var stars = "";
    for (var i = 0; i < 5; i++) {
      var x = 10 + ((s >> (i * 3)) % 100);
      var y = 8 + ((s >> (i * 4 + 1)) % 104);
      var sc = 0.6 + ((s >> i) % 5) / 6;
      stars += '<path d="' + STAR + '" transform="translate(' + x + ' ' + y + ') scale(' + sc.toFixed(2) + ')" fill="#f7cd56" opacity=".85"/>';
    }
    return '<svg viewBox="0 0 120 120" role="img" aria-label="' + esc(product.title) + '" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">' +
      '<defs><linearGradient id="g' + s + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + colour + '"/><stop offset="1" stop-color="' + colour + '" stop-opacity=".72"/></linearGradient></defs>' +
      '<rect width="120" height="120" fill="url(#g' + s + ')"/>' +
      '<circle cx="60" cy="60" r="38" fill="#fff" opacity=".14"/>' + stars +
      '<g fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" transform="translate(0 2)">' + icon + '</g>' +
      '</svg>';
  }

  function productImage(product, category) {
    if (product.image) {
      var src = /^(https?:)?\/\//.test(product.image) || product.image.indexOf("data:") === 0 ? product.image : root() + product.image;
      return '<img src="' + esc(src) + '" alt="' + esc(product.title) + '" loading="lazy">';
    }
    return placeholderArt(product, category);
  }

  var BRAND_MARK =
    '<svg class="brand-mark" viewBox="0 0 48 48" aria-hidden="true">' +
    '<circle cx="24" cy="24" r="23" fill="#2f6fd6"/>' +
    '<path d="M11 18c5-3 10-3 13 0v17c-3-3-8-3-13 0zM37 18c-5-3-10-3-13 0v17c3-3 8-3 13 0z" fill="#fdf8ee"/>' +
    '<path d="M24 6l1.8 4.2 4.4.3-3.4 2.9 1.1 4.3L24 15.4l-3.9 2.3 1.1-4.3-3.4-2.9 4.4-.3z" fill="#f2b632"/>' +
    '</svg>';

  JBF.ui.placeholderArt = placeholderArt;
  JBF.ui.productImage = productImage;
  JBF.ui.categoryById = categoryById;

  // ---------- Product card ----------
  JBF.ui.productCard = function (p, categories) {
    var cat = categoryById(categories, p.category);
    var href = root() + "product.html?id=" + encodeURIComponent(p.id);
    var badge = "";
    if (p.stock <= 0) badge = '<span class="badge badge-sold">Sold out</span>';
    else if (p.rrp && p.rrp > p.price) badge = '<span class="badge">Save ' + Math.round((1 - p.price / p.rrp) * 100) + '%</span>';
    var sample = cfg.shop.demoMode && /^sample-/.test(p.id) ? '<span class="badge badge-sample">Sample</span>' : "";
    return '<article class="card">' +
      '<div class="card-media">' + badge + sample + productImage(p, cat) + '</div>' +
      '<div class="card-body">' +
      (p.brand ? '<span class="card-brand">' + esc(p.brand) + '</span>' : "") +
      '<h3 class="card-title"><a href="' + href + '">' + esc(p.title) + '</a></h3>' +
      '<div class="card-foot"><span><span class="price">' + JBF.money(p.price) + '</span>' +
      (p.rrp && p.rrp > p.price ? '<span class="price-was"><span class="visually-hidden">was </span>' + JBF.money(p.rrp) + '</span>' : "") +
      '</span>' +
      (p.stock > 0
        ? '<button class="btn btn-primary" type="button" data-add="' + esc(p.id) + '">Add<span class="visually-hidden"> ' + esc(p.title) + ' to basket</span></button>'
        : "") +
      '</div></div></article>';
  };

  // Delegated "Add to basket" for any card
  document.addEventListener("click", function (e) {
    var btn = e.target.closest && e.target.closest("[data-add]");
    if (!btn) return;
    e.preventDefault();
    var id = btn.getAttribute("data-add");
    JBF.commerce.getProduct(id).then(function (p) {
      if (!p) return;
      JBF.commerce.cart.add(p, 1);
      JBF.ui.toast(esc(p.title) + ' added. <a href="' + root() + 'basket.html">View basket</a>');
    });
  });

  // ---------- Toast ----------
  var toastTimer;
  JBF.ui.toast = function (html) {
    var t = document.getElementById("toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "toast";
      t.className = "toast";
      t.setAttribute("role", "status");
      t.setAttribute("aria-live", "polite");
      document.body.appendChild(t);
    }
    t.innerHTML = html;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 3200);
  };

  // ---------- Header ----------
  function renderHeader() {
    var el = document.getElementById("site-header");
    if (!el) return;
    var page = document.body.getAttribute("data-page") || "";
    var r = root();
    function nav(href, label, key) {
      return '<a href="' + r + href + '"' + (page === key ? ' aria-current="page"' : "") + ">" + label + "</a>";
    }
    var logo = cfg.charity.logo
      ? '<img src="' + esc(r + cfg.charity.logo) + '" alt="' + esc(cfg.charity.name) + '" data-logo>'
      : "";
    el.className = "site-header";
    el.innerHTML =
      (cfg.shop.demoMode ? '<div class="demo-strip">Preview shop — sample products shown. Real Faire stock coming soon.</div>' : "") +
      '<div class="container header-inner">' +
      '<a class="brand" href="' + r + 'index.html">' + logo +
      '<span data-wordmark style="display:' + (logo ? "none" : "flex") + ';align-items:center;gap:10px">' + BRAND_MARK +
      '<span class="brand-text">Jude &amp; the Book Factory<small>Charity shop</small></span></span></a>' +
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="main-nav">Menu</button>' +
      '<nav class="main-nav" id="main-nav" aria-label="Main">' +
      nav("index.html", "Home", "home") +
      nav("shop.html", "Shop", "shop") +
      nav("our-story.html", "Our story", "story") +
      nav("help.html", "Help", "help") +
      '<a class="basket-link" href="' + r + 'basket.html"' + (page === "basket" ? ' aria-current="page"' : "") + '>Basket <span class="basket-count" data-basket-count aria-label="items in basket">0</span></a>' +
      "</nav></div>";

    var img = el.querySelector("[data-logo]");
    if (img) {
      img.addEventListener("error", function () {
        img.remove();
        el.querySelector("[data-wordmark]").style.display = "flex";
      });
    }
    var toggle = el.querySelector(".nav-toggle");
    var menu = el.querySelector(".main-nav");
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  function updateCount() {
    var n = JBF.commerce.cart.count();
    document.querySelectorAll("[data-basket-count]").forEach(function (b) {
      b.textContent = n;
      b.setAttribute("aria-label", n + (n === 1 ? " item" : " items") + " in basket");
    });
  }

  // ---------- Footer ----------
  function renderFooter() {
    var el = document.getElementById("site-footer");
    if (!el) return;
    var c = cfg.charity;
    var r = root();
    var socials = Object.keys(c.social || {}).filter(function (k) { return c.social[k]; }).map(function (k) {
      return '<li><a href="' + esc(c.social[k]) + '" rel="noopener" target="_blank">' + k.charAt(0).toUpperCase() + k.slice(1) + "</a></li>";
    }).join("");
    el.className = "site-footer";
    el.innerHTML =
      '<div class="container"><div class="footer-grid">' +
      '<div><h2>' + esc(c.name) + '</h2><p>Every purchase helps put brand new books into the hands of children in hospitals, hospices and those affected by grief and childhood cancer.</p></div>' +
      '<div><h2>Shop</h2><ul>' +
      '<li><a href="' + r + 'shop.html">All products</a></li>' +
      '<li><a href="' + r + 'basket.html">Your basket</a></li>' +
      '<li><a href="' + r + 'help.html">Delivery &amp; returns</a></li>' +
      "</ul></div>" +
      '<div><h2>The charity</h2><ul>' +
      '<li><a href="' + r + 'our-story.html">Jude\'s story</a></li>' +
      '<li><a href="' + esc(c.mainWebsite) + '" rel="noopener">Main charity website</a></li>' +
      '<li><a href="' + esc(c.donateUrl) + '" rel="noopener">Make a donation</a></li>' +
      "</ul></div>" +
      '<div><h2>Get in touch</h2><ul>' +
      '<li><a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a></li>" +
      "<li>" + esc(c.location) + "</li>" + socials +
      "</ul></div>" +
      "</div>" +
      '<div class="footer-legal"><span>' + esc(c.name) + " · Registered charity in " + esc(c.registeredIn) + " no. " + esc(c.charityNumber) +
      "</span><span>Shop purchases are sales, not donations, and are not eligible for Gift Aid. Profits support our charitable work.</span>" +
      '<button class="theme-toggle" type="button" data-theme-toggle></button></div>' +
      "</div>";

    var tbtn = el.querySelector("[data-theme-toggle]");
    function label() { tbtn.textContent = currentTheme() === "dark" ? "Light mode" : "Dark mode"; }
    label();
    tbtn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      applyTheme(next);
      JBF.storage.set(THEME_KEY, next);
      label();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderHeader();
    renderFooter();
    updateCount();
    JBF.commerce.cart.onChange(updateCount);
  });
})(window.JBF);
