// UnClick Browser - Lane 3: Frame baskets (masthead, footer, nav/megamenu).
// Registers three baskets into the shared UCB.baskets registry. This file owns
// ONLY these baskets. It never edits app.js, index.html, segment.js or core.js.
//
// Contracts (BASKETS_ENGINE_PLAN.md Section 3, FROZEN):
//   Basket   = { type, detect(region, ctx) -> 0..1, normalize(region, ctx) -> CanonicalBlock | CanonicalBlock[] }
//   Region   = { node, kind, signature, repeat, items, children, textLen, area }
//   ctx      = { doc, base, host, framework, learned }
//   Block    = { kind, title?, eyebrow?, href?, blurb?, media?{src,alt?}, items?[], html?, meta? }
//
// Emitted CanonicalBlock kinds (renderers owned by Lane 2 / core.js):
//   masthead -> { kind:"masthead", title, href, media?, meta:{host} }
//   footer   -> { kind:"footer", title, href, blurb?, items:[link], meta:{source, openInNative} }
//   menu     -> { kind:"menu", title, items:[link], meta:{collapsed, megamenu} }
//   link     -> { kind:"link", title, href }  (used inside footer.items and menu.items)
//
// Safety: every detect/normalize is wrapped in try/catch so a throw degrades to
// a no-op (score 0 or a minimal block) and the pipeline falls back to today's reader.

