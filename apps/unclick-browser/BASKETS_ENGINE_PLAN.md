# UnClick Browser - Baskets Engine: 8-Lane Build Plan

Attach this whole file to every worker. A worker's **only** custom instruction is its
lane number, given as the first prompt, e.g. `You are Worker 3. Follow BASKETS_ENGINE_PLAN.md. Own Lane 3.`

One human (the manager) coordinates. Workers do not talk to each other directly; they
coordinate through the frozen contracts in Section 3, the Boardroom (Fishbowl) room, and
draft PRs. If something needs a contract change, you raise it to the manager, you do not
change it unilaterally.

---

## 0. Worker onboarding (do this first, every session)

1. `load_memory` before your first action (UnClick session protocol).
2. Read this whole file once. Then re-read **Section 3 (contracts)** and **your lane in Section 7**.
3. Read the current reader so you know what exists: `apps/unclick-browser/web/app.js` and
   `apps/unclick-browser/web/index.html`. The Zen reader pipeline lives in `app.js`
   (functions `stripJunk`, `pickRoot`, `clean`, `restructureTeasers`, `masthead`, `footer`,
   `buildReader`, `renderZen`). You are extending this, not replacing it.
4. Post a one-line claim in the Boardroom: "Lane N starting: <today's chip>." Keep status fresh.
5. Default to a **draft PR** per lane. Small, reviewable commits.

House rules from the repo (`CLAUDE.md`): no em dashes anywhere; keep code in the same
plain style as the surrounding file; do not add one-off MCP registrations.

---

## 1. The vision and where we are now

**Vision.** UnClick Browser reads a page once and produces two things from the same pass:
a calm, consistent **human view** (Zen), and an agent-readable **MCP shape**. It does this by
recognising recurring web components ("baskets") instead of scraping data. The same observation,
pooled across users, accretes into a shared index of site shapes. "It sees SHAPE, not data."

**Baskets** are the named, recurring building blocks of the web:
hero, teaser-card (grid/list), carousel, stats, breadcrumb, logo/masthead, footer,
megamenu/nav, article-body, media/embed, table, form/CTA.

**Where we are now (v0.5.x, shipped).** A heuristic reader already does:
- junk stripping, main-region picking, JSON-LD article fallback, image smart-rules;
- three baskets by hand: **masthead** (site logo + name), **footer**, and **teaser-card**
  clustering (eyebrow + headline + image + blurb fused into one card);
- Zen / Native modes with auto-fallback and a Native lock.

**What this build adds.** A real **baskets engine**: generic repetition detection, a basket
classifier framework with many baskets, framework fingerprinting, per-site learned templates,
and the MCP-shape pooling layer. Goal: every site renders into one consistent calm format,
and every observed shape is reusable by agents.

---

## 2. Architecture: the pipeline

```
raw HTML
  -> ctx = { doc, base, host, framework?, learned? }            (built by app.js shim)
  -> Lane 5  fingerprint(ctx)              -> ctx.framework
  -> Lane 6  learned.apply(ctx)            -> ctx.learned (known selector->basket maps)
  -> Lane 1  segment(ctx)                  -> RegionTree (with repetition signatures)
  -> Lane 2  classify(RegionTree, ctx)     -> [ {region, basket, score} ]   (winners)
  -> Lane 2/3/4  basket.normalize(region)  -> [ CanonicalBlock ]            (per basket)
  -> Lane 2  assemble(blocks, ctx)         -> ordered CanonicalBlock[]
  -> renderCanonical(blocks)               -> calm DOM (Zen)                 (Lane 2 owns renderer)
  -> Lane 7  toShapes(blocks, ctx)         -> Shape[]  -> pool + MCP surface
  -> Lane 6  learned.record(winners, ctx)  -> persist selector->basket for this domain
```

Everything is plain browser JS (no bundler). Modules attach to a single global namespace
`window.UCB` and are loaded as separate `<script>` tags before `app.js`. The manager wires
`app.js` to call `UCB.pipeline.run(html, base)`; **workers never edit `app.js`**.

---

## 3. Shared contracts (FROZEN)

