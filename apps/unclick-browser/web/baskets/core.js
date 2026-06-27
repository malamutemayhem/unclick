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
    var card = document.createElement(b.href ? "a" : "div");
    card.className = "card" + (b.media && b.media.src ? "" : " card-text");
    if (b.href) card.setAttribute("data-href", b.href);
    if (b.media && b.media.src) {
      var img = document.createElement("img");
      img.className = "card-thumb"; img.src = b.media.src; img.alt = (b.media.alt || ""); img.loading = "lazy";
      card.appendChild(img);
    }
    var body = el("div", "card-body");
    if (b.eyebrow) body.appendChild(el("div", "card-eyebrow", b.eyebrow));
    if (b.title) body.appendChild(el("div", "card-title", b.title));
    if (b.blurb) body.appendChild(el("div", "card-blurb", b.blurb));
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
    var bar = el("div", "masthead");
    if (b.media && b.media.src) {
      var fav = document.createElement("img");
      fav.className = "fav"; fav.src = b.media.src; fav.alt = (b.media.alt || "");
      fav.onerror = function () { this.style.display = "none"; };
      bar.appendChild(fav);
    }
    var host = b.meta && b.meta.host;
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
      f.appendChild(document.createTextNode("  \u00B7  "));
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
  function renderMenu(b) {
    var items = b.items || [];
    if (!items.length) return null;
    var d = document.createElement("details");
    d.className = "menu";
    if (!(b.meta && b.meta.collapsed === true)) d.open = true;
    var s = document.createElement("summary");
    s.textContent = b.title || "Menu";
    d.appendChild(s);
    var wrap = el("div", "menu-links");
    for (var i = 0; i < items.length; i++) { var ln = renderLink(items[i]); if (ln) wrap.appendChild(ln); }
    d.appendChild(wrap);
    return d;
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
        var wrap = el("div", "doc");
        if (b.title) wrap.appendChild(el("h2", null, b.title));
        var items = b.items || [];
        for (var i = 0; i < items.length; i++) { var c = renderBlock(items[i]); if (c) wrap.appendChild(c); }
        return wrap.childNodes.length ? wrap : null;
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
      var items = [];
      for (var i = 0; i < region.items.length; i++) {
        var n = region.items[i].node;
        var a = (n.tagName === "A" && n.getAttribute("href")) ? n : (n.querySelector ? n.querySelector("a[href]") : null);
        var img = util.firstImg(n);
        var title = util.text(a || n);
        if (!title) continue;
        var src = img ? (util.attr(img, "src") || util.attr(img, "data-src")) : "";
        items.push({
          kind: "teaser",
          title: title.slice(0, 200),
          href: a ? util.resolve(a.getAttribute("href"), ctx.base) : "",
          media: src ? { src: util.resolve(src, ctx.base), alt: util.attr(img, "alt") } : null
        });
      }
      if (!items.length) return null;
      return { kind: "grid", items: items };
    }
  };
})();
