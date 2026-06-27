// Lane 7 - MCP-shape pooling and the accreting index.
//
// One observation, two outputs: the same CanonicalBlock that Lane 2 renders
// into a calm human Zen block is also turned here into an agent-readable
// Shape. Shapes pool across users into a shared index of site shapes, so the
// web is mapped once and reused by every agent. "It sees SHAPE, not data."
//
// This file owns:
//   UCB.toShapes(blocks, ctx) -> Shape[]      (Section 3.6 builder)
//   UCB.shapes                                (dedup/merge pool, local stub)
//   UCB.imageSizeCache                         (cross-user image-size cache that
//                                               Lane 4's imageRules.size reads)
//   UCB.shapeMCP                               (proposed MCP exposure, local stub)
//
// Contracts are FROZEN (plan Section 3). This lane is strictly additive and
// safe: toShapes never throws (it catches internally and returns a partial or
// empty list), so pipeline.run can always fall back to today's reader.
//
// House rules: ASCII only, no em dashes, plain browser JS, no bundler. The
// module attaches to the single global namespace UCB and is loaded as a plain
// <script> tag before app.js. It reads only detached, already-parsed data; it
// never runs page HTML.

(function () {
  "use strict";

  window.UCB = window.UCB || {};
  var UCB = window.UCB;

  // ----- small local helpers (kept here so this lane has no hard import on
  // core.js; if UCB.util later exposes equivalents, prefer those) ------------

  function isObj(v) {
    return v !== null && typeof v === "object";
  }

  function str(v) {
    return typeof v === "string" ? v : "";
  }

  function clamp01(n) {
    if (typeof n !== "number" || isNaN(n)) return 0;
    if (n < 0) return 0;
    if (n > 1) return 1;
    return n;
  }

  function round2(n) {
    return Math.round(n * 100) / 100;
  }

  // Deterministic-friendly clock. The harness can pass ctx.now (an ISO string)
  // for stable snapshots; the live app falls back to the real clock. updatedAt
  // is metadata, never part of a shape's identity, so this never affects dedup.
  function nowIso(ctx) {
    if (isObj(ctx) && typeof ctx.now === "string" && ctx.now) return ctx.now;
    try {
      return new Date().toISOString();
    } catch (e) {
      return "";
    }
  }

  function hostOf(ctx) {
    if (!isObj(ctx)) return "";
    if (typeof ctx.host === "string" && ctx.host) return ctx.host;
    var base = str(ctx.base);
    if (!base) return "";
    // Cheap host extraction without leaning on URL() so this stays safe on any
    // partial base string. "https://news.com.au/path" -> "news.com.au".
    var m = base.replace(/^[a-z]+:\/\//i, "");
    var slash = m.indexOf("/");
    if (slash >= 0) m = m.slice(0, slash);
    var at = m.indexOf("@");
    if (at >= 0) m = m.slice(at + 1);
    var colon = m.indexOf(":");
    if (colon >= 0) m = m.slice(0, colon);
    return m.toLowerCase();
  }

  // ----- selector + field derivation ---------------------------------------
  //
  // A Shape needs a stable selector that re-finds its region, plus field
  // selectors that re-find each datum inside it. The ideal source is Lane 2 /
  // Lane 6 stamping block.meta.selector (and block.meta.fields) from the live
  // region. When that is absent we degrade to deterministic, basket-keyed
  // synthetic selectors so the shape is still well-formed and mergeable.

  function blockSelector(block, basket, ctx) {
    var meta = isObj(block.meta) ? block.meta : {};
    // Prefer the shared helper so a pooled shape's selector is byte-identical to
    // what Lane 6's learned store records for the same region. Defensive: if the
    // helper is absent (this lane loaded standalone) or returns nothing, fall
    // back to the local chain below.
    if (UCB.util && typeof UCB.util.selectorFor === "function") {
      try {
        var shared = UCB.util.selectorFor(block, ctx);
        if (typeof shared === "string" && shared) return shared;
      } catch (e) {
        // fall through to the local chain
      }
    }
    if (typeof meta.selector === "string" && meta.selector) return meta.selector;
    if (isObj(meta.region) && typeof meta.region.selector === "string" && meta.region.selector) {
      return meta.region.selector;
    }
    // A Lane 1 structural signature, if carried through, gives a stable and
    // reasonably unique synthetic selector for the region.
    if (typeof meta.signature === "string" && meta.signature) {
      return '[data-ucb-sig="' + cssEscape(meta.signature) + '"]';
    }
    return '[data-ucb-basket="' + cssEscape(basket) + '"]';
  }

  // Minimal CSS attribute-value escaper for synthetic selectors: keep ASCII
  // word chars and a small safe set, drop the rest. Deterministic.
  function cssEscape(s) {
    return String(s).replace(/[^A-Za-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "");
  }

  // Conventional field selectors used when the block does not carry explicit
  // ones. These are intentionally loose so they re-find the field across the
  // repeated items of a basket region.
  var FIELD_DEFAULT_SELECTOR = {
    title: "h1, h2, h3, [class*=title], [class*=heading]",
    eyebrow: "[class*=eyebrow], [class*=kicker], [class*=label]",
    href: "a[href]",
    image: "img[src], source[srcset]",
    blurb: "p, [class*=summary], [class*=excerpt], [class*=desc]"
  };

  // Map a canonical field name to a Shape.fields[].kind tag.
  var FIELD_KIND = {
    title: "text",
    eyebrow: "text",
    href: "link",
    image: "image",
    blurb: "text"
  };

  function fieldFrom(block, name) {
    var meta = isObj(block.meta) ? block.meta : {};
    var metaFields = isObj(meta.fields) ? meta.fields : null;
    var sel = metaFields && typeof metaFields[name] === "string" && metaFields[name]
      ? metaFields[name]
      : FIELD_DEFAULT_SELECTOR[name];
    return { name: name, selector: sel || "", kind: FIELD_KIND[name] || "text" };
  }

  // Decide which canonical fields a block actually carries. For a grid/list/
  // carousel/stats block the representative item is items[0]; for a single
  // block the block itself.
  function representativeItem(block) {
    if (Array.isArray(block.items) && block.items.length && isObj(block.items[0])) {
      return block.items[0];
    }
    return block;
  }

  function presentFields(block) {
    var item = representativeItem(block);
    var fields = [];
    if (str(item.title)) fields.push(fieldFrom(block, "title"));
    if (str(item.eyebrow)) fields.push(fieldFrom(block, "eyebrow"));
    if (str(item.href)) fields.push(fieldFrom(block, "href"));
    if (isObj(item.media) && str(item.media.src)) fields.push(fieldFrom(block, "image"));
    if (str(item.blurb)) fields.push(fieldFrom(block, "blurb"));
    return fields;
  }

  // sampleCount = how many instances of this shape were observed in one pass.
  // A grid of 4 teasers is 4 samples of one teaser shape.
  function sampleCountOf(block) {
    if (Array.isArray(block.items) && block.items.length) return block.items.length;
    return 1;
  }

  // ----- confidence ---------------------------------------------------------
  //
  // Two signals, both deterministic:
  //   sampleScore - more observed instances => more trust. 1 -> 0.5, 3 -> 0.75,
  //                 9 -> 0.9, asymptotic to 1.
  //   fieldScore  - richer, more complete shapes are more useful. fraction of
  //                 the expected canonical fields that are present.
  // confidence = 0.6 * sampleScore + 0.4 * fieldScore, clamped and rounded.

  var EXPECTED_FIELDS = 4; // title, href, image, blurb: the useful teaser core.

  function sampleScore(sampleCount) {
    var n = sampleCount > 0 ? sampleCount : 1;
    return 1 - 1 / (1 + n);
  }

  function fieldScore(fieldCount) {
    var f = fieldCount > EXPECTED_FIELDS ? EXPECTED_FIELDS : fieldCount;
    return f / EXPECTED_FIELDS;
  }

  function confidenceFrom(sampleCount, fieldCount) {
    return round2(clamp01(0.6 * sampleScore(sampleCount) + 0.4 * fieldScore(fieldCount)));
  }

  // ----- Shape builder (Section 3.6) ----------------------------------------

  function shapeFromBlock(block, ctx, domain) {
    if (!isObj(block)) return null;
    var basket = str(block.kind);
    if (!basket) return null;
    var fields = presentFields(block);
    var sampleCount = sampleCountOf(block);
    return {
      domain: domain,
      basket: basket,
      selector: blockSelector(block, basket, ctx),
      fields: fields,
      sampleCount: sampleCount,
      confidence: confidenceFrom(sampleCount, fields.length),
      updatedAt: nowIso(ctx)
    };
  }

  // UCB.toShapes(blocks, ctx) -> Shape[]
  // Never throws. One bad block is skipped, not fatal.
  function toShapes(blocks, ctx) {
    var out = [];
    try {
      if (!Array.isArray(blocks)) return out;
      var domain = hostOf(ctx);
      for (var i = 0; i < blocks.length; i++) {
        try {
          var shape = shapeFromBlock(blocks[i], ctx, domain);
          if (shape) out.push(shape);
        } catch (inner) {
          // skip this block, keep the rest
        }
      }
    } catch (e) {
      return out;
    }
    return out;
  }

  // ----- dedup / merge pool (local stub for the accreting index) ------------
  //
  // Merge spec (frozen behaviour): two shapes are the same observation when
  // domain + basket + selector match. Merging sums sampleCount, unions fields
  // by name, recomputes confidence from the combined counts, and keeps the
  // newest updatedAt. The pool here is an in-memory Map standing in for the
  // cross-user shared index; the real index lives behind the MCP surface
  // described in UCB.shapeMCP and shape-mcp.design.md.

  function shapeKey(shape) {
    return str(shape.domain) + "|" + str(shape.basket) + "|" + str(shape.selector);
  }

  function unionFields(a, b) {
    var byName = {};
    var order = [];
    function add(list) {
      if (!Array.isArray(list)) return;
      for (var i = 0; i < list.length; i++) {
        var f = list[i];
        if (!isObj(f) || !str(f.name)) continue;
        if (!byName[f.name]) order.push(f.name);
        // Prefer an explicit, longer selector over a default one.
        var existing = byName[f.name];
        if (!existing || str(f.selector).length > str(existing.selector).length) {
          byName[f.name] = { name: f.name, selector: str(f.selector), kind: str(f.kind) || "text" };
        }
      }
    }
    add(a);
    add(b);
    return order.map(function (n) { return byName[n]; });
  }

  function newerIso(a, b) {
    a = str(a);
    b = str(b);
    if (!a) return b;
    if (!b) return a;
    return a >= b ? a : b;
  }

  function mergeShapes(existing, incoming) {
    if (!isObj(existing)) return incoming;
    if (!isObj(incoming)) return existing;
    var fields = unionFields(existing.fields, incoming.fields);
    var sampleCount = (existing.sampleCount || 0) + (incoming.sampleCount || 0);
    return {
      domain: existing.domain,
      basket: existing.basket,
      selector: existing.selector,
      fields: fields,
      sampleCount: sampleCount,
      confidence: confidenceFrom(sampleCount, fields.length),
      updatedAt: newerIso(existing.updatedAt, incoming.updatedAt)
    };
  }

  function makeShapePool() {
    var map = {};
    return {
      // observe(shape) -> the merged shape now stored under its key.
      observe: function (shape) {
        if (!isObj(shape)) return null;
        var key = shapeKey(shape);
        map[key] = map[key] ? mergeShapes(map[key], shape) : shape;
        return map[key];
      },
      // observeAll(shapes) -> the list of merged shapes.
      observeAll: function (shapes) {
        var res = [];
        if (!Array.isArray(shapes)) return res;
        for (var i = 0; i < shapes.length; i++) {
          var merged = this.observe(shapes[i]);
          if (merged) res.push(merged);
        }
        return res;
      },
      get: function (shape) {
        return map[shapeKey(shape)] || null;
      },
      all: function () {
        var res = [];
        for (var k in map) {
          if (Object.prototype.hasOwnProperty.call(map, k)) res.push(map[k]);
        }
        return res;
      },
      size: function () {
        return this.all().length;
      },
      clear: function () {
        map = {};
      }
    };
  }

  // ----- cross-user image-size cache ----------------------------------------
  //
  // Lane 4's 400KB image cap needs the measured byte size of each image. Paying
  // that HEAD check per visit, per user, is wasteful. Lane 7 owns the pooled
  // cache so any image is measured once for everyone: key = absolute image URL,
  // value = { bytes, measuredAt }. Lane 4 reads it (UCB.imageRules.size reads
  // this cache first, then the Rust image_sizes command, then allows the load);
  // Lane 6 mirrors a per-domain slice into local storage for fast cold starts.
  //
  // Schema agreed with Lane 4 and Lane 6:
  //   entry = { bytes: number, measuredAt: string(ISO) }
  // mergePooled keeps the newest measurement when two sources disagree.

  function makeImageSizeCache() {
    var map = {};

    function normUrl(url) {
      return str(url).trim();
    }

    return {
      has: function (url) {
        return Object.prototype.hasOwnProperty.call(map, normUrl(url));
      },
      get: function (url) {
        var k = normUrl(url);
        return Object.prototype.hasOwnProperty.call(map, k) ? map[k] : null;
      },
      // set(url, bytes, measuredAt?) -> the stored entry, or null if invalid.
      set: function (url, bytes, measuredAt) {
        var k = normUrl(url);
        if (!k || typeof bytes !== "number" || isNaN(bytes) || bytes < 0) return null;
        var when = str(measuredAt) || nowIso(null);
        var prior = map[k];
        // Keep the newest measurement on conflict.
        if (prior && str(prior.measuredAt) > when) return prior;
        map[k] = { bytes: bytes, measuredAt: when };
        return map[k];
      },
      // mergePooled(entries) accepts a cross-user export shaped as either a
      // plain object { url: {bytes, measuredAt} } or an array of
      // { url, bytes, measuredAt }. Newest measurement wins.
      mergePooled: function (entries) {
        if (Array.isArray(entries)) {
          for (var i = 0; i < entries.length; i++) {
            var e = entries[i];
            if (isObj(e)) this.set(e.url, e.bytes, e.measuredAt);
          }
        } else if (isObj(entries)) {
          for (var url in entries) {
            if (Object.prototype.hasOwnProperty.call(entries, url)) {
              var v = entries[url];
              if (isObj(v)) this.set(url, v.bytes, v.measuredAt);
            }
          }
        }
        return this.size();
      },
      // entries() -> array form for export to the pooled index / persistence.
      entries: function () {
        var res = [];
        for (var k in map) {
          if (Object.prototype.hasOwnProperty.call(map, k)) {
            res.push({ url: k, bytes: map[k].bytes, measuredAt: map[k].measuredAt });
          }
        }
        return res;
      },
      size: function () {
        return this.entries().length;
      },
      clear: function () {
        map = {};
      }
    };
  }

  // ----- MCP exposure (proposed surface, local stub) ------------------------
  //
  // How pooled shapes reach agents. The shared index is UnClick Memory: a small
  // set of memory ops, callable today through the hidden meta-tool unclick_call
  // with endpoint_id "memory.<op>" (matching the repo's existing memory.* op
  // surface) and no new top-level MCP registration, per CLAUDE.md. The full
  // contract is in shape-mcp.design.md. This object is the runnable stub a
  // follow-up PR wires to the real ops; it shapes payloads but performs no
  // network or secret access. Secrets, when the API path is used, go in the
  // Authorization header only and are never logged.

  function shapeToPoolArgs(shape) {
    return {
      domain: str(shape.domain),
      basket: str(shape.basket),
      selector: str(shape.selector),
      fields: Array.isArray(shape.fields) ? shape.fields : [],
      sampleCount: shape.sampleCount || 0,
      confidence: typeof shape.confidence === "number" ? shape.confidence : 0,
      updatedAt: str(shape.updatedAt)
    };
  }

  var shapeMCP = {
    // Proposed memory ops. Names are descriptive and namespaced under memory.*
    // so they ride the existing dispatcher.
    OPS: {
      pool: "memory.pool_shape",     // upsert + merge one observed shape
      query: "memory.get_shapes",    // fetch pooled shapes for a domain/basket
      poolImage: "memory.pool_image_size", // upsert one image-size measurement
      queryImage: "memory.get_image_sizes" // fetch measured sizes for urls
    },

    // toCalls(shapes) -> the unclick_call payloads a client would issue to pool
    // a pass worth of shapes. A pure transform; issues nothing itself.
    toCalls: function (shapes) {
      var calls = [];
      if (!Array.isArray(shapes)) return calls;
      for (var i = 0; i < shapes.length; i++) {
        if (!isObj(shapes[i])) continue;
        calls.push({
          tool: "unclick_call",
          endpoint_id: this.OPS.pool,
          args: shapeToPoolArgs(shapes[i])
        });
      }
      return calls;
    },

    // imageCallsFrom(cache) -> pooling calls for measured image sizes.
    imageCallsFrom: function (cache) {
      var calls = [];
      if (!cache || typeof cache.entries !== "function") return calls;
      var entries = cache.entries();
      for (var i = 0; i < entries.length; i++) {
        calls.push({
          tool: "unclick_call",
          endpoint_id: this.OPS.poolImage,
          args: { url: entries[i].url, bytes: entries[i].bytes, measuredAt: entries[i].measuredAt }
        });
      }
      return calls;
    },

    // describeSurface() -> the proposed contract as data, for tooling/tests.
    describeSurface: function () {
      return {
        index: "UnClick Memory (pooled, cross-user)",
        transport: "unclick_call with endpoint_id memory.<op>",
        auth: "Authorization header only; never logged or stored in code",
        ops: [
          {
            id: this.OPS.pool,
            purpose: "Upsert one observed shape; server merges on domain+basket+selector",
            args: "{ domain, basket, selector, fields[], sampleCount, confidence, updatedAt }",
            returns: "{ merged: Shape, sampleCount, confidence }"
          },
          {
            id: this.OPS.query,
            purpose: "Fetch pooled shapes for a domain (optionally one basket)",
            args: "{ domain, basket?, minConfidence? }",
            returns: "{ shapes: Shape[] }"
          },
          {
            id: this.OPS.poolImage,
            purpose: "Upsert one image-size measurement; newest measuredAt wins",
            args: "{ url, bytes, measuredAt }",
            returns: "{ url, bytes, measuredAt }"
          },
          {
            id: this.OPS.queryImage,
            purpose: "Fetch measured sizes for a batch of image URLs",
            args: "{ urls: string[] }",
            returns: "{ sizes: { url: { bytes, measuredAt } } }"
          }
        ]
      };
    }
  };

  // ----- register on the namespace ------------------------------------------

  UCB.toShapes = toShapes;
  UCB.shapes = makeShapePool();
  UCB.imageSizeCache = makeImageSizeCache();
  UCB.shapeMCP = shapeMCP;

  // Expose a few pure helpers for Lane 8's harness and any sibling lane that
  // wants to reuse the exact merge/confidence math instead of duplicating it.
  UCB.shapes.build = toShapes;
  UCB.shapes.merge = mergeShapes;
  UCB.shapes.key = shapeKey;
  UCB.shapes.confidence = confidenceFrom;
})();