Do not change these shapes without manager sign-off in the Boardroom. Build to them exactly.

### 3.1 Namespace and registration
```js
// every lane file starts like this:
window.UCB = window.UCB || {};
UCB.baskets = UCB.baskets || {};   // basket registry (Lane 2 owns the object; others push into it)
```

### 3.2 Region (Lane 1 output)
```
Region = {
  node: Element,            // the DOM element this region wraps
  kind: "leaf"|"group",     // group = a set of repeated siblings
  signature: string,        // structural fingerprint (stable across repeated items)
  repeat: number,           // how many siblings share this signature (1 = unique)
  items: Region[],          // for groups: the repeated children
  children: Region[],       // sub-regions (tree)
  textLen: number,          // cached trimmed text length
  area: number              // rough visual weight (DOM size proxy; no layout reads required)
}
```

### 3.3 Basket (Lane 2 registry; Lanes 2/3/4 implement)
```
Basket = {
  type: string,                       // "hero" | "teaser" | "carousel" | "stats" | ...
  detect(region, ctx) -> number,      // 0..1 confidence this region IS this basket
  normalize(region, ctx) -> CanonicalBlock | CanonicalBlock[]
}
// register with: UCB.baskets["teaser"] = { type:"teaser", detect, normalize }
```

### 3.4 CanonicalBlock (render target; Lane 2 renderer consumes)
```
CanonicalBlock = {
  kind: string,             // mirrors basket type, drives the renderer
  title?: string,
  eyebrow?: string,
  href?: string,
  blurb?: string,
  media?: { src: string, alt?: string },
  items?: CanonicalBlock[], // for grids/lists/carousels/stats
  html?: string,            // ONLY for article-body prose (already-sanitised)
  meta?: object             // basket-specific extras (kept small)
}
```

### 3.5 Context
```
ctx = {
  doc: Document,            // a FRESH DOMParser doc (do not mutate the caller's)
  base: string, host: string,
  framework: { name: string, confidence: number, hints: object } | null,   // Lane 5
  learned: { map: Array<{selector, basket, conf}> } | null                  // Lane 6
}
```

### 3.6 Shape (Lane 7; one human block <-> one agent shape)
```
Shape = {
  domain: string,
  basket: string,
  selector: string,         // a stable selector that re-finds this region
  fields: Array<{name, selector, kind}>,   // e.g. title/href/image of a teaser
  sampleCount: number, confidence: number,
  updatedAt: string
}
```

### 3.7 Entry point (manager wires this; Lane 2 implements `run`)
```
UCB.pipeline.run(htmlString, baseUrl) -> {
  blocks: CanonicalBlock[],     // for Zen rendering
  shapes: Shape[],              // for pooling / MCP
  usedNative: boolean           // true if engine recommends Native fallback
}
```
If `run` throws or returns `blocks.length === 0`, `app.js` keeps the current v0.5.x reader as
fallback. So the engine must be additive and safe: never make a page worse than today.

---

## 4. Repo layout and load order

```
apps/unclick-browser/web/baskets/
  segment.js        # Lane 1
  core.js           # Lane 2  (registry + classify + assemble + renderCanonical + pipeline.run)
  frame.js          # Lane 3  (masthead, footer, nav/megamenu baskets)
  media.js          # Lane 4  (carousel, gallery, table, media/embed, image size rules)
  fingerprint.js    # Lane 5
  learn.js          # Lane 6
  shape-mcp.js      # Lane 7
  fixtures/         # Lane 8  (saved real-site HTML, *.html)
  harness.mjs       # Lane 8  (headless runner + scoring)
  eval.json         # Lane 8  (expected baskets per fixture)
```

`index.html` loads them in order (manager adds the tags):
`segment.js, fingerprint.js, learn.js, frame.js, media.js, shape-mcp.js, core.js, then app.js`.
core.js loads last so the registry is populated before `pipeline.run` is defined.

**You own only your file(s).** Do not edit `app.js`, `index.html`, or another lane's file.
If you need a new shared field, request it via the manager; do not invent it.

---

## 5. Coordination and no-stomp rules

