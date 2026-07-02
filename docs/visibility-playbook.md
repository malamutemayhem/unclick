# UnClick visibility playbook (SEO, GEO, community)

**Status:** living plan, created 2026-06-11
**Owner:** Chris (operator). Worker seats execute chips from it and log results here or in the Boardroom.
**Goal (operator's words, distilled):** start getting talked about, build a bit of community, reach enough visibility to attract investors. Quiet foundations first, not rooftop screaming. Monetization questions come later.

This is the coordination spine for visibility work. Before picking up any chip from this file, check the Boardroom and the no-stomp map in `docs/polish-ring-fence-audit.md` so two seats never work the same surface.

## Where visibility stands (audited 2026-06-11)

| Surface | State | Notes |
|---|---|---|
| unclick.world | Live, SEO/GEO hardened | SEOPass 100, GEOPass 95 at last live check |
| GitHub repo | 4 stars, 20 releases | Front door is under-dressed (see Phase 0) |
| npm @unclick/mcp-server | latest 0.3.99, ~8.9k downloads/30d | Strongest traction signal we have |
| PulseMCP | Listed as official, est. 14.8k visitors | Best directory placement so far |
| Other directories | mcpservers.org, MCP Playground, Vibehackers, Stork.AI, MCP.so, Ecommerce Guide, Awesome MCP Servers | Mostly auto-scraped from npm/GitHub |
| Scanner pages | PolicyLayer critical-risk and high-risk pages, AaaS Knowledge Index | Automated, but they shape first impressions |
| Organic chatter | None found | No HN, Reddit, Product Hunt, X, Bluesky, or Mastodon discussion yet |

The read: strong directory/index footprint, zero organic conversation. Downloads without discussion means people find UnClick through directories, not through people. The job is to start the people layer without faking it.

### Already shipped (do not redo)

- Crawlable boot screen with H1/H2/FAQ/links on the homepage shell (PR #1399).
- Spinner-only above the fold; crawlable content below the fold. Do NOT reintroduce visible boot text above the fold (operator decision, PR #1427).
- Per-route prerendered pages with route-specific title, description, canonical, and Open Graph (`scripts/prerender-routes.mjs`).
- Dynamic sitemap at `/sitemap.xml` (`api/sitemap.ts`), AI-crawler-welcoming `robots.txt`, `public/llms.txt`.
- JSON-LD on the homepage (Organization, WebSite, SoftwareApplication, ItemList, FAQPage).
- Runtime per-route meta and canonical hooks (`src/hooks/useMetaTags.ts`, `src/hooks/use-canonical.ts`).

### In flight (no-stomp, check before touching)

| Lane | Owner PR | Files it ring-fences |
|---|---|---|
| GEO proof files and machine-readable answers | #1423 (draft) | `index.html`, `public/llms.txt`, `api/sitemap.ts`, `README.md`, new `public/ai-*.md/json` files |
| Beta-neutral public surfaces (pricing talk removal) | #1453 (draft) | Public page copy, `site-stats.ts`, prerender routes |
| CodeGuilds registry badge | #1439 (draft) | `README.md` |
| Investor deck | #1289 (draft) | Deck assets |

Anything in those columns belongs to those lanes. New visibility copy must also stay consistent with #1453's direction: keep public drafts pricing-neutral until that lane lands.

## Operating principles for the quiet phase

1. **Truth-locked claims only.** Same anchor rule as `docs/polish-ring-fence-audit.md`: status must be earned. Pull current numbers from `src/config/site-stats.ts` before publishing any count. Mark estimates as estimates.
2. **Chris posts, agents draft.** No agent-operated accounts posting to Reddit, HN, or social as if human. No vote rings, no sock puppets, no AI-generated comment seeding. Platforms detect and ban it, and one genuine builder voice converts better anyway. Agents prepare drafts, monitor replies, and suggest responses.
3. **Fix the record before driving traffic to it.** Directory and scanner pages get cleaned up first, because new visitors will land there to verify us.
4. **Measure from day zero.** `scripts/visibility-snapshot.mjs` appends dated traction rows to `docs/visibility-log.json`. Run it weekly (any seat, or manually) so the growth curve exists when an investor asks for it.
5. **Naming discipline in public copy.** UnClick is "the universal remote for AI" or "the shared layer your agent plugs into". Never frame it as an operating system, kernel, or device-level platform (standing rule: Stripe model, not Windows model). Say "XPass products", not "Pass family", in new copy. Compare against the generic category "self-hosted agents", not named products.

## Phase 0: fix the record (week 1)

Get every surface that describes UnClick saying the same, current, correct thing.

- [ ] **PolicyLayer risk pages.** Read both pages and extract their specific findings. If findings are real (for example, broad tool permissions are inherent to a 450-endpoint server), publish an honest response: a security posture section in `SECURITY.md` or a dedicated trust page explaining scoping, Keychain credential handling, and the XPass verification layer. Then contact PolicyLayer through their listed channel and request a re-scan or vendor response placement. Scanner pages with a vendor response read very differently to silent red flags.
- [ ] **Directory listings pass.** For PulseMCP, MCP.so, mcpservers.org, and Stork.AI: confirm name, one-liner, install command, and links are current. Claim the listing where claiming is offered. Note per-directory contact/claim mechanism in this file as discovered.
- [ ] **Google Search Console + Bing Webmaster Tools.** Verify unclick.world, submit the sitemap, fix anything flagged. Bing matters disproportionately: it feeds ChatGPT browsing and several answer engines. Owner: Chris (needs account access).
- [ ] **GitHub repo front door.** In repo Settings: set description ("One MCP install: 450+ callable endpoints across 60+ integrations plus persistent memory for AI agents"), website (https://unclick.world), and topics (`mcp`, `mcp-server`, `model-context-protocol`, `ai-agents`, `claude`, `agent-tools`, `ai-memory`, `typescript`). Upload the social preview image (reuse `public/og-image.png`). Enable Discussions with a pinned welcome/setup-help thread. Owner: Chris (repo settings are manual).
- [ ] **npm metadata.** Shipped in this playbook's PR: richer description, 16 keywords, homepage, bugs URL in `packages/mcp-server/package.json`. Takes effect on next publish.
- [ ] **Trademark check.** IP Australia search could not run from this seat (no API key connected). Manual: search "UnClick" at https://search.ipaustralia.gov.au/trademarks/search/quick and consider a class 42 (software/SaaS) filing. Cheap insurance against the copycat scenario. Owner: Chris.

## Phase 1: be quotable (weeks 1-2)

GEO means being the easiest correct answer to "What is UnClick?". Most of the machine-readable work is owned by PR #1423; this phase is about consistency.

- [ ] **One canonical answer, used everywhere.** "UnClick is the universal remote for AI: one MCP install that gives any compatible agent 450+ callable endpoints across 60+ integrations, plus persistent cross-session memory." Every directory, README, npm, and social bio should reduce to this sentence. Consistent phrasing across surfaces is itself a GEO signal: answer engines repeat what corroborates.
- [ ] **Land #1423** (GEO proof files) or hand it back to its lane with a nudge in the Boardroom if stale.
- [ ] **Monthly GEO probe.** Ask ChatGPT, Claude, Perplexity, and Gemini "What is UnClick?" and "best MCP servers for agent memory". Log answer quality (correct / partial / absent / wrong) as a row in the session findings of this file. The probe is the GEO scoreboard.
- [ ] **Do not** create Wikipedia/Wikidata entries yet. Notability is not there, promotional entries get deleted, and a deletion log is a lasting negative signal.

## Phase 2: first conversations (weeks 2-4)

Order matters: small warm rooms first, big cold rooms once the story is rehearsed.

1. **r/mcp introduction post** (draft in Appendix B). Genuine builder tone, asks for feedback, not traffic. Chris posts and replies personally. Sydney-friendly timing is fine here.
2. **Show HN** (draft in Appendix A). Post on a Tuesday/Wednesday/Thursday, 8-11am US Eastern (10pm-1am Sydney; plan the late night, replies for the first 4-6 hours decide the outcome). Expect blunt feedback; commit to answering every top-level comment. If it does not land, that is normal; it can be re-attempted months later with a changed angle.
3. **MCP community presence.** Join the main MCP Discord and adjacent agent-builder communities. Be useful first: answer other people's MCP questions for a week before mentioning UnClick, and after that only when it genuinely answers the question asked.
4. **Activate @unclickworld on X and a Bluesky handle** (thread draft in Appendix C). Build-in-public cadence: 2-3 posts a week, real milestones and real lessons only. No engagement bait.

## Phase 3: compounding (month 2+)

- Changelog/build-in-public posts for each meaningful release (the 20-releases pace is itself a story).
- One technical deep dive with HN potential: the six-layer memory architecture or how XPass products verify agent work. Educational first, product second.
- Community surface: GitHub Discussions first (zero new infrastructure); a Discord only when Discussions outgrows itself.
- Submit corrections/additions to MCP roundup newsletters and awesome-lists as releases warrant.
- Product Hunt launch only after a few HN/Reddit cycles have hardened the copy and there is a small base to rally.

## Measurement

- **Traction log:** `docs/visibility-log.json`, appended by `node scripts/visibility-snapshot.mjs` (npm version + 30-day downloads, GitHub stars/forks/watchers/issues; one row per day, idempotent). Run weekly. The 2026-06-11 baseline row is partially manual (API egress was blocked from the seeding environment); future rows from an open-egress seat are fully API-sourced.
- **Search Console/Bing queries** once verified: watch which queries surface unclick.world and which target pages rank.
- **GEO probe log** (Phase 1) monthly.
- **Milestones worth posting about (and logging here):** each +1k weekly npm downloads, each 25 GitHub stars, first unsolicited mention anywhere, first community PR or issue from a stranger, each new directory listing.

## The copycat question (honest take)

The fear: visibility invites a faster copy. What actually protects UnClick:

- **Shipping pace.** 20 releases and a working fleet beat a copied landing page. A copier starts at zero on the hard parts: connector depth (the L1-L5 ladder), memory layers, XPass verification.
- **Data gravity.** Users' memory and connections live with their UnClick setup. Switching costs are real and grow with use.
- **Being the answer.** GEO compounds: once answer engines consistently describe UnClick for this category, a copy has to displace it, not just exist.
- **Brand + registration.** The trademark check in Phase 0 is the cheap formal layer.
- What does NOT protect: secrecy. Staying invisible only guarantees that whoever ships visibly first, even with less, owns the category name. That is the strongest argument for this playbook existing.

## Session findings log

- 2026-06-11: Playbook created. Baseline traction row seeded. npm metadata enriched (effective next publish). PolicyLayer findings not yet read in detail; that is the top Phase 0 chip.

---

## Appendix A: Show HN draft (Chris to edit and post personally)

> **Title:** Show HN: UnClick - one MCP install that gives AI agents 450+ tools and persistent memory
>
> I'm a solo builder in Melbourne. For the last months I've been building UnClick, after getting tired of wiring up a separate MCP server for every tool my agents needed and re-explaining my context every session.
>
> UnClick is one MCP server that exposes 450+ callable endpoints across 60+ integrations (messaging, e-commerce, finance, dev tools, security lookups, Australian services, and a long tail), plus persistent cross-session memory: identity, durable facts, session summaries, and recall that works across Claude, ChatGPT, Cursor, and any MCP-compatible client.
>
> Design choices that might interest HN:
> - Four hidden meta-tools (search/browse/info/call) so the default tool list stays small while the full catalog stays callable. Agents discover capabilities at runtime instead of drowning in 450 tool definitions.
> - Memory is layered (always-loaded identity, active facts, session summaries, searchable history) with decay, so the context an agent loads stays small and current.
> - A verification layer (XPass products) that checks agent work before it ships: tests, UI evidence, security checks, SEO/GEO readiness.
> - Built heavily by AI worker agents coordinating through the product's own job board, which has been a strange and useful dogfooding loop.
>
> Honest limitations: it's early. Some connectors are deeper than others (there's a public depth ladder), and self-hosted agent stacks still beat it for full autonomy and keeping everything on your own hardware.
>
> Repo: https://github.com/malamutemayhem/unclick. Site: https://unclick.world. I'd genuinely value feedback on the meta-tool discovery pattern and the memory model.

Pre-post checklist: refresh all counts from `src/config/site-stats.ts`, confirm the wording matches the post-#1453 public surfaces, have the repo front door (Phase 0) done first.

## Appendix B: r/mcp draft (Chris to edit and post personally)

> **Title:** I built an MCP server that bundles 450+ endpoints and cross-session memory behind 4 meta-tools - keen for feedback from people running many servers
>
> G'day. Solo builder here. I kept hitting two walls with MCP setups: tool-list bloat once you connect more than a few servers, and agents that forget everything between sessions.
>
> UnClick is my attempt at both in one server: 450+ callable endpoints across 60+ integrations, discovered at runtime through 4 meta-tools (search, browse, tool info, call) so your client's tool list stays clean, plus persistent memory (identity, facts, session summaries, search) that any MCP client can share.
>
> Install is one command, and there's a public "depth ladder" that grades how hardened each connector is, because honestly some are deeper than others.
>
> Questions I'd love takes on:
> - How do you deal with tool-list bloat across multiple servers today?
> - Would you trust shared memory living in your own database, or does memory belong inside each client?
>
> Repo: https://github.com/malamutemayhem/unclick

## Appendix C: X/Bluesky opening thread draft

1. "I've spent the last months building UnClick: one MCP install that gives an AI agent 450+ endpoints across 60+ integrations, plus memory that survives between sessions. Quiet until now. Here's what it is and why."
2. "Problem 1: every tool means another MCP server, another config, another tool-list entry. UnClick ships 4 meta-tools; the agent searches and calls everything else at runtime. Tool list stays tiny."
3. "Problem 2: agents forget. UnClick memory layers identity, durable facts, and session summaries, shared across Claude, ChatGPT, Cursor, any MCP client. Your context follows you, not the vendor."
4. "Weirdest part: UnClick is substantially built BY agents using UnClick, coordinating on its own job board, with QA gates (XPass) checking their work before merge. The dogfooding loop is the product."
5. "It's early and the connector depth varies; there's a public ladder grading each one, because honest beats shiny. 20 releases in."
6. "If you run MCP agents, I'd love feedback: github.com/malamutemayhem/unclick or unclick.world."

## Appendix D: directory/scanner correction template

> Subject: UnClick listing correction / vendor response request
>
> Hi, I'm Chris, the builder of UnClick (https://unclick.world, npm @unclick/mcp-server). Your page at [URL] describes UnClick as [stale/incorrect detail]. Current, correct details:
>
> - One-liner: UnClick is the universal remote for AI: one MCP install giving agents 450+ callable endpoints across 60+ integrations plus persistent cross-session memory.
> - Install: see https://github.com/malamutemayhem/unclick (README) or npm @unclick/mcp-server.
> - Docs for AI engines: https://unclick.world/llms.txt
>
> [For scanner/risk pages:] If specific findings drove the rating, I'd value the detail; I'll either fix the issue or publish a vendor response you can link. Security posture is documented at [SECURITY.md / trust page URL].
>
> Happy to verify ownership however you prefer. Thanks!
