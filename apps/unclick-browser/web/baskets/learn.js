// UnClick Browser - Baskets Engine - Lane 6: per-site learning and template store.
//
// Learns selector -> basket mappings per domain on the fly, persists them, and
// applies them on revisit so repeat sites render instantly and accurately.
// Learning is on by default.
//
// Pipeline seams (see BASKETS_ENGINE_PLAN.md section 2):
//   fingerprint(ctx) -> learned.apply(ctx) -> segment(ctx) -> classify -> ...
//   ... -> toShapes(blocks, ctx) -> learned.record(winners, ctx)
//
// apply runs BEFORE segmentation: it loads any known map for this domain and
// puts it on ctx.learned so the classifier can pre-tag regions.
// record runs AFTER classification: it stores the high-confidence winners.
//
// This file owns only window.UCB.learned (plus the per-domain image-size cache).
// It never throws into the pipeline: every public method has a try/catch guard
// and degrades to a safe no-op so the page falls back cleanly.
//
// Stored template schema (one row per domain), versioned for forward migration:
//   StoredTemplate = {
//     v: 1,
//     domain: string,            // ctx.host
//     framework: string | null,  // ctx.framework.name when known (Lane 5)
//     updatedAt: string,         // ISO timestamp of last write
//     map: Array<{
//       selector: string,        // stable selector that re-finds the region
//       basket: string,          // basket type, e.g. "teaser"
//       conf: number,            // 0..1 stored confidence (pre-decay)
//       samples: number,         // times this mapping has been observed
//       firstSeen: string,       // ISO timestamp
//       lastSeen: string         // ISO timestamp (decay anchor)
//     }>
//   }
//
// Image-size cache schema (co-defined with Lane 4 reader and Lane 7 pool):
//   key   = absolute image URL
//   value = { bytes: number, measuredAt: string }   // ISO timestamp

window.UCB = window.UCB || {};
UCB.baskets = UCB.baskets || {};