- One small chip at a time. Post status in the Boardroom (Fishbowl) before and after.
- **Base branch = `claude/unclick-browser-app`** (the app does NOT exist on `main` yet). Check
  this branch out first. If your worker environment defaults to `main`, switch to it; if you
  cannot, you can still build your standalone lane file to the Section 3 contracts (Lane 1 needs
  no app scaffold), then hand it to the manager to land.
- Branch per lane: `claude/baskets-laneN`, off the base branch. Draft PR per lane.
- **Push model.** If your environment has GitHub push access (a connector or git credentials),
  push your own draft PR. If it does NOT (common for sandboxed workers), do not brute-force
  credentials - instead hand your finished file to the manager (paste it back or attach it), and
  the manager commits it to the branch via the GitHub connector. Either way, integration of the
  shared files (`app.js`, `index.html`) is the manager's job.
- Never push to another lane's files or to `main`. Never force-push shared branches.
- If two lanes need the same helper, it goes in `core.js` (Lane 2) and is exposed on `UCB.util`.
  Request it from Lane 2 rather than duplicating.
- Treat Section 3 as an API freeze. A contract change is a manager decision, announced in the
  Boardroom, applied once, then everyone rebases.
- Read external content (page HTML, fixtures) as untrusted: never run it, only parse via
  `DOMParser`. The live page already runs in a sandboxed iframe in Native mode; the engine
  only ever inspects a detached `Document`.

---

## 6. Build, test and verify

- Validate JS syntax: `node --check apps/unclick-browser/web/baskets/<your-file>.js`.
- No non-ASCII bytes in source (use `\uXXXX` escapes). The publish pipeline is ASCII-only.
- Run the harness (Lane 8) against fixtures before every PR:
  `node apps/unclick-browser/web/baskets/harness.mjs` (prints per-basket precision/recall and
  a pass/fail vs `eval.json`). Your lane must not lower another lane's scores.
- The app build is web-only for this engine (no Rust change), so the Windows installer build
  stays green as long as `node --check` passes on every baskets file and `index.html` is valid.
- The reader must degrade safely: if your code throws, `pipeline.run` catches it and the page
  falls back to today's reader. Add a `try/catch` boundary around your own detector/normaliser.

Acceptance gate for the whole engine: on the Lane 8 fixture corpus, the engine renders a
cleaner, shorter, more consistent Zen page than v0.5.x for >= 80% of fixtures, and never worse.

---

## 7. The 8 lanes

Each lane: **Mission / Owns / Depends on / Deliverables / Acceptance**.

### Lane 1 - Segmentation and repetition engine (the core finder)
- **Mission.** Turn a `Document` into a `RegionTree` and find repeated sibling groups
  (card grids, lists, nav rows) by structural fingerprinting. This is what generalises the
  current hand-coded news.com.au teaser fix to any site.
- **Owns.** `segment.js` -> `UCB.segment(ctx) -> Region` (root region).
- **Depends on.** Nothing (foundation). Coordinate early with Lanes 2 and 8.
- **Deliverables.** A signature function (tag + class-shape + child-shape, depth-bounded);
  group detection (>= 3 siblings sharing a signature = a repeated group); a pruned tree that
  drops boilerplate (script/style/hidden) and ranks regions by `area`/`textLen`.
- **Acceptance.** On a news listing, a blog index, a product grid, and a docs page, the root
  region exposes the right repeated group(s) with `repeat >= 3` and stable signatures across
  reloads. Deterministic: same HTML -> same tree.
- **Phase 1 lane.** Raise the **checkered flag** (Section 8) when done. Workers 3-8 are blocked
  on this, so keep it tight and ship the foundation before adding nice-to-haves.

### Lane 2 - Basket framework, classifier, assembler and renderer (the spine)
- **Mission.** Define the basket registry and the run pipeline; classify Lane 1 regions into
  baskets; assemble ordered `CanonicalBlock[]`; render them into calm DOM; expose `pipeline.run`.
  Ship the core baskets: **hero, teaser (grid/list), stats, breadcrumb, article-body**.
