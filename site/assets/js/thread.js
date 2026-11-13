/* ============================================================
   The signature: one continuous chain-stitch that draws as you
   scroll, counts itself, and closes into a rose at the end.
   Vanilla. No GSAP. One rAF. One style write per frame.
   ============================================================ */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  var NS = "http://www.w3.org/2000/svg";
  var svg, chain, rose, counterEl, docH = 0, W = 0, VH = 0;
  var totalLen = 0, stitches = 0;

  function el(name, attrs) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  /* one chain link, hanging from (x,y) */
  function link(x, y, w, h) {
    return "M" + (x - w) + "," + y +
      " C" + (x - w * 2.05) + "," + (y + h * 0.42) +
      " " + (x - w * 1.55) + "," + (y + h * 1.05) +
      " " + x + "," + (y + h) +
      " C" + (x + w * 1.55) + "," + (y + h * 0.92) +
      " " + (x + w * 2.0) + "," + (y + h * 0.26) +
      " " + (x + w) + "," + y + " ";
  }

  function rosePath(cx, cy, turns, rMax) {
    var d = "", steps = turns * 44;
    for (var i = 0; i <= steps; i++) {
      var t = i / steps;
      var a = t * Math.PI * 2 * turns;
      var r = 6 + (rMax - 6) * t;
      var x = cx + Math.cos(a) * r;
      var y = cy + Math.sin(a) * r * 0.82;
      d += (i === 0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1) + " ";
    }
    // two petal arcs so it reads as a rose, not a snail
    for (var k = 0; k < 3; k++) {
      var b = (k / 3) * Math.PI * 2 + 0.6;
      var px = cx + Math.cos(b) * rMax * 0.72;
      var py = cy + Math.sin(b) * rMax * 0.6;
      d += "M" + px.toFixed(1) + "," + py.toFixed(1) +
        " c" + (rMax * 0.3) + ",-" + (rMax * 0.22) + " " + (rMax * 0.46) + "," + (rMax * 0.2) + " " + (rMax * 0.14) + "," + (rMax * 0.38) + " ";
    }
    return d;
  }

  function build() {
    W = window.innerWidth;
    VH = window.innerHeight;
    docH = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

    var mobile = W < 760;
    var baseX = mobile ? 16 : 30;
    var amp = mobile ? 5 : 20;
    var pitch = mobile ? 15 : 17;
    var h = mobile ? 20 : 24;
    var w = mobile ? 6.5 : 8.5;

    var d = "";
    stitches = 0;
    for (var y = 40; y < docH - 120; y += pitch) {
      var t = y / docH;
      var x = baseX + Math.sin(t * Math.PI * 2 * 2.4) * amp;
      d += link(x, y, w, h);
      stitches++;
    }

    // terminal rose, bottom centre
    var rx = W * 0.5, ry = docH - 150;
    var roseD = rosePath(rx, ry, 4, mobile ? 34 : 52);

    if (!svg) {
      svg = el("svg", { id: "thread", "aria-hidden": "true" });
      document.body.appendChild(svg);
      chain = el("path", { fill: "none", stroke: "var(--thread)", "stroke-width": mobile ? 1.6 : 2.2, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: mobile ? ".55" : ".75" });
      rose = el("path", { fill: "none", stroke: "var(--rose)", "stroke-width": mobile ? 1.8 : 2.6, "stroke-linecap": "round", opacity: "0" });
      svg.appendChild(chain);
      svg.appendChild(rose);
    }
    svg.setAttribute("viewBox", "0 0 " + W + " " + VH);
    chain.setAttribute("d", d);
    rose.setAttribute("d", roseD);

    totalLen = chain.getTotalLength();
    chain.style.strokeDasharray = totalLen;
    chain.style.strokeDashoffset = totalLen;
    rose.style.strokeDasharray = rose.getTotalLength();
    rose.style.strokeDashoffset = rose.getTotalLength();
    tick(true);
  }

  var last = -1;
  function tick(force) {
    var y = window.scrollY || window.pageYOffset;
    var max = Math.max(1, docH - VH);
    var p = Math.min(1, Math.max(0, y / max));
    if (!force && Math.abs(p - last) < 0.0004) return;
    last = p;

    chain.style.strokeDashoffset = totalLen * (1 - p);

    // rose closes in the last 10%
    var rp = Math.max(0, (p - 0.9) / 0.1);
    rose.style.opacity = String(Math.min(0.95, rp));
    rose.style.strokeDashoffset = rose.getTotalLength() * (1 - Math.min(1, rp * 1.15));

    if (counterEl) {
      var cur = Math.round(p * stitches);
      counterEl.textContent = "stitch " + ("0000" + cur).slice(-4) + " / " + ("0000" + stitches).slice(-4);
      counterEl.style.opacity = p > 0.02 && p < 0.97 ? "1" : "0";
    }
  }

  var raf = 0;
  function onScroll() {
    if (raf) return;
    raf = requestAnimationFrame(function () { raf = 0; tick(false); });
  }

  function init() {
    counterEl = document.createElement("div");
    counterEl.id = "stitchCount";
    counterEl.setAttribute("aria-hidden", "true");
    document.body.appendChild(counterEl);
    build();
    window.addEventListener("scroll", onScroll, { passive: true });
    var rt;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(build, 220);
    });
    // fonts change document height
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { setTimeout(build, 60); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
