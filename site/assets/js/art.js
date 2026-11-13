/* ============================================================
   Procedural art. No photos, no stock, no AI images.
   Every product gets a unique hand-made-looking swatch + stamp.
   Deterministic: same product always renders the same.
   ============================================================ */
window.CCS = window.CCS || {};
CCS.art = (function () {

  function seeded(n) {
    var s = n * 9301 + 49297;
    return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  }

  /* ---- crochet doily: concentric stitched rings + scalloped edge ---- */
  function doily(cx, cy, c1, c2, seed) {
    var r = seeded(seed || 1);
    var out = "";
    // scalloped outer edge
    var scallops = 22, rr = 128, sr = 12;
    for (var i = 0; i < scallops; i++) {
      var a = (i / scallops) * Math.PI * 2;
      out += '<circle cx="' + (cx + Math.cos(a) * rr).toFixed(1) + '" cy="' + (cy + Math.sin(a) * rr).toFixed(1) +
        '" r="' + sr + '" fill="none" stroke="' + c2 + '" stroke-width="2" opacity=".45"/>';
    }
    // stitched rings
    out += '<circle cx="' + cx + '" cy="' + cy + '" r="128" fill="none" stroke="' + c2 + '" stroke-width="2" opacity=".5"/>';
    out += '<circle cx="' + cx + '" cy="' + cy + '" r="112" fill="none" stroke="' + c1 + '" stroke-width="7" stroke-dasharray="13 9" opacity=".85"/>';
    out += '<circle cx="' + cx + '" cy="' + cy + '" r="95" fill="none" stroke="' + c2 + '" stroke-width="2.5" stroke-dasharray="4 6" opacity=".55"/>';
    out += '<circle cx="' + cx + '" cy="' + cy + '" r="80" fill="none" stroke="' + c1 + '" stroke-width="9" stroke-dasharray="17 12" opacity=".6"/>';
    out += '<circle cx="' + cx + '" cy="' + cy + '" r="60" fill="none" stroke="' + c2 + '" stroke-width="2" stroke-dasharray="3 7" opacity=".5"/>';
    // centre petals
    for (var k = 0; k < 6; k++) {
      var b = (k / 6) * Math.PI * 2;
      out += '<ellipse cx="' + (cx + Math.cos(b) * 20).toFixed(1) + '" cy="' + (cy + Math.sin(b) * 20).toFixed(1) +
        '" rx="22" ry="11" fill="' + c1 + '" opacity=".8" transform="rotate(' + (b * 180 / Math.PI) + ' ' +
        (cx + Math.cos(b) * 20).toFixed(1) + ' ' + (cy + Math.sin(b) * 20).toFixed(1) + ')"/>';
    }
    out += '<circle cx="' + cx + '" cy="' + cy + '" r="13" fill="' + c2 + '" opacity=".9"/>';
    return out;
  }

  /* ---- stamped line-art silhouettes ---- */
  function stamp(kind, color) {
    var s = 'fill="none" stroke="' + color + '" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"';
    switch (kind) {
      case "bag":
        return '<g ' + s + '><path d="M-58 22 L-44 -58 H44 L58 22 Z"/><path d="M-34 -58 C-34 -96 34 -96 34 -58"/><path d="M-44 -10 H44"/><circle cx="0" cy="-6" r="13"/><path d="M0 -19 V7 M-13 -6 H13"/></g>';
      case "case":
        return '<g ' + s + '><rect x="-40" y="-66" width="80" height="132" rx="16"/><rect x="-22" y="-50" width="44" height="34" rx="10"/><circle cx="-12" cy="-41" r="6"/><circle cx="4" cy="-41" r="6"/><path d="M-14 30 H14"/></g>';
      case "charm":
        return '<g ' + s + '><circle cx="0" cy="16" r="34"/><path d="M0 -18 V-40"/><circle cx="0" cy="-50" r="9"/><path d="M-16 8 Q0 -8 16 8"/><path d="M0 -2 V34"/></g>';
      case "pouch":
        return '<g ' + s + '><rect x="-48" y="-34" width="96" height="76" rx="12"/><path d="M-48 -18 H48"/><path d="M-14 -34 V-18 M14 -34 V-18"/><circle cx="0" cy="14" r="8"/></g>';
      case "scrunchie":
        return '<g ' + s + '><circle cx="0" cy="0" r="46"/><circle cx="0" cy="0" r="24"/><path d="M-46 0 Q-23 -14 0 0 T46 0" opacity=".6"/></g>';
      case "clip":
        return '<g ' + s + '><ellipse cx="0" cy="0" rx="52" ry="24"/><path d="M-30 -8 Q-14 -34 0 -8 Q14 -34 30 -8"/><path d="M-52 0 H-70"/></g>';
      case "rakhi":
        return '<g ' + s + '><circle cx="0" cy="0" r="26"/><circle cx="0" cy="0" r="13"/><path d="M-26 0 H-62 M26 0 H62 M-62 0 Q-70 12 -58 18 M62 0 Q70 12 58 18"/><path d="M0 -26 V-40"/></g>';
      case "hamper":
        return '<g ' + s + '><path d="M-56 -14 H56 V52 H-56 Z"/><path d="M-56 -14 L-66 6 M56 -14 L66 6"/><path d="M0 -14 V52"/><path d="M-20 -14 Q-20 -40 0 -40 Q20 -40 20 -14"/><circle cx="0" cy="18" r="9"/></g>';
      case "diya":
        return '<g ' + s + '><path d="M-54 6 Q0 54 54 6"/><path d="M-54 6 H54"/><path d="M0 -14 C14 -30 6 -46 0 -58 C-6 -46 -14 -30 0 -14 Z"/><path d="M-26 6 Q0 22 26 6"/></g>';
      case "hanging":
        return '<g ' + s + '><path d="M-40 -60 V-30 M40 -60 V-30"/><rect x="-52" y="-30" width="104" height="72" rx="6"/><path d="M-26 6 Q-18 -12 -10 6 Q-2 -12 6 6"/><path d="M16 6 Q24 -12 32 6"/><circle cx="0" cy="-18" r="4"/></g>';
      case "top":
        return '<g ' + s + '><path d="M-30 -52 L-58 -34 L-44 -8 L-28 -18 V58 H28 V-18 L44 -8 L58 -34 L30 -52"/><path d="M-30 -52 Q0 -34 30 -52"/><path d="M-28 8 H28 M-28 26 H28 M-28 44 H28"/></g>';
      case "doll":
        return '<g ' + s + '><circle cx="0" cy="-38" r="24"/><path d="M-18 -46 Q0 -58 18 -46"/><path d="M-26 18 Q-30 62 0 62 Q30 62 26 18"/><path d="M-24 18 Q0 34 24 18"/><path d="M24 4 L58 -14"/><circle cx="62" cy="-17" r="6"/><path d="M-8 -38 H8"/></g>';
      default:
        return '<g ' + s + '><circle cx="0" cy="0" r="42"/></g>';
    }
  }

  /* ---- 4:5 product tile ---- */
  function tile(p, seed) {
    var uid = "g" + p.id + (seed || "");
    var ink = "#2b211c";
    return '<svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label="' +
      (p.name + " — handmade crochet") + '">' +
      '<defs>' +
      '<radialGradient id="' + uid + '" cx="50%" cy="42%" r="62%">' +
      '<stop offset="0%" stop-color="#fbf5e9"/><stop offset="100%" stop-color="#e7dbc6"/>' +
      '</radialGradient>' +
      '</defs>' +
      '<rect width="400" height="500" fill="url(#' + uid + ')"/>' +
      '<circle cx="200" cy="235" r="168" fill="' + p.c1 + '" opacity=".16"/>' +
      '<g opacity=".95">' + doily(200, 235, p.c1, p.c2, p.id.charCodeAt(2) || 7) + '</g>' +
      '<g transform="translate(200 245) scale(.86)" opacity=".82">' + stamp(p.kind, ink) + '</g>' +
      /* stitched corner marks, like a tag */
      '<path d="M18 26 V18 H26 M374 26 V18 H366 M18 474 V482 H26 M374 474 V482 H366" fill="none" stroke="' +
      ink + '" stroke-width="1.5" opacity=".28"/>' +
      '</svg>';
  }

  /* ---- builder preview: single item on a paper stage ---- */
  function preview(kind, color, ink) {
    ink = ink || "#2b211c";
    return '<svg viewBox="0 0 400 400" role="img" aria-label="Your custom piece preview">' +
      '<circle cx="200" cy="200" r="150" fill="' + color + '" opacity=".2"/>' +
      '<circle cx="200" cy="200" r="118" fill="none" stroke="' + color + '" stroke-width="10" stroke-dasharray="14 10" opacity=".75"/>' +
      '<circle cx="200" cy="200" r="96" fill="none" stroke="' + ink + '" stroke-width="2" stroke-dasharray="4 7" opacity=".35"/>' +
      '<g transform="translate(200 200) scale(1.25)">' + stamp(kind, ink) + '</g>' +
      '</svg>';
  }

  /* ---- yarn ball for hero / footer ---- */
  function ball(c1, c2, c3) {
    var strands = "";
    for (var a = -74; a <= 74; a += 13) {
      strands += '<ellipse rx="72" ry="17" transform="rotate(' + a + ')" fill="none" stroke="' + c2 +
        '" stroke-width="2.1" opacity=".5"/>';
    }
    for (var b = -74; b <= 74; b += 21) {
      strands += '<ellipse rx="72" ry="30" transform="rotate(' + b + ')" fill="none" stroke="' + c3 +
        '" stroke-width="1.6" opacity=".28"/>';
    }
    return '<svg viewBox="-92 -92 184 184" aria-hidden="true">' +
      '<defs><clipPath id="ballclip"><circle r="72"/></clipPath>' +
      '<radialGradient id="ballg" cx="36%" cy="30%" r="72%">' +
      '<stop offset="0%" stop-color="' + c1 + '" stop-opacity="1"/>' +
      '<stop offset="100%" stop-color="' + c2 + '" stop-opacity=".92"/></radialGradient></defs>' +
      '<circle r="72" fill="url(#ballg)"/>' +
      '<g clip-path="url(#ballclip)">' + strands +
      '<ellipse cx="-24" cy="-30" rx="30" ry="20" fill="#fff" opacity=".14"/></g>' +
      '<circle r="72" fill="none" stroke="' + c2 + '" stroke-width="2.6" opacity=".75"/>' +
      '<path d="M66 18 C96 34, 112 56, 120 82" fill="none" stroke="' + c2 +
      '" stroke-width="2.8" stroke-linecap="round" opacity=".85"/>' +
      '<path d="M120 82 C128 96, 124 106, 114 104" fill="none" stroke="' + c2 +
      '" stroke-width="2.8" stroke-linecap="round" opacity=".85"/>' +
      '</svg>';
  }

  /* ---- logo mark: yarn ball + hook, drawn as a monogram ---- */
  function logo(size) {
    var s = size || 34;
    return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 40 40" aria-hidden="true" focusable="false">' +
      '<circle cx="17" cy="23" r="12.5" fill="none" stroke="currentColor" stroke-width="1.6"/>' +
      '<path d="M6.5 20.5C11 25 22 25 27 19.5M7.5 26.5C12 30.5 22.5 29.5 27.5 24M9 15.5C13 12 22 12.5 26.5 17" fill="none" stroke="currentColor" stroke-width="1.3" opacity=".75"/>' +
      '<path d="M27 18.5C31 15.5 34.5 12 36 8" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>' +
      '<path d="M36 8c2.6-2.2 4.6-1.2 4.4 1.1-.2 2-2.6 3.1-4.4 1.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>' +
      '<circle cx="17" cy="23" r="1.8" fill="currentColor" opacity=".55"/>' +
      '</svg>';
  }

  /* ---- instagram tile: pure stitch pattern, different colourways ---- */
  function igTile(palette, seed) {
    var p = { id: "ig" + seed, c1: palette[0], c2: palette[1], kind: ["bag", "case", "charm", "clip", "rakhi", "doll"][seed % 6] };
    return '<svg viewBox="0 0 300 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      '<rect width="300" height="300" fill="' + palette[2] + '"/>' +
      '<g opacity=".9">' + doily(150, 150, p.c1, p.c2, seed + 3) + '</g>' +
      '<g transform="translate(150 152) scale(.62)" opacity=".7">' + stamp(p.kind, "#2b211c") + '</g>' +
      '</svg>';
  }

  return { tile: tile, preview: preview, ball: ball, logo: logo, igTile: igTile, stamp: stamp, doily: doily };
})();
