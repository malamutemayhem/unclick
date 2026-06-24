# UnClick Browser - Build Plan

**Status:** Draft for greenlight (2026-06-24)
**Owner:** Chris Byrne / Malamute Mayhem
**Tagline:** Agent-native web browser, humans welcome.
**Related:** `docs/connectors/spec.md` (Connectors V1 + UnClick Local, Phases 0-12), `docs/connectors/browser-extension-starter-plan.md` (the discovery-sensor package, PR #1584)

---

## 1. One line

A ground-up, reading-first, AI-native browser that is the on-device home for the whole UnClick OS. It renders every site into one fast, consistent format for humans, and in the same pass learns the shape of the web for agents. It does not replace Chrome by fighting it; it is where you go to read, search, remember, and act through one door.

## 2. The keystone: one observation, two outputs

To turn any page into a clean UnClick Doc, the browser already has to read the page structure and the network calls it makes. That single observation produces two things at once:

- **For humans:** a clean, fast, consistent UnClick Doc (the reading surface).
- **For agents:** a drafted connector / map of how the site works (the acting surface).

So one act of browsing feeds both the **search corpus** (readable web) and the **connector catalogue** (actionable web). The discovery-sensor flywheel from the extension work and the format-conversion engine from the browser work are the same machine. This is why the browser wraps the extension rather than sitting beside it.

The flywheel, unchanged from the locked extension design, now native in the browser:

```
OBSERVE  -> learn the SHAPE of the page, never the values (structure not content)
DRAFT    -> an LLM turns that shape into a connector spec + a clean UnClick Doc
AGGREGATE-> many users converge on a fuller map, faster (crowd, public tier only)
GATE     -> eval + human check before anything is promoted
PROMOTE  -> connector lands in the catalogue; Doc lands in the cache + search index
```

## 3. What already exists (do not rebuild)

Verified against the repo and the live connection layer this session. The browser sits on top of these:

- **One Door + search-and-load.** The single MCP endpoint with hidden meta-tools (`unclick_search`, `unclick_browse`, `unclick_tool_info`, `unclick_call`). Millions of tools can sit dormant; the agent pulls only what it needs. This is how "one MCP, many under the hood" scales past the context window.
- **The credential broker (Keychain / Connectors).** OAuth-first, API-key fallback. Secrets stay server-side; the agent gets a result plus a receipt, never a portable token or cookie. This is the CONNECT path and it is what makes OAuth sites portable across PCs.
- **The catalogue.** 450+ endpoints across 60+ integrations: public no-auth APIs, utility/CS tools, and the brokered "your accounts" surface.
- **Memory.** Persistent cross-session, cross-device context. The browser surfaces it ambiently.
- **Coarse permission control.** Per-app on/off today. The deep per-action authz (the Gatekeeper) is designed, not yet shipped.
- **The discovery-sensor package** (`@unclick/browser-extension`, PR #1584): structure-not-content capture, privacy tiers (off / me-only / public, default me-only), k-anonymity gate, glass-box panel, day-one features (quick actions, save-to-memory, status, coverage). The browser adopts this as its native observation engine.

## 4. What the browser adds (the new layers)

1. **UnClick Doc format.** A small, closed vocabulary of ~12 core blocks: text, headings, lists, tables, images, quotes, code, links, media-embed, button, input, form. The browser only renders this. New blocks are added deliberately, one at a time.
2. **Fast renderer.** Deliberately dumb: one theme engine (dark/light), reading-first typography, hard image-size caps, video external/embedded-on-demand. Because it renders ~12 blocks, it is brutally fast and pixel-consistent everywhere.
3. **Conversion tiers** (who prepares the clean version):
   - **Tier 0 - auto-convert.** Browser converts on the fly and caches. Whole web, day one. Reader-mode-safe.
   - **Tier 1 - publisher canonical feed.** A `<link rel="unclick">` tag or `/.well-known/unclick.json` manifest pointing at a publisher-hosted clean version. They own it, we index it. Spec this format early; it is the ecosystem hook.
   - **Tier 2 - CMS sync.** Reuse the existing connectors (WordPress, Ghost, Webflow, Shopify, Contentful) plus the Connectors OAuth rail plus webhooks. "Connect your CMS once, your content is AI-native and stays synced."
   - In every tier UnClick holds only a cache plus an index, never the sole copy. The web federates like RSS.
4. **Caching (stale-while-revalidate).** First visit converts and stores keyed by URL plus content fingerprint (ETag/hash). Repeat visit renders the cached version instantly, then checks for change in the background; reconvert and gently swap only on real change. Two layers: on-device (private, instant) and a shared edge cache (first user converts a PUBLIC page, everyone after rides free). Public pages only; logged-in/personalized stays local.
5. **UnClick Search.** Indexes the converted web, bootstrapping off normal browsing. Returns synthesized answers plus clean sources, not ten blue links. Same store as the reading cache.
6. **AI-native shell.** The address bar takes a URL, a question, or an intent. Memory and the 450+ tools are ambient. Agents read the structured page directly (no scraping) and act through the One Door and Gatekeeper.

## 5. Engine decision

- **v0: system-webview backend** (Tauri/WRY/WebView2/WKWebView), not Electron. The OS engine is lighter, often already resident, and gives us the network stack, sandbox, codecs, and a real-web fallback for free.
- **Why not from-scratch:** rendering 12 clean blocks is trivial on any competent engine; speed comes from the format and caching, not the engine. A from-scratch web engine would lose to Blink, own a security/text-shaping nightmare, and still need an embedded engine for conversion and the app fallback.
- **v2 option:** a custom block renderer for the UnClick Doc format only (a document-layout problem, not a web-platform problem). The format is the durable asset; the renderer behind it is swappable, so this is an optimization we earn, not a prerequisite.

## 6. The app escape hatch (apps, fast to heavy)

Most "apps" are a data problem, not a rendering problem, and stay in the fast lane.

1. **Connector path (default, fully fast).** Site has an API -> render data as an UnClick Doc, act via connector plus mandate. Most of Gmail, Plaid, Stripe, Shopify. Never loads the real site.
2. **Embedded live tab (on demand, quarantined).** No API but cooperative -> render the real site in a sandboxed webview tab, spun up on demand and torn down after. The actual "escape hatch," and it is rare.
3. **Hand off to the user's own browser.** Hostile or high-stakes (a bank transfer) -> do not render it in UnClick at all; the agent stages, the user confirms in their real Chrome/Safari (the Co-Pilot Bridge). UnClick orchestrates; the real browser executes.

Performance: the heavy worker is a separate process. It cannot slow the fast path. Its only cost is a one-time wake-up, hidden by a warm pool, the system webview being resident, speculative spawn during agent staging, and the visible "live app" transition. Floor is "opens like a normal browser tab," never worse.

## 7. Unified architecture

```
            +---------------------------------------------------------+
            |  AI CLIENTS (Claude, ChatGPT, ...)  +  HUMAN (the reader)|
            +----------------------------+----------------------------+
                                         v
            +---------------------------------------------------------+
            |  UI / UX ADMIN  (visual transparency layer: SEE+APPROVE)|
            +----------------------------+----------------------------+
                                         v
                              +-------------------+
                              |     ONE  DOOR     |  search-and-load
                              |  finds + loads    |  (millions dormant)
                              +---------+---------+
                                        v
                              +-------------------+
                              |    GATEKEEPER     |  what's allowed?
                              | EVERY tool here   |  (per-call, always)
                              +-+------+------+---+
              +-----------------+      |      +-----------------+
              v                        v                        v
        +----------+            +----------+            +--------------+
        | PUBLIC   |            | UTILITY  |            | YOUR ACCOUNTS|
        | weather  |            | math     |            | GitHub Gmail |
        | news     |            | units    |            | Stripe  eBay | <- CONNECT
        +----------+            +----------+            +--------------+   (OAuth,
              ^                        ^                        ^          portable
              |                  +-----+-------+                |          any PC)
              |   READ surface   |  GENERAL    |   BUILD surface|
              |   (UnClick Doc + |  SITES      |                |
              |    Search index) |  Bob's *    | <--------------+
              |                  |  Tractor *  |   published back (auto-built *)
              |                  +-----^-------+
              |                        |
   +----------+------------------------+-----------------------------+
   |  NATIVE OBSERVATION (one pass, two outputs)                     |
   |   page -> OBSERVE shape (not data) -> DRAFT -> AGGREGATE -> GATE|
   |          -> PROMOTE:  clean Doc to the reader + search index    |
   |                       connector to the catalogue               |
   +----------------------------------------------------------------+

  how a tool RUNS (always back through the GATEKEEPER):
    site HAS an API  ->  runs on the server, your key stays locked        (eBay)
    site has NO API  ->  runs in YOUR tab, nothing leaves it              (Bob's)
    never ever       ->  copy your cookies or login off your machine
```

## 8. Safety model (non-negotiable, carried from the extension)

- **Structure not content.** The observation captures endpoint patterns, field names, and schemas, never your values. Values are stripped on-device before anything leaves. This is the entire trust contract; one leak ends it.
- **The safety fork** (bottom of the diagram) decides where a tool runs. Copying session material off the machine is the forbidden path, per the connector routing docs and the lethal-trifecta risk.
- **Two different gates, both real.** GATE inside the flywheel is a one-time quality check before a connector is published. The GATEKEEPER is the permission check on every call, forever. The extension only builds tools; it never gets a private back entrance to run them.
- **Human layer vs automatic layer.** UI/UX Admin is the window a human reads and approves in. The Gatekeeper is the automatic per-call rule. Different jobs.
- **Privacy tiers:** off / me-only / public, default me-only. Public sharing is k-anonymous (a shape goes public only after several users independently see the same one), so nothing unique to you is ever shared.
- **Consent boundary first.** No session-holding execution, no write actions, and no public aggregation ship before the per-action consent/permission boundary exists. That boundary is the product, not a later add-on.

## 9. Five laws that keep it out of the graveyard

1. **Publishers gain control by joining, never lose it.** (anti-AMP: they keep their domain, identity, and data)
2. **Works on anything, day one, zero setup.** (anti-RSS cold start)
3. **Reading is the on-ramp; action, memory, and search are the product.** (anti-Pocket)
4. **Coexist, do not demand the default; novelty on the agent side, familiarity on the human side.** (anti-Arc)
5. **Be the neutral layer the giants cannot be, not a rival to the giants.** (anti AI-browser land grab)

## 10. Build order (de-risked, ship-fast)

Each stage is independently demoable and verifiable. Risky autonomy stays gated until the consent boundary lands.

- **B0 - Plan.** This doc.
- **B1 - Reader core.** UnClick Doc format + fast renderer on a system webview + Tier 0 auto-convert + on-device SWR cache, over the document web (articles, docs, blogs, reference). Demoable: any URL, instant, clean, identical everywhere. Reuses existing conversion primitives (`readability_score`, `html_strip`, `markdown_to_html`).
- **B2 - Search slice.** Index what gets converted; answers plus clean sources. Bootstraps off B1 browsing.
- **B3 - AI-native shell.** Address bar as intent; ambient memory + tools; agent reads the structured page; act through the One Door and Gatekeeper.
- **B4 - Native discovery sensor.** Fold the `@unclick/browser-extension` flywheel in as the browser's native observe -> draft engine (me-only, structure-not-content, gated). Browser and extension fully merge here: one pass yields Doc + connector.
- **B5 - CONNECT + Gatekeeper wiring.** OAuth connect path feeding Your Accounts (portable cross-PC); every built or connected tool runs through the permission boundary.
- **B6 - App escape hatch.** Quarantined webview tab for cooperative no-API apps; hand-off to the user's real browser for hostile/high-stakes.
- **B7+ - Scale + ecosystem.** Shared edge cache and public crowd aggregation (public tier, k-anon); Tier 1 publisher feed format; Tier 2 CMS sync.

## 11. Deferred (behind the consent boundary)

- Write/act-as-you execution at scale (beyond gated Co-Pilot confirm).
- Public crowd aggregation and unattended connector promotion.
- Cookie/session portability across PCs (the forbidden "never" path; OAuth covers the safe version).
- Banking and high-stakes rendered inside UnClick (hand off to the real browser instead).
- Bonded Cloud sessions, alias email + TOTP relay, the full mandate layer (per spec.md Phases 9-12).
- A from-scratch rendering engine (v2 optimization at most, scoped to the UnClick Doc format).

## 12. Open decisions for Chris

1. **Engine for v0:** system webview (recommended) vs stripped Chromium.
2. **First buildable slice:** start at B1 (reader core) as the demoable proof, or wire B4 (native sensor) onto the existing PR #1584 package first.
3. **Doc home:** keep this in `docs/connectors/` next to the extension plan, or promote the browser to its own top-level `docs/browser/` area as it grows.
4. **Standalone vs mode:** ship as a standalone app, or as a reader/agent mode that can also run as the existing extension inside Chrome first (cheapest path to real users).

## 13. Definition of done (per stage)

- Tested core logic (package-local vitest; canary tests proving no real values survive a shape capture, mirroring PR #1584).
- Typecheck clean, lint scope safe.
- A working, clickable demo of that stage's headline ("any URL renders clean and instant," "ask the address bar a question," "browse a no-API site and a connector draft appears me-only").
- No claim of a capability that is only designed, not shipped. Honesty over green badges.
