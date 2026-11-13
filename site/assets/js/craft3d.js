/* ==========================================================================
   craft3d.js — LUXURY 3D CRAFT & INTERACTION SUITE
   1. 3D Holographic Card Tilt & Specular Sheen (60fps)
   2. 3D Floating Crochet Flowers & Granny Motifs (Parallax & Depth)
   3. "Pull The Dhaaga" 3D Cord with Royal Tohfa Unravel & Theme Switch
   4. Live Magic Yarn Swatch Studio (Live Colorway Lab)
   ========================================================================== */

(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;
  var isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  /* ─────────────────────────────────────────────────────────
     1. SUBTLE 3D HOLOGRAPHIC CARD TILT & SPECULAR SHEEN
     ───────────────────────────────────────────────────────── */
  function init3DCardPhysics() {
    var cards = document.querySelectorAll('.tagc, .shahi-card, .occard, .pcard, .gift__card');

    cards.forEach(function (card) {
      if (card.dataset.has3d) return;
      card.dataset.has3d = 'true';

      var glare = document.createElement('div');
      glare.className = 'card-glare-3d';
      card.appendChild(glare);

      var rect = null;
      var active = false;

      function onEnter() {
        rect = card.getBoundingClientRect();
        active = true;
        card.classList.add('card-3d-active');
      }

      function onMove(e) {
        if (!active || !rect) rect = card.getBoundingClientRect();
        var clientX = e.clientX || (e.touches && e.touches[0].clientX);
        var clientY = e.clientY || (e.touches && e.touches[0].clientY);
        if (!clientX || !clientY) return;

        var x = (clientX - rect.left) / rect.width;
        var y = (clientY - rect.top) / rect.height;

        var rotateX = (0.5 - y) * 12;
        var rotateY = (x - 0.5) * 12;

        card.style.transform = 'perspective(1200px) rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg) translateZ(6px)';
        glare.style.opacity = '1';
        glare.style.background = 'radial-gradient(circle at ' + (x * 100).toFixed(1) + '% ' + (y * 100).toFixed(1) + '%, rgba(255,255,255,0.36) 0%, rgba(197,155,39,0.14) 40%, transparent 70%)';
      }

      function onLeave() {
        active = false;
        rect = null;
        card.classList.remove('card-3d-active');
        card.style.transform = '';
        glare.style.opacity = '0';
      }

      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
    });
  }

  /* ─────────────────────────────────────────────────────────
     2. 3D FLOATING CROCHET MOTIFS & FLOWERS (JAGAH JAGAH)
     Delicate hand-crocheted daisy flower & granny square in margins
     ───────────────────────────────────────────────────────── */
  function initFloatingCrochetMotifs() {
    if (isTouch || document.getElementById('crochetMotifsLayer')) return;

    var container = document.createElement('div');
    container.id = 'crochetMotifsLayer';
    container.className = 'crochet-motifs-3d-wrap';
    container.setAttribute('aria-hidden', 'true');
    container.innerHTML =
      // 1. Hand-Crocheted Layered Daisy Flower (Left margin)
      '<div class="motif-3d motif-flower" data-parallax="14" title="3D Hand-Crocheted Daisy">' +
        '<svg viewBox="0 0 100 100" class="motif-svg">' +
          '<g class="motif-petals">' +
            '<circle cx="50" cy="22" r="14" fill="#E8B8BF" opacity="0.94"/>' +
            '<circle cx="78" cy="50" r="14" fill="#E8B8BF" opacity="0.94"/>' +
            '<circle cx="50" cy="78" r="14" fill="#E8B8BF" opacity="0.94"/>' +
            '<circle cx="22" cy="50" r="14" fill="#E8B8BF" opacity="0.94"/>' +
            '<circle cx="70" cy="30" r="13" fill="#F4D3D8" opacity="0.88"/>' +
            '<circle cx="70" cy="70" r="13" fill="#F4D3D8" opacity="0.88"/>' +
            '<circle cx="30" cy="70" r="13" fill="#F4D3D8" opacity="0.88"/>' +
            '<circle cx="30" cy="30" r="13" fill="#F4D3D8" opacity="0.88"/>' +
          '</g>' +
          '<circle cx="50" cy="50" r="16" fill="#C59B27" stroke="#7A1F35" stroke-width="2"/>' +
          '<circle cx="50" cy="50" r="9" fill="#ECC874"/>' +
        '</svg>' +
      '</div>' +
      // 2. Hand-Crocheted Granny Square Motif (Right margin)
      '<div class="motif-3d motif-granny" data-parallax="-18" title="3D Hand-Crocheted Granny Square">' +
        '<svg viewBox="0 0 100 100" class="motif-svg">' +
          '<rect x="15" y="15" width="70" height="70" rx="6" fill="#F8F2EB" stroke="#7A1F35" stroke-width="3"/>' +
          '<rect x="25" y="25" width="50" height="50" rx="4" fill="#ECC874" stroke="#C59B27" stroke-width="2"/>' +
          '<circle cx="50" cy="50" r="15" fill="#C05B3E"/>' +
          '<circle cx="50" cy="50" r="7" fill="#FFF8EB"/>' +
        '</svg>' +
      '</div>';
    document.body.appendChild(container);

    var motifs = container.querySelectorAll('.motif-3d');
    window.addEventListener('mousemove', function (e) {
      var cx = window.innerWidth / 2;
      var cy = window.innerHeight / 2;
      var dx = (e.clientX - cx) / cx;
      var dy = (e.clientY - cy) / cy;

      motifs.forEach(function (m) {
        var p = parseFloat(m.dataset.parallax) || 12;
        var rotX = -dy * 20;
        var rotY = dx * 24;
        m.style.transform = 'translate3d(' + (dx * p).toFixed(1) + 'px, ' + (dy * p).toFixed(1) + 'px, 0) rotateX(' + rotX.toFixed(1) + 'deg) rotateY(' + rotY.toFixed(1) + 'deg)';
      });
    });
  }

  /* ─────────────────────────────────────────────────────────
     3. "PULL THE DHAAGA" 3D PHYSICAL CORD & JODHPUR WORKBENCH
     Click or pull to unravel live Jodhpur workbench & studio lamp
     ───────────────────────────────────────────────────────── */
  function playCordSound() {
    try {
      var AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      var ctx = new AudioCtx();

      // 1. Crisp brass pull-switch metallic ping
      var osc1 = ctx.createOscillator();
      var gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(1400, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.07);
      gain1.gain.setValueAtTime(0.2, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.07);

      // 2. Tactile elastic string snap
      var osc2 = ctx.createOscillator();
      var gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(480, ctx.currentTime + 0.02);
      osc2.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.16);
      gain2.gain.setValueAtTime(0.22, ctx.currentTime + 0.02);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime + 0.02);
      osc2.stop(ctx.currentTime + 0.16);
    } catch (e) {}
  }

  function initPullTheDhaaga() {
    if (document.getElementById('studioShade')) return;
    try { localStorage.removeItem('ccs_coupon'); } catch(e){}

    // 1. Build the Handcrafted Studio Roller Blind
    var shade = document.createElement('div');
    shade.id = 'studioShade';
    shade.className = 'studio-shade';
    shade.innerHTML =
      '<div class="shade-fabric">' +
        '<div class="wrap shade-inner">' +
          '<div class="shade-col">' +
            '<div class="shade-badge"><span class="live-pulse"></span> JODHPUR WORKBENCH · LIVE</div>' +
            '<h3 class="shade-title">Do Behen, Ek Sofa,<br><em style="color:var(--rose)">Raat 1 Baje Tak Hook.</em></h3>' +
            '<p class="shade-text">Vanshita & Manvi stitching orders live in Jodhpur. Har piece 100% pure cotton yarn se ek-ek loop haath se banta hai.</p>' +
            '<a class="btn btn--wa btn--sm" href="https://wa.me/919000000000?text=Hi%20Crochet%20Craft%20Studio!%20Saw%20your%20live%20workbench..." target="_blank" rel="noopener">WhatsApp Direct to Sisters →</a>' +
          '</div>' +
          '<div class="shade-col shade-col--workbench">' +
            '<div class="shade-workbench-card">' +
              '<div class="shade-card-title"><span>✦ Live Workshop Log</span><span style="font-size:.65rem;color:var(--ink-soft);font-weight:600">Jodhpur IST Feed</span></div>' +
              '<div class="shade-dispatch-grid">' +
                '<div class="shade-dispatch-item"><div class="shade-dispatch-k">On Hook Now</div><div class="shade-dispatch-v">Mini Rose Bag</div></div>' +
                '<div class="shade-dispatch-item"><div class="shade-dispatch-k">Yarn Spec</div><div class="shade-dispatch-v">100% Combed Cotton</div></div>' +
                '<div class="shade-dispatch-item"><div class="shade-dispatch-k">Origin</div><div class="shade-dispatch-v">Jodhpur, Rajasthan</div></div>' +
                '<div class="shade-dispatch-item"><div class="shade-dispatch-k">Daily Courier</div><div class="shade-dispatch-v">4:00 PM DTDC Pickup</div></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="shade-col shade-col--actions">' +
            '<div class="micro" style="font-weight:700">Studio Atmosphere</div>' +
            '<button class="btn btn--ghost btn--sm" id="shadeThemeToggle">💡 Studio Lamp: <span id="lampModeLabel">Velvet Night Mode</span></button>' +
            '<button class="btn btn--sm" id="shadeRollUpBtn" style="border:1px solid #c2883f">▲ Roll Up Blind (Band Karo)</button>' +
          '</div>' +
        '</div>' +
        '<div class="shade-fringe"></div>' +
      '</div>';
    document.body.appendChild(shade);

    var rollUpBtn = document.getElementById('shadeRollUpBtn');
    var themeToggle = document.getElementById('shadeThemeToggle');
    var lampModeLabel = document.getElementById('lampModeLabel');

    if (rollUpBtn) rollUpBtn.addEventListener('click', function(e) { e.stopPropagation(); toggleShade(); });
    if (themeToggle) {
      themeToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        var isNight = document.body.classList.toggle('shahi-night-mode');
        localStorage.setItem('ccs_theme', isNight ? 'night' : 'day');
        if (lampModeLabel) {
          lampModeLabel.textContent = isNight ? 'Daylight Linen Mode' : 'Velvet Night Mode';
        }
      });
    }

    // 2. Build Ultra-Smooth Pull String Handle in Header
    var widget = document.createElement('div');
    widget.id = 'pullDhaagaWidget';
    widget.className = 'dhaaga-pull-widget';
    widget.innerHTML =
      '<div class="dhaaga-mount">' +
        '<div class="dhaaga-anchor"></div>' +
        '<div class="dhaaga-line" id="dhaagaLine"></div>' +
        '<div class="dhaaga-handle" id="dhaagaHandle" title="Pull or click to unravel Jodhpur studio workbench!">' +
          '<span class="dhaaga-hook-icon">🪝</span>' +
          '<span class="dhaaga-tip">PULL</span>' +
        '</div>' +
      '</div>';
    document.body.appendChild(widget);

    var handle = document.getElementById('dhaagaHandle');
    var line = document.getElementById('dhaagaLine');
    if (!handle || !line) return;

    var isOpen = false;
    var defaultHeight = 78;
    var openHeight = 126;
    var currentHeight = defaultHeight;
    var isDragging = false;
    var startY = 0;
    var startH = defaultHeight;
    var hasMovedFar = false;

    function applyHeight(h, animate) {
      if (animate) {
        line.style.transition = 'height 0.48s cubic-bezier(0.34, 1.56, 0.64, 1)';
        handle.style.transition = 'transform 0.48s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease';
      } else {
        line.style.transition = 'none';
        handle.style.transition = 'none';
      }
      line.style.height = h + 'px';
      handle.style.transform = 'translateY(' + h + 'px)';
      currentHeight = h;
    }

    applyHeight(defaultHeight, false);

    function toggleShade() {
      isOpen = !isOpen;
      playCordSound();

      if (isOpen) {
        shade.classList.add('is-open');
        handle.querySelector('.dhaaga-hook-icon').textContent = '▲';
        handle.querySelector('.dhaaga-tip').textContent = 'ROLL UP';
        applyHeight(openHeight, true);
        document.dispatchEvent(new CustomEvent('ccs:rendered'));
      } else {
        shade.classList.remove('is-open');
        handle.querySelector('.dhaaga-hook-icon').textContent = '🪝';
        handle.querySelector('.dhaaga-tip').textContent = 'PULL';
        applyHeight(defaultHeight, true);
      }
    }

    // Interactive pointer drag (touch + mouse) for ultra-tactile physics
    handle.addEventListener('pointerdown', function(e) {
      isDragging = true;
      hasMovedFar = false;
      startY = e.clientY;
      startH = isOpen ? openHeight : defaultHeight;
      try { handle.setPointerCapture(e.pointerId); } catch(err){}
      handle.classList.add('pulling');
      applyHeight(startH, false);
      e.preventDefault();
    });

    window.addEventListener('pointermove', function(e) {
      if (!isDragging) return;
      var dy = e.clientY - startY;
      if (dy > 0) {
        // Elastic stretch with dampening
        var newH = startH + (dy * 0.72);
        if (newH > 190) newH = 190 + (newH - 190) * 0.2;
        applyHeight(newH, false);
        if (dy > 20) hasMovedFar = true;
      }
    });

    function endDrag(e) {
      if (!isDragging) return;
      isDragging = false;
      handle.classList.remove('pulling');

      var totalPull = currentHeight - startH;
      if (totalPull >= 26 || (hasMovedFar && totalPull > 15)) {
        // Pulled enough to snap & toggle
        toggleShade();
      } else if (!hasMovedFar) {
        // Clean single click / tap: smooth spring recoil stroke
        applyHeight(startH + 42, true);
        setTimeout(function() {
          toggleShade();
        }, 120);
      } else {
        // Released without full pull: smooth spring back to resting height
        applyHeight(isOpen ? openHeight : defaultHeight, true);
      }
    }

    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);
  }

    function initMagicColorwayLab() {
    var swatches = document.querySelectorAll('.yarn-swatch-btn');
    if (!swatches.length) return;

    var activeColorName = document.getElementById('activeSwatchName');

    swatches.forEach(function (btn) {
      btn.addEventListener('click', function () {
        swatches.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');

        var colorHex = btn.dataset.hex;
        var colorLabel = btn.dataset.label;
        if (activeColorName) activeColorName.textContent = colorLabel;

        // Apply smooth colorway aura to showcase cards
        var targetCards = document.querySelectorAll('.tagc, .shahi-card');
        targetCards.forEach(function (card) {
          card.style.transition = 'box-shadow 0.4s ease, border-color 0.4s ease';
          card.style.borderColor = colorHex;
          card.style.boxShadow = '0 16px 36px rgba(30, 23, 20, 0.12), 0 0 16px ' + colorHex + '44';

          // Update tint chip
          var chip = card.querySelector('.tagc__cat');
          if (chip) chip.style.color = colorHex;
        });

        if (window.CCS && window.CCS.ui && window.CCS.ui.toast) {
          window.CCS.ui.toast('✨ ' + colorLabel + ' palette preview active! Har piece customize ho sakta hai.');
        }
      });
    });
  }

  /* ─────────────────────────────────────────────────────────
     BOOTSTRAP
     ───────────────────────────────────────────────────────── */
  function boot3D() {
    init3DCardPhysics();
    initFloatingCrochetMotifs();
    initPullTheDhaaga();
    initMagicColorwayLab();

    document.addEventListener('ccs:rendered', function () {
      init3DCardPhysics();
      initMagicColorwayLab();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot3D);
  } else {
    boot3D();
  }

})();