- **Owns.** `core.js` -> `UCB.baskets` registry, `UCB.classify`, `UCB.assemble`,
  `UCB.renderCanonical(blocks) -> DocumentFragment`, `UCB.util` (shared helpers), `UCB.pipeline.run`.
- **Depends on.** Lane 1 (regions). Lanes 3/4 push baskets into `UCB.baskets`.
- **Deliverables.** Classifier that runs every registered basket's `detect` over candidate
  regions and resolves conflicts by score + region area; assembler that orders blocks
  (masthead -> hero -> body/grids -> footer); a renderer that maps each `kind` to calm,
  consistent DOM using the existing Zen CSS classes (`.card`, `.masthead`, `.pagefoot`, etc.);
  the `try/catch` safety boundary and the empty-result fallback signal.
- **Acceptance.** `pipeline.run` returns sane `blocks` for all fixtures; the rendered Zen page
  matches or beats v0.5.x; registry is open so other lanes add baskets without touching `core.js`
  logic (only the registry object).
- **Phase 1 lane.** Raise the **checkered flag** (Section 8) when the registry, renderer and the
  safe no-op `pipeline.run` are done. Workers 3-8 are blocked on this.

### Lane 3 - Frame baskets: masthead, footer, nav and megamenu
- **Mission.** The consistent frame the user asked for: one master-banner design on every site
  (site logo and/or og:image, name), one footer design, and **megamenu -> simple menu**
  (today nav is dropped; instead, distil it into a compact, optional menu block).
- **Owns.** `frame.js` -> registers baskets `masthead`, `footer`, `nav` into `UCB.baskets`.
- **Depends on.** Lane 1 (regions), Lane 2 (CanonicalBlock kinds + renderer). Reuse the existing
  `masthead`/`footer` logic from `app.js` as the starting point (copy, then improve).
- **Deliverables.** masthead basket (favicon, og:image hero option, og:site_name/host);
  footer basket (source + open-in-Native + key links distilled); nav basket that detects a
  megamenu (large nested nav) and emits a small `menu` CanonicalBlock with top links only,
  collapsed by default. Define `kind:"masthead"|"footer"|"menu"` renderers with Lane 2.
- **Acceptance.** Every fixture shows the same banner + footer shape; a site with a megamenu
  (e.g. a big retailer) shows a tidy collapsed menu, not a wall of links and not nothing.

### Lane 4 - Media baskets: carousel, gallery, table, embed and image rules
- **Mission.** Handle the visual-heavy baskets calmly: carousels -> a simple horizontal strip or
  a capped list; galleries -> a tidy grid; tables -> clean responsive tables; media/embeds
  (video, maps, tweets) -> a labelled placeholder card linking to Native. Own the image
  smart-rules including the **~400KB per-image cap**.
- **Owns.** `media.js` -> registers `carousel`, `gallery`, `table`, `embed` baskets; exports
  `UCB.imageRules` used by the renderer.
- **Depends on.** Lane 1, Lane 2. Image size cap uses the **precise method with a shared cache**
  (decided): the manager adds a small Rust command `image_sizes(urls[]) -> { url: bytes }`
  (HEAD / content-length via the existing reqwest client; manager owns this Rust change so the
  Windows build stays green). Lane 4 calls it, drops or downscales any image over 400KB, and
  writes the measured byte size to a size cache so future visits skip the network check. Via
  Lane 7 the cache is pooled across users, so any image is measured **once for everyone**.
- **Deliverables.** carousel detector (repeated slides under an overflow/scroll container) ->
  capped strip; table normaliser; embed placeholder; image rules: skip tracking/spacer/data-uri
  (already exists, move here), cap count, and the precise 400KB cap backed by the size cache.
  Expose `UCB.imageRules.size(url)` = read cache first, else ask the Rust command, else allow
  load. Define the cache schema with Lane 6 (per-domain local store) and Lane 7 (cross-user
  pooled index): key = absolute image URL, value = bytes + measuredAt.
- **Acceptance.** A carousel-heavy homepage and a data-table page render calmly and short; no
  image over 400KB loads; tables scroll instead of breaking layout; a **second visit measures
  zero image sizes over the network** (all served from cache).