(function () {
  "use strict";

  window.UCB = window.UCB || {};
  UCB.baskets = UCB.baskets || {}; // Lane 2 owns the object; we only push into it.

  // ---- small private helpers (scoped, not exposed on UCB.util) ----------------

  function clamp(n) {
    if (typeof n !== "number" || isNaN(n)) return 0;
    if (n < 0) return 0;
    if (n > 1) return 1;
    return n;
  }

  function lc(s) {
    return (s == null ? "" : String(s)).toLowerCase();
  }

  function tagOf(node) {
    return node && node.tagName ? lc(node.tagName) : "";
  }

  function roleOf(node) {
    try {
      return node && node.getAttribute ? lc(node.getAttribute("role")) : "";
    } catch (e) {
      return "";
    }
  }

  function classOf(node) {
    // className can be a string or an SVGAnimatedString; coerce defensively.
    try {
      if (!node) return "";
      var c = node.className;
      if (c && typeof c === "object" && "baseVal" in c) return lc(c.baseVal);
      return lc(c);
    } catch (e) {
      return "";
    }
  }

  function text(node) {
    try {
      return node && node.textContent ? node.textContent.trim() : "";
    } catch (e) {
      return "";
    }
  }

  function abs(href, base) {
    if (!href) return "";
    var h = String(href).trim();
    if (!h || h.charAt(0) === "#") return "";
    if (/^(javascript|mailto|tel):/i.test(h)) return "";
    try {
      return new URL(h, base || undefined).href;
    } catch (e) {
      return h;
    }
  }

  function origin(base, host) {
    try {
      return new URL(base).origin + "/";
    } catch (e) {
      return host ? "https://" + host + "/" : (base || "/");
    }
  }

  function metaContent(doc, keys) {
    if (!doc || !doc.querySelector) return "";
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      var el =
        doc.querySelector('meta[property="' + k + '"]') ||
        doc.querySelector('meta[name="' + k + '"]');
      if (el && el.getAttribute) {
        var v = (el.getAttribute("content") || "").trim();
        if (v) return v;
      }
    }
    return "";
  }

  function cleanTitle(doc) {
    var t = "";
    try {
      t = doc && doc.title ? doc.title.trim() : "";
    } catch (e) {
      t = "";
    }
    if (!t) return "";
    // Titles are often "Page name - Site name"; keep the trailing site segment.
    var parts = t.split(/\s+[-|\u2013\u2014\u00B7:]\s+/);
    if (parts.length > 1) {
      var last = parts[parts.length - 1].trim();
      if (last && last.length <= 40) return last;
    }
    return t;
  }

  function siteName(doc, ctx) {
    return (
      metaContent(doc, ["og:site_name", "application-name"]) ||
      cleanTitle(doc) ||
      (ctx && ctx.host) ||
      ""
    );
  }

  // Pick a site logo: explicit logo image in the region, then og:image, then favicon.
  function pickLogo(doc, region, base) {
    var node = region && region.node;
    if (node && node.querySelectorAll) {
      var imgs = node.querySelectorAll("img");
      for (var i = 0; i < imgs.length && i < 12; i++) {
        var img = imgs[i];
        var hint = (
          lc(img.getAttribute && img.getAttribute("alt")) +
          " " +
          classOf(img) +
          " " +
          lc(img.getAttribute && img.getAttribute("id"))
        );
        if (/\blogo|brand|masthead\b/.test(hint)) {
          var src = img.getAttribute && (img.getAttribute("src") || img.getAttribute("data-src"));
          var u = abs(src, base);
          if (u) return u;
        }
      }
    }
    var og = abs(metaContent(doc, ["og:image", "twitter:image"]), base);
    if (og) return og;
    if (doc && doc.querySelector) {
      var icon =
        doc.querySelector('link[rel~="icon"]') ||
        doc.querySelector('link[rel="shortcut icon"]') ||
        doc.querySelector('link[rel="apple-touch-icon"]');
      if (icon && icon.getAttribute) {
        var fu = abs(icon.getAttribute("href"), base);
        if (fu) return fu;
      }
    }
    return "";
  }

  function findHomeLink(node, ctx) {
    if (!node || !node.querySelectorAll) return false;
    var home = origin(ctx && ctx.base, ctx && ctx.host);
    var as = node.querySelectorAll("a[href]");
    for (var i = 0; i < as.length && i < 30; i++) {
      var u = abs(as[i].getAttribute("href"), ctx && ctx.base);
      if (u && (u === home || u === home.replace(/\/$/, ""))) return true;
    }
    return false;
  }

  function findCopyright(node) {
    var t = text(node);
    if (!t) return "";
    // U+00A9 is the copyright sign; written as an escape to keep source ASCII.
    var re = /(\u00A9|\(c\)|copyright|all rights reserved)[^.\n]{0,80}/i;
    var m = t.match(re);
    if (m) return m[0].replace(/\s+/g, " ").trim().slice(0, 120);
    return "";
  }

  // Collect deduped link blocks under a node, capped.
  function collectLinks(node, base, max) {
    var out = [];
    var seen = {};
    if (!node || !node.querySelectorAll) return out;
    var as = node.querySelectorAll("a[href]");
    for (var i = 0; i < as.length; i++) {
      if (out.length >= max) break;
      var a = as[i];
      var label = text(a).replace(/\s+/g, " ").trim();
      var href = abs(a.getAttribute("href"), base);
      if (!label || !href) continue;
      if (label.length > 40) label = label.slice(0, 40).trim();
      var key = lc(label) + "|" + href;
      if (seen[key]) continue;
      seen[key] = true;
      out.push({ kind: "link", title: label, href: href });
    }
    return out;
  }

  // Top-level links only: prefer direct items of the first list, else shallow anchors.
  function collectTopLinks(node, base, max) {
    if (!node || !node.querySelector) return [];
    var list = node.querySelector("ul, ol");
    if (list) {
      var items = [];
      var seen = {};
      var lis = list.children ? list.children : [];
      for (var i = 0; i < lis.length; i++) {
        if (items.length >= max) break;
        var li = lis[i];
        if (tagOf(li) !== "li") continue;
        var a = li.querySelector ? li.querySelector("a[href]") : null;
        if (!a) continue;
        var label = text(a).replace(/\s+/g, " ").trim();
        var href = abs(a.getAttribute("href"), base);
        if (!label || !href) continue;
        if (label.length > 40) label = label.slice(0, 40).trim();
        var key = lc(label) + "|" + href;
        if (seen[key]) continue;
        seen[key] = true;
        items.push({ kind: "link", title: label, href: href });
      }
      if (items.length) return items;
    }
    return collectLinks(node, base, max);
  }

  function linkCount(node) {
    try {
      return node && node.querySelectorAll ? node.querySelectorAll("a[href]").length : 0;
    } catch (e) {
      return 0;
    }
  }

  // A megamenu is a nav with nested lists and a large link count.
  function isMegamenu(node) {
    if (!node || !node.querySelectorAll) return false;
    var nested = node.querySelectorAll("ul ul, [class*='mega']");
    return linkCount(node) >= 12 && nested.length >= 1;
  }

  // ---- masthead ---------------------------------------------------------------

  // A <header> nested inside article/main/section is a content/page-title header
  // (article-head, api-doc__header, page-title-wrap, mw-body-header), not the
  // site banner. These were cloning the masthead and stealing the page H1.
  function isContentHeader(node) {
    try {
      var p = node.parentElement || node.parentNode;
      while (p && p.tagName) {
        var t = p.tagName;
        if (t === "ARTICLE" || t === "MAIN" || t === "SECTION") return true;
        p = p.parentElement || p.parentNode;
      }
    } catch (e) {}
    return false;
  }

  // A real logo/brand <img> inside the region. Unlike pickLogo this does NOT
  // fall back to og:image, so the +0.15 detect bonus cannot be earned by any
  // page that merely has an og:image (which is almost every page).
  function hasLogoImg(region) {
    var node = region && region.node;
    if (!node || !node.querySelectorAll) return false;
    var imgs = node.querySelectorAll("img");
    for (var i = 0; i < imgs.length && i < 12; i++) {
      var img = imgs[i];
      var hint = (
        lc(img.getAttribute && img.getAttribute("alt")) + " " +
        classOf(img) + " " +
        lc(img.getAttribute && img.getAttribute("id"))
      );
      if (/\b(logo|brand|masthead)\b/.test(hint)) return true;
    }
    return false;
  }

  // A nav region (class/role) that is a breadcrumb, pager or social rail, not
  // the primary site menu. Used to skip these when collecting masthead nav and
  // to keep them out of the single "Menu" slot.
  function isSecondaryNav(node) {
    var c = classOf(node) + " " + roleOf(node) + " " + lc(node && node.getAttribute && node.getAttribute("aria-label"));
    return /breadcrumb|crumbs|pager|pagination|\btoc\b|social|share|skip|utility/.test(c);
  }

  // The header's primary navigation: the first <nav> that is not a breadcrumb/
  // pager/social rail, else the header itself (so a link list with no <nav>
  // wrapper is still collected).
  function primaryNav(node) {
    if (!node || !node.querySelectorAll) return node;
    var navs = node.querySelectorAll("nav");
    for (var i = 0; i < navs.length; i++) { if (!isSecondaryNav(navs[i])) return navs[i]; }
    return node;
  }

  UCB.baskets["masthead"] = {
    type: "masthead",
    detect: function (region, ctx) {
      try {
        var node = region && region.node;
        if (!node) return 0;
        var tag = tagOf(node);
        var role = roleOf(node);
        var cls = classOf(node);
        var bannerClass = /(masthead|site-header|global-header|topbar|navbar-brand|site-branding)/.test(cls);
        var hasNav = !!(node.querySelector && node.querySelector("nav"));
        var home = findHomeLink(node, ctx);
        // Only the site banner is a masthead. A bare <header> tag is not enough:
        // article/section/page-title headers are <header> too and were cloning
        // the masthead and discarding the page's real H1. A <header> counts as
        // the banner only when it carries a banner role/class, or it is a
        // top-level header (not nested in article/main/section) that actually
        // carries site nav or a home link.
        var isBanner = (role === "banner") || bannerClass ||
          (tag === "header" && !isContentHeader(node) && (hasNav || home));
        if (!isBanner) return 0;
        // role="banner" is definitive: a banner must outscore the nav nested
        // inside it so the classifier claims the masthead (parent-wins) instead
        // of descending to the menu and discarding the bar.
        var score = 0.5;
        if (role === "banner") score += 0.3;
        if (bannerClass) score += 0.2;
        if (hasLogoImg(region)) score += 0.15;   // a real logo <img>, not og:image
        if (home) score += 0.15;
        if (hasNav) score += 0.1;
        return clamp(score);
      } catch (e) {
        return 0;
      }
    },
    normalize: function (region, ctx) {
      try {
        var doc = ctx && ctx.doc;
        var base = ctx && ctx.base;
        var node = region && region.node;
        var name = siteName(doc, ctx) || (ctx && ctx.host) || "";
        var logo = pickLogo(doc, region, base);
        var block = {
          kind: "masthead",
          title: name,
          href: origin(base, ctx && ctx.host),
          meta: { host: ctx && ctx.host }
        };
        if (logo) block.media = { src: logo, alt: name };
        // Carry the site's primary nav. The classifier claims the whole banner
        // (parent-wins) and never descends to the nested <nav>, so without this
        // the main navigation was silently dropped on every page. Collect the
        // header's primary nav links (skip breadcrumb/pagination/social rails)
        // and hand them to the masthead renderer as an inline bar.
        var items = collectTopLinks(primaryNav(node), base, 8);
        if (items && items.length) block.items = items;
        return block;
      } catch (e) {
        return { kind: "masthead", title: (ctx && ctx.host) || "", meta: { host: ctx && ctx.host } };
      }
    }
  };

  // ---- footer -----------------------------------------------------------------

  UCB.baskets["footer"] = {
    type: "footer",
    detect: function (region, ctx) {
      try {
        var node = region && region.node;
        if (!node) return 0;
        var tag = tagOf(node);
        var role = roleOf(node);
        var cls = classOf(node);
        var base = 0;
        if (tag === "footer") base += 0.5;
        if (role === "contentinfo") base += 0.5;
        if (/(^|[^a-z])(footer|pagefoot|site-footer|colophon)/.test(cls)) base += 0.3;
        // A copyright line is a strong standalone footer signal even without a
        // <footer> tag; the link-count bonus only counts once structure exists.
        var cr = findCopyright(node) ? 0.3 : 0;
        if (base <= 0 && !cr) return 0;
        var score = base + cr;
        if (base > 0 && linkCount(node) >= 4) score += 0.1;
        return clamp(score);
      } catch (e) {
        return 0;
      }
    },
    normalize: function (region, ctx) {
      try {
        var doc = ctx && ctx.doc;
        var base = ctx && ctx.base;
        var node = region && region.node;
        var block = {
          kind: "footer",
          title: siteName(doc, ctx) || (ctx && ctx.host) || "",
          href: origin(base, ctx && ctx.host),
          items: collectLinks(node, base, 8),
          meta: { source: ctx && ctx.host, openInNative: true }
        };
        var cr = findCopyright(node);
        if (cr) block.blurb = cr;
        return block;
      } catch (e) {
        return {
          kind: "footer",
          title: (ctx && ctx.host) || "",
          meta: { source: ctx && ctx.host, openInNative: true }
        };
      }
    }
  };

  // ---- nav / megamenu ---------------------------------------------------------

  UCB.baskets["nav"] = {
    type: "nav",
    detect: function (region, ctx) {
      try {
        var node = region && region.node;
        if (!node) return 0;
        // A breadcrumb or pager is not the primary menu; keeping it out of the
        // single menu slot stops "Home / News / Transit" crumbs (or "1 2 3 Next")
        // rendering as the site navigation.
        if (isSecondaryNav(node)) return 0;
        var tag = tagOf(node);
        var role = roleOf(node);
        var cls = classOf(node);
        // Structural base gates the bonuses so a bare list of links inside body
        // content is not mistaken for a site menu.
        var base = 0;
        if (tag === "nav") base += 0.5;
        if (role === "navigation") base += 0.4;
        if (/(^|[^a-z])(nav|menu|megamenu)([^a-z]|$)/.test(cls)) base += 0.2;
        if (base <= 0) return 0;
        var score = base;
        var links = linkCount(node);
        if (node.querySelector && node.querySelector("ul a[href], ol a[href]") && links >= 3)
          score += 0.2;
        if (isMegamenu(node)) score += 0.2;
        // A nav nested inside a header should not outrank the masthead itself.
        return clamp(score);
      } catch (e) {
        return 0;
      }
    },
    normalize: function (region, ctx) {
      try {
        var base = ctx && ctx.base;
        var node = region && region.node;
        var items = collectTopLinks(node, base, 8);
        return {
          kind: "menu",
          title: "Menu",
          items: items,
          meta: { collapsed: true, megamenu: isMegamenu(node) }
        };
      } catch (e) {
        return { kind: "menu", title: "Menu", items: [], meta: { collapsed: true, megamenu: false } };
      }
    }
  };
})();