(function () {
  "use strict";

  // ---- tunable config (exposed for the Lane 8 harness) --------------------
  var config = {
    storePrefix: "ucb.learn.v1:",   // localStorage key prefix for templates
    imageKey: "ucb.imgcache.v1",    // localStorage key for the image-size cache
    recordMinScore: 0.55,           // only learn winners at or above this score
    applyMinConf: 0.45,             // only surface mappings at or above this conf
    initialConfMin: 0.30,           // floor for a brand-new mapping
    initialConfMax: 0.60,           // cap for a brand-new mapping
    learnRate: 0.34,                // asymptotic confidence growth per resighting
    confCeiling: 0.98,             // never claim certainty
    decayHalfLifeDays: 30,          // confidence half-life when a domain is unseen
    pruneFloor: 0.15,               // drop mappings whose decayed conf falls below
    maxPerDomain: 200,              // cap stored mappings per domain
    maxImageEntries: 2000           // cap the image-size cache (LRU by measuredAt)
  };

  var DAY_MS = 24 * 60 * 60 * 1000;

  // ---- observability counters (acceptance proof: revisit uses learned) ----
  var stats = {
    applies: 0,          // times apply ran
    appliedEntries: 0,   // total mappings surfaced across all applies
    hitsLastApply: 0,    // mappings surfaced on the most recent apply
    records: 0,          // times record ran
    recordedEntries: 0,  // total mappings written across all records
    lastDomain: null     // last domain touched
  };

  // ---- storage backend: localStorage in-app, memory shim elsewhere --------
  // The Lane 8 harness runs under Node where localStorage does not exist, so we
  // fall back to an in-memory map. Same interface either way.
  var memoryBackend = (function () {
    var data = {};
    return {
      getItem: function (k) { return Object.prototype.hasOwnProperty.call(data, k) ? data[k] : null; },
      setItem: function (k, v) { data[k] = String(v); },
      removeItem: function (k) { delete data[k]; },
      keys: function () { return Object.keys(data); }
    };
  })();

  function backend() {
    try {
      if (typeof localStorage !== "undefined" && localStorage) {
        // probe: some browsers expose localStorage but throw on write (private mode)
        var probe = "ucb.probe";
        localStorage.setItem(probe, "1");
        localStorage.removeItem(probe);
        return {
          getItem: function (k) { return localStorage.getItem(k); },
          setItem: function (k, v) { localStorage.setItem(k, v); },
          removeItem: function (k) { localStorage.removeItem(k); },
          keys: function () {
            var out = [];
            for (var i = 0; i < localStorage.length; i++) { out.push(localStorage.key(i)); }
            return out;
          }
        };
      }
    } catch (e) { /* fall through to memory */ }
    return memoryBackend;
  }

  function nowIso() { return new Date().toISOString(); }
  function nowMs() { return Date.now(); }
  function clamp(n, lo, hi) { return n < lo ? lo : (n > hi ? hi : n); }

  function readJson(key) {
    try {
      var raw = backend().getItem(key);
      if (!raw) { return null; }
      return JSON.parse(raw);
    } catch (e) { return null; }
  }

  function writeJson(key, value) {
    try {
      backend().setItem(key, JSON.stringify(value));
      return true;
    } catch (e) { return false; }
  }

  // ---- remote adapter seam (stub) -----------------------------------------
  // Future: cross-device sync via UnClick memory (unclick_call memory ops).
  // Defined as an interface only; not wired so no network happens yet. apply
  // and record stay synchronous and never await this.
  var remote = {
    enabled: false,
    pull: function (/* domain */) { return null; },   // returns StoredTemplate or null
    push: function (/* domain, template */) { return false; }
  };

  // ---- selector derivation -------------------------------------------------
  // Prefer a shared helper from Lane 2 (UCB.util) so Lane 6 and Lane 7 agree on
  // selector shape. Fall back to a local, deterministic css path otherwise.
  function sharedSelector(node) {
    try {
      var u = UCB && UCB.util;
      if (u) {
        if (typeof u.selectorFor === "function") { return u.selectorFor(node); }
        if (typeof u.cssPath === "function") { return u.cssPath(node); }
        if (typeof u.selector === "function") { return u.selector(node); }
      }
    } catch (e) { /* fall through to local */ }
    return localSelector(node);
  }

  function safeIdent(s) {
    // keep selectors valid and ascii; drop anything exotic
    return String(s || "").trim().replace(/[^A-Za-z0-9_-]/g, "");
  }

  function classToken(node) {
    var cls = node.getAttribute ? node.getAttribute("class") : node.className;
    if (!cls || typeof cls !== "string") { return ""; }
    var first = cls.split(/\s+/).map(safeIdent).filter(Boolean)[0];
    return first ? "." + first : "";
  }

  function nthOfType(node) {
    var parent = node.parentNode;
    if (!parent || !parent.children) { return 0; }
    var tag = node.tagName, i = 0, n = 0;
    for (var c = 0; c < parent.children.length; c++) {
      var sib = parent.children[c];
      if (sib.tagName === tag) {
        n++;
        if (sib === node) { i = n; }
      }
    }
    return n > 1 ? i : 0;
  }

  function localSelector(node) {
    try {
      if (!node || !node.tagName) { return ""; }
      var parts = [];
      var el = node;
      var depth = 0;
      while (el && el.tagName && depth < 6) {
        var tag = el.tagName.toLowerCase();
        var id = el.getAttribute ? el.getAttribute("id") : null;
        if (id && safeIdent(id) === id && id.length > 0) {
          parts.unshift("#" + id);
          break; // an id is unique enough to stop climbing
        }
        var seg = tag + classToken(el);
        var nth = nthOfType(el);
        if (nth) { seg += ":nth-of-type(" + nth + ")"; }
        parts.unshift(seg);
        el = el.parentNode;
        depth++;
      }
      return parts.join(" > ");
    } catch (e) { return ""; }
  }

  // ---- confidence + decay model -------------------------------------------
  function initialConf(score) {
    var s = typeof score === "number" ? score : 0.5;
    return clamp(s, config.initialConfMin, config.initialConfMax);
  }

  // asymptotic growth toward the ceiling on each fresh sighting
  function grow(conf) {
    var next = conf + (config.confCeiling - conf) * config.learnRate;
    return clamp(next, 0, config.confCeiling);
  }

  // exponential decay anchored on lastSeen; conf halves every half-life of disuse
  function decayedConf(entry, atMs) {
    var last = Date.parse(entry.lastSeen || entry.firstSeen || "");
    if (isNaN(last)) { return entry.conf || 0; }
    var ageDays = Math.max(0, (atMs - last) / DAY_MS);
    var factor = Math.pow(0.5, ageDays / config.decayHalfLifeDays);
    return (entry.conf || 0) * factor;
  }

  function basketType(basket) {
    if (!basket) { return ""; }
    if (typeof basket === "string") { return basket; }
    return basket.type || basket.kind || "";
  }

  // ---- template helpers ----------------------------------------------------
  function templateKey(domain) { return config.storePrefix + (domain || "unknown"); }

  function loadTemplate(domain) {
    var tpl = readJson(templateKey(domain));
    if (remote.enabled && !tpl) {
      try { tpl = remote.pull(domain) || null; } catch (e) { tpl = null; }
    }
    if (!tpl || !Array.isArray(tpl.map)) { return null; }
    return tpl;
  }

  function saveTemplate(domain, tpl) {
    tpl.updatedAt = nowIso();
    var ok = writeJson(templateKey(domain), tpl);
    if (remote.enabled) {
      try { remote.push(domain, tpl); } catch (e) { /* best effort */ }
    }
    return ok;
  }

  // prune decayed/low-confidence rows and cap the row count, deterministically
  function prune(tpl, atMs) {
    var rows = tpl.map.filter(function (e) {
      return e && e.selector && decayedConf(e, atMs) >= config.pruneFloor;
    });
    rows.sort(function (a, b) {
      var d = decayedConf(b, atMs) - decayedConf(a, atMs);
      if (d !== 0) { return d; }
      return a.selector < b.selector ? -1 : (a.selector > b.selector ? 1 : 0);
    });
    if (rows.length > config.maxPerDomain) { rows = rows.slice(0, config.maxPerDomain); }
    tpl.map = rows;
    return tpl;
  }

  // ---- apply: pre-load known maps onto ctx.learned ------------------------
  function apply(ctx) {
    try {
      if (!ctx || !ctx.host) { return ctx ? (ctx.learned = ctx.learned || null) : null; }
      stats.applies++;
      stats.lastDomain = ctx.host;
      var tpl = loadTemplate(ctx.host);
      if (!tpl) { ctx.learned = null; stats.hitsLastApply = 0; return ctx.learned; }
      var at = nowMs();
      // project stored rows down to the frozen ctx.learned shape, decayed + filtered
      var map = [];
      for (var i = 0; i < tpl.map.length; i++) {
        var e = tpl.map[i];
        if (!e || !e.selector || !e.basket) { continue; }
        var conf = decayedConf(e, at);
        if (conf < config.applyMinConf) { continue; }
        map.push({ selector: e.selector, basket: e.basket, conf: Number(conf.toFixed(4)) });
      }
      map.sort(function (a, b) {
        if (b.conf !== a.conf) { return b.conf - a.conf; }
        return a.selector < b.selector ? -1 : (a.selector > b.selector ? 1 : 0);
      });
      ctx.learned = map.length ? { map: map } : null;
      stats.hitsLastApply = map.length;
      stats.appliedEntries += map.length;
      return ctx.learned;
    } catch (e) {
      try { if (ctx) { ctx.learned = null; } } catch (e2) {}
      return null;
    }
  }

  // ---- record: persist the high-confidence winners ------------------------
  function record(winners, ctx) {
    try {
      if (!ctx || !ctx.host || !winners || !winners.length) { return false; }
      stats.records++;
      stats.lastDomain = ctx.host;
      var at = nowMs();
      var iso = nowIso();
      var tpl = loadTemplate(ctx.host) || {
        v: 1, domain: ctx.host, framework: null, updatedAt: iso, map: []
      };
      tpl.framework = (ctx.framework && ctx.framework.name) || tpl.framework || null;

      // index existing rows by selector for quick merge
      var bySelector = {};
      for (var i = 0; i < tpl.map.length; i++) {
        var row = tpl.map[i];
        if (row && row.selector) { bySelector[row.selector] = row; }
      }

      var wrote = 0;
      for (var w = 0; w < winners.length; w++) {
        var win = winners[w];
        if (!win || !win.region) { continue; }
        var score = typeof win.score === "number" ? win.score : 0;
        if (score < config.recordMinScore) { continue; }
        var basket = basketType(win.basket);
        if (!basket) { continue; }
        var node = win.region.node || win.region;
        var selector = sharedSelector(node);
        if (!selector) { continue; }

        var existing = bySelector[selector];
        if (existing && existing.basket === basket) {
          existing.conf = grow(existing.conf || initialConf(score));
          existing.samples = (existing.samples || 1) + 1;
          existing.lastSeen = iso;
        } else if (existing) {
          // selector now classifies as a different basket: let evidence decide
          var challenger = initialConf(score);
          if (challenger >= (existing.conf || 0)) {
            existing.basket = basket;
            existing.conf = challenger;
            existing.samples = 1;
            existing.firstSeen = iso;
            existing.lastSeen = iso;
          }
        } else {
          var fresh = {
            selector: selector,
            basket: basket,
            conf: initialConf(score),
            samples: 1,
            firstSeen: iso,
            lastSeen: iso
          };
          tpl.map.push(fresh);
          bySelector[selector] = fresh;
        }
        wrote++;
      }

      prune(tpl, at);
      saveTemplate(ctx.host, tpl);
      stats.recordedEntries += wrote;
      return wrote > 0;
    } catch (e) {
      return false;
    }
  }

  // ---- decay maintenance (callable; also runs inside record via prune) ----
  function decay(domain) {
    try {
      var at = nowMs();
      var domains = domain ? [domain] : listDomains();
      for (var i = 0; i < domains.length; i++) {
        var tpl = loadTemplate(domains[i]);
        if (!tpl) { continue; }
        prune(tpl, at);
        if (tpl.map.length) {
          saveTemplate(domains[i], tpl);
        } else {
          backend().removeItem(templateKey(domains[i]));
        }
      }
      return true;
    } catch (e) { return false; }
  }

  function listDomains() {
    try {
      var keys = backend().keys();
      var out = [];
      for (var i = 0; i < keys.length; i++) {
        if (keys[i].indexOf(config.storePrefix) === 0) {
          out.push(keys[i].slice(config.storePrefix.length));
        }
      }
      return out;
    } catch (e) { return []; }
  }

  // ---- per-domain image-size cache (Lane 4 reads, Lane 7 pools) ------------
  // Keyed by absolute image URL because images are shared across CDNs/domains.
  // Stored as one capped object so a busy session does not grow without bound.
  function imageCacheLoad() {
    var obj = readJson(config.imageKey);
    return (obj && typeof obj === "object") ? obj : {};
  }

  function imageCachePrune(obj) {
    var urls = Object.keys(obj);
    if (urls.length <= config.maxImageEntries) { return obj; }
    urls.sort(function (a, b) {
      var ta = Date.parse(obj[a] && obj[a].measuredAt) || 0;
      var tb = Date.parse(obj[b] && obj[b].measuredAt) || 0;
      return tb - ta; // newest first
    });
    var kept = {};
    for (var i = 0; i < config.maxImageEntries; i++) { kept[urls[i]] = obj[urls[i]]; }
    return kept;
  }

  var imageCache = {
    get: function (url) {
      try {
        if (!url) { return null; }
        var obj = imageCacheLoad();
        var hit = obj[url];
        if (hit && typeof hit.bytes === "number") { return hit; }
        return null;
      } catch (e) { return null; }
    },
    has: function (url) { return !!imageCache.get(url); },
    set: function (url, bytes) {
      try {
        if (!url || typeof bytes !== "number" || bytes < 0) { return null; }
        var obj = imageCacheLoad();
        var entry = { bytes: bytes, measuredAt: nowIso() };
        obj[url] = entry;
        obj = imageCachePrune(obj);
        writeJson(config.imageKey, obj);
        return entry;
      } catch (e) { return null; }
    },
    size: function () { try { return Object.keys(imageCacheLoad()).length; } catch (e) { return 0; } },
    clear: function () { try { backend().removeItem(config.imageKey); return true; } catch (e) { return false; } }
  };

  // ---- test/maintenance helpers -------------------------------------------
  function reset() {
    try {
      var keys = backend().keys();
      for (var i = 0; i < keys.length; i++) {
        if (keys[i].indexOf(config.storePrefix) === 0 || keys[i] === config.imageKey) {
          backend().removeItem(keys[i]);
        }
      }
      stats.applies = 0; stats.appliedEntries = 0; stats.hitsLastApply = 0;
      stats.records = 0; stats.recordedEntries = 0; stats.lastDomain = null;
      return true;
    } catch (e) { return false; }
  }

  // ---- public surface ------------------------------------------------------
  UCB.learned = {
    apply: apply,            // (ctx) -> ctx.learned        runs before segment
    record: record,          // (winners, ctx) -> boolean   runs after classify
    decay: decay,            // (domain?) -> boolean         prune stale mappings
    imageCache: imageCache,  // { get, has, set, size, clear }
    remote: remote,          // adapter seam (stubbed, disabled)
    config: config,          // tunables for the harness
    stats: stats,            // observability counters
    // exposed for tests / Lane 7 selector agreement:
    _selectorFor: sharedSelector,
    _loadTemplate: loadTemplate,
    _listDomains: listDomains,
    reset: reset
  };
})();
