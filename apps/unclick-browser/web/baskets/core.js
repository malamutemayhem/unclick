// UnClick Browser - Baskets Engine - Lane 2: framework, classifier, assembler,
// renderer and the pipeline entry point. Other lanes push baskets into UCB.baskets.
// Safe by design: any throw or empty result lets the app fall back to today's reader.
window.UCB = window.UCB || {};
UCB.baskets = UCB.baskets || {};

(function () {
  // ---- shared helpers (Section 4: UCB.util) ----
  var util = {
    text: function (n) { return (n && n.textContent || "").trim(); },
    firstImg: function (n) { return n && (n.tagName === "IMG" ? n : (n.querySelector ? n.querySelector("img") : null)); },
    attr: function (n, a) { return (n && n.getAttribute) ? (n.getAttribute(a) || "") : ""; },
    resolve: function (href, base) { if (!href) return ""; try { return new URL(href, base).href; } catch (e) { return ""; } },
    host: function (u) { try { return new URL(u).hostname.replace(/^www\./, ""); } catch (e) { return ""; } },
    meta: function (doc, key) { var m = doc.querySelector('meta[property="' + key + '"]') || doc.querySelector('meta[name="' + key + '"]'); return m ? (m.getAttribute("content") || "") : ""; },
    // Canonical node -> stable selector. Lanes 6 (learned store) and 7 (pooled
    // shapes) both prefer this so the same region keys the same way everywhere.
    selectorFor: function (node) {
      try {
        if (!node || node.nodeType !== 1) return "";
        if (node.id) return "#" + node.id;
        var parts = [], el = node, depth = 0;
        while (el && el.nodeType === 1 && el.tagName !== "BODY" && depth < 5) {
          var seg = el.tagName.toLowerCase();
          if (el.id) { parts.unshift("#" + el.id); break; }
          var cls = (typeof el.className === "string" ? el.className : "").trim().split(/\s+/).filter(Boolean)[0];
          if (cls) seg += "." + cls.replace(/[^a-zA-Z0-9_-]/g, "");
          var p = el.parentNode;
          if (p && p.children) {
            var same = 0, idx = 0;
            for (var i = 0; i < p.children.length; i++) { if (p.children[i].tagName === el.tagName) { same++; if (p.children[i] === el) idx = same; } }
            if (same > 1) seg += ":nth-of-type(" + idx + ")";
          }
          parts.unshift(seg);
          el = el.parentNode; depth++;
        }
        return parts.join(" > ");
      } catch (e) { return ""; }
    }
  };
  UCB.util = util;

  function safe(fn) { try { return fn(); } catch (e) { return null; } }

  // ---- classify: best-scoring basket per region; claimed regions are not descended ----
  // A region is only claimed when its own best score is at least as high as the
  // best score found anywhere below it. This stops a broad container (e.g. body)
  // from being greedily claimed by a basket that only matched via a deep
  // descendant (e.g. embed scoring on "contains an iframe somewhere"), while a
  // tighter, stronger match still lives further down. Parent wins ties, so a
  // header still outranks the nav nested inside it.
  UCB.classify = function (rootRegion, ctx) {
    var winners = [];
    var THRESH = 0.5;
    var selfScore = new Map();   // region -> { score, basket, type }
    var below = new Map();       // region -> best score strictly below it

    function scoreOf(region) {
      var best = null, bestScore = 0, bestType = null;
      for (var type in UCB.baskets) {
        var b = UCB.baskets[type];
        if (!b || typeof b.detect !== "function") continue;
        var score = 0;
        try { score = b.detect(region, ctx) || 0; } catch (e) { score = 0; }
        if (score > bestScore) { bestScore = score; best = b; bestType = type; }
      }
      return { score: bestScore, basket: best, type: bestType };
    }

    // Post-order: record each region's own best and the best score beneath it.
    function annotate(region) {
      if (!region) return 0;
      var here = scoreOf(region);
      selfScore.set(region, here);
      var kids = region.children || [];
      var sub = 0;
      for (var i = 0; i < kids.length; i++) { var s = annotate(kids[i]); if (s > sub) sub = s; }
      below.set(region, sub);
      return here.score > sub ? here.score : sub;
    }

    function walk(region) {
      if (!region) return;
      var me = selfScore.get(region) || { score: 0 };
      if (me.basket && me.score >= THRESH && me.score >= (below.get(region) || 0)) {
        winners.push({ region: region, basket: me.basket, type: me.type, score: me.score });
        return;
      }
      var kids = region.children || [];
      for (var i = 0; i < kids.length; i++) walk(kids[i]);
    }

    annotate(rootRegion);
    walk(rootRegion);
    return winners;
  };

  // ---- assemble: winners -> ordered CanonicalBlock[] (frame first, footer last) ----
  var ORDER = { masthead:0, hero:1, breadcrumb:2, menu:3, stats:4, teaser:5, grid:5, list:5, carousel:5, gallery:5, table:6, article:7, embed:8, footer:9 };
  function ord(kind) { return ORDER[kind] != null ? ORDER[kind] : 5; }
  UCB.assemble = function (winners, ctx) {
    var blocks = [];
    for (var i = 0; i < winners.length; i++) {
      var out = safe(function () { return winners[i].basket.normalize(winners[i].region, ctx); });
      if (!out) continue;
      var arr = Array.isArray(out) ? out : [out];
      for (var j = 0; j < arr.length; j++) { if (arr[j]) { arr[j]._ord = ord(arr[j].kind); blocks.push(arr[j]); } }
    }
    blocks.sort(function (a, b) { return a._ord - b._ord; });
    for (var k = 0; k < blocks.length; k++) delete blocks[k]._ord;
    return blocks;
  };

  // ---- renderCanonical: CanonicalBlock[] -> DocumentFragment, using Zen CSS classes ----
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  function renderCard(b) {
    var hasText = !!(b.title || b.eyebrow || b.blurb || (b.meta && b.meta.price));
    var hasImg = b.media && b.media.src;
    if (!hasText && !hasImg) return null;            // nothing to show
    var card = document.createElement(b.href ? "a" : "div");
    card.className = "card" + (hasImg ? "" : " card-text");
    if (b.href) card.setAttribute("data-href", b.href);
    if (hasImg) {
      var img = document.createElement("img");
      img.className = "card-thumb"; img.alt = (b.media.alt || ""); img.loading = "lazy";
      // A broken URL, a text-logo, or a tracking pixel should never leave an
      // empty grey box. Collapse to text; if the card then has no text, drop it.
      img.onerror = function () {
        if (img.parentNode) img.parentNode.removeChild(img);
        card.className = card.className.replace(/\s*card-text$/, "") + " card-text";
        if (!card.textContent.trim() && card.parentNode) card.parentNode.removeChild(card);
      };
      img.src = b.media.src;
      card.appendChild(img);
    }
    var body = el("div", "card-body");
    if (b.eyebrow) body.appendChild(el("div", "card-eyebrow", b.eyebrow));
    if (b.title) body.appendChild(el("div", "card-title", b.title));
    if (b.blurb) body.appendChild(el("div", "card-blurb", b.blurb));
    if (b.meta && b.meta.price) body.appendChild(el("div", "card-price", b.meta.price));
    card.appendChild(body);
    return card;
  }

  // ---- frame baskets (Lane 3): masthead, footer, menu, link ----
  function renderLink(b) {
    if (!b || !b.title) return null;
    var a = document.createElement(b.href ? "a" : "span");
    if (b.href) a.setAttribute("data-href", b.href);
    a.textContent = b.title;
    return a;
  }
  function renderMasthead(b) {
    var host = b.meta && b.meta.host;
    var bar = document.createElement(host ? "a" : "div");
    bar.className = "masthead";
    if (host) bar.setAttribute("data-href", "https://" + host);
    if (b.media && b.media.src) {
      var fav = document.createElement("img");
      fav.className = "fav"; fav.src = b.media.src; fav.alt = (b.media.alt || "");
      fav.onerror = function () { this.style.display = "none"; };
      bar.appendChild(fav);
    }
    bar.appendChild(el("span", "site", b.title || host || "Source"));
    if (host && b.title && b.title !== host) { bar.appendChild(el("span", "grow")); bar.appendChild(el("span", "host", host)); }
    return bar;
  }
  function renderFooter(b) {
    var f = el("div", "pagefoot");
    var host = (b.meta && (b.meta.source || b.meta.host)) || b.title || "";
    if (host) {
      f.appendChild(document.createTextNode("Source: "));
      var src = document.createElement("a");
      if (b.href) src.setAttribute("data-href", b.href);
      src.textContent = host;
      f.appendChild(src);
    }
    if (b.meta && b.meta.openInNative) {
      f.appendChild(document.createTextNode("  ·  "));
      var live = el("a", "live", "Open in Native");
      live.setAttribute("data-native", "1");
      f.appendChild(live);
    }
    var items = b.items || [];
    if (items.length) {
      var links = el("div", "foot-links");
      for (var i = 0; i < items.length; i++) { var ln = renderLink(items[i]); if (ln) { links.appendChild(ln); links.appendChild(document.createTextNode("   ")); } }
      f.appendChild(links);
    }
    if (b.blurb) f.appendChild(el("div", "foot-copy", b.blurb));
    return f;
  }
  // Site navigation renders as one tidy inline bar (no dropdown, no fat-button
  // stack). Deduped and capped so a 40-link megamenu does not become a wall.
  function renderMenu(b) {
    var items = b.items || [];
    if (!items.length) return null;
    var nav = el("div", "navbar");
    var seen = {}, n = 0;
    for (var i = 0; i < items.length && n < 12; i++) {
      var it = items[i];
      if (!it || !it.title) continue;
      var key = it.title.trim().toLowerCase();
      if (!key || key.length > 24 || seen[key]) continue;
      seen[key] = 1;
      var ln = renderLink(it);
      if (ln) { nav.appendChild(ln); n++; }
    }
    return n ? nav : null;
  }

  function renderBlock(b) {
    if (!b || !b.kind) return null;
    switch (b.kind) {
      case "teaser":
      case "hero":
      case "card":
        return renderCard(b);
      case "grid":
      case "list":
      case "carousel":
      case "gallery":
      case "stats": {
        var items = b.items || [];
        // Rows for article-style teasers (they carry a blurb); a compact
        // multi-column grid for tile-style items (products, galleries).
        var withBlurb = 0, total = 0;
        for (var i = 0; i < items.length; i++) { if (!items[i]) continue; total++; if (items[i].blurb) withBlurb++; }
        var compact = b.kind === "gallery" || b.kind === "carousel" || (total >= 3 && withBlurb <= total * 0.34);
        var wrap = el("div", "cards " + (b.kind === "stats" ? "stat-grid" : (compact ? "card-grid" : "card-list")));
        for (var j = 0; j < items.length; j++) { var c = renderBlock(items[j]); if (c) wrap.appendChild(c); }
        if (!wrap.childNodes.length) return null;
        if (b.title) { var sec = el("section", "sec"); sec.appendChild(el("h2", "sec-title", b.title)); sec.appendChild(wrap); return sec; }
        return wrap;
      }
      case "article": {
        var art = el("article", "doc");
        if (b.title) art.appendChild(el("h1", null, b.title));
        if (b.html) { var holder = document.createElement("div"); holder.innerHTML = b.html; while (holder.firstChild) art.appendChild(holder.firstChild); }
        else if (b.blurb) art.appendChild(el("p", null, b.blurb));
        return art;
      }
      case "masthead": return renderMasthead(b);
      case "footer": return renderFooter(b);
      case "menu": return renderMenu(b);
      case "link": return renderLink(b);
      default: {
        var d = el("div", "doc");
        if (b.title) d.appendChild(el("h2", null, b.title));
        if (b.blurb) d.appendChild(el("p", null, b.blurb));
        return d.childNodes.length ? d : null;
      }
    }
  }
  UCB.renderCanonical = function (blocks) {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < blocks.length; i++) { var node = renderBlock(blocks[i]); if (node) frag.appendChild(node); }
    return frag;
  };

  // ---- pipeline.run: the single entry point app.js will call at integration ----
  // Until baskets are registered this returns { blocks: [] }, so the app keeps
  // today's reader. It never throws.
  UCB.pipeline = UCB.pipeline || {};
  UCB.pipeline.run = function (html, base) {
    try {
      var doc = new DOMParser().parseFromString(html || "", "text/html");
      var host = util.host(base || "");
      var ctx = { doc: doc, base: base || "", host: host, framework: null, learned: null };
      if (typeof UCB.fingerprint === "function") ctx.framework = safe(function () { return UCB.fingerprint(ctx); });
      if (UCB.learned && typeof UCB.learned.apply === "function") ctx.learned = safe(function () { return UCB.learned.apply(ctx); });

      var root = (typeof UCB.segment === "function") ? UCB.segment(ctx) : null;
      if (!root) return { blocks: [], shapes: [], usedNative: false };

      var winners = UCB.classify(root, ctx);
      var blocks = UCB.assemble(winners, ctx);
      var shapes = (typeof UCB.toShapes === "function") ? (safe(function () { return UCB.toShapes(blocks, ctx); }) || []) : [];
      if (UCB.learned && typeof UCB.learned.record === "function") safe(function () { UCB.learned.record(winners, ctx); });
      return { blocks: blocks, shapes: shapes, usedNative: false };
    } catch (e) {
      return { blocks: [], shapes: [], usedNative: false };
    }
  };

  // ---- reference basket: teaser. The pattern Lanes 3 and 4 copy. ----
  // A repeated group whose items are link-cards becomes a teaser grid.
  UCB.baskets.teaser = {
    type: "teaser",
    detect: function (region, ctx) {
      if (!region || region.kind !== "group" || !region.items || region.items.length < 3) return 0;
      var good = 0;
      for (var i = 0; i < region.items.length; i++) {
        var n = region.items[i].node;
        if (!n) continue;
        var a = (n.tagName === "A") ? n : (n.querySelector ? n.querySelector("a[href]") : null);
        if (a && util.text(n).length >= 8) good++;
      }
      return good >= 3 ? Math.min(1, good / region.items.length) : 0;
    },
    normalize: function (region, ctx) {
      var items = [], seen = {};
      for (var i = 0; i < region.items.length; i++) {
        var n = region.items[i].node;
        if (!n || !n.querySelector) { if (n && !n.querySelector) { /* text node */ } }
        var a = (n.tagName === "A" && n.getAttribute("href")) ? n : (n.querySelector ? n.querySelector("a[href]") : null);
        // Search the whole item (title/price are often siblings of an image-only link).
        var scope = (n && n.querySelector) ? n : (a || n);
        var img = util.firstImg(n);
        // Pull a real hierarchy out of the card instead of concatenating all text.
        var h = scope.querySelector ? scope.querySelector("h1,h2,h3,h4,h5,h6,[class*=title],[class*=headline]") : null;
        var p = scope.querySelector ? scope.querySelector("p,[class*=blurb],[class*=excerpt],[class*=desc],[class*=summary]") : null;
        var eb = scope.querySelector ? scope.querySelector("[class*=eyebrow],[class*=kicker],[class*=tag],[class*=category],[class*=label]") : null;
        var pr = scope.querySelector ? scope.querySelector("[class*=price],[class*=amount]") : null;
        var title = util.text(h) || util.text(a) || util.text(n);
        if (!title) continue;
        var eyebrow = util.text(eb), blurb = util.text(p), price = util.text(pr);
        // never let eyebrow/blurb echo the title (that is the doubled-text bug).
        if (eyebrow && (title.indexOf(eyebrow) === 0 || eyebrow.length > 30)) eyebrow = "";
        if (blurb && blurb === title) blurb = "";
        if (price && price.length > 16) price = "";
        var src = img ? (util.attr(img, "src") || util.attr(img, "data-src")) : "";
        var key = title.trim().toLowerCase();
        if (!key || seen[key]) continue;
        seen[key] = 1;
        items.push({
          kind: "teaser",
          eyebrow: eyebrow ? eyebrow.slice(0, 32) : "",
          title: title.slice(0, 160),
          blurb: blurb ? blurb.slice(0, 220) : "",
          href: a ? util.resolve(a.getAttribute("href"), ctx.base) : "",
          media: src ? { src: util.resolve(src, ctx.base), alt: util.attr(img, "alt") } : null,
          meta: price ? { price: price } : null
        });
      }
      if (!items.length) return null;
      // Short bare links (no image, blurb, price, or headline-length title) are
      // navigation, not content - render them as one inline bar, never fat cards.
      var imgs = 0, blurbs = 0, prices = 0, longish = 0;
      for (var z = 0; z < items.length; z++) {
        if (items[z].media) imgs++;
        if (items[z].blurb) blurbs++;
        if (items[z].meta && items[z].meta.price) prices++;
        if (items[z].title.length > 28) longish++;
      }
      if (imgs === 0 && blurbs === 0 && prices === 0 && longish === 0) return { kind: "menu", items: items };
      return { kind: "grid", items: items };
    }
  };
})();
