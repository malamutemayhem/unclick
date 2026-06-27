# Baskets engine

See `BASKETS_ENGINE_PLAN.md` (repo root of the browser app) for the full 8-lane plan and the
frozen contracts (Section 3).

## Status

- **Lane 1 - `segment.js`** (landed): `UCB.segment(ctx) -> Region`. Structural fingerprinting +
  repetition detection (>= 3 same-signature siblings become a `kind:"group"` region).
- **Lane 2 - `core.js`** (landed, framework + reference basket): `UCB.baskets` registry,
  `UCB.classify`, `UCB.assemble`, `UCB.renderCanonical`, `UCB.util`, and `UCB.pipeline.run`.
  Includes one reference basket (`teaser`) showing the pattern to copy.

`pipeline.run` is safe: any throw or an empty result returns `{ blocks: [] }`, so the app keeps
today's reader. It is not wired into `app.js` yet; that happens at final integration (manager).

## Load order (manager wires the script tags in index.html)

```
segment.js, fingerprint.js, learn.js, frame.js, media.js, shape-mcp.js, core.js, then app.js
```
`core.js` loads last so the registry is populated before `pipeline.run` is defined.

## Adding a basket (Lanes 3 and 4)

```js
window.UCB = window.UCB || {};
UCB.baskets = UCB.baskets || {};
UCB.baskets.myType = {
  type: "myType",
  detect: function (region, ctx) { return 0.0; },   // 0..1 confidence
  normalize: function (region, ctx) { return { kind: "myType", title: "" }; }
};
```
Copy the `teaser` basket in `core.js` as a template. Own only your file. Validate with
`node --check`. Do not edit `app.js`, `index.html`, `segment.js`, or `core.js`.
