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
      // shape; the strict signature is the fallback for class-less structure so
      // generic wrappers are not over-grouped.
      function groupKey(r) {
        var c = classShape(r.node);
        return c ? (r.node.tagName + "|" + c) : r.signature;
      }
      function bestGroup(keyFn) {
        var by = {}, order = [];
        for (var r = 0; r < childRegions.length; r++) {
          var k = keyFn(childRegions[r]);
          if (!by[k]) { by[k] = []; order.push(k); }
          by[k].push(childRegions[r]);
        }
        var best = null, n = 0;
        for (var i = 0; i < order.length; i++) { var key = order[i]; if (by[key].length >= 3 && by[key].length > n) { n = by[key].length; best = by[key]; } }
        return { group: best, by: by };
      }

      // Sponsored / advertisement markers on a node's class or id. A lead card
      // shares the base card class, but so does an injected "product-card--
      // sponsored" ad tile; folding the lead back in must not drag the ads in too.
      function isAdNode(node) {
        try {
          var cls = ((typeof node.className === "string" ? node.className : (node.getAttribute ? (node.getAttribute("class") || "") : "")) + " " + (node.id || "")).toLowerCase();
          return /(^|[-_ ])(ad|ads|advert|advertisement|sponsor|sponsored|promoted|dfp|gpt|taboola|outbrain)([-_ ]|$)/.test(cls);
        } catch (e) { return false; }
      }

      // The full set of (digit-collapsed) class tokens on a node.
      function tokenSet(node) {
        var set = {};
        var cls = (typeof node.className === "string") ? node.className : (node.getAttribute ? (node.getAttribute("class") || "") : "");
        if (cls) { var p = cls.trim().split(/\s+/); for (var i = 0; i < p.length; i++) { var k = p[i].replace(/\d+/g, "#"); if (k) set[k] = 1; } }
        return set;
      }

      // Fold a lead/featured sibling back into its group. A real card grid mixes
      // a lead card carrying an extra modifier class ("product-card
      // product-card--featured", "related-card story-card lead-related", "post
      // post-answer answer-accepted") with plain cards that lack it; the strict
      // class-shape key splits that lead card into its own bucket and drops the
      // biggest card on the page. We add back any same-tag sibling that (a) is
      // not already part of its own >= 3 group (so two distinct card types are
      // never merged) and (b) carries every base class the majority group shares.
      function foldLeadCards(group, by) {
        var proto = group[0] && group[0].node;
        if (!proto || proto.nodeType !== 1) return group;
        var tag = proto.tagName;
        var base = tokenSet(proto);
        for (var i = 1; i < group.length; i++) { var ts = tokenSet(group[i].node); for (var t in base) { if (!ts[t]) delete base[t]; } }
        var baseKeys = []; for (var b in base) baseKeys.push(b);
        if (!baseKeys.length) return group;
        var result = group.slice();
        for (var s = 0; s < childRegions.length; s++) {
          var r = childRegions[s];
          if (!r.node || r.node.nodeType !== 1 || r.node.tagName !== tag) continue;
          if (result.indexOf(r) !== -1) continue;
          if (isAdNode(r.node)) continue;               // never fold an ad tile in
          var bk = groupKey(r);
          if (by[bk] && by[bk].length >= 3) continue;   // its own distinct group
          var rt = tokenSet(r.node), ok = true;
          for (var k = 0; k < baseKeys.length; k++) { if (!rt[baseKeys[k]]) { ok = false; break; } }
          if (ok) result.push(r);
        }
        result.sort(function (a, b) { return childRegions.indexOf(a) - childRegions.indexOf(b); });
        return result;
      }

      var primary = bestGroup(groupKey);
      var group = primary.group;
      if (group) {
        group = foldLeadCards(group, primary.by);
      } else {
        group = bestGroup(function (r) { return r.signature; }).group;
      }
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
