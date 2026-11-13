/* Crochet Craft Studio — catalogue
   Single source of truth for every page. Edit here, all pages update.
   Prices marked verified:true are real. Everything else is DEMO. */

window.CCS = window.CCS || {};

CCS.WA_NUMBER = "919000000000"; // PLACEHOLDER — replace with the real business number
CCS.IG = "https://www.instagram.com/crochet.craftstudio";
CCS.CHANNEL = "https://whatsapp.com/channel/0029VbD5WbG8qIzlu287fA3r";
CCS.FREE_SHIP_AT = 999;
CCS.SHIP_FLAT = 79;

CCS.categories = [
  { id: "all", label: "Sab kuch" },
  { id: "phone-cases", label: "Phone cases" },
  { id: "bags", label: "Bags & charms" },
  { id: "hair", label: "Hair" },
  { id: "small-goods", label: "Pouches & wallets" },
  { id: "festive", label: "Festive & home" },
  { id: "amigurumi", label: "Amigurumi" },
  { id: "wearables", label: "Wearables" }
];

CCS.occasions = [
  { id: "rakhi", label: "Rakhi", sub: "Bhai ke liye", month: 8 },
  { id: "diwali", label: "Diwali", sub: "Ghar & gifts", month: 11 },
  { id: "navratri", label: "Navratri", sub: "Colour rush", month: 10 },
  { id: "valentines", label: "Valentine's", sub: "Sorry bhi, pyaar bhi", month: 2 },
  { id: "birthday", label: "Birthday", sub: "Har mahina", month: null },
  { id: "just-because", label: "Just because", sub: "No reason needed", month: null }
];

/* kind -> silhouette fallback; img -> real studio photograph */
CCS.products = [
  { id:"p01", slug:"mini-rose-bag", name:"Mini Rose Bag", cat:"bags", price:129, verified:true, stock:4, drop:true, mto:false, kind:"bag", img:"p-mini-rose-bag.jpg", c1:"#c86a7a", c2:"#7a1f35", occasions:["birthday","valentines","just-because"], desc:"Chhota sa bag, bada sa statement. Pearl chain included.", note:"4 bache hain" },
  { id:"p02", slug:"bow-phone-case", name:"Bow Phone Case", cat:"phone-cases", price:349, verified:false, stock:null, drop:false, mto:true, kind:"case", img:"p-bow-phone-case.jpg", c1:"#e8b8bf", c2:"#a83e5b", occasions:["birthday","valentines"], desc:"Soft bow, hard case. Phone model batana zaroori hai.", note:"Made to order · 7–10 din", phone:true },
  { id:"p03", slug:"sunflower-phone-case", name:"Sunflower Phone Case", cat:"phone-cases", price:349, verified:false, stock:null, drop:false, mto:true, kind:"case", img:"p-sunflower-phone-case.jpg", c1:"#e9a13b", c2:"#8a5a1c", occasions:["birthday","just-because"], desc:"Ek sunflower, poora mood theek.", note:"Made to order · 7–10 din", phone:true },
  { id:"p04", slug:"bag-charm", name:"Bag Charm", cat:"bags", price:199, verified:false, stock:6, drop:false, mto:false, kind:"charm", img:"p-bag-charm.jpg", c1:"#e8b8bf", c2:"#7a1f35", occasions:["rakhi","birthday"], desc:"Clip it on anything. Instant personality.", note:"6 bache hain" },
  { id:"p05", slug:"keychain", name:"Keychain", cat:"bags", price:149, verified:false, stock:9, drop:false, mto:false, kind:"charm", img:"p-keychain.jpg", c1:"#8fa07f", c2:"#55684c", occasions:["rakhi","just-because"], desc:"Chabi ka saath nibhaane wala.", note:"9 bache hain" },
  { id:"p06", slug:"pouch", name:"Pouch", cat:"small-goods", price:170, verified:true, stock:5, drop:false, mto:false, kind:"pouch", img:"p-pouch.jpg", c1:"#e6d3b3", c2:"#8a7350", occasions:["rakhi","birthday"], desc:"Chhoti cheezein, ek jagah.", note:"5 bache hain" },
  { id:"p07", slug:"wallet", name:"Wallet", cat:"small-goods", price:200, verified:true, stock:3, drop:true, mto:false, kind:"pouch", img:"p-wallet.jpg", c1:"#a8435c", c2:"#5c1626", occasions:["rakhi","birthday"], desc:"Paisa rakhne ki jagah, style bhi.", note:"Only 3 left" },
  { id:"p08", slug:"scrunchie", name:"Scrunchie", cat:"hair", price:99, verified:false, stock:12, drop:false, mto:false, kind:"scrunchie", img:"p-scrunchie.jpg", c1:"#f0c9cf", c2:"#b7607a", occasions:["just-because"], desc:"Baal bhi, mood bhi.", note:"12 bache hain" },
  { id:"p09", slug:"lotus-hair-clip", name:"Lotus Hair Clip", cat:"hair", price:129, verified:false, stock:7, drop:false, mto:false, kind:"clip", img:"p-lotus-hair-clip.jpg", c1:"#e8b8bf", c2:"#7a1f35", occasions:["navratri","birthday"], desc:"Lotus, but make it wearable.", note:"7 bache hain" },
  { id:"p10", slug:"rakhi", name:"Handmade Rakhi", cat:"festive", price:149, verified:false, stock:15, drop:false, mto:false, kind:"rakhi", img:"p-rakhi.jpg", c1:"#e9a13b", c2:"#7a1f35", occasions:["rakhi"], desc:"Bhai ke liye, haath se.", note:"15 bache hain" },
  { id:"p11", slug:"rakhi-hamper", name:"Rakhi Hamper", cat:"festive", price:599, was:749, verified:false, stock:8, drop:true, mto:false, kind:"hamper", img:"p-rakhi-hamper.jpg", c1:"#c05b3e", c2:"#5c1626", occasions:["rakhi"], desc:"Rakhi + keychain + handwritten note. Ek dabbe mein poora Rakhi.", note:"8 hampers" },
  { id:"p12", slug:"diya-stand", name:"Diya Stand", cat:"festive", price:249, verified:false, stock:null, drop:false, mto:true, kind:"diya", img:"p-diya-stand.jpg", c1:"#e6d3b3", c2:"#a8435c", occasions:["diwali"], desc:"Diya rakho, ghar sajao.", note:"Made to order · 7–10 din" },
  { id:"p13", slug:"shubh-labh-hanging", name:"Shubh-Labh Hanging", nameHi:"शुभ-लाभ", cat:"festive", price:299, verified:false, stock:null, drop:false, mto:true, kind:"hanging", img:"p-shubh-labh-hanging.jpg", c1:"#c05b3e", c2:"#7a1f35", occasions:["diwali"], desc:"Ghar ke liye, shubh shuruaat ke liye.", note:"Made to order · 7–10 din" },
  { id:"p14", slug:"butterfly-bag", name:"Butterfly Bag", cat:"bags", price:399, verified:false, stock:2, drop:true, mto:false, kind:"bag", img:"p-butterfly-bag.jpg", c1:"#e8b8bf", c2:"#8a3f5c", occasions:["birthday","valentines"], desc:"Titli jaisa halka, poora saaman andar.", note:"Only 2 left" },
  { id:"p15", slug:"crochet-top", name:"Crochet Top", cat:"wearables", price:899, verified:false, stock:null, drop:false, mto:true, kind:"top", img:"p-crochet-top.jpg", c1:"#e6d3b3", c2:"#8a7350", occasions:["birthday","just-because"], desc:"Custom size, custom colour. Tumhara fit.", note:"Made to order · 10–14 din" },
  { id:"p16", slug:"krishna-amigurumi", name:"Krishna Amigurumi", cat:"amigurumi", price:499, verified:false, stock:null, drop:true, mto:true, kind:"doll", img:"p-krishna-amigurumi.jpg", c1:"#8fa07f", c2:"#3f5a48", occasions:["diwali","birthday"], desc:"Chhota Kanha, bada pyaar. Sabse viral piece.", note:"Made to order · 8–10 din" }
];

