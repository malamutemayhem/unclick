// UnClick Browser - Baskets Engine - Lane 1: segmentation and repetition engine.
// Exposes UCB.segment(ctx) -> Region (the frozen Section 3.2 shape).
// Foundation lane: depends on nothing, builds strictly to the contract.
window.UCB = window.UCB || {};
UCB.baskets = UCB.baskets || {}; // Lane 2 owns this object; we only ensure it exists.

(function () {
  // Never descend into / always treat as boilerplate.
  var SKIP = { SCRIPT:1, STYLE:1, NOSCRIPT:1, TEMPLATE:1, SVG:1, LINK:1, META:1, HEAD:1, BR:1, IFRAME:1, CANVAS:1 };
  var MAX_DEPTH = 14;
  var NODE_BUDGET = 9000;

  function isHidden(el) {
    if (!el.getAttribute) return false;
    if (el.getAttribute("aria-hidden") === "true" || el.hasAttribute("hidden")) return true;
    var st = el.getAttribute("style");
    if (st && /display\s*:\s*none|visibility\s*:\s*hidden/i.test(st)) return true;
    return false;
  }
  function textLen(el) { return (el.textContent || "").trim().length; }

  // Normalised, order-independent class shape: sorted, digits collapsed, so
  // "card card-3" and "card card-7" share a signature.
  function classShape(el) {
    var cls = (typeof el.className === "string") ? el.className : (el.getAttribute ? (el.getAttribute("class") || "") : "");
    if (!cls) return "";
    var parts = cls.trim().split(/\s+/).map(function (c) { return c.replace(/\d+/g, "#"); });
    parts.sort();
    return parts.slice(0, 6).join(".");
  }

  // Order-independent multiset of direct child element tags (depth 1).
  function childTagShape(el) {
    var counts = {};
    var k = el.children || [];
    for (var i = 0; i < k.length; i++) {
      var t = k[i].tagName;
      if (SKIP[t]) continue;
      counts[t] = (counts[t] || 0) + 1;
    }
    var keys = Object.keys(counts); keys.sort();
    var out = [];
    for (var j = 0; j < keys.length; j++) out.push(keys[j] + counts[keys[j]]);
    return out.join("-");
  }

  function signature(el) {
    // tag + class-shape + child-tag-shape: stable across repeated siblings and reloads.
    return el.tagName + "|" + classShape(el) + "|" + childTagShape(el);
  }

  var budget;
  function build(el, depth) {
    if (!el || el.nodeType !== 1) return null;
    if (SKIP[el.tagName]) return null;
    if (isHidden(el)) return null;
    if (budget.count++ > NODE_BUDGET) return null;

    var region = {
      node: el,
      kind: "leaf",
      signature: signature(el),
      repeat: 1,
      items: [],
      children: [],
      textLen: textLen(el),
      area: 0
    };

    if (depth < MAX_DEPTH && el.children && el.children.length) {
      var childRegions = [];
      for (var i = 0; i < el.children.length; i++) {
        var c = build(el.children[i], depth + 1);
        if (c) childRegions.push(c);
      }
      region.children = childRegions;

      // Repetition detection: a signature shared by >= 3 siblings is a repeated
      // group (card grid, list, nav row, etc.). The primary key is tag + class
      // shape only: a real card grid mixes a lead card carrying a standfirst <p>
      // (or a video badge) with plain cards that lack one, and those must still
      // group together. The strict signature is the fallback for class-less
      // structure so generic wrappers are not over-grouped.
      function groupKey(r) {
        var c = classShape(r.node);
        return c ? (r.node.tagName + "|" + c) : r.signature;
      }
      function bestGroup(keyFn) {
        var by = {};
        for (var r = 0; r < childRegions.length; r++) {
          var k = keyFn(childRegions[r]);
          (by[k] = by[k] || []).push(childRegions[r]);
        }
        var best = null, n = 0;
        for (var key in by) { if (by[key].length >= 3 && by[key].length > n) { n = by[key].length; best = by[key]; } }
        return best;
      }
      var group = bestGroup(groupKey) || bestGroup(function (r) { return r.signature; });
      if (group) {
        region.kind = "group";
        region.items = group;
        region.repeat = group.length;
      }
    }

    // Rough visual weight, no layout reads required.
    var descend = el.getElementsByTagName ? el.getElementsByTagName("*").length : 0;
    region.area = descend + Math.min(region.textLen, 4000);
    return region;
  }

  // Public entry point. Never throws; returns null on a missing/empty doc.
  UCB.segment = function (ctx) {
    budget = { count: 0 };
    try {
      var doc = ctx && ctx.doc;
      var rootEl = doc && (doc.body || doc.documentElement);
      if (!rootEl) return null;
      return build(rootEl, 0);
    } catch (e) {
      return null;
    }
  };
})();
