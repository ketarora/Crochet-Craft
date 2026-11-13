/* =================================================================
   interactions.js — GOD TIER micro-interactions
   Scroll reveals, 3D card tilt, parallax, mobile nav, cursor,
   scroll progress bar, stitch counter, confetti, header scroll state
   ================================================================= */
(function () {
  'use strict';

  /* ───── 0. helpers ───── */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.from((r || document).querySelectorAll(s)); };
  var raf = window.requestAnimationFrame || function (fn) { setTimeout(fn, 16); };

  /* ───── 1. scroll progress bar ───── */
  var progBar = document.createElement('div');
  progBar.className = 'scroll-progress';
  progBar.innerHTML = '<div class="scroll-progress__fill" id="scrollFill"></div>';
  document.body.prepend(progBar);

  var fillEl = $('#scrollFill');
  function updateProgress() {
    var dh = document.documentElement.scrollHeight - window.innerHeight;
    var pct = dh > 0 ? (window.scrollY / dh) * 100 : 0;
    if (fillEl) fillEl.style.width = pct.toFixed(1) + '%';
  }

  /* ───── 2. header scroll state ───── */
  var hdr = $('.hdr');
  function updateHeader() {
    if (!hdr) return;
    if (window.scrollY > 48) hdr.classList.add('scrolled');
    else hdr.classList.remove('scrolled');
  }

  /* ───── 3. stitch counter ───── */
  var sc = $('#stitchCount');
  var totalStitches = 12480; // approx stitches across all 16 products
  function updateStitch() {
    if (!sc) return;
    var dh = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    var n = Math.round((window.scrollY / dh) * totalStitches);
    sc.textContent = n.toLocaleString('en-IN') + ' stitches scrolled';
    sc.style.opacity = window.scrollY > 60 ? '1' : '0';
  }

  /* ───── 4. section-linked rail progress ───── */
  function updateRailProgress() {
    var dh = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    var pct = window.scrollY / dh;
    var line = $('.rail__line');
    if (!line) return;
    var h = line.clientHeight;
    var after = line.querySelector(':after') || line;
    // move the dot via CSS variable
    line.style.setProperty('--rail-pct', pct.toFixed(3));
  }

  /* ───── 5. scroll-driven parallax ───── */
  function runParallax() {
    $$('[data-parallax]').forEach(function (el) {
      var depth = parseFloat(el.dataset.parallax) || 6;
      var rect = el.getBoundingClientRect();
      var center = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = 'translateY(' + (center * depth / 100).toFixed(2) + 'px)';
    });
  }

  /* ───── 6. CTA band Ken Burns ───── */
  function updateBand() {
    $$('.band--photo').forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('in');
      }
    });
  }

  /* combined scroll handler */
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    raf(function () {
      updateProgress();
      updateHeader();
      updateStitch();
      runParallax();
      updateBand();
      ticking = false;
    });
    ticking = true;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // init

  /* ───── 7. IntersectionObserver — reveal elements ───── */
  function reveal(entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }
  var observer = new IntersectionObserver(reveal, {
    threshold: 0.12,
    rootMargin: '0px 0px -48px 0px'
  });
  function attachReveal() {
    $$('.rv, .proc-item').forEach(function (el) { observer.observe(el); });
  }
  attachReveal();

  // also reveal .tagc (product cards with stagger)
  var cardObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        cardObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  function attachCards() {
    $$('.tags .tagc').forEach(function (el) { cardObs.observe(el); });
  }
  attachCards();

  // reveal star rating with animation
  var revObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  $$('.rev__score').forEach(function (el) { revObs.observe(el); });

  /* ───── 8. 3D tilt effect on cards ───── */
  function attachTilt(selector) {
    $$(selector).forEach(function (el) {
      el.setAttribute('data-tilt', '');
      el.addEventListener('mousemove', function (e) {
        var rect = el.getBoundingClientRect();
        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height / 2;
        var dx = (e.clientX - cx) / (rect.width / 2);
        var dy = (e.clientY - cy) / (rect.height / 2);
        el.style.setProperty('--tilt-y', (dx * 7) + 'deg');
        el.style.setProperty('--tilt-x', (-dy * 7) + 'deg');
        el.classList.add('tilt-active');
      });
      el.addEventListener('mouseleave', function () {
        el.style.setProperty('--tilt-y', '0deg');
        el.style.setProperty('--tilt-x', '0deg');
        el.classList.remove('tilt-active');
      });
    });
  }
  attachTilt('.occard');
  attachTilt('.pcard');
  attachTilt('.gift__card');
  attachTilt('.shahi-card');
  attachTilt('.tagc');

  // also re-attach after any dynamic content
  document.addEventListener('ccs:rendered', function () {
    attachReveal();
    attachCards();
    attachTilt('.occard');
    attachTilt('.shahi-card');
    attachTilt('.tagc');
    upgradeIgGrid();
  });

  /* ───── 9. custom cursor (desktop) ───── */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);

    var mx = -100, my = -100;
    var dx = -100, dy = -100;
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
    });

    function animateDot() {
      dx += (mx - dx) * 0.18;
      dy += (my - dy) * 0.18;
      dot.style.transform = 'translate3d(' + dx + 'px,' + dy + 'px,0) translate(-50%,-50%)';
      raf(animateDot);
    }
    animateDot();

    // scale cursor on interactive elements
    document.addEventListener('mouseover', function (e) {
      var t = e.target.closest('a,button,.tagc,.pcard,.occard,[data-add]');
      dot.style.transform += ' scale(' + (t ? '2.5' : '1') + ')';
      dot.style.opacity = t ? '0.6' : '0.85';
    });
  }

  /* ───── 10. mobile navigation ───── */
  function setupMobileNav() {
    var toggle = $('#navToggle');
    var mobileNav = $('#navMobile');
    if (!toggle || !mobileNav) return;

    toggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // close on link click
    $$('#navMobile a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }
  setupMobileNav();

  /* ───── 11. WhatsApp pill pulse ───── */
  var wapill = $('.wapill');
  if (wapill) {
    setTimeout(function () {
      wapill.classList.add('pulse');
      setTimeout(function () { wapill.classList.remove('pulse'); }, 7000);
    }, 2500);
  }

  /* ───── 12. hero count-up numbers ───── */
  function countUp(el, target, duration) {
    var start = 0;
    var step = target / (duration / 16);
    var timer = setInterval(function () {
      start += step;
      if (start >= target) { start = target; clearInterval(timer); }
      el.textContent = Math.round(start);
    }, 16);
  }
  var factsObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      $$('.hero__fact b', entry.target).forEach(function (b) {
        var n = parseInt(b.textContent, 10);
        if (!isNaN(n) && n > 0) countUp(b, n, 1200);
      });
      factsObs.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  var facts = $('.hero__facts');
  if (facts) factsObs.observe(facts);

  /* ───── 13. FAQ smooth open/close ───── */
  $$('.faq details').forEach(function (det) {
    det.addEventListener('toggle', function () {
      var p = $('p', det);
      if (!p) return;
      if (det.open) {
        p.style.maxHeight = '0';
        p.style.overflow = 'hidden';
        p.style.transition = 'max-height .4s var(--ease)';
        raf(function () { p.style.maxHeight = p.scrollHeight + 'px'; });
      } else {
        p.style.maxHeight = '0';
      }
    });
  });

  /* ───── 14. IG grid hover overlay inject ───── */
  function upgradeIgGrid() {
    $$('.igtile').forEach(function (tile) {
      if (tile.querySelector('.igtile__over')) return;
      var over = document.createElement('div');
      over.className = 'igtile__over';
      over.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">' +
          '<rect x="3" y="3" width="18" height="18" rx="5"/>' +
          '<circle cx="12" cy="12" r="4"/>' +
          '<circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>' +
        '</svg>' +
        '<span>View on IG</span>';
      tile.appendChild(over);
    });
  }
  document.addEventListener('ccs:rendered', upgradeIgGrid);
  upgradeIgGrid();

  /* ───── 15. page link fade-out ───── */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel') || a.target === '_blank') return;
    e.preventDefault();
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity .28s';
    setTimeout(function () { window.location.href = href; }, 290);
  });

  /* ───── 16. ?static param — show all rv ───── */
  if (window.location.search.includes('static')) {
    document.body.classList.add('static');
  }

  /* ───── 17. bundle slot live update ───── */
  window.addEventListener('ccs:cart', function () {
    var count = CCS.cart.count();
    $$('.bundle__slot').forEach(function (s, i) {
      s.classList.toggle('on', i < count);
      s.textContent = i < count ? '✓' : (i + 1);
    });
    var bl = $('#bundleLeft');
    if (bl) bl.textContent = count >= 3 ? 'Bundle unlocked — shipping free! 🎉' : (3 - count) + ' aur piece, shipping free.';
  });

  /* ───── 18. BroadcastChannel cart sync ───── */
  try {
    var bc = new BroadcastChannel('ccs-cart');
    bc.onmessage = function (e) {
      window.dispatchEvent(new CustomEvent('ccs:cart', { detail: e.data }));
    };
  } catch (e) {}

  /* ───── 19. confetti burst ───── */
  window.CCS = window.CCS || {};
  window.CCS.confetti = function (el) {
    var colors = ['#8b1f35','#b84f30','#c97d14','#4a5e42','#c2919a'];
    for (var i = 0; i < 20; i++) {
      (function (i) {
        var c = document.createElement('div');
        c.className = 'conf';
        c.style.cssText = [
          'width:' + (4 + Math.random() * 6) + 'px',
          'height:' + (4 + Math.random() * 6) + 'px',
          'background:' + colors[Math.floor(Math.random() * colors.length)],
          'left:' + (20 + Math.random() * 60) + '%',
          'top:' + (10 + Math.random() * 20) + '%',
          'position:absolute',
          'z-index:99',
          'animation-delay:' + (Math.random() * .3) + 's'
        ].join(';');
        el.appendChild(c);
        setTimeout(function () { c.remove(); }, 1200);
      })(i);
    }
  };

  /* ───── 20. smooth FAQ icon toggle ───── */
  $$('.faq summary').forEach(function (s) {
    s.addEventListener('click', function () {
      var det = s.parentElement;
      $$('.faq details').forEach(function (d) {
        if (d !== det && d.open) d.removeAttribute('open');
      });
    });
  });

  /* dispatch ready */
  document.dispatchEvent(new CustomEvent('ccs:interactions:ready'));

})();

/* ─── ADDITION: more micro-interactions ─── */
(function () {
  /* Back to top button */
  var btn = document.createElement('button');
  btn.className = 'back-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>';
  document.body.appendChild(btn);
  btn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  window.addEventListener('scroll', function () {
    btn.classList.toggle('show', window.scrollY > 600);
  }, { passive: true });

  /* Stitch line dividers — inject between major sections */
  document.querySelectorAll('.sec + .sec, .sec-tight + .sec, .sec + .sec-tight').forEach(function (el) {
    // only inject if section doesn't follow a dark section
    var prev = el.previousElementSibling;
    if (prev && prev.classList.contains('dark')) return;
    if (prev && prev.classList.contains('band')) return;
  });
})();