### Lane 5 - Framework and CMS fingerprinting
- **Mission.** Identify the site's framework/CMS so classifiers can be smarter and learned
  templates can be keyed by framework as well as domain.
- **Owns.** `fingerprint.js` -> `UCB.fingerprint(ctx) -> { name, confidence, hints }`.
- **Depends on.** Nothing hard; consumes `ctx.doc`. Output read by Lanes 2/6.
- **Deliverables.** A signature DB (meta generator tags, script src patterns, class prefixes,
  data-attributes) for at least: WordPress, Next.js, Nuxt, Shopify, Squarespace, Wix, Webflow,
  Gatsby, Drupal, Medium/Substack. `hints` can carry known basket selectors per framework.
- **Acceptance.** Correct framework on >= 80% of a labelled set in the fixtures; never blocks
  the pipeline (returns null on unknown).

### Lane 6 - Per-site learning and template store
- **Mission.** Learn `selector -> basket` mappings per domain on the fly, persist them, and apply
  on revisit so repeat sites render instantly and accurately ("learning on by default").
- **Owns.** `learn.js` -> `UCB.learned.apply(ctx)`, `UCB.learned.record(winners, ctx)`, and the
  store adapter.
- **Depends on.** Lane 2 (winners shape), Lane 5 (framework key). Persistence: start with a
  local store (the browser localStorage in-app), with an adapter seam to UnClick memory
  (`unclick_call` memory ops / the memory module) for cross-device later. Do not wire the remote
  store yet; define the interface and stub it.
- **Deliverables.** confidence + decay model; apply step that pre-tags regions from learned
  selectors before classification (speed + accuracy); record step that stores high-confidence
  winners; a clear, small JSON schema for stored templates.
- **Acceptance.** Visiting the same domain twice: second visit uses learned selectors (provable
  via a counter/log), and detection is at least as good as the cold path.

### Lane 7 - MCP-shape pooling and the accreting index
- **Mission.** Turn detected baskets into reusable **shapes** and define how they pool across
  users into a shared index, and how an agent consumes them. One observation -> human Zen block
  AND an agent MCP shape.
- **Owns.** `shape-mcp.js` -> `UCB.toShapes(blocks, ctx) -> Shape[]`, plus a written contract for
  pooling and the MCP surface.
- **Depends on.** Lane 2 (blocks), Lane 6 (selectors). Read `docs/unclick-context-boot-packet.md`
  and the memory/MCP docs in `packages/mcp-server` before designing the surface.
- **Deliverables.** the `Shape` builder (Section 3.6); a dedup/merge spec (same domain+basket+
  selector merges, increments sampleCount, recomputes confidence); a proposed MCP exposure
  (how `unclick_search`/`unclick_call` or a new memory op surfaces pooled shapes to agents) as a
  design doc + a local stub. Also own the **cross-user image-size cache** in the pooled index
  (key = image URL, value = bytes + measuredAt) that Lane 4 reads, so the 400KB check is paid
  once across all users, not per visit. **No secrets in code; Authorization only**; do not print keys.
- **Acceptance.** For each fixture, `toShapes` emits well-formed shapes; the merge spec handles
  re-observation; the design doc is concrete enough for a follow-up implementation PR.

### Lane 8 - Fixtures, harness and evaluation (unblock + guard everyone)
- **Mission.** Build the test bed so 8 lanes can move in parallel without breaking each other.
  This lane should land its first cut **earliest**.
- **Owns.** `fixtures/*.html`, `harness.mjs`, `eval.json`.
- **Depends on.** Section 3 contracts only.
- **Deliverables.** 12-20 saved real-site HTML fixtures across categories (news listing, news
  article, blog index, blog post, ecommerce grid, product page, docs, gov/info, SPA shell,
  megamenu retailer, table-heavy, carousel-heavy); a headless runner (Node, reuse the
  pre-installed Chromium at `/opt/pw-browsers/chromium` for visual snapshots, or jsdom-free DOM
  via the same `DOMParser` path the app uses) that runs `UCB.pipeline.run` over each fixture and
  scores per-basket precision/recall vs `eval.json`; a one-line pass/fail summary for CI.
