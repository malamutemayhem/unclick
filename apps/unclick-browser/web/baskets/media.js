// Lane 4 - Media baskets: carousel, gallery, table, embed + image rules.
//
// Registers the visual-heavy baskets into UCB.baskets and exports UCB.imageRules.
// Built to the frozen contracts in BASKETS_ENGINE_PLAN.md Section 3:
//   Region (3.2), Basket (3.3), CanonicalBlock (3.4), Context (3.5).
//
// New CanonicalBlock kinds introduced by this lane (Lane 2 renderer should map
// these to calm DOM; until it does, each block also carries generic card fields
// so a generic items renderer still shows something):
//   "carousel" - meta.layout="strip", items[] of card blocks (capped)
//   "gallery"  - meta.layout="grid",  items[] of media-first card blocks
//   "table"    - meta.headers[], meta.rows[][], meta.truncated
//   "embed"    - labelled placeholder, href to open in Native, meta.provider/medium
//
// Image rules (UCB.imageRules): skip tracking/spacer/data-uri, cap image count,
// and the precise ~400KB per-image cap backed by a shared size cache. The cache
// is pluggable so Lane 6 (per-domain local store) and Lane 7 (cross-user pooled
// index) can attach persistence. The byte measurement itself comes from a Rust
// command (image_sizes) that the manager wires to UCB.imageRules.measure; this
// file never touches Rust and never reads layout.
//
// Safety: every detect/normalize body is wrapped so a throw can never break the
// pipeline. On any failure a basket scores 0 or yields no block, so the page
// falls back to today's reader. No non-ASCII bytes, no em dashes.
(function () {
  'use strict';
  window.UCB = window.UCB || {};
  UCB.baskets = UCB.baskets || {};   // Lane 2 owns the object; we only push in.
  var U = UCB.util || {};
  // ---- small local helpers (prefer UCB.util when Lane 2 exposes them) ------
  function tag(node) {
    return node && node.tagName ? String(node.tagName).toLowerCase() : '';
  }
  function classStr(node) {
    if (!node) return '';
    var c = node.className;
    // SVG elements expose className as an object, not a string.
    if (typeof c !== 'string') c = (node.getAttribute && node.getAttribute('class')) || '';
    return c.toLowerCase();
  }
  function styleStr(node) {
    if (!node || !node.getAttribute) return '';
    return (node.getAttribute('style') || '').toLowerCase();
  }
  function hasToken(haystack, tokens) {
    if (!haystack) return false;
    for (var i = 0; i < tokens.length; i++) {
      if (haystack.indexOf(tokens[i]) !== -1) return true;
    }
    return false;
  }
  function text(node) {
    if (U.text) { try { return U.text(node); } catch (e) {} }
    if (!node) return '';
    return (node.textContent || '').replace(/\s+/g, ' ').trim();
  }
  function clip(s, n) {
    s = s || '';
    if (s.length <= n) return s;
    return s.slice(0, n - 3).replace(/\s+\S*$/, '') + '...';
  }
  function absUrl(src, base) {
    if (!src) return '';
    if (U.absUrl) { try { return U.absUrl(src, base); } catch (e) {} }
    try { return new URL(src, base || (location && location.href)).href; }
    catch (e) { return src; }
  }
  // First href under a node, resolved against base.
  function firstHref(node, base) {
    if (!node || !node.querySelector) return '';
    var a = node.querySelector('a[href]');
    if (!a) return '';
    var h = a.getAttribute('href') || '';
    if (!h || h.charAt(0) === '#' || h.indexOf('javascript:') === 0) return '';
    return absUrl(h, base);
  }
  // First usable heading/title text under a node.
  function firstTitle(node) {
    if (!node || !node.querySelector) return '';
    var h = node.querySelector('h1,h2,h3,h4,h5,h6');
    if (h) { var t = text(h); if (t) return t; }
    var a = node.querySelector('a[href]');
    if (a) { var at = text(a); if (at) return at; }
    var strong = node.querySelector('strong,b');
    return strong ? text(strong) : '';
  }
  function firstBlurb(node) {
    if (!node || !node.querySelector) return '';
    var p = node.querySelector('p');
    return p ? clip(text(p), 220) : '';
  }
  // ==========================================================================
  // UCB.imageRules - skip rules, count cap, precise 400KB cap + size cache.
  // ==========================================================================
  var IR = UCB.imageRules || {};
  UCB.imageRules = IR;
  IR.MAX_BYTES = IR.MAX_BYTES || 400 * 1024;   // ~400KB per-image cap.
  IR.maxImagesPerBlock = IR.maxImagesPerBlock || 24;
  // In-memory size cache: url -> { bytes, measuredAt }.
  IR._cache = IR._cache || {};
  // Cache schema agreed with Lane 6 (per-domain local) and Lane 7 (pooled):
  //   key   = absolute image URL
  //   value = { bytes: number, measuredAt: ISO-8601 string }
  // Persistence hooks (default no-op so this works standalone). Lane 6/7 attach.
  //   IR.loadCache(urls) -> { url: { bytes, measuredAt } }   (sync, best effort)
  //   IR.persist({ url, bytes, measuredAt })                 (fire and forget)
  if (typeof IR.loadCache !== 'function') IR.loadCache = function () { return {}; };
  if (typeof IR.persist !== 'function') IR.persist = function () {};
  // Byte measurement hook. The manager wires this to the Rust image_sizes
  // command, e.g. IR.measure = function(urls){ return invoke('image_sizes',{urls}); }.
  // Default returns unknown (empty), which degrades safely to "allow load".
  //   IR.measure(urls) -> Promise<{ url: bytes }>
  if (typeof IR.measure !== 'function') {
    IR.measure = function () { return Promise.resolve({}); };
  }
  function nowIso() {
    try { return new Date().toISOString(); } catch (e) { return ''; }
  }
  // Tracking pixels, spacers, data URIs, 1x1 beacons - never worth loading.
  var SKIP_TOKENS = [
    'spacer', 'blank.gif', 'transparent.', 'pixel', '/track', 'tracking',
    'beacon', 'doubleclick', 'google-analytics', '/ga.', 'analytics',
    'scorecardresearch', '1x1', '/p.gif', 'sb.scorecard', 'quantserve'
  ];
  IR.skip = function (url) {
    try {
      if (!url) return true;
      var u = String(url).toLowerCase().trim();
      if (u.indexOf('data:') === 0) return true;
      if (hasToken(u, SKIP_TOKENS)) return true;
      return false;
    } catch (e) { return true; }
  };
  // Resolve the real src of an <img>, honouring common lazy-load attributes.
  IR.imgSrc = function (img, base) {
    try {
      if (!img) return '';
      var cand = img.getAttribute('src') ||
                 img.getAttribute('data-src') ||
                 img.getAttribute('data-original') ||
                 img.getAttribute('data-lazy-src') || '';
      if (!cand) {
        var ss = img.getAttribute('srcset') || img.getAttribute('data-srcset') || '';
        if (ss) cand = ss.split(',')[0].trim().split(/\s+/)[0];
      }
      if (!cand) return '';
      return absUrl(cand, base);
    } catch (e) { return ''; }
  };
  // Known size for a url (in-memory cache first, then the pluggable loader).
  IR.cachedBytes = function (url) {
    try {
      if (!url) return null;
      var hit = IR._cache[url];
      if (hit && typeof hit.bytes === 'number') return hit.bytes;
      var loaded = IR.loadCache([url]) || {};
      var rec = loaded[url];
      if (rec && typeof rec.bytes === 'number') {
        IR._cache[url] = { bytes: rec.bytes, measuredAt: rec.measuredAt || nowIso() };
        return rec.bytes;
      }
      return null;
    } catch (e) { return null; }
  };
  function remember(url, bytes) {
    if (!url || typeof bytes !== 'number') return;
    var rec = { bytes: bytes, measuredAt: nowIso() };
    IR._cache[url] = rec;
    try { IR.persist({ url: url, bytes: bytes, measuredAt: rec.measuredAt }); } catch (e) {}
  }
  // Sync verdict from cache only: known-oversized -> false, else allow.
  // Unknown size is allowed (optimistic); call prefetchSizes to learn it.
  IR.allow = function (url) {
    if (IR.skip(url)) return false;
    var bytes = IR.cachedBytes(url);
    if (bytes != null && bytes > IR.MAX_BYTES) return false;
    return true;
  };
  // Async precise size: cache -> Rust measure -> store. null if unknown.
  IR.size = function (url) {
    try {
      if (IR.skip(url)) return Promise.resolve(null);
      var bytes = IR.cachedBytes(url);
      if (bytes != null) return Promise.resolve(bytes);
      return Promise.resolve(IR.measure([url])).then(function (m) {
        var b = m && m[url];
        if (typeof b === 'number') { remember(url, b); return b; }
        return null;
      }).catch(function () { return null; });
    } catch (e) { return Promise.resolve(null); }
  };
  // Measure many unknown urls in one batch and warm the cache. The app/Lane 2
  // can await this before render so first-visit oversized images never load;
  // on a second visit every url is already cached (zero network measurement).
  IR.prefetchSizes = function (urls) {
    try {
      var need = [];
      var seen = {};
      (urls || []).forEach(function (u) {
        if (!u || seen[u] || IR.skip(u)) return;
        seen[u] = 1;
        if (IR.cachedBytes(u) == null) need.push(u);
      });
      if (!need.length) return Promise.resolve({});
      return Promise.resolve(IR.measure(need)).then(function (m) {
        m = m || {};
        Object.keys(m).forEach(function (u) {
          if (typeof m[u] === 'number') remember(u, m[u]);
        });
        return m;
      }).catch(function () { return {}; });
    } catch (e) { return Promise.resolve({}); }
  };
  // Filter + dedupe + count-cap a list of candidate image urls (sync).
  IR.pick = function (urls, max) {
    var out = [];
    var seen = {};
    var cap = typeof max === 'number' ? max : IR.maxImagesPerBlock;
    (urls || []).forEach(function (u) {
      if (out.length >= cap) return;
      if (!u || seen[u]) return;
      seen[u] = 1;
      if (!IR.allow(u)) return;   // drops skip-listed and known-oversized
      out.push(u);
    });
    return out;
  };
  // Best single image url under a node (skip-aware, absolute), or ''.
  IR.pickImage = function (node, base) {
    try {
      if (!node) return '';
      var poster = node.getAttribute && node.getAttribute('poster');
      if (poster) { var pa = absUrl(poster, base); if (IR.allow(pa)) return pa; }
      var imgs = node.querySelectorAll ? node.querySelectorAll('img,source') : [];
      for (var i = 0; i < imgs.length; i++) {
        var src = IR.imgSrc(imgs[i], base);
        if (src && IR.allow(src)) return src;
      }
      return '';
    } catch (e) { return ''; }
  };
  // ==========================================================================
  // Card builders (shared by carousel + gallery)
  // ==========================================================================
  function cardFromRegion(region, ctx, mediaFirst) {
    var node = region && region.node;
    if (!node) return null;
    var base = ctx && ctx.base;
    var media = IR.pickImage(node, base);
    var title = firstTitle(node);
    var href = firstHref(node, base);
    if (!media && !title && !href) return null;
    var card = { kind: 'card' };
    if (title) card.title = mediaFirst ? title : clip(title, 140);
    if (href) card.href = href;
    if (media) card.media = { src: media, alt: title || '' };
    if (!mediaFirst) {
      var blurb = firstBlurb(node);
      if (blurb) card.blurb = blurb;
    }
    return card;
  }
  function cardsFromGroup(region, ctx, mediaFirst, cap) {
    var items = (region && region.items) || [];
    var out = [];
    var limit = typeof cap === 'number' ? cap : 12;
    for (var i = 0; i < items.length && out.length < limit; i++) {
      var c = cardFromRegion(items[i], ctx, mediaFirst);
      if (c) out.push(c);
    }
    return out;
  }
  // ==========================================================================
  // Basket: carousel  (repeated slides under an overflow/scroll container)
  // ==========================================================================
  var CAROUSEL_TOKENS = [
    'carousel', 'slider', 'slick', 'swiper', 'glide', 'embla', 'flickity',
    'keen-slider', 'splide', 'owl-carousel', 'slideshow', 'scroller'
  ];
  UCB.baskets['carousel'] = {
    type: 'carousel',
    detect: function (region, ctx) {
      try {
        if (!region || region.kind !== 'group') return 0;
        if (!(region.repeat >= 3)) return 0;
        var node = region.node;
        var cls = classStr(node);
        var style = styleStr(node);
        var byClass = hasToken(cls, CAROUSEL_TOKENS);
        var byStyle = hasToken(style, ['overflow-x:auto', 'overflow-x: auto',
          'overflow-x:scroll', 'overflow-x: scroll', 'scroll-snap']);
        var byAttr = node && node.getAttribute &&
          (node.getAttribute('data-carousel') != null ||
           node.getAttribute('aria-roledescription') === 'carousel');
        if (byClass || byAttr) return 0.85;
        if (byStyle) return 0.6;
        return 0;
      } catch (e) { return 0; }
    },
    normalize: function (region, ctx) {
      try {
        var items = cardsFromGroup(region, ctx, false, 12);
        if (!items.length) return [];
        return {
          kind: 'carousel',
          items: items,
          meta: { layout: 'strip', source: 'carousel', total: (region.items || []).length }
        };
      } catch (e) { return []; }
    }
  };
  // ==========================================================================
  // Basket: gallery  (repeated image-first items, little text each)
  // ==========================================================================
  function isImageFirst(region) {
    var node = region && region.node;
    if (!node || !node.querySelector) return false;
    var img = node.querySelector('img,picture,figure source');
    if (!img) return false;
    // Image-first means very little text accompanies the image.
    var tl = typeof region.textLen === 'number' ? region.textLen : text(node).length;
    return tl <= 40;
  }
  UCB.baskets['gallery'] = {
    type: 'gallery',
    detect: function (region, ctx) {
      try {
        if (!region || region.kind !== 'group') return 0;
        if (!(region.repeat >= 3)) return 0;
        var items = region.items || [];
        var imgish = 0;
        for (var i = 0; i < items.length; i++) {
          if (isImageFirst(items[i])) imgish++;
        }
        if (!items.length) return 0;
        var ratio = imgish / items.length;
        // Strong image-first majority and not a carousel container.
        if (ratio >= 0.7 && !hasToken(classStr(region.node), CAROUSEL_TOKENS)) {
          return 0.7;
        }
        return 0;
      } catch (e) { return 0; }
    },
    normalize: function (region, ctx) {
      try {
        var cards = cardsFromGroup(region, ctx, true, IR.maxImagesPerBlock);
        // Keep only cards that actually carry an image.
        var items = [];
        for (var i = 0; i < cards.length; i++) {
          if (cards[i].media && cards[i].media.src) items.push(cards[i]);
        }
        if (!items.length) return [];
        return {
          kind: 'gallery',
          items: items,
          meta: { layout: 'grid', source: 'gallery', total: (region.items || []).length }
        };
      } catch (e) { return []; }
    }
  };
  // ==========================================================================
  // Basket: table  (clean responsive data tables)
  // ==========================================================================
  var TABLE_MAX_ROWS = 200;
  var TABLE_MAX_COLS = 20;
  function cellText(cell) { return clip(text(cell), 200); }
  UCB.baskets['table'] = {
    type: 'table',
    detect: function (region, ctx) {
      try {
        var node = region && region.node;
        if (!node) return 0;
        var isTable = tag(node) === 'table' ||
          (node.getAttribute && node.getAttribute('role') === 'table');
        if (!isTable) return 0;
        var rows = node.querySelectorAll ? node.querySelectorAll('tr,[role="row"]') : [];
        if (rows.length < 2) return 0;
        var first = rows[0];
        var cols = first && first.querySelectorAll
          ? first.querySelectorAll('th,td,[role="cell"],[role="columnheader"]').length : 0;
        if (cols < 2) return 0;            // single-column tables read as layout.
        var hasTh = node.querySelector && node.querySelector('th,[role="columnheader"]');
        return hasTh ? 0.9 : 0.6;          // real headers = stronger signal.
      } catch (e) { return 0; }
    },
    normalize: function (region, ctx) {
      try {
        var node = region.node;
        var rowEls = node.querySelectorAll
          ? node.querySelectorAll('tr,[role="row"]') : [];
        if (!rowEls.length) return [];
        var headers = [];
        var rows = [];
        var truncated = false;
        for (var r = 0; r < rowEls.length; r++) {
          if (rows.length >= TABLE_MAX_ROWS) { truncated = true; break; }
          var cellEls = rowEls[r].querySelectorAll(
            'th,td,[role="cell"],[role="columnheader"]');
          if (!cellEls.length) continue;
          var cells = [];
          for (var c = 0; c < cellEls.length && c < TABLE_MAX_COLS; c++) {
            cells.push(cellText(cellEls[c]));
          }
          var allTh = true;
          for (var k = 0; k < cellEls.length; k++) {
            if (tag(cellEls[k]) !== 'th' &&
                cellEls[k].getAttribute('role') !== 'columnheader') { allTh = false; break; }
          }
          if (allTh && !headers.length) headers = cells;
          else rows.push(cells);
        }
        if (!rows.length && !headers.length) return [];
        var title = '';
        var cap = node.querySelector && node.querySelector('caption');
        if (cap) title = text(cap);
        var block = {
          kind: 'table',
          meta: { headers: headers, rows: rows, truncated: truncated, source: 'table' }
        };
        if (title) block.title = clip(title, 140);
        return block;
      } catch (e) { return []; }
    }
  };
  // ==========================================================================
  // Basket: embed  (video / map / tweet / iframe -> labelled placeholder)
  // ==========================================================================
  function providerFor(url, cls) {
    var u = (url || '').toLowerCase();
    var c = (cls || '').toLowerCase();
    if (hasToken(u, ['youtube.com', 'youtu.be']) ) return { provider: 'YouTube', medium: 'video' };
    if (u.indexOf('vimeo.com') !== -1) return { provider: 'Vimeo', medium: 'video' };
    if (hasToken(u, ['google.com/maps', 'maps.google', 'maps.app.goo'])) return { provider: 'Map', medium: 'map' };
    if (hasToken(u, ['twitter.com', 'x.com']) || c.indexOf('twitter-tweet') !== -1) return { provider: 'X', medium: 'post' };
    if (u.indexOf('instagram.com') !== -1 || c.indexOf('instagram-media') !== -1) return { provider: 'Instagram', medium: 'post' };
    if (u.indexOf('open.spotify.com') !== -1) return { provider: 'Spotify', medium: 'audio' };
    if (u.indexOf('soundcloud.com') !== -1) return { provider: 'SoundCloud', medium: 'audio' };
    if (u.indexOf('codepen.io') !== -1) return { provider: 'CodePen', medium: 'code' };
    if (u.indexOf('gist.github.com') !== -1) return { provider: 'GitHub Gist', medium: 'code' };
    if (u.indexOf('tiktok.com') !== -1) return { provider: 'TikTok', medium: 'video' };
    return { provider: 'Embedded content', medium: 'embed' };
  }
  function embedNode(region) {
    var node = region && region.node;
    if (!node) return null;
    var t = tag(node);
    if (t === 'iframe' || t === 'video' || t === 'audio' || t === 'embed' || t === 'object') {
      return node;
    }
    if (node.querySelector) {
      return node.querySelector('iframe,video,audio,embed,object');
    }
    return null;
  }
  UCB.baskets['embed'] = {
    type: 'embed',
    detect: function (region, ctx) {
      try {
        var node = region && region.node;
        if (!node) return 0;
        var t = tag(node);
        if (t === 'iframe' || t === 'video' || t === 'audio') return 0.9;
        var cls = classStr(node);
        if (hasToken(cls, ['twitter-tweet', 'instagram-media', 'tiktok-embed',
          'video-embed', 'embed-responsive', 'iframe'])) return 0.7;
        if (node.querySelector && node.querySelector('iframe,video,audio')) return 0.6;
        return 0;
      } catch (e) { return 0; }
    },
    normalize: function (region, ctx) {
      try {
        var base = ctx && ctx.base;
        var el = embedNode(region);
        if (!el) return [];
        var src = el.getAttribute && (el.getAttribute('src') ||
          el.getAttribute('data-src') || el.getAttribute('data-url'));
        if (!src && el.querySelector) {
          var s = el.querySelector('source[src]');
          if (s) src = s.getAttribute('src');
        }
        var href = src ? absUrl(src, base) : firstHref(region.node, base);
        var info = providerFor(href || src, classStr(region.node));
        var poster = IR.pickImage(el, base) || IR.pickImage(region.node, base);
        var block = {
          kind: 'embed',
          title: info.provider + (info.medium === 'embed' ? '' : ' ' + info.medium),
          meta: { provider: info.provider, medium: info.medium, source: 'embed', openInNative: true }
        };
        if (href) block.href = href;
        if (poster) block.media = { src: poster, alt: info.provider };
        return block;
      } catch (e) { return []; }
    }
  };
})();
