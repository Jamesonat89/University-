# Jude and the Book Factory — Charity Shop Website

An online shop for **Jude and the Book Factory** (registered charity no. 1214688, England & Wales).
It sells reduced-value stock bought through the **Faire** wholesale marketplace, and the profits fund
brand new books, goody bags and creative workshops for children.

It's plain HTML, CSS and JavaScript, with no build step and no monthly fees:

- **Try it now:** double-click `index.html` to open it in your browser.
- **Publish it:** upload the whole folder to any static web host (GitHub Pages, Netlify, Cloudflare Pages,
  or your existing web host). You could put it on a sub-domain such as `shop.judeandthebookfactory.co.uk`.

The site works today with an **order-by-email** checkout. It is built so that **Shopify (with Shopify POS
as your EPOS), Square, or another platform** can be plugged in later without redesigning the pages.

---

## What's included

| Page | What it does |
|---|---|
| `index.html` | Home page: hero, "how your shopping helps", featured products, categories, Jude's story and impact figures, donate banner |
| `shop.html` | Browse everything, with category filters, search, sort (price, biggest saving, A–Z) and "in stock only" |
| `product.html?id=…` | Product page with photo, price vs RRP, stock level, quantity, related items |
| `basket.html` | Basket with quantity controls and a "your basket could fund N books" estimate |
| `checkout.html` | Customer details, click & collect or UK delivery, gift message, marketing opt-in |
| `our-story.html` | Jude's story and what the charity does |
| `help.html` | Delivery, returns, Gift Aid FAQ, privacy |
| `admin/catalogue.html` | **Catalogue manager**: add and edit products or import a spreadsheet, then download an updated catalogue |

It also has a mobile-friendly layout, a dark mode, keyboard and screen-reader support, and a basket that is
remembered between visits.

---

## Before you go live: checklist

1. **Orders email.** In `assets/js/config.js` set `charity.email` to the inbox that should receive orders.
   The checkout shows a warning to you until this is done.
2. **Logo.** Save Jude's logo as `assets/img/logo.png` and set `charity.logo: "assets/img/logo.png"`.
   Until then a simple book-and-star wordmark is shown.
3. **Products.** Replace the sample products (see below). Then set `shop.demoMode: false` to remove the
   "Preview shop" strip and the "Sample" badges.
4. **Words.** Read `our-story.html` and `help.html`. The story text was drafted from public press coverage,
   so the family should check it and make it their own. Trustees should approve the delivery and returns terms.
5. **Numbers.** Update `impact` (books donated, workshop places), the delivery prices, and the
   `averageMarginPercent` / `costPerBook` values behind the "funds N books" estimate (or set
   `showImpactEstimate: false`).
6. **Social links.** Fill in `charity.social` if you'd like them in the footer.

---

## Adding your Faire stock

**Easiest: the catalogue manager**

1. Open `admin/catalogue.html` in your browser.
2. Press **Remove sample products**.
3. Either **Add product** one at a time, or **Import CSV** from a spreadsheet (press **CSV template** to see
   the columns: title, brand, category, price, rrp, stock, image, description, tags, featured, sku, age range).
4. Put product photos in `assets/img/products/` and type the file name in the Photo box (or pick the file to
   fill it in).
5. Press **Download products.js** and replace `assets/js/products.js` with the downloaded file.

The manager keeps a draft in your browser until you download it. It never uploads anything, so it's safe to
publish, but you can leave the `admin` folder off the live site if you prefer.

**By hand:** `assets/js/products.js` is a plain list, with every field explained at the top of the file.

**Pricing tip:** put Faire's suggested retail price in `rrp`. The site then shows "was £X / save Y%"
automatically.

---

## How the checkout works today ("enquiry" mode)

No card details ever touch this website:

