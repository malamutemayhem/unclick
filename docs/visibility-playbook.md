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

## Re-audit 2026-07-02 (remote seat, network-restricted; sources: GitHub API, registry.npmjs.org, web search probes)

| Surface | State 2026-07-02 | Change since 2026-06-11 |
|---|---|---|
| npm @unclick/mcp-server | latest is still 0.3.99, published 2026-05-17; repo is at 0.3.110 | STALE: no npm publish in ~6 weeks; the enriched description/keywords from this playbook's PR are still NOT live on npm |
| GitHub repo | 4 stars, 0 forks, 85 open issues; description, homepage, and 10 topics set; Discussions enabled | Stars flat; front door mostly dressed (see Phase 0 updates) |
| Google index | Only the homepage surfaced in a `site:unclick.world` probe, with the stale title "UnClick - The Operating System for AI Agents" and old "172+ verified tools" copy | Index is thin and stale; Search Console chip is now urgent. The stale OS framing also violates the naming rule in this playbook |
| PulseMCP | Listed as "Official Unclick MCP Server" | Holding |
| mcp.so / mcpservers.org | Did not surface in targeted search probes from this seat | Verify manually and submit/claim where offered |
| PolicyLayer | Catalogs 451 UnClick tools under the slug `creativelead-unclick` (derived from the npm maintainer email, not a copycat). Positions itself as a policy proxy in front of UnClick | Vendor-response posture now published in `SECURITY.md`; attribution correction is an outreach item |
| Organic chatter | Still none found (Reddit, HN, X) | Unchanged; Phase 2 has not started |
| Memory MCP roundups | UnClick absent from every 2026 "best memory MCP servers" list found (fast.io, awesomeclaude.ai, getunblocked.com, chatforest.com, developersdigest.tech, n8n blog) | New gap identified; memory is a headline feature and we are not in the memory conversation. See Appendix E |

Registry drift note: the published package (0.3.99) carries `mcpName: io.github.malamutemayhem/unclick-mcp-server` while the repo `package.json` now says `io.github.malamutemayhem/unclick`. The next npm publish will change the MCP registry identity; confirm that rename is intended before publishing.

## Operator quick actions (highest leverage first, as of 2026-07-02)

Things only Chris can do; everything is prepared so each is a short session:

1. **Publish the MCP package to npm** (`packages/mcp-server`, currently 0.3.110 vs published 0.3.99). One `npm publish` ships ~11 versions of improvements AND the enriched npm metadata to the single strongest discovery surface (~8.9k downloads/30d). The CI publish workflow is GitHub-Releases-only by design, so npm is manual. Check the `mcpName` drift note above first.
2. **Google Search Console + Bing Webmaster Tools.** Verify unclick.world, submit `/sitemap.xml`. The index currently shows one page with month-old copy; this is the direct fix. Bing feeds ChatGPT browsing.
3. **Email PolicyLayer** using the Appendix D template. Link the new security posture section in `SECURITY.md` as the vendor response, and ask them to correct the `creativelead-unclick` attribution to UnClick / malamutemayhem.
4. **GitHub repo finishing touches:** upload the social preview image (Settings, reuse `public/og-image.png`) and pin a welcome/setup thread in Discussions (already enabled).
5. **Nudge or close the stale visibility lanes:** #1423 (GEO proof files), #1453 (beta-neutral surfaces), #1439 (README badge) have all been draft and untouched since 2026-06-14. Land, hand off, or close them; #1423 in particular blocks Phase 1.
6. **Memory roundup outreach** (Appendix E): send the prepared notes to the editorial lists. Note that star-ranked lists will not include a 4-star repo, which is one more reason Phase 2 (the posts that earn stars) comes first.

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
| GEO proof files and machine-readable answers | #1423 (draft, stale since 2026-06-14) | `index.html`, `public/llms.txt`, `api/sitemap.ts`, `README.md`, new `public/ai-*.md/json` files |
| Beta-neutral public surfaces (pricing talk removal) | #1453 (draft, stale since 2026-06-14) | Public page copy, `site-stats.ts`, prerender routes |
| CodeGuilds registry badge | #1439 (draft, stale since 2026-06-14) | `README.md` |
| Investor deck | #1289 (draft) | Deck assets |

Staleness checked 2026-07-02: all three visibility lanes above have had no pushes since 2026-06-14. They still own their files (no-stomp holds), but they need a land/hand-off/close decision from the operator; see Operator quick actions.

