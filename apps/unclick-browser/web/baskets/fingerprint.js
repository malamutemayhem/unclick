// UnClick Browser - Baskets Engine - Lane 5: framework and CMS fingerprinting.
// Exposes UCB.fingerprint(ctx) -> { name, confidence, hints } | null (Section 3.5).
// Reads ctx.doc only. Never throws and never blocks the pipeline: returns null on
// an empty or unknown document so classify/assemble proceed exactly as before.
// Loads before core.js, so this file is fully self-contained (no UCB.util at load).
window.UCB = window.UCB || {};

(function () {
  // Caps keep the one-time scrape cheap on huge pages. The document is detached
  // (built by DOMParser in pipeline.run) so reading nodes has no layout cost.
  var SRC_CAP = 24000;     // combined script[src] + link[href] text
  var INLINE_CAP = 40000;  // combined inline <script> text
  var INLINE_PER = 4000;   // per-script slice so one big bundle cannot dominate
  var THRESHOLD = 0.35;    // below this we report null (unknown) rather than guess

  function lower(s) { return (s == null ? "" : String(s)).toLowerCase(); }

  // ---- one cheap pass over the document into a few lowercase haystacks ----
  function buildEnv(doc, host) {
    var htmlEl = doc.documentElement || null;
    var bodyEl = doc.body || null;

    var gen = "";
    var g = doc.querySelector('meta[name="generator"]');
    if (g) gen = lower(g.getAttribute("content"));

    var srcs = "";
    var res = doc.querySelectorAll("script[src], link[href]");
    for (var i = 0; i < res.length && srcs.length < SRC_CAP; i++) {
      var u = res[i].getAttribute("src") || res[i].getAttribute("href") || "";
      if (u) srcs += lower(u) + "\n";
    }

    var inline = "";
    var scripts = doc.querySelectorAll("script:not([src])");
    for (var j = 0; j < scripts.length && inline.length < INLINE_CAP; j++) {
      var t = scripts[j].textContent || "";
      if (t) inline += lower(t.slice(0, INLINE_PER)) + "\n";
    }

    var cls = "";
    if (bodyEl && bodyEl.getAttribute) cls += lower(bodyEl.getAttribute("class") || "");
    if (htmlEl && htmlEl.getAttribute) cls += " " + lower(htmlEl.getAttribute("class") || "");

    return { doc: doc, html: htmlEl, body: bodyEl, gen: gen, srcs: srcs, inline: inline, cls: cls, host: lower(host) };
  }

  // ---- signal helpers (all boolean, all defensive) ----
  function genHas(env, s) { return env.gen.indexOf(s) >= 0; }
  function srcHas(env, s) { return env.srcs.indexOf(s) >= 0; }
  function inlineHas(env, s) { return env.inline.indexOf(s) >= 0; }
  function clsHas(env, s) { return env.cls.indexOf(s) >= 0; }
  function sel(env, q) { try { return !!env.doc.querySelector(q); } catch (e) { return false; } }
  function attrOn(el, a) { return !!(el && el.hasAttribute && el.hasAttribute(a)); }
  function hostHas(env, s) { var h = env.host; return h === s || h.indexOf("." + s) >= 0 || (h.length > s.length && h.indexOf(s) === h.length - s.length); }
  function metaProp(env, prop) { var m = env.doc.querySelector('meta[property="' + prop + '"]'); return m ? lower(m.getAttribute("content")) : ""; }

  // ---- signature DB: each framework scores a set of weighted signals ----
  // A single strong, near-unique marker (generator tag, framework root node, vendor
  // CDN) is weighted to clear THRESHOLD on its own; weak class hints only nudge.
  // sig entry = [matched(boolean), weight, label?]. Score = sum of matched weights.
  var DB = [
    { name: "WordPress",
      selectors: { nav: "#site-navigation, .main-navigation", footer: "#colophon, .site-footer" },
      signals: function (e) { return [
        [genHas(e, "wordpress"), 0.7, "generator"],
        [srcHas(e, "/wp-content/") || srcHas(e, "/wp-includes/"), 0.6, "wp-paths"],
        [sel(e, 'link[rel="https://api.w.org/"]'), 0.4, "rest-link"],
        [clsHas(e, "wp-"), 0.2, "wp-class"],
        [inlineHas(e, "wpemoji") || inlineHas(e, "wp-emoji"), 0.2, "wp-emoji"]
      ]; } },

    { name: "Next.js",
      selectors: { root: "#__next" },
      signals: function (e) { return [
        [sel(e, "#__NEXT_DATA__"), 0.8, "next-data"],
        [genHas(e, "next.js"), 0.6, "generator"],
        [srcHas(e, "/_next/static/"), 0.6, "next-static"],
        [sel(e, "#__next"), 0.4, "next-root"]
      ]; } },

    { name: "Nuxt",
      selectors: { root: "#__nuxt, #__layout" },
      signals: function (e) { return [
        [sel(e, "#__nuxt"), 0.7, "nuxt-root"],
        [inlineHas(e, "window.__nuxt__"), 0.7, "nuxt-state"],
        [srcHas(e, "/_nuxt/"), 0.6, "nuxt-assets"],
        [genHas(e, "nuxt"), 0.6, "generator"],
        [sel(e, "#__layout"), 0.3, "nuxt-layout"]
      ]; } },

    { name: "Gatsby",
      selectors: { root: "#___gatsby" },
      signals: function (e) { return [
        [sel(e, "#___gatsby"), 0.8, "gatsby-root"],
        [genHas(e, "gatsby"), 0.6, "generator"],
        [sel(e, "#gatsby-focus-wrapper"), 0.4, "gatsby-focus"],
        [srcHas(e, "/page-data/") || inlineHas(e, "___gatsby"), 0.3, "page-data"]
      ]; } },

    { name: "Shopify",
      selectors: { nav: ".site-nav, .header__menu", footer: ".site-footer, .footer" },
      signals: function (e) { return [
        [srcHas(e, "cdn.shopify.com") || srcHas(e, "cdn.shopifycdn.net") || srcHas(e, "/cdn/shop/"), 0.8, "shopify-cdn"],
        [inlineHas(e, "shopify.theme") || inlineHas(e, "window.shopify") || inlineHas(e, "var shopify"), 0.6, "shopify-global"],
        [metaProp(e, "og:type") === "product", 0.2, "og-product"]
      ]; } },

    { name: "Squarespace",
      selectors: { footer: "#footer, .sqs-layout" },
      signals: function (e) { return [
        [genHas(e, "squarespace"), 0.8, "generator"],
        [srcHas(e, "static1.squarespace.com") || srcHas(e, "squarespace.com"), 0.5, "sqsp-cdn"],
        [inlineHas(e, "squarespace_context") || inlineHas(e, "static.squarespace"), 0.5, "sqsp-context"],
        [clsHas(e, "sqs-"), 0.3, "sqs-class"]
      ]; } },

    { name: "Wix",
      selectors: { root: "#SITE_CONTAINER" },
      signals: function (e) { return [
        [genHas(e, "wix.com"), 0.8, "generator"],
        [srcHas(e, "parastorage.com") || srcHas(e, "wixstatic.com"), 0.6, "wix-cdn"],
        [sel(e, "#SITE_CONTAINER, #site-container"), 0.4, "wix-root"],
        [inlineHas(e, "wix-warmup-data") || inlineHas(e, "wixbisession"), 0.4, "wix-warmup"]
      ]; } },

    { name: "Webflow",
      selectors: { nav: ".w-nav", footer: ".w-footer, .footer" },
      signals: function (e) { return [
        [attrOn(e.html, "data-wf-page") || attrOn(e.html, "data-wf-site"), 0.8, "wf-attr"],
        [genHas(e, "webflow"), 0.7, "generator"],
        [clsHas(e, "w-nav") || clsHas(e, "w-container"), 0.3, "w-class"],
        [srcHas(e, "webflow"), 0.3, "webflow-js"]
      ]; } },

    { name: "Drupal",
      selectors: { nav: "#block-mainnavigation, .menu", footer: ".site-footer, #footer" },
      signals: function (e) { return [
        [genHas(e, "drupal"), 0.7, "generator"],
        [inlineHas(e, "drupalsettings") || inlineHas(e, "drupal.settings"), 0.6, "drupal-settings"],
        [srcHas(e, "/sites/default/files") || srcHas(e, "/core/misc/drupal"), 0.5, "drupal-paths"],
        [attrOn(e.body, "data-once") || clsHas(e, "drupal"), 0.2, "drupal-misc"]
      ]; } },

    { name: "Medium",
      signals: function (e) { return [
        [srcHas(e, "cdn-client.medium.com") || srcHas(e, "glyph.medium.com"), 0.8, "medium-cdn"],
        [metaProp(e, "og:site_name") === "medium", 0.5, "og-site"],
        [hostHas(e, "medium.com"), 0.5, "host"],
        [inlineHas(e, "__apollo_state__") && inlineHas(e, "medium"), 0.3, "apollo"]
      ]; } },

    { name: "Substack",
      selectors: { footer: ".footer-buttons, .subscribe-widget" },
      signals: function (e) { return [
        [srcHas(e, "substackcdn.com"), 0.7, "substack-cdn"],
        [hostHas(e, "substack.com"), 0.6, "host"],
        [genHas(e, "substack"), 0.6, "generator"],
        [sel(e, ".subscribe-widget") || inlineHas(e, "window._preloads"), 0.4, "substack-markers"]
      ]; } },

    // Cheap generator-only entries: very low false-positive, broaden coverage.
    { name: "Ghost",
      signals: function (e) { return [
        [genHas(e, "ghost"), 0.8, "generator"],
        [srcHas(e, "/ghost/") || inlineHas(e, "ghost-search"), 0.3, "ghost-paths"]
      ]; } },

    { name: "Hugo",
      signals: function (e) { return [
        [genHas(e, "hugo"), 0.85, "generator"]
      ]; } },

    { name: "Jekyll",
      signals: function (e) { return [
        [genHas(e, "jekyll"), 0.85, "generator"]
      ]; } }
  ];

  // Public entry point. Pure function of ctx.doc; deterministic; never throws.
  UCB.fingerprint = function (ctx) {
    try {
      var doc = ctx && ctx.doc;
      if (!doc || typeof doc.querySelector !== "function") return null;
      var env = buildEnv(doc, ctx && ctx.host);

      var best = null;
      for (var i = 0; i < DB.length; i++) {
        var sigs = DB[i].signals(env);
        var score = 0;
        var markers = [];
        for (var k = 0; k < sigs.length; k++) {
          if (sigs[k][0]) { score += sigs[k][1]; if (sigs[k][2]) markers.push(sigs[k][2]); }
        }
        if (!best || score > best.score) {
          best = { name: DB[i].name, score: score, markers: markers, selectors: DB[i].selectors || null };
        }
      }

      if (!best || best.score < THRESHOLD) return null;
      var confidence = best.score > 1 ? 1 : best.score;
      confidence = Math.round(confidence * 100) / 100;
      return {
        name: best.name,
        confidence: confidence,
        hints: {
          generator: env.gen || null,
          markers: best.markers,
          basketSelectors: best.selectors
        }
      };
    } catch (e) {
      return null;
    }
  };
})();
