/*
 * Jude and the Book Factory — shop configuration
 * ------------------------------------------------
 * This is the ONE file most people will need to edit.
 * Everything here is plain text: change the values between the quotes.
 */
window.JBF = window.JBF || {};

JBF.config = {
  charity: {
    name: "Jude and the Book Factory",
    shortName: "The Book Factory",
    charityNumber: "1214688",
    registeredIn: "England & Wales",
    location: "Sheffield, South Yorkshire",
    email: "orders@your-domain.example", // TODO: put the inbox that should receive shop orders
    mainWebsite: "https://www.judeandthebookfactory.co.uk/",
    donateUrl: "https://www.justgiving.com/charity/judeandthebookfactory",
    social: {
      facebook: "", // e.g. "https://www.facebook.com/..."
      instagram: "",
      tiktok: ""
    },
    // Drop your logo file into assets/img/ and put its name here.
    // Leave blank to use the text wordmark.
    logo: "" // e.g. "assets/img/logo.png"
  },

  // Impact figures shown on the home page — update as they grow.
  impact: {
    booksDonated: "9,000+",
    workshopPlaces: "120+",
    frends: "1,000+",
    booksAsOf: "2026"
  },

  shop: {
    currency: "GBP",
    locale: "en-GB",

    // Shows a "sample products" strip until you load your real Faire stock.
    demoMode: true,

    // Used for the friendly "your basket helps fund about N books" estimate.
    // Set showImpactEstimate to false to hide it.
    showImpactEstimate: true,
    averageMarginPercent: 40, // rough profit kept from each sale after stock cost
    costPerBook: 6,           // average cost of one new book you donate (£)

    delivery: {
      collection: {
        enabled: true,
        label: "Free click & collect (Sheffield)",
        price: 0,
        note: "We'll email you to arrange a collection time."
      },
      standard: {
        enabled: true,
        label: "UK standard delivery",
        price: 3.95,
        freeOver: 40
      }
    }
  },

  /*
   * Commerce providers — the "plug socket" for Shopify / EPOS later.
   *
   * catalogueProvider: where products come from
   *   "local"   -> assets/js/products.js (edit by hand or with admin/catalogue.html)
   *   "shopify" -> live products from your Shopify store (fill in shopify below)
   *
   * checkoutProvider: what happens when someone presses "Place order"
   *   "enquiry" -> the order is emailed to you (or posted to a form service) and you
   *                send a payment link / take payment on collection. No card details touch this site.
   *   "shopify" -> customer is sent to Shopify's secure checkout
   */
  commerce: {
    catalogueProvider: "local",
    checkoutProvider: "enquiry",

    enquiry: {
      // Optional: a form endpoint (Formspree, Getform, Basin, etc.) that emails you JSON orders.
      // Leave blank to open the customer's email app with the order pre-filled instead.
      formEndpoint: "",
      orderPrefix: "JBF"
    },

    shopify: {
      // From Shopify admin → Settings → Apps → Develop apps → Storefront API
      storeDomain: "",          // e.g. "jude-book-factory.myshopify.com"
      storefrontToken: "",      // public Storefront API access token (safe for browsers)
      apiVersion: "2025-01",
      collectionHandle: ""      // optional: only show one collection, e.g. "faire-finds"
    }
  }
};
