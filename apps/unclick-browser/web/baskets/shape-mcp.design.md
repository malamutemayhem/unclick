# Lane 7 - MCP-shape pooling and the accreting index (design)

Status: design + local stub. Companion to `shape-mcp.js`. Concrete enough for a
follow-up implementation PR that wires the real memory ops.

## 1. The idea

UnClick Browser reads a page once and produces two things from the same pass: a
calm human Zen view (Lane 2 renders `CanonicalBlock[]`), and an agent-readable
MCP view (Lane 7 turns the same blocks into `Shape[]`). Shapes are pooled across
users into a shared index of site shapes, so the web is mapped once and reused
by every agent. It sees SHAPE, not data.

One observation, two outputs:

```
CanonicalBlock  --renderCanonical-->  calm Zen DOM        (human)
CanonicalBlock  --toShapes-------->   Shape  --pool-->     (agent / MCP)
```

## 2. The Shape (frozen, Section 3.6)

```
Shape = {
  domain: string,        // ctx.host, e.g. "www.news.com.au"
  basket: string,        // CanonicalBlock.kind, e.g. "teaser"
  selector: string,      // stable selector that re-finds this region
  fields: Array<{name, selector, kind}>,  // title/href/image/blurb/eyebrow
  sampleCount: number,   // instances observed in one pass (grid of 4 = 4)
  confidence: number,    // 0..1, see section 4
  updatedAt: string      // ISO; metadata only, never part of identity
}
```

`UCB.toShapes(blocks, ctx) -> Shape[]` builds these. It never throws: a bad block
is skipped, a fatal error returns the partial list, so `pipeline.run` can always
fall back to today's reader.

### Selector source, in priority order

1. `block.meta.selector` (best: Lane 2/Lane 6 stamp the live region selector).
2. `block.meta.region.selector`.
3. `[data-ucb-sig="<signature>"]` from a Lane 1 structural signature.
4. `[data-ucb-basket="<kind>"]` fallback.

Lanes 2 and 6 should stamp `meta.selector` (and optionally `meta.fields`, a map
of field name to selector) so shapes re-find their regions precisely. Lane 7
degrades gracefully when they are absent.

### Field derivation

Canonical fields drawn from the representative item (`items[0]` for a grid, else
the block): `title`, `eyebrow`, `href`, `image` (from `media.src`), `blurb`.
Field selectors come from `block.meta.fields[name]` when present, else loose
conventional selectors that re-find the field across a basket's repeated items.

## 3. Dedup / merge spec (frozen behaviour)

Two shapes are the same observation when `domain + basket + selector` match.

```
key(shape) = domain + "|" + basket + "|" + selector
merge(existing, incoming):
  sampleCount = existing.sampleCount + incoming.sampleCount
  fields      = union by name (prefer the longer/explicit selector)
  confidence  = recompute from combined sampleCount and field count
  updatedAt   = max(existing.updatedAt, incoming.updatedAt)   // string ISO compare
  domain/basket/selector = existing (they are the key)
```

Re-observation therefore makes a shape stronger, not duplicated. The local stub
(`UCB.shapes`) is an in-memory Map; the production index is UnClick Memory behind
the ops in section 5.

## 4. Confidence (deterministic)

```
sampleScore(n) = 1 - 1/(1+n)        // 1 -> 0.5, 3 -> 0.75, 9 -> 0.9
fieldScore(f)  = min(f, 4) / 4      // 4 = useful teaser core: title, href, image, blurb
confidence     = round2( 0.6*sampleScore + 0.4*fieldScore )
```

Same HTML in, same confidence out. More instances and richer fields both raise
trust; eyebrow beyond the core does not inflate it past the cap.

## 5. MCP exposure (proposed)

The shared index is UnClick Memory. Pooled shapes reach agents through the
existing hidden meta-tool `unclick_call` with `endpoint_id: "memory.<op>"`,
matching the repo's existing `memory.*` operation surface in
`packages/mcp-server/src/memory/handlers.ts` (a `MEMORY_HANDLERS` record keyed by
op name). No new top-level MCP registration is added, per `CLAUDE.md`. Secrets,
when the API path is used, ride the Authorization header only and are never
logged or written to code.

Four proposed ops (see `UCB.shapeMCP.describeSurface()` for the runnable shape):

| op | purpose | args | returns |
|----|---------|------|---------|
| `memory.pool_shape` | upsert + server-side merge one observed shape | `{domain, basket, selector, fields[], sampleCount, confidence, updatedAt}` | `{merged: Shape, sampleCount, confidence}` |
| `memory.get_shapes` | fetch pooled shapes for a domain | `{domain, basket?, minConfidence?}` | `{shapes: Shape[]}` |
| `memory.pool_image_size` | upsert one image-size measurement | `{url, bytes, measuredAt}` | `{url, bytes, measuredAt}` |
| `memory.get_image_sizes` | fetch measured sizes for a batch of URLs | `{urls: string[]}` | `{sizes: {url: {bytes, measuredAt}}}` |

`UCB.shapeMCP.toCalls(shapes)` and `.imageCallsFrom(cache)` are pure transforms
that produce these `unclick_call` payloads. They issue nothing themselves; a
follow-up PR connects them to the live ops and to a client-side flush policy
(for example, pool only shapes with confidence >= a threshold, batched).

### Agent consumption

An agent visiting or reasoning about a domain calls `memory.get_shapes` to learn
the site's known baskets and their field selectors, then drives the page by
shape instead of bespoke scraping. The same selectors power Lane 6's instant
re-render on revisit.

## 6. Cross-user image-size cache

Lane 4 caps images at ~400KB. Measuring byte size per visit per user is wasteful,
so Lane 7 owns a pooled cache: any image is measured once for everyone.

```
key   = absolute image URL
value = { bytes: number, measuredAt: string(ISO) }
```

- `UCB.imageSizeCache` is the local store (`get/set/has/entries/mergePooled/size/clear`).
- Read path (Lane 4): `imageRules.size(url)` checks this cache first, then the
  Rust `image_sizes(urls[])` command (manager owns that Rust change), then allows
  the load; the measured size is written back here.
- Persistence (Lane 6): mirror a per-domain slice into local storage for fast
  cold starts. Adapter seam only for now, not wired to the remote store.
- Pooling (Lane 7): `memory.pool_image_size` / `memory.get_image_sizes` push and
  pull measurements across users. Newest `measuredAt` wins on conflict.

Acceptance: a second visit measures zero image sizes over the network; every URL
is served from cache.

## 7. Acceptance for this lane

- For each fixture, `toShapes` emits well-formed shapes (validated by Lane 8).
- The merge spec handles re-observation (sampleCount grows, confidence is
  non-decreasing, no duplicate keys).
- This document is concrete enough for a follow-up PR to implement the four
  memory ops and the client flush policy.

## 8. Safety and house rules

- ASCII-only source; no em dashes; plain browser JS; attaches to `window.UCB`.
- `toShapes` never throws; reads only detached, already-parsed data.
- No secrets in code; Authorization header only when the API path is used.
- No new top-level MCP registration; pooling rides `unclick_call` + `memory.*`.
