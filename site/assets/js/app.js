/* ============================================================
   App shell + page renderers.
   Header, footer, cart, cursor are injected from here.
   Change them once -> every page updates.
   ============================================================ */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); };

  var NAV = [
    { href: "index.html", label: "Home" },
    { href: "shop.html", label: "Shop" },
    { href: "custom.html", label: "Custom" },
    { href: "gifts.html", label: "Gift finder" },
    { href: "about.html", label: "About" }
  ];

  /* ---------------- header ---------------- */
  function header() {
    var page = (location.pathname.split("/").pop() || "index.html");
    var links = NAV.map(function (n) {
      var cur = (n.href === page) ? ' aria-current="page"' : "";
      return '<a href="' + n.href + '"' + cur + ">" + n.label + "</a>";
    }).join("");
    var mobileLinks = NAV.map(function (n) {
      var cur = (n.href === page) ? ' aria-current="page"' : "";
      return '<a href="' + n.href + '"' + cur + ">" + n.label + "</a>";
    }).join("");
    return '' +
      '<header class="hdr"><div class="hdr__in">' +
        '<a class="brand" href="index.html" aria-label="Crochet Craft Studio — home">' +
          '<span style="color:var(--rose)">' + CCS.art.logo(36) + "</span>" +
          '<span class="brand__txt"><span class="brand__name">Crochet Craft</span><span class="brand__sub">Studio · India</span></span>' +
        "</a>" +
        '<nav class="nav" aria-label="Main">' + links + "</nav>" +
        '<div class="hdr__act">' +
          '<a class="hdr__ig-pill hide-s" href="' + CCS.IG + '" target="_blank" rel="noopener" aria-label="Instagram @crochet.craftstudio">' +
            '<span class="ig-dot"></span>' +
            '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg>' +
            '<span>@crochet.craftstudio</span>' +
          '</a>' +
          '<button class="iconbtn" id="bagBtn" aria-label="Open bag">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 8h14l-1.2 12H6.2L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>' +
            '<span class="bagcount" id="bagCount" hidden>0</span>' +
          '</button>' +
          '<button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false" aria-controls="navMobile">' +
            '<span></span><span></span><span></span>' +
          '</button>' +
        '</div>' +
      "</div></header>" +
      '<nav class="nav-mobile" id="navMobile" aria-label="Mobile navigation">' +
        mobileLinks +
        '<div class="nav-mobile__sub">' +
          '<a href="' + CCS.IG + '" target="_blank" rel="noopener">@crochet.craftstudio</a>' +
          '<a href="https://wa.me/' + CCS.WA_NUMBER + '" target="_blank" rel="noopener">WhatsApp</a>' +
        "</div>" +
      "</nav>";
  }

  /* ---------------- footer ---------------- */
  function footer() {
    return '' +
      '<footer class="ftr"><div class="wrap">' +
        '<div class="ftr__grid">' +
          "<div>" +
            '<div class="flex center gap-2" style="color:var(--paper)">' + CCS.art.logo(30) +
              '<span class="d" style="font-size:1.5rem">Crochet Craft Studio</span></div>' +
            '<p style="color:rgba(244,237,224,.6);font-size:.88rem;max-width:30ch;margin-top:.9rem">Handmade crochet gifts that last forever. Made by Vanshita &amp; Manvi, shipped pan-India.</p>' +
            '<a class="btn btn--wa btn--sm mt-3" href="' + waHref("Hi! Site dekhi, order karna hai 🧶") + '" target="_blank" rel="noopener">Order on WhatsApp</a>' +
          "</div>" +
          "<div><h4>Shop</h4>" +
            '<a href="shop.html">All products</a><br><a href="shop.html?c=phone-cases">Phone cases</a><br><a href="shop.html?c=festive">Festive &amp; home</a><br><a href="shop.html?c=bags">Bags &amp; charms</a></div>' +
          "<div><h4>More</h4>" +
            '<a href="custom.html">Custom order</a><br><a href="gifts.html">Gift finder</a><br><a href="about.html">About us</a><br><a href="' + CCS.CHANNEL + '" target="_blank" rel="noopener">Drops channel</a></div>' +
          "<div><h4>Find us</h4>" +
            '<a href="' + CCS.IG + '" target="_blank" rel="noopener">Instagram</a><br>' +
            '<a href="' + CCS.CHANNEL + '" target="_blank" rel="noopener">WhatsApp channel</a><br>' +
            '<a href="mailto:hello@crochetcraftstudio.in">hello@crochetcraftstudio.in</a>' +
            '<p style="font-size:.72rem;color:rgba(244,237,224,.4);margin-top:.9rem;line-height:1.5">Pan-India shipping<br>Free above ₹999</p></div>' +
        "</div>" +
        '<div class="ftr__bot"><span>© ' + new Date().getFullYear() + " Crochet Craft Studio · Handmade in India</span>" +
          "<span>Prices in INR · Demo build · Made with a hook, not a template</span></div>" +
        '<div class="ftr__big" aria-hidden="true">CROCHET</div>' +
      "</div></footer>";
  }

  /* ---------------- drawer ---------------- */
  function drawer() {
    return '' +
      '<div class="scrim" id="scrim"></div>' +
      '<aside class="drawer" id="drawer" aria-label="Your bag" aria-hidden="true">' +
        '<div class="drawer__h"><div><div class="micro">Your bag</div>' +
          '<div class="d" style="font-size:1.3rem" id="drawerCount">0 items</div></div>' +
          '<button class="iconbtn" id="drawerClose" aria-label="Close bag">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
          "</button></div>" +
        '<div class="drawer__b" id="drawerBody"></div>' +
        '<div class="drawer__f" id="drawerFoot"></div>' +
      "</aside>";
  }

  /* ---------------- whatsapp ---------------- */
  function waHref(text) {
    return "https://wa.me/" + CCS.WA_NUMBER + "?text=" + encodeURIComponent(text);
  }
  function orderRef() {
    var d = new Date();
    var pad = function (n) { return ("0" + n).slice(-2); };
    return "CCS-" + String(d.getFullYear()).slice(2) + pad(d.getMonth() + 1) + pad(d.getDate()) + "-" +
      Math.random().toString(36).slice(2, 6).toUpperCase();
  }
  function orderMessage(items, ref) {
    var sub = items.reduce(function (n, i) { return n + i.price * i.qty; }, 0);
    var ship = sub >= CCS.FREE_SHIP_AT ? 0 : CCS.SHIP_FLAT;
    var total = sub + ship;
    var lines = items.map(function (i, n) {
      var extra = [];
      if (i.color) extra.push(i.color);
      if (i.model) extra.push(i.model);
      return (n + 1) + ") " + i.name + (extra.length ? " — " + extra.join(", ") : "") + " × " + i.qty + " — ₹" + (i.price * i.qty);
    }).join("\n");
    return "Hi Crochet Craft Studio! 🧶\nOrder: " + ref + "\n\n" + lines +
      "\n\nSubtotal: ₹" + sub +
      "\nShipping: " + (ship ? "₹" + ship : "FREE") +
      "\nTotal: ₹" + total +
      "\n\nName:\nPhone:\nAddress:\nPincode:\n\nNote:";
  }

  /* ---------------- cart ui ---------------- */
  function itemArt(it) {
    var p = CCS.bySlug(it.slug);
    if (!p) return "";
    return CCS.art.tile(p);
  }

  function renderCart() {
    var items = CCS.cart.read();
    var count = CCS.cart.count();
    $$("#bundleSlots .bundle__slot").forEach(function (s, i) {
      s.classList.toggle("on", i < count);
      s.textContent = i < count ? "✓" : (i + 1);
    });
    var bl = $("#bundleLeft");
    if (bl) bl.textContent = count >= 3 ? "Bundle unlocked — shipping free." : (3 - count) + " aur piece, shipping free.";
    var badge = $("#bagCount");
    if (badge) { badge.textContent = count; badge.hidden = count === 0; }
    var dc = $("#drawerCount"); if (dc) dc.textContent = count + (count === 1 ? " item" : " items");
    var body = $("#drawerBody"), foot = $("#drawerFoot");
    if (!body || !foot) return;

    if (!items.length) {
      body.innerHTML = '<div style="text-align:center;padding:3.5rem 1rem">' +
        '<div style="width:110px;margin:0 auto 1.2rem;opacity:.85">' + CCS.art.ball("#e8b8bf", "#a83e5b", "#7a1f35") + "</div>" +
        '<p class="d" style="font-size:1.3rem">Bag khaali hai,<br>dil nahi 💗</p>' +
        '<p style="font-size:.84rem;color:var(--ink-soft);margin-top:.6rem">Kuch cute sa add karo.</p>' +
        '<a class="btn mt-3" href="shop.html">Shop the drops</a></div>';
      foot.innerHTML = "";
      return;
    }

    body.innerHTML = items.map(function (it, idx) {
      return '<div class="line-item">' +
        '<div class="line-item__art">' + itemArt(it) + "</div>" +
        '<div style="flex:1"><div class="line-item__n">' + esc(it.name) + "</div>" +
          '<div class="line-item__m">' + [it.color, it.model].filter(Boolean).map(esc).join(" · ") + "</div>" +
          '<div class="flex center between"><div class="qty">' +
            '<button data-q="-" data-i="' + idx + '" aria-label="Decrease">−</button>' +
            "<span>" + it.qty + "</span>" +
            '<button data-q="+" data-i="' + idx + '" aria-label="Increase">+</button></div>' +
            '<b style="font-size:.86rem">₹' + (it.price * it.qty) + "</b></div></div>" +
        '<button data-rm="' + idx + '" aria-label="Remove" style="background:none;border:0;cursor:pointer;color:var(--ink-soft);align-self:flex-start;padding:4px">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
      "</div>";
    }).join("");

    var sub = CCS.cart.subtotal(), ship = CCS.cart.shipping(), left = CCS.FREE_SHIP_AT - sub;
    var total = sub + ship;
    var pct = Math.min(100, (sub / CCS.FREE_SHIP_AT) * 100);
    foot.innerHTML =
      '<div class="shipbar"><div class="shipbar__t"><span>' +
        (left > 0 ? "₹" + left + " aur add karo, shipping free" : "Shipping free. Tum legend ho.") +
        "</span><span>" + Math.round(pct) + "%</span></div>" +
        '<div class="shipbar__track"><div class="shipbar__fill" style="width:' + pct + '%"></div></div></div>' +
      '<div class="totals"><div><span>Subtotal</span><span>₹' + sub + "</span></div>" +
        "<div><span>Shipping</span><span>" + (ship ? "₹" + ship : "Free") + "</span></div>" +
        '<div class="grand"><span>Total</span><span>₹' + total + "</span></div></div>" +
      '<button class="btn btn--wa btn--block" id="sendOrder">' +
        '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Z"/></svg>' +
        "Send order on WhatsApp</button>" +
      '<p style="font-size:.68rem;color:var(--ink-soft);text-align:center;margin-top:.5rem">No payment gateway. Message bhejo, hum reply karenge.</p>';
  }

  function openDrawer() {
    $("#drawer").classList.add("on"); $("#scrim").classList.add("on");
    $("#drawer").setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    $("#drawerClose").focus();
  }
  function closeDrawer() {
    $("#drawer").classList.remove("on"); $("#scrim").classList.remove("on");
    $("#drawer").setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function bindCart() {
    document.addEventListener("click", function (e) {
      var add = e.target.closest("[data-add]");
      if (add) {
        e.preventDefault(); e.stopPropagation();
        var p = CCS.bySlug(add.dataset.add);
        if (!p) return;
        if (p.phone) { location.href = "product.html?p=" + p.slug; return; }
        CCS.cart.add({ slug: p.slug, name: p.name, price: p.price, color: "", model: "" });
        toast(p.name + " bag mein hai 🧶");
        openDrawer();
        return;
      }
      var t = e.target.closest("[data-q],[data-rm],#bagBtn,#drawerClose,#scrim,#sendOrder");
      if (!t) return;
      if (t.id === "bagBtn") { openDrawer(); return; }
      if (t.id === "drawerClose" || t.id === "scrim") { closeDrawer(); return; }
      if (t.dataset.q) {
        var idx = +t.dataset.i, items = CCS.cart.read();
        CCS.cart.setQty(idx, items[idx].qty + (t.dataset.q === "+" ? 1 : -1));
        return;
      }
      if (t.dataset.rm) { CCS.cart.remove(+t.dataset.rm); return; }
      if (t.id === "sendOrder") {
        var ref = orderRef();
        var msg = orderMessage(CCS.cart.read(), ref);
        window.open(waHref(msg), "_blank");
        toast("Order ready — WhatsApp pe bhej do 🧶");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDrawer();
    });
    window.addEventListener("ccs:cart", renderCart);
    window.addEventListener("storage", function (e) { if (e.key === CCS.cart.key) renderCart(); });
    try {
      var bc = new BroadcastChannel("ccs-cart");
      bc.onmessage = renderCart;
    } catch (e) {}
  }

  /* ---------------- toast ---------------- */
  function toast(msg) {
    var el = document.createElement("div");
    el.textContent = msg;
    el.style.cssText = "position:fixed;left:50%;bottom:88px;transform:translateX(-50%) translateY(10px);" +
      "background:var(--ink);color:var(--paper);padding:.7rem 1.1rem;border-radius:999px;font-size:.8rem;" +
      "font-weight:700;z-index:120;opacity:0;transition:all .35s cubic-bezier(.22,1,.36,1);box-shadow:0 16px 30px -16px rgba(0,0,0,.6);max-width:90vw;text-align:center";
    document.body.appendChild(el);
    requestAnimationFrame(function () { el.style.opacity = "1"; el.style.transform = "translateX(-50%) translateY(0)"; });
    setTimeout(function () {
      el.style.opacity = "0"; el.style.transform = "translateX(-50%) translateY(10px)";
      setTimeout(function () { el.remove(); }, 400);
    }, 2400);
  }

  /* ---------------- cursor ---------------- */
  function cursor() {
    if (window.matchMedia("(hover:none)").matches || window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    var c = document.createElement("div");
    c.className = "cursor";
    c.innerHTML = '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="9" fill="#c05b3e"/><circle cx="20" cy="20" r="9" fill="none" stroke="#7a1f35" stroke-width="1"/><path d="M12 17c4 3 11 3 16 0M13 23c4 3 11 3 15 0" stroke="#7a1f35" stroke-width=".9" fill="none"/></svg>';
    document.body.appendChild(c);
    var x = 0, y = 0, cx = 0, cy = 0;
    window.addEventListener("mousemove", function (e) { x = e.clientX; y = e.clientY; c.style.opacity = "1"; });
    (function loop() {
      cx += (x - cx) * 0.16; cy += (y - cy) * 0.16;
      c.style.transform = "translate3d(" + (cx - 13) + "px," + (cy - 13) + "px,0)";
      requestAnimationFrame(loop);
    })();
  }

  /* ---------------- product card (3D flip) ---------------- */
  function prodImg(p, extra) {
    var src = "assets/img/" + (p.img || "photo-bag.jpg");
    return '<img src="' + src + '" alt="' + esc(p.name) + '" loading="lazy" width="1000" height="1250"' +
      (extra ? " " + extra : "") + ">";
  }
  function tagCard(p) {
    var badge = "";
    if (p.drop && p.stock !== null && p.stock <= 4) badge = '<span class="badge badge--low">✦ ' + p.note + "</span>";
    else if (p.mto) badge = '<span class="badge badge--mto">✦ Made to order</span>';
    var stockTxt = p.mto ? "Made to order" : CCS.stockLabel(p);
    return '<article class="tagc" data-slug="' + p.slug + '">' +
      '<span class="tagc__thread"></span>' +
      '<div class="tagc__body">' +
        '<div class="tagc__flip">' +
          '<div class="tagc__face tagc__front"><div class="tagc__art">' + badge +
            '<span class="tagc__hole"></span>' + prodImg(p) +
            '<span class="tagc__tint" style="--tint:' + p.c1 + '"></span></div></div>' +
          '<div class="tagc__face tagc__back">' +
            '<div><div class="micro" style="color:#C59B27">✦ ' + catLabel(p.cat) + "</div>" +
              '<div class="b-name">' + esc(p.name) + "</div>" +
              '<p class="b-desc">' + esc(p.desc) + "</p></div>" +
            "<div><div class=\"b-price\">₹" + p.price + "</div>" +
              '<button class="btn btn--sm btn--block mt-1" data-add="' + p.slug + '">Add to bag</button>' +
              '<a class="link-u" style="font-size:.72rem;margin-top:.5rem;display:inline-block;color:var(--paper)" href="product.html?p=' +
              p.slug + '">Full details →</a></div>' +
          "</div>" +
        "</div>" +
        '<div class="tagc__meta">' +
          '<div class="tagc__catrow"><span class="tagc__cat">' + catLabel(p.cat) + '</span><span class="tagc__stock">' + stockTxt + '</span></div>' +
          '<h3 class="tagc__name">' + esc(p.name) + '</h3>' +
          '<div class="tagc__row">' +
            '<span class="tagc__price">₹' + p.price + '</span>' +
            '<button class="tagc__quickadd" data-add="' + p.slug + '">+ Bag</button>' +
          '</div>' +
        '</div>' +
      "</div></article>";
  }
  function catLabel(id) {
    var c = CCS.categories.find(function (x) { return x.id === id; });
    return c ? c.label : id;
  }

  /* ---------------- HOME ---------------- */
  function pageHome() {
    // 3D Shahi Automatic Showcase
    var shahi = $("#shahiTrack");
    if (shahi) {
      var drops = CCS.products.filter(function (p) { return p.drop; });
      if (drops.length < 6) {
        drops = drops.concat(CCS.products.filter(function (p) { return !p.drop; }).slice(0, 6 - drops.length));
      }
      var renderShahi = function (p) {
        var note = p.note || (p.mto ? "Made to order" : "Shahi Edition");
        return '<article class="shahi-card" data-slug="' + p.slug + '">' +
          '<div class="shahi-card__arch"></div>' +
          '<div class="shahi-card__body">' +
            '<div class="shahi-card__badge">✦ ' + esc(note) + '</div>' +
            '<div class="shahi-card__art">' + prodImg(p) + '</div>' +
            '<div class="shahi-card__meta">' +
              '<span class="shahi-card__cat">' + catLabel(p.cat) + '</span>' +
              '<h3 class="shahi-card__name">' + esc(p.name) + '</h3>' +
              '<div class="shahi-card__foot">' +
                '<span class="shahi-card__price">₹' + p.price + '</span>' +
                '<button class="tagc__quickadd btn--shahi" data-add="' + p.slug + '">+ Bag</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</article>';
      };
      // Duplicate array for seamless infinite auto-scroll loop
      shahi.innerHTML = drops.concat(drops).map(renderShahi).join("");

      var isPaused = false;
      var scrollStep = 0.9;
      shahi.addEventListener("mouseenter", function () { isPaused = true; });
      shahi.addEventListener("mouseleave", function () { isPaused = false; });
      shahi.addEventListener("touchstart", function () { isPaused = true; }, { passive: true });
      shahi.addEventListener("touchend", function () { isPaused = false; });

      var autoGlide = function () {
        if (!isPaused) {
          shahi.scrollLeft += scrollStep;
          if (shahi.scrollLeft >= (shahi.scrollWidth / 2)) {
            shahi.scrollLeft = 0;
          }
        }
        requestAnimationFrame(autoGlide);
      };
      requestAnimationFrame(autoGlide);

      var pBtn = $("#shahiPrev"), nBtn = $("#shahiNext");
      if (pBtn) pBtn.addEventListener("click", function () { shahi.scrollBy({ left: -320, behavior: "smooth" }); });
      if (nBtn) nBtn.addEventListener("click", function () { shahi.scrollBy({ left: 320, behavior: "smooth" }); });
    }

    var feat = $("#featured");
    if (feat) {
      function renderFeat(cat) {
        var prods = (cat === "all" || !cat)
          ? CCS.products.slice(0, 4)
          : CCS.products.filter(function(p){ return p.cat === cat; }).slice(0, 4);
        if (prods.length === 0) prods = CCS.products.slice(0, 4);
        feat.innerHTML = prods.map(tagCard).join("");
        document.dispatchEvent(new CustomEvent('ccs:rendered'));
      }
      renderFeat("all");

      var tabs = document.querySelectorAll(".curated-tabs .ctab");
      tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
          tabs.forEach(function (t) { t.classList.remove("is-active"); });
          tab.classList.add("is-active");
          renderFeat(tab.dataset.cat);
        });
      });
    }

    var occ = $("#occRail");
    if (occ) {
      var active = CCS.activeOccasion();
      var occIcons = { rakhi:"🧶", diwali:"🪔", navratri:"🌸", valentines:"💌", birthday:"🎁", "just-because":"✨" };
      occ.innerHTML = CCS.occasions.map(function (o, i) {
        return '<a class="occard' + (o.id === active ? " occard--on" : "") + '" href="shop.html?o=' + o.id + '">' +
          '<span class="occard__icon">' + (occIcons[o.id] || "✦") + "</span>" +
          '<span class="occard__sub">' + (o.id === active ? "✦ Abhi" : "Occasion") + "</span>" +
          '<span class="occard__t">' + o.label + '<br><span style="font-size:.72rem;font-family:var(--sans);font-weight:500;opacity:.65">' + o.sub + "</span></span>" +
          '<span class="occard__n">0' + (i + 1) + "</span></a>";
      }).join("");
    }

    var ig = $("#igGrid");
    if (ig) {
      var tiles = [
        { img: "assets/img/p-mini-rose-bag.jpg", l: "mini rose bag" },
        { img: "assets/img/photo-flower.jpg", l: "blush season" },
        { img: "assets/img/p-sunflower-phone-case.jpg", l: "sunflower case" },
        { img: "assets/img/photo-yarn.jpg", l: "yarn wall" },
        { img: "assets/img/p-krishna-amigurumi.jpg", l: "chhota kanha" },
        { img: "assets/img/photo-hands.jpg", l: "in the making" },
        { img: "assets/img/p-butterfly-bag.jpg", l: "butterfly bag" },
        { img: "assets/img/photo-hooks.jpg", l: "the tools" }
      ];
      ig.innerHTML = tiles.map(function (t) {
        return '<a class="igtile" href="' + CCS.IG + '" target="_blank" rel="noopener" aria-label="' + t.l + ' — Instagram">' +
          '<img src="' + t.img + '" alt="' + t.l + '" loading="lazy" width="600" height="600">' +
          '</a>';
      }).join("");
      document.dispatchEvent(new CustomEvent("ccs:rendered"));
    }

    // hero tags
    var ht = $("#heroTags");
    if (ht) {
      var picks = [CCS.products[0], CCS.products[1], CCS.products[15]];
      ht.innerHTML = picks.map(function (p) {
        return '<div class="htag"><div class="htag__art">' + prodImg(p) + "</div>" +
          '<div class="htag__t">' + esc(p.name) + '</div><div class="htag__p">₹' + p.price + "</div></div>";
      }).join("");
    }
    var ball = $("#heroBall");
    if (ball) ball.innerHTML = CCS.art.ball("#c05b3e", "#7a1f35", "#e9a13b");

    var tease = $("#teasePreview");
    if (tease) tease.innerHTML = '<div class="tease"><img src="assets/img/p-mini-rose-bag.jpg" alt="Blush pink mini rose bag preview">' +
      '<span class="tease__tint" style="background:#e8b8bf"></span>' +
      '<span class="tease__tag">Blush pink · Bag</span></div>';
    var ab = $("#aboutBall");
    if (ab) ab.innerHTML = CCS.art.ball("#c05b3e", "#7a1f35", "#e9a13b");
  }

  /* ---------------- SHOP ---------------- */
  function pageShop() {
    var params = new URLSearchParams(location.search);
    var state = { c: params.get("c") || "all", o: params.get("o") || "all" };
    var bar = $("#shopFilters"), grid = $("#shopGrid");

    function chips() {
      return CCS.categories.map(function (c) {
        var n = c.id === "all" ? CCS.products.length : CCS.products.filter(function (p) { return p.cat === c.id; }).length;
        return '<button class="chip" data-c="' + c.id + '" aria-pressed="' + (state.c === c.id) + '">' + c.label +
          '<span class="chip__n">' + n + "</span></button>";
      }).join("") +
        '<span style="width:1px;height:22px;background:rgba(30,23,20,.15);flex:0 0 auto;margin-inline:.3rem"></span>' +
        CCS.occasions.map(function (o) {
          return '<button class="chip" data-o="' + o.id + '" aria-pressed="' + (state.o === o.id) + '">' + o.label + "</button>";
        }).join("");
    }

    function render() {
      var list = CCS.products.filter(function (p) {
        var okC = state.c === "all" || p.cat === state.c;
        var okO = state.o === "all" || p.occasions.indexOf(state.o) > -1;
        return okC && okO;
      });
      bar.innerHTML = chips();
      grid.innerHTML = list.length
        ? list.map(tagCard).join("")
        : '<div class="grid-empty" style="grid-column:1/-1"><h3>Yahan kuch nahi mila</h3><p>Filter hatao, ya custom order banao — hum tumhare liye bana denge.</p><a class="btn mt-3" href="custom.html">Custom order</a></div>';
      $("#resultCount").textContent = list.length + (list.length === 1 ? " piece" : " pieces");
      var u = new URLSearchParams();
      if (state.c !== "all") u.set("c", state.c);
      if (state.o !== "all") u.set("o", state.o);
      history.replaceState(null, "", location.pathname + (u.toString() ? "?" + u : ""));
    }

    bar.addEventListener("click", function (e) {
      var b = e.target.closest("[data-c],[data-o]");
      if (!b) return;
      if (b.dataset.c) state.c = b.dataset.c;
      if (b.dataset.o) state.o = b.dataset.o;
      render();
    });
    render();
  }

  /* ---------------- PDP ---------------- */
  function pagePdp() {
    var slug = new URLSearchParams(location.search).get("p");
    var p = CCS.bySlug(slug) || CCS.products[0];
    document.title = p.name + " — Crochet Craft Studio";

    var src = "assets/img/" + (p.img || "photo-bag.jpg");
    var views = [
      '<img class="pdp__img" src="' + src + '" alt="' + esc(p.name) + '" width="1000" height="1250">',
      '<div class="pdp__zoom"><img src="' + src + '" alt="' + esc(p.name) + ' — stitch detail" width="1000" height="1250"></div>',
      '<div class="pdp__tintwrap"><img src="' + src + '" alt="" width="1000" height="1250">' +
        '<span class="pdp__tint" style="background:' + p.c1 + '"></span>' +
        '<span class="pdp__tintlbl">colourway · ' + esc(p.name.split(" ")[0].toLowerCase()) + "</span></div>"
    ];

    $("#pdpArt").innerHTML = views[0];
    $("#pdpThumbs").innerHTML = views.map(function (v, i) {
      return '<button class="pdp__thumb" data-v="' + i + '" aria-pressed="' + (i === 0) + '" aria-label="View ' + (i + 1) + '">' + v + "</button>";
    }).join("");
    $("#pdpThumbs").addEventListener("click", function (e) {
      var b = e.target.closest("[data-v]"); if (!b) return;
      $$("[data-v]").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
      b.setAttribute("aria-pressed", "true");
      $("#pdpArt").innerHTML = views[+b.dataset.v];
    });

    $("#pdpName").textContent = p.name;
    if (p.nameHi) $("#pdpNameHi").textContent = p.nameHi;
    $("#pdpDesc").textContent = p.desc;
    $("#pdpPrice").innerHTML = "₹" + p.price + (p.was ? "<s>₹" + p.was + "</s>" : "");
    $("#pdpCat").textContent = catLabel(p.cat);
    $("#pdpStock").textContent = CCS.stockLabel(p);
    $("#pdpStock").style.color = p.stock !== null && p.stock <= 3 ? "var(--rose)" : "var(--ink)";
    $("#pdpShip").textContent = p.price >= CCS.FREE_SHIP_AT ? "Free" : "₹" + CCS.SHIP_FLAT + " (free above ₹999)";

    var modelWrap = $("#pdpModel");
    if (p.phone) {
      modelWrap.hidden = false;
      $("#pdpModelSel").innerHTML = '<option value="">Select model</option>' +
        ["iPhone 11", "iPhone 12/13", "iPhone 14", "iPhone 15", "iPhone 16", "OnePlus Nord CE", "Samsung A54", "Other (mention in note)"]
          .map(function (m) { return "<option>" + m + "</option>"; }).join("");
    }

    $("#pdpAdd").addEventListener("click", function () {
      var model = p.phone ? $("#pdpModelSel").value : "";
      if (p.phone && !model) {
        modelWrap.classList.add("invalid");
        $("#pdpModelErr").style.display = "block";
        $("#pdpModelSel").focus();
        return;
      }
      CCS.cart.add({ slug: p.slug, name: p.name, price: p.price, color: "", model: model });
      toast("Bag mein add ho gaya 🧶");
      openDrawer();
    });

    // JSON-LD
    var ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org", "@type": "Product",
      name: p.name, description: p.desc, brand: { "@type": "Brand", name: "Crochet Craft Studio" },
      offers: { "@type": "Offer", priceCurrency: "INR", price: p.price, availability: p.stock === 0 ? "https://schema.org/OutOfStock" : "https://schema.org/InStock" }
    });
    document.head.appendChild(ld);

    var related = CCS.products.filter(function (x) { return x.cat === p.cat && x.slug !== p.slug; }).slice(0, 4);
    $("#pdpRelated").innerHTML = related.length ? related.map(tagCard).join("") : CCS.products.slice(0, 4).map(tagCard).join("");
  }

  /* ---------------- BUILDER ---------------- */
  function pageCustom() {
    var state = { kind: "bag", color: "#e8b8bf", model: "", note: "", qty: 1 };
    var KINDS = [
      { k: "bag", l: "Bag" }, { k: "charm", l: "Keychain" }, { k: "case", l: "Phone case" },
      { k: "scrunchie", l: "Scrunchie" }, { k: "clip", l: "Hair clip" }, { k: "doll", l: "Amigurumi" },
      { k: "hanging", l: "Home decor" }, { k: "pouch", l: "Pouch" }
    ];
    var COLORS = [
      { n: "Blush pink", h: "#e8b8bf" }, { n: "Burgundy", h: "#7a1f35" }, { n: "Cream", h: "#efe3cc" },
      { n: "Sunflower", h: "#e9a13b" }, { n: "Sage", h: "#7f9070" }, { n: "Terracotta", h: "#c05b3e" },
      { n: "Ink", h: "#2b211c" }, { n: "Pearl", h: "#e9e2d4" }
    ];

    $("#bldKinds").innerHTML = KINDS.map(function (o) {
      return '<button class="opt" data-k="' + o.k + '" aria-pressed="' + (o.k === state.kind) + '">' + o.l + "</button>";
    }).join("");
    $("#bldColors").innerHTML = COLORS.map(function (c) {
      return '<button class="sw" data-h="' + c.h + '" data-n="' + c.n + '" role="radio" aria-checked="' + (c.h === state.color) +
        '" style="background:' + c.h + '" title="' + c.n + '" aria-label="' + c.n + '"></button>';
    }).join("");
    $("#bldColorName").textContent = COLORS[0].n;

    var KIND_IMG = {
      bag: "p-mini-rose-bag.jpg", charm: "p-bag-charm.jpg", case: "p-bow-phone-case.jpg",
      scrunchie: "p-scrunchie.jpg", clip: "p-lotus-hair-clip.jpg", doll: "p-krishna-amigurumi.jpg",
      hanging: "p-shubh-labh-hanging.jpg", pouch: "p-pouch.jpg"
    };

    function draw() {
      var img = KIND_IMG[state.kind] || "p-mini-rose-bag.jpg";
      $("#bldPreview").innerHTML = '<div class="tease tease--live">' +
        '<img src="assets/img/' + img + '" alt="Live preview of your custom piece">' +
        '<span class="tease__tint" style="background:' + state.color + '"></span>' +
        '<span class="tease__sw" style="background:' + state.color + '"></span></div>';
      $("#bldLabel").textContent = (KINDS.find(function (x) { return x.k === state.kind; }) || {}).l + " · " +
        ($("#bldColorName").textContent);
      var isCase = state.kind === "case";
      $("#bldModelStep").hidden = !isCase;
      $("#bldNote").value = state.note;
      $("#bldQty").value = state.qty;
      $("#bldWa").disabled = isCase && !state.model;
      $("#bldWa").style.opacity = (isCase && !state.model) ? ".5" : "1";
      $("#bldGate").hidden = !(isCase && !state.model);

      var s1 = $("#progStep1"), s2 = $("#progStep2"), s3 = $("#progStep3"), s4 = $("#progStep4");
      if (s1 && s2 && s3 && s4) {
        s1.classList.toggle("done", !!state.kind);
        s2.classList.toggle("active", !!state.kind);
        s2.classList.toggle("done", !!state.color);
        s3.classList.toggle("active", !!state.color);
        var ready = !isCase || !!state.model;
        s3.classList.toggle("done", ready);
        s4.classList.toggle("active", ready);
      }
    }

    $("#bldKinds").addEventListener("click", function (e) {
      var b = e.target.closest("[data-k]"); if (!b) return;
      state.kind = b.dataset.k;
      $$("#bldKinds .opt").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
      b.setAttribute("aria-pressed", "true");
      draw();
    });
    $("#bldColors").addEventListener("click", function (e) {
      var b = e.target.closest("[data-h]"); if (!b) return;
      state.color = b.dataset.h;
      $$("#bldColors .sw").forEach(function (x) { x.setAttribute("aria-checked", "false"); });
      b.setAttribute("aria-checked", "true");
      $("#bldColorName").textContent = b.dataset.n;
      draw();
    });
    $("#bldModelSel").addEventListener("change", function (e) {
      state.model = e.target.value;
      $("#bldModelStep").classList.toggle("invalid", !state.model);
      draw();
    });
    $("#bldNote").addEventListener("input", function (e) { state.note = e.target.value; });
    $("#bldQty").addEventListener("change", function (e) { state.qty = Math.max(1, +e.target.value || 1); });

    $("#bldWa").addEventListener("click", function () {
      if (state.kind === "case" && !state.model) return;
      var kindLabel = (KINDS.find(function (x) { return x.k === state.kind; }) || {}).l;
      var msg = "Hi Crochet Craft Studio! 🧶\nCustom order:\n\nItem: " + kindLabel +
        "\nColour: " + $("#bldColorName").textContent + "\nQty: " + state.qty +
        (state.model ? "\nPhone model: " + state.model : "") +
        (state.note ? "\nNote: " + state.note : "") +
        "\n\nReference photo bhejna chahunga. Price aur timeline bata do?";
      window.open(waHref(msg), "_blank");
    });

    $("#bldAdd").addEventListener("click", function () {
      if (state.kind === "case" && !state.model) { $("#bldGate").hidden = false; return; }
      var kindLabel = (KINDS.find(function (x) { return x.k === state.kind; }) || {}).l;
      CCS.cart.add({
        slug: "custom-" + state.kind,
        name: "Custom " + kindLabel,
        price: 299,
        color: $("#bldColorName").textContent,
        model: state.model
      });
      toast("Custom piece bag mein add ho gaya");
      openDrawer();
    });

    draw();
  }

  /* ---------------- GIFT FINDER ---------------- */
  function pageGifts() {
    var answers = { who: "", budget: "", vibe: "" };
    var labels = { who: "", budget: "", vibe: "" };
    var steps = $$(".quiz__q");
    var idx = 0;

    var LOOK = {
      who: {
        gf: ["p-mini-rose-bag", "Mini Rose Bag", "Blush, pearl chain. ₹129."],
        behen: ["p-rakhi-hamper", "Rakhi Hamper", "Rakhi + keychain + note. ₹599."],
        bhai: ["p-rakhi", "Handmade Rakhi", "Haath se, bhai ke liye. ₹149."],
        dost: ["p-keychain", "Keychain", "Chhota gift, hamesha yaad. ₹149."],
        mom: ["p-diya-stand", "Diya Stand", "Ghar ke liye, festive ke liye. ₹249."],
        self: ["p-crochet-top", "Crochet Top", "Custom fit, custom colour. ₹899."]
      },
      budget: {
        low: ["p-scrunchie", "Scrunchie", "₹250 ke andar sab kuch."],
        mid: ["p-pouch", "Pouch", "₹250–450 · the sweet spot."],
        high: ["p-rakhi-hamper", "Rakhi Hamper", "₹450+ · hamper territory."]
      },
      vibe: {
        wear: ["p-crochet-top", "Crochet Top", "Pehna jaaye — bag, clip, top."],
        decor: ["p-shubh-labh-hanging", "Shubh-Labh Hanging", "Ghar sajaye — diya, hanging."],
        gift: ["p-bag-charm", "Bag Charm", "Bas gift lage — keychain, rakhi."]
      }
    };

    function chipHtml() {
      var order = [["who", "Kiske liye?"], ["budget", "Budget?"], ["vibe", "Vibe?"]];
      return order.map(function (o) {
        var on = !!labels[o[0]];
        return '<span class="gift__chip' + (on ? " on" : "") + '">' + (on ? labels[o[0]] : o[1]) + "</span>";
      }).join("");
    }

    function showLook(q, v) {
      var item = LOOK[q] && LOOK[q][v];
      if (!item) return;
      var art = $("#giftArt");
      if (art) art.innerHTML = '<img src="assets/img/' + item[0] + '.jpg" alt="' + item[1] + '" width="1000" height="1250">';
      if ($("#giftTitle")) $("#giftTitle").textContent = item[1];
      if ($("#giftSub")) $("#giftSub").textContent = item[2];
      if ($("#giftChips")) $("#giftChips").innerHTML = chipHtml();
      var n = q === "who" ? 2 : q === "budget" ? 3 : 3;
      if ($("#giftStep")) $("#giftStep").textContent = n >= 3 ? "Last sawaal" : "Sawaal " + n + " / 3";
    }

    function show(n) {
      idx = n;
      steps.forEach(function (s, i) { s.classList.toggle("on", i === n); });
      $$(".quiz__prog i").forEach(function (p, i) { p.classList.toggle("on", i <= n); });
      if ($("#giftStep") && !answers.who) $("#giftStep").textContent = "Sawaal " + (n + 1) + " / 3";
    }
    function pick() {
      var max = answers.budget === "low" ? 250 : answers.budget === "mid" ? 450 : 1200;
      var pool = CCS.products.filter(function (p) { return p.price <= max; });
      var scored = pool.map(function (p) {
        var s = 0;
        if (answers.vibe === "gift" && p.drop) s += 2;
        if (answers.vibe === "decor" && p.cat === "festive") s += 3;
        if (answers.vibe === "wear" && (p.cat === "bags" || p.cat === "hair" || p.cat === "wearables")) s += 2;
        if (answers.who === "bhai" && p.occasions.indexOf("rakhi") > -1) s += 3;
        if (answers.who === "gf" && p.occasions.indexOf("valentines") > -1) s += 2;
        s += p.price > max * 0.6 ? 1 : 0;
        return { p: p, s: s };
      }).sort(function (a, b) { return b.s - a.s; }).slice(0, 3);

      $("#giftResults").innerHTML =
        '<div class="shead"><div class="shead__l"><div class="shead__k"><i></i><span class="micro">Your three</span></div>' +
        '<h2 class="d h2">Ye le lo.</h2><p class="lede">Tumhare answers ke hisaab se — aur haan, sab ₹' + max + " ke andar.</p></div>" +
        '<button class="btn btn--ghost btn--sm" id="giftReset">Phir se</button></div>' +
        '<div class="tags tags--tight">' + scored.map(function (x) { return tagCard(x.p); }).join("") + "</div>";
      $("#giftResults").hidden = false;
      $("#quizWrap").hidden = true;
      if ($("#giftChips")) $("#giftChips").innerHTML = chipHtml();
      if (window.CCS && window.CCS.confetti) window.CCS.confetti($("#giftResults"));
      document.dispatchEvent(new CustomEvent("ccs:rendered"));
      $("#giftReset").addEventListener("click", function () {
        answers = { who: "", budget: "", vibe: "" };
        labels = { who: "", budget: "", vibe: "" };
        $("#giftResults").hidden = true; $("#quizWrap").hidden = false;
        if ($("#giftChips")) $("#giftChips").innerHTML = chipHtml();
        show(0);
      });
    }

    $$(".qopt").forEach(function (b) {
      b.addEventListener("click", function () {
        answers[b.dataset.q] = b.dataset.v;
        labels[b.dataset.q] = (b.childNodes[0].textContent || "").trim();
        showLook(b.dataset.q, b.dataset.v);
        if (idx < 2) show(idx + 1); else pick();
      });
    });

    var pop = $("#giftPopular");
    if (pop) pop.innerHTML = ["mini-rose-bag", "rakhi-hamper", "keychain", "crochet-top"]
      .map(function (s) { return tagCard(CCS.bySlug(s)); }).join("");

    show(0);
    if ($("#giftChips")) $("#giftChips").innerHTML = chipHtml();
  }

  /* ---------------- interactions: 3D, reveal, parallax ---------------- */
  function interactions() {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;

    // flip a product tag by tap on touch devices
    document.addEventListener("click", function (e) {
      var card = e.target.closest(".tagc");
      if (!card || fine) return;
      if (e.target.closest("a,button")) return;
      card.classList.toggle("flipped");
    });

    // hero collage: pointer-driven 3D, no idle motion
    var art = $(".hero__art"), collage = $(".hero__collage");
    if (art && collage && fine && !reduce) {
      var tx = 0, ty = 0, cx = 0, cy = 0, running = false;
      var loop = function () {
        cx += (tx - cx) * .08; cy += (ty - cy) * .08;
        collage.style.transform = "rotateY(" + cx.toFixed(2) + "deg) rotateX(" + cy.toFixed(2) + "deg)";
        if (Math.abs(tx - cx) > .06 || Math.abs(ty - cy) > .06) requestAnimationFrame(loop);
        else running = false;
      };
      art.addEventListener("pointermove", function (e) {
        var r = art.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width - .5) * 13;
        ty = ((e.clientY - r.top) / r.height - .5) * -9;
        if (!running) { running = true; requestAnimationFrame(loop); }
      });
      art.addEventListener("pointerleave", function () { tx = 0; ty = 0; if (!running) { running = true; requestAnimationFrame(loop); } });
    }

    // one-shot reveals
    var els = $$(".rv");
    var forceStatic = /[?&]static\b/.test(location.search);
    if (forceStatic || !("IntersectionObserver" in window) || reduce) {
      els.forEach(function (e) { e.classList.add("in"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
        });
      }, { rootMargin: "0px 0px -10% 0px", threshold: .1 });
      els.forEach(function (e) { io.observe(e); });
    }

    // gentle parallax on photographs
    var px = $$("[data-parallax]");
    if (px.length && !reduce) {
      var raf = 0;
      var upd = function () {
        raf = 0;
        px.forEach(function (el) {
          var r = el.getBoundingClientRect();
          if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
          var mid = r.top + r.height / 2 - window.innerHeight / 2;
          var amt = parseFloat(el.dataset.parallax || "14");
          el.style.transform = "translate3d(0," + (-mid * amt / 100).toFixed(2) + "px,0)";
        });
      };
      window.addEventListener("scroll", function () { if (!raf) raf = requestAnimationFrame(upd); }, { passive: true });
      upd();
    }
  }

  /* ---------------- boot ---------------- */
  function boot() {
    var page = document.body.dataset.page;
    document.body.insertAdjacentHTML("afterbegin",
      '<div class="rail" aria-hidden="true"><span class="rail__dot"></span><span class="rail__line"></span>' +
      '<span class="rail__txt">Crochet Craft Studio</span><span class="rail__line"></span>' +
      '<span class="rail__txt">Est. India</span></div>');
    document.body.insertAdjacentHTML("afterbegin", header());
    document.body.insertAdjacentHTML("beforeend", drawer() + footer());
    document.body.insertAdjacentHTML("beforeend",
      '<a class="wapill" href="' + waHref("Hi Crochet Craft Studio! 🧶 Mujhe order karna hai.") + '" target="_blank" rel="noopener">' +
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Z"/></svg>' +
      '<span class="wapill__lbl">WhatsApp</span></a>');

    bindCart();
    renderCart();
    cursor();
    interactions();

    if (page === "home") pageHome();
    if (page === "shop") pageShop();
    if (page === "pdp") pagePdp();
    if (page === "custom") pageCustom();
    if (page === "gifts") pageGifts();

    document.dispatchEvent(new CustomEvent("ccs:rendered"));
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  window.CCS.ui = { toast: toast, waHref: waHref };
})();