1. The customer places an order and gets an order reference (e.g. `JBF-261022-AB12`).
2. The order reaches you in one of two ways:
   - **Default:** their email app opens with the order already filled in, addressed to you.
   - **Better:** set `commerce.enquiry.formEndpoint` to a free form service (e.g. Formspree, Basin, Getform).
     Orders are then emailed to you automatically, with no extra step for the customer.
3. You check the stock and send a **payment link** (SumUp, Square, Stripe Payment Links and PayPal all do
   this, and many charities already have one of these) or take payment on collection.

This is a good way to start small and test demand before paying for a platform.

---

## Adding Shopify, an EPOS or another platform later

All pages talk to one layer, `assets/js/commerce/core.js`, and never to a product source or payment system
directly. Swapping systems means changing **two words** in `config.js`:

```js
commerce: {
  catalogueProvider: "local",   // where products come from
  checkoutProvider:  "enquiry", // what "Place order" does
}
```

### Option A: Shopify + Shopify POS (recommended when you're ready)

Shopify runs the online stock and payments, and **Shopify POS** turns a phone, tablet or card reader into
your EPOS for events, pop-ups or a physical shop. Online and in-person sales then share one stock count.

A ready-made Shopify connector is included (`assets/js/commerce/providers/shopify.js`). It keeps this
website's design and uses Shopify behind the scenes:

1. In Shopify admin go to **Settings → Apps and sales channels → Develop apps** and create an app with
   **Storefront API** access (read product listings, write and read checkouts).
2. Put your store domain and Storefront access token in `config.js` → `commerce.shopify`.
3. Set both providers to `"shopify"`.

Product **type** becomes the category, **compare-at price** becomes the "was" price, and products tagged
`featured` appear on the home page. Payment happens on Shopify's own secure checkout. This connector has
not been tested against a live store yet, so try it on a free Shopify development store first.

Alternatively you can move the whole shop onto a Shopify theme and keep this design as a reference. Either
way works.

### Option B: Square, SumUp, Stripe, WooCommerce, etc.

Copy `providers/shopify.js` as a starting point and implement the same four functions:

```text
listProducts()  getProduct(id)  listCategories()   ← catalogue
placeOrder(order) → { reference, redirectUrl }      ← checkout
```

Add a `<script>` tag for the new file to each page, then set the provider names in `config.js`.

---

## Things to check (not legal advice)

- **Trading by a charity:** selling bought-in goods is "non-primary-purpose trading". Small amounts are
  covered by HMRC's small trading exemption, but above the thresholds charities usually trade through a
  trading subsidiary. Check the current limits with your accountant or independent examiner.
- **Gift Aid:** shop purchases are sales, not donations, so Gift Aid can't be claimed on them. The site
  says this in the footer and help page.
- **Faire terms:** check Faire's retailer terms for any rules on reselling online and on advertised prices.
- **Online selling rules:** the help page includes the standard 14-day cancellation right for distance sales.
  Make sure your returns process matches it.
- **Data protection:** you'll hold customer names and addresses, so keep orders in a secure inbox and only
  email marketing to people who ticked the opt-in.

---

## Folder map

```text
jude-book-factory-shop/
├── index.html, shop.html, product.html, basket.html, checkout.html, our-story.html, help.html
├── admin/catalogue.html            catalogue manager
└── assets/
    ├── css/styles.css              colours, fonts and layout (brand colours at the top)
    ├── img/                        logo, favicon, products/ photos
    └── js/
        ├── config.js               ← the settings file you edit
        ├── products.js             ← your product list
        ├── ui.js                   header, footer, product cards
        ├── commerce/core.js        basket + provider switchboard
        ├── commerce/providers/     local-catalogue, enquiry-checkout, shopify
        └── pages/                  one small script per page
```

**Brand colours** are at the top of `styles.css`: blue `#2f6fd6` (from the blue of Jude's hearing aids
in his logo), Wonka purple `#4b2a7b`, golden-ticket gold `#f2b632` and storybook cream `#fdf8ee`.
If you have exact colours from the logo artwork, swap them in there.