Anything in those columns belongs to those lanes. New visibility copy must also stay consistent with #1453's direction: keep public drafts pricing-neutral until that lane lands.

## Operating principles for the quiet phase

1. **Truth-locked claims only.** Same anchor rule as `docs/polish-ring-fence-audit.md`: status must be earned. Pull current numbers from `src/config/site-stats.ts` before publishing any count. Mark estimates as estimates.
2. **Chris posts, agents draft.** No agent-operated accounts posting to Reddit, HN, or social as if human. No vote rings, no sock puppets, no AI-generated comment seeding. Platforms detect and ban it, and one genuine builder voice converts better anyway. Agents prepare drafts, monitor replies, and suggest responses.
3. **Fix the record before driving traffic to it.** Directory and scanner pages get cleaned up first, because new visitors will land there to verify us.
4. **Measure from day zero.** `scripts/visibility-snapshot.mjs` appends dated traction rows to `docs/visibility-log.json`. Run it weekly (any seat, or manually) so the growth curve exists when an investor asks for it.
5. **Naming discipline in public copy.** UnClick is "the universal remote for AI" or "the shared layer your agent plugs into". Never frame it as an operating system, kernel, or device-level platform (standing rule: Stripe model, not Windows model). Say "XPass products", not "Pass family", in new copy. Compare against the generic category "self-hosted agents", not named products.

## Phase 0: fix the record (week 1)

Get every surface that describes UnClick saying the same, current, correct thing.

- [x] **PolicyLayer risk pages** (response half done 2026-07-02). A security posture section now lives in `SECURITY.md`: honest framing of write-class tools in a 450-endpoint catalog, credential handling, meta-tool surface control, the depth ladder, XPass, and an explicit "policy gateways in front of UnClick are welcome" stance, plus a standing invitation for scanner services to request corrections. Direct page reads were blocked from the 2026-07-02 seat (network policy), so the per-finding extraction remains open. Remaining: Chris emails PolicyLayer (Appendix D + `SECURITY.md` link) and asks for the `creativelead-unclick` attribution fix.
- [ ] **Directory listings pass** (partial 2026-07-02). PulseMCP confirmed listed as "Official Unclick MCP Server". mcp.so and mcpservers.org did not surface UnClick in search probes from the restricted seat; verify in a browser and submit/claim where offered (mcp.so accepts submissions; mcpservers.org takes PRs to its repo). Stork.AI unverified. Note per-directory contact/claim mechanism here as discovered.
- [ ] **Google Search Console + Bing Webmaster Tools.** Verify unclick.world, submit the sitemap, fix anything flagged. Bing matters disproportionately: it feeds ChatGPT browsing and several answer engines. Owner: Chris (needs account access). URGENCY UP 2026-07-02: a `site:unclick.world` probe surfaced only the homepage, with stale month-old title/copy.
- [x] **GitHub repo front door** (verified live 2026-07-02). Description, website, and topics (`agent-tools`, `ai-agents`, `ai-memory`, `claude`, `integrations`, `llm`, `mcp`, `mcp-server`, `model-context-protocol`, `typescript`) are all set; Discussions is enabled. Remaining for Chris: upload the social preview image (`public/og-image.png`) and pin a welcome/setup-help thread in Discussions.
- [ ] **npm metadata.** Shipped in this playbook's PR to `packages/mcp-server/package.json`, but NOT live: npm latest is still 0.3.99 (published 2026-05-17). The CI publish workflow intentionally targets GitHub Releases only, so npm needs a manual publish by Chris. This is Operator quick action #1.
- [ ] **Trademark check.** IP Australia search could not run from this seat (no API key connected). Manual: search "UnClick" at https://search.ipaustralia.gov.au/trademarks/search/quick and consider a class 42 (software/SaaS) filing. Cheap insurance against the copycat scenario. Owner: Chris.

## Phase 1: be quotable (weeks 1-2)

GEO means being the easiest correct answer to "What is UnClick?". Most of the machine-readable work is owned by PR #1423; this phase is about consistency.

