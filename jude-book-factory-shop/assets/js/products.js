/*
 * Product catalogue (used when commerce.catalogueProvider = "local")
 * ------------------------------------------------------------------
 * These are SAMPLE products so you can see how the shop looks.
 * Replace them with your real Faire stock — either edit this file,
 * or open admin/catalogue.html in a browser, edit there, and download
 * a fresh copy of this file.
 *
 * Fields
 *   id          unique, no spaces (used in the web address)
 *   title       product name
 *   brand       maker / Faire brand name
 *   category    must match one of JBF.categories below
 *   price       our selling price in £
 *   rrp         usual retail price in £ (shows a "was" price) — optional
 *   stock       how many you have (0 = sold out)
 *   image       path or URL to a photo — optional (a drawn placeholder is used if blank)
 *   description short paragraph
 *   tags        words that help search
 *   featured    true to show on the home page
 *   faireRef    your Faire order / SKU reference — optional, for your records only
 *   ageRange    e.g. "3+" — optional, for toys and books
 */
window.JBF = window.JBF || {};

JBF.categories = [
  { id: "books",      name: "Books & Reading", colour: "#2f6fd6" },
  { id: "toys",       name: "Toys & Play",     colour: "#e2583e" },
  { id: "gifts",      name: "Home & Gifts",    colour: "#6b3fa0" },
  { id: "stationery", name: "Stationery",      colour: "#1f9d8a" },
  { id: "cards",      name: "Cards & Wrap",    colour: "#d9a21b" },
  { id: "wellbeing",  name: "Wellbeing",       colour: "#c2477a" }
];

JBF.products = [
  {
    id: "sample-picture-book-bundle",
    title: "Picture Book Bundle (3 hardbacks)",
    brand: "Sample Brand",
    category: "books",
    price: 18.00,
    rrp: 29.97,
    stock: 6,
    image: "",
    description: "Three beautifully illustrated hardback picture books, perfect for bedtime stories. A lovely gift for little readers aged 2–6.",
    tags: ["bedtime", "hardback", "gift"],
    featured: true,
    faireRef: "",
    ageRange: "2–6"
  },
  {
    id: "sample-wooden-rainbow-stacker",
    title: "Wooden Rainbow Stacker",
    brand: "Sample Brand",
    category: "toys",
    price: 16.50,
    rrp: 24.00,
    stock: 4,
    image: "",
    description: "Hand-finished wooden rainbow with water-based paints. Endless stacking, sorting and imaginative play.",
    tags: ["wooden", "eco", "rainbow"],
    featured: true,
    faireRef: "",
    ageRange: "18m+"
  },
  {
    id: "sample-soy-candle-fig",
    title: "Soy Candle — Fig & Cassis",
    brand: "Sample Brand",
    category: "gifts",
    price: 12.00,
    rrp: 20.00,
    stock: 10,
    image: "",
    description: "Hand-poured soy wax candle in a reusable amber jar. Around 40 hours burn time.",
    tags: ["candle", "home", "gift"],
    featured: true,
    faireRef: ""
  },
  {
    id: "sample-recycled-notebook-set",
    title: "Recycled Notebook Set of 3",
    brand: "Sample Brand",
    category: "stationery",
    price: 8.50,
    rrp: 14.00,
    stock: 12,
    image: "",
    description: "A5 lined, plain and dotted notebooks made from 100% recycled paper. For stories, sketches and big ideas.",
    tags: ["notebook", "recycled", "writing"],
    featured: true,
    faireRef: ""
  },
  {
    id: "sample-greeting-card-pack",
    title: "Illustrated Greeting Cards (pack of 6)",
    brand: "Sample Brand",
    category: "cards",
    price: 7.00,
    rrp: 12.00,
    stock: 15,
    image: "",
    description: "Six blank cards with kraft envelopes, featuring whimsical illustrations. Blank inside for your own message.",
    tags: ["cards", "birthday", "thank you"],
    featured: false,
    faireRef: ""
  },
  {
    id: "sample-plush-bear",
    title: "Organic Cotton Plush Bear",
    brand: "Sample Brand",
    category: "toys",
    price: 14.00,
    rrp: 22.00,
    stock: 3,
    image: "",
    description: "A soft and cuddly bear made from organic cotton, the perfect reading buddy.",
    tags: ["plush", "soft toy", "organic"],
    featured: true,
    faireRef: "",
    ageRange: "0+"
  },
  {
    id: "sample-enamel-mug",
    title: "Enamel Mug — 'Pure Imagination'",
    brand: "Sample Brand",
    category: "gifts",
    price: 9.00,
    rrp: 15.00,
    stock: 0,
    image: "",
    description: "Speckled enamel mug for tea, hot chocolate or holding pens. Dishwasher safe.",
    tags: ["mug", "kitchen"],
    featured: false,
    faireRef: ""
  },
  {
    id: "sample-colouring-kit",
    title: "Creative Colouring Kit",
    brand: "Sample Brand",
    category: "stationery",
    price: 11.00,
    rrp: 18.00,
    stock: 8,
    image: "",
    description: "Colouring book, 12 pencils and a sticker sheet in a reusable tin. Brilliant for car journeys and hospital stays.",
    tags: ["colouring", "art", "creative"],
    featured: false,
    faireRef: "",
    ageRange: "4+"
  },
  {
    id: "sample-bath-gift-set",
    title: "Calm Bath Gift Set",
    brand: "Sample Brand",
    category: "wellbeing",
    price: 15.00,
    rrp: 26.00,
    stock: 5,
    image: "",
    description: "Lavender bath salts, a natural soap bar and a wooden scoop, gift boxed and ready to give.",
    tags: ["bath", "pamper", "lavender"],
    featured: false,
    faireRef: ""
  },
  {
    id: "sample-gift-wrap-roll",
    title: "Recycled Gift Wrap — Stars",
    brand: "Sample Brand",
    category: "cards",
    price: 3.50,
    rrp: 6.00,
    stock: 20,
    image: "",
    description: "Two sheets of recyclable gift wrap printed with gold stars, plus matching tags.",
    tags: ["wrap", "gift wrap"],
    featured: false,
    faireRef: ""
  },
  {
    id: "sample-story-dice",
    title: "Story Starter Dice",
    brand: "Sample Brand",
    category: "books",
    price: 6.50,
    rrp: 10.00,
    stock: 9,
    image: "",
    description: "Nine picture dice to roll and spark a brand new story every time. Great for families and classrooms.",
    tags: ["storytelling", "game", "creative"],
    featured: true,
    faireRef: "",
    ageRange: "3+"
  },
  {
    id: "sample-weighted-eye-pillow",
    title: "Lavender Eye Pillow",
    brand: "Sample Brand",
    category: "wellbeing",
    price: 10.00,
    rrp: 16.00,
    stock: 6,
    image: "",
    description: "Gently weighted linen eye pillow filled with flaxseed and dried lavender, for rest and calm.",
    tags: ["relax", "sleep", "lavender"],
    featured: false,
    faireRef: ""
  }
];