CCS.bySlug = function (slug) { return CCS.products.find(function (p) { return p.slug === slug; }); };
CCS.rupees = function (n) { return "\u20B9" + n.toLocaleString("en-IN"); };
CCS.stockLabel = function (p) {
  if (p.stock === null) return "Made to order";
  if (p.stock <= 3) return "Only " + p.stock + " left";
  return p.stock + " left";
};
CCS.activeOccasion = function () {
  var m = new Date().getMonth() + 1;
  var hit = CCS.occasions.find(function (o) { return o.month === m; });
  return hit ? hit.id : null;
};

/* ---- cart ---- */
CCS.cart = {
  key: "ccs.cart.v1",
  read: function () {
    try { return JSON.parse(localStorage.getItem(this.key)) || []; } catch (e) { return []; }
  },
  write: function (items) {
    localStorage.setItem(this.key, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("ccs:cart", { detail: items }));
    try {
      var bc = new BroadcastChannel("ccs-cart");
      bc.postMessage(items); bc.close();
    } catch (e) {}
  },
  add: function (item) {
    var items = this.read();
    var match = items.findIndex(function (i) {
      return i.slug === item.slug && i.color === item.color && i.model === item.model;
    });
    if (match > -1) items[match].qty += item.qty || 1;
    else items.push(Object.assign({ qty: 1 }, item));
    this.write(items);
    return items;
  },
  setQty: function (idx, qty) {
    var items = this.read();
    if (!items[idx]) return;
    items[idx].qty = Math.max(1, Math.min(20, qty));
    this.write(items);
  },
  remove: function (idx) {
    var items = this.read(); items.splice(idx, 1); this.write(items);
  },
  clear: function () { this.write([]); },
  count: function () { return this.read().reduce(function (n, i) { return n + i.qty; }, 0); },
  subtotal: function () { return this.read().reduce(function (n, i) { return n + i.price * i.qty; }, 0); },
  shipping: function () {
    var s = this.subtotal();
    if (s === 0) return 0;
    return s >= CCS.FREE_SHIP_AT ? 0 : CCS.SHIP_FLAT;
  },
  total: function () { return this.subtotal() + this.shipping(); }
};