- [ ] **One canonical answer, used everywhere.** "UnClick is the universal remote for AI: one MCP install that gives any compatible agent 450+ callable endpoints across 60+ integrations, plus persistent cross-session memory." Every directory, README, npm, and social bio should reduce to this sentence. Consistent phrasing across surfaces is itself a GEO signal: answer engines repeat what corroborates.
- [ ] **Land #1423** (GEO proof files) or hand it back to its lane with a nudge in the Boardroom if stale.
- [ ] **Monthly GEO probe.** Ask ChatGPT, Claude, Perplexity, and Gemini "What is UnClick?" and "best MCP servers for agent memory". Log answer quality (correct / partial / absent / wrong) as a row in the session findings of this file. The probe is the GEO scoreboard.
  - Probe 2026-07-02 (web-search proxy for answer engines, from a restricted seat): "what is UnClick" = PARTIAL. Search synthesis correctly returned the universal-remote description and 450+/60+ counts (sourced from the GitHub repo description), but the unclick.world index snippet still says "The Operating System for AI Agents" with "172+ verified tools", both stale and off the current naming rule. "best MCP servers for agent memory" = ABSENT. UnClick appears in zero memory roundups; AgentMemory, mcp-memory-service, Engram, and Memory MCP own that answer today. Full client-side probe (ChatGPT/Claude/Perplexity/Gemini) still due from an unrestricted seat.
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
- 2026-07-02: Three-week re-audit from a remote seat (see the 2026-07-02 table). Traction row appended to `docs/visibility-log.json` (stars flat at 4; downloads unavailable from this seat). Biggest finding: npm has not been published since 2026-05-17, so the strongest channel runs 6 weeks stale and the enriched metadata never went live; made this Operator quick action #1. GitHub front door verified done except social preview + pinned Discussions thread. Security posture section shipped in `SECURITY.md` as the scanner/vendor response. PolicyLayer `creativelead-unclick` attribution traced to the npm maintainer email (not a copycat). New gap logged: absent from all memory-MCP roundups (Appendix E outreach kit added). All three in-flight visibility lanes (#1423/#1453/#1439) stale since 2026-06-14 and flagged for an operator decision. First GEO probe row logged under Phase 1.

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
> [For scanner/risk pages:] If specific findings drove the rating, I'd value the detail; I'll either fix the issue or publish a vendor response you can link. Security posture is documented at https://github.com/malamutemayhem/unclick/blob/main/SECURITY.md.
>
> Happy to verify ownership however you prefer. Thanks!

## Appendix E: memory roundup outreach kit (added 2026-07-02)

UnClick's memory layer is a headline feature, and UnClick appears in none of the
2026 "best memory MCP servers" roundups. Targets found in the 2026-07-02 probe:

| Target | Type | Angle |
|---|---|---|
| getunblocked.com/blog/memory-mcp-servers-compared | Editorial comparison with benchmarks | Ask what it would take to be included in the next refresh; offer a test key |
| chatforest.com/guides/best-memory-mcp-servers | Editorial guide | Same ask; emphasize cross-client memory (one store shared by Claude, ChatGPT, Cursor) |
| fast.io/resources/best-mcp-servers | Vendor-published roundup | Long shot; only worth a short note |
| developersdigest.tech/best/mcp-servers | Editorial roundup by category | Ask about the memory category specifically |
| blog.n8n.io/best-mcp-servers | Editorial roundup | Angle: agents that need both tools AND memory from one server |
| awesomeclaude.ai/mcp/knowledge-memory | Ranked by GitHub stars | Do not pitch; we will not clear a star-ranked bar at 4 stars. Revisit after Phase 2 |
| pulsemcp.com/servers?q=memory | Directory category (686 servers) | Check whether the existing official listing carries memory tags; fix via the claim/contact channel |

Reality check: star-ranked lists are gated by the thing Phase 2 earns. Editorial
lists are gated by being genuinely useful to the writer. Send only the editorial
notes now, and only with the honest angle: UnClick is the option for people who
want memory AND the tool catalog in one server, cross-client, with the tradeoff
that it is a hosted service rather than a local-only store.

Draft note (Chris to personalize per target; keep it to one screen):

> Subject: UnClick for your memory MCP server comparison
>
> Hi [name], I read your [piece] on memory MCP servers and it is one of the few
> that actually compares behavior instead of listing README claims.
>
> I build UnClick (https://unclick.world, npm @unclick/mcp-server). One MCP
> install that combines persistent cross-session memory (identity, durable
> facts, session summaries, decay, search) with a 450+ endpoint tool catalog
> behind four meta-tools. The memory is shared across clients: the same store
> follows the user from Claude to ChatGPT to Cursor.
>
> If you refresh the piece, I would value being measured against your criteria,
> and I am happy to set up a test key or answer anything about the memory
> model's internals. If it does not fit the piece, no worries, and the
> comparison was useful to me regardless.
>
> Chris, Melbourne