- **Acceptance.** `harness.mjs` runs green on the current v0.5.x baseline (engine off) and
  produces stable scores; every other lane can run it locally and see their effect.

---

## 8. Sequencing - two phases with a checkered flag

This build runs in two phases. **Only Workers 1 and 2 start in Phase 1.** Workers 3-8 wait until
both raise their checkered flag.

**Phase 1 - foundation (Workers 1 and 2 only).**
- Worker 1 ships the Region API (`UCB.segment`).
- Worker 2 ships the registry + assembler + renderer + a SAFE `UCB.pipeline.run` that, until
  baskets exist, returns today's v0.5.x reader result (a no-op pass-through) so the app never
  breaks.
- When a worker's Phase-1 deliverable is done, it raises a **checkered flag** (defined below).

**The checkered flag = "my foundation lane is finished, the rest can build on it".** A lane is
flagged only when ALL of these are true:
1. `node --check` is green on the lane's file(s).
2. The lane exports its frozen-contract interface exactly (Lane 1: `UCB.segment`; Lane 2:
   `UCB.baskets`, `UCB.classify`, `UCB.assemble`, `UCB.renderCanonical`, `UCB.util`,
   `UCB.pipeline.run`).
3. The draft PR is marked ready-for-review.
4. The worker posts `FLAG Lane N complete` in the Boardroom with the PR link.

**Gate.** The manager waits for BOTH flags (Lane 1 and Lane 2), confirms the no-op pipeline still
runs the app cleanly, then releases **Phase 2**. (This is the hand-off point: once you see both
checkered flags, start Workers 3-8.)

**Phase 2 - feature and intelligence lanes (Workers 3-8, all in parallel).**
- 3 frame baskets, 4 media baskets, 5 fingerprint, 6 learning, 7 shapes/pooling, 8 fixtures+harness.
- Each raises its own `FLAG Lane N complete` when its acceptance criteria pass on the harness.

**Final integration (manager).** Wire the `index.html` script tags and point `app.js` at
`UCB.pipeline.run` behind a flag; run the full fixture corpus; flip Zen to the engine when it
beats the v0.5.x baseline on >= 80% of fixtures and is never worse. No worker edits shared files.

---

## 9. First-prompt template (manager gives each worker)

```
You are Worker N for the UnClick Browser Baskets Engine.
Follow BASKETS_ENGINE_PLAN.md exactly. You own Lane N only.
Start: load_memory, read the plan, read your lane in Section 7 and the contracts in Section 3,
post your start chip in the Boardroom, open a draft PR on branch claude/baskets-laneN.
Do not edit app.js, index.html, or other lanes' files. Build to the frozen contracts.
Validate with `node --check`; from Phase 2 also run the Lane 8 harness before each PR.
When your lane meets its acceptance, raise the checkered flag: mark the PR ready and post
`FLAG Lane N complete` in the Boardroom with the PR link (Section 8).
Ask the manager before any contract change.
```

**Phasing reminder for the manager.** Start **only Workers 1 and 2** first. When BOTH have
posted `FLAG Lane N complete`, start Workers 3-8 together. Workers 3-8 should be told they are
Phase 2 and may assume `UCB.segment` and `UCB.pipeline.run` already exist.

---

### Appendix A - Why this split

Foundation first (Lane 1 + Lane 8), spine next (Lane 2), feature baskets fan out in parallel
(Lanes 3, 4), intelligence layers attach via clean seams (Lanes 5, 6, 7). Each lane owns a
separate file and communicates only through Section 3, so eight workers rarely touch the same
lines. The engine is strictly additive: if any part fails, the page falls back to today's
working reader, so parallel work can never ship a regression to users.

### Appendix B - If you have Autopilot / Control Tower

This MD is the source of truth either way. If the fleet runs through Autopilot's Control Tower,
register each lane as a worker with its lane number and this file as the shared brief; the
coordination rules in Section 5 still apply. Keep the Boardroom as the live status surface.
