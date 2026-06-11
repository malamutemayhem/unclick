# SEO and GEO audit, 2026-06-11 (overnight sweep)

Live-readonly audit of unclick.world plus external presence checks, run from the cloud audit seat on branch `claude/unclick-seo-geo-audit-g9vb5b`. Companion to `docs/visibility-playbook.md` (PR #1459, draft at audit time). Findings are routed to their owning lanes per the no-stomp map; this PR only changes unowned surfaces.

## Live scores (SEOPass / GEOPass receipts)

| URL | SEOPass | GEOPass | Verdict | Run ids |
|---|---|---|---|---|
| / | 100 | 95 | ready | seopass-0e4df09e, geopass-55fabcb0b087 |
| /why | 100 | not run | ready | seopass-90c9bce8 |
| /memory | 96 (1 warn) | not run | ready | seopass-6853eeaa |
| /tools | not run | 91 (1 needs-work) | ready | geopass-15cfd0bd907b |
| /arena | 98 (1 warn) | not run | ready | seopass-6f628f8e |
| /backstagepass | 98 (1 warn) | not run | ready | seopass-1d89964d |

Baseline foundations all verified live: robots.txt 200 with valid Sitemap directive, sitemap.xml serving 40 URLs, llms.txt present (GEOPass quality 88), AI bot crawlability 100 for GPTBot/ClaudeBot/PerplexityBot/CCBot and friends, homepage answer extractability 100.

## Findings and routing (no-stomp)

| # | Finding | Severity | Owning lane | Action |
|---|---|---|---|---|
| 1 | Canonical mismatch on every non-prerendered sitemap route. 33 of 40 sitemap URLs (/arena, /arena/*, /backstagepass, /developers/docs, /tools/link-in-bio, /tools/scheduling, /tools/solve, /terms, /privacy) serve the SPA shell whose canonical points to https://unclick.world/. The sitemap says "index me", the canonical says "I am the homepage". Engines resolve the conflict by ignoring one signal. | Medium | `scripts/prerender-routes.mjs` and `index.html` are owned by #1453 and #1423 | Routed: extend the prerender route list (or emit per-route canonicals) once those lanes land. Do not fix from a third branch while both PRs are open. |
| 2 | /tools is thin for answer engines: 176 visible words, 0 question headings (GEOPass answer-extractability 70). | Medium | /tools prerender copy lives in `scripts/prerender-routes.mjs` (#1453) | Routed to the same lane as finding 1. |
| 3 | /memory has no FAQ or question-led structure (SEOPass ai-overview-readiness 65). | Low | #1423 already adds FAQ content to Memory.tsx | No action; resolves when #1423 lands. Re-run SEOPass on /memory after merge. |
| 4 | Sitemap lists /pricing while #1453 deletes the Pricing page. When #1453 lands, the sitemap will advertise a ghost route. | Medium | `api/sitemap.ts` is modified in both #1453 and #1423 | Flagged to #1453: remove /pricing from STATIC_ROUTES in the same PR that removes the page. |
| 5 | agent-card.json (public/.well-known/) pointed to the wrong GitHub repo (unclick-agent-native-endpoints) and used retired "Pass family" wording. | Medium | Unowned | Fixed in this PR: correct repo URL, canonical one-liner, llms_txt pointer. |
| 6 | No IndexNow key on the domain. IndexNow gives Bing (which feeds ChatGPT browsing and several answer engines) push-style indexing instead of waiting on crawl. | Low | Unowned | Key file added in this PR (`public/4bc7c32445404f129b50d0cf877ec29c.txt`). Submission block below, runs after deploy. |
| 7 | npm registry still serves 0.3.99 with the old description and 6 keywords; repo is at 0.3.110 and #1459's enriched metadata only goes live on next publish. | Medium | Publish pipeline (operator-gated) | Hand-off: next npm publish ships the corrected metadata. Worth doing soon; npm is the strongest traction surface (~8.9k downloads/30d). |
| 8 | unclick.world has zero Wayback Machine snapshots. Answer engines and humans cannot verify the site's history; citation-graders treat an unarchived domain as weaker provenance. | Low | External, no seat-executable tool (egress allowlisted) | Hand-off block below (one-minute browser task). |
| 9 | No Wikidata entity for UnClick the product (checked live; only unrelated "Unclick" entities exist). | Info | Per playbook: deliberately do NOT create one yet (notability risk). | Recorded as baseline. Revisit after organic coverage exists. |
| 10 | Reddit search for organic mentions could not run from this seat (API forbidden, no token); HN check blocked by egress. | Info | Playbook GEO probe (monthly, manual) | Playbook's "no organic chatter" row stands unverified-but-likely from this seat. |

## External presence baseline (2026-06-11)

- npm latest published: 0.3.99 (repo at 0.3.110). Published description/keywords stale until next publish.
- Wayback Machine: no snapshots of unclick.world.
- Wikidata: no product entity (deliberate for now).
- GEOPass external-index checks (wikidata-presence, common-crawl-presence) return "unknown" by design in live-readonly mode; the checks above were done with direct lookups instead.

## What this PR changes

1. `public/.well-known/agent-card.json`: fixed GitHub repo URL, replaced the description with the canonical one-liner plus XPass wording, added an llms_txt pointer.
2. `public/4bc7c32445404f129b50d0cf877ec29c.txt`: IndexNow key file (the key is public by design; it only authorizes URL submission pings for this domain).
3. This audit doc.

## Hand-off blocks (browser-extension executable, no agent accounts)

Per the approved playbook pattern: paste-ready blocks for Chris's Claude browser extension. None of these need code access; all run in a logged-in (or anonymous) browser.

### Block 1: Wayback Machine seed (anonymous, 2 minutes)

> Visit https://web.archive.org/save and save each of these URLs, default options:
> 1. https://unclick.world/
> 2. https://unclick.world/why
> 3. https://unclick.world/memory
> 4. https://unclick.world/tools
> 5. https://unclick.world/llms.txt
> Confirm each save completes and note the snapshot URLs.

### Block 2: IndexNow submission (anonymous, after this PR deploys)

> First confirm https://unclick.world/4bc7c32445404f129b50d0cf877ec29c.txt returns the key text. Then visit this URL (a plain GET) and confirm an HTTP 200 or 202 response:
> https://api.indexnow.org/indexnow?url=https://unclick.world/&key=4bc7c32445404f129b50d0cf877ec29c
> Repeat with url= set to https://unclick.world/why, /memory, /tools, /docs, /developers, /faq.

### Block 3: Bing Webmaster Tools (Chris's Microsoft login)

> Go to https://www.bing.com/webmasters, add unclick.world as a site. Choose URL-inspection or DNS verification per preference (DNS needs Chris; the meta-tag option needs a code PR, ask the fleet). After verification, submit https://unclick.world/sitemap.xml under Sitemaps. Bing feeds ChatGPT browsing and Copilot, so this is the highest-leverage single submission.

### Block 4: Google Search Console (Chris's Google login)

> Go to https://search.google.com/search-console, add property unclick.world (domain property needs DNS; URL-prefix property can verify via the existing Google account options). Submit https://unclick.world/sitemap.xml. Then use URL Inspection on https://unclick.world/ and request indexing.

### Block 5: GitHub repo front door (Chris's GitHub login)

> On https://github.com/malamutemayhem/unclick go to Settings (or the About gear on the repo home) and set:
> - Description: One MCP install: 450+ callable endpoints across 60+ integrations plus persistent memory for AI agents
> - Website: https://unclick.world
> - Topics: mcp, mcp-server, model-context-protocol, ai-agents, claude, agent-tools, ai-memory, typescript
> - Social preview: upload public/og-image.png from the repo
> These match the playbook (#1459) Phase 0 spec exactly.

## Re-run protocol

After #1423 and #1453 land, re-run from any seat:

- `seopass_run` on /, /memory, /tools, /arena, /terms (expect the canonical warns to clear once prerender coverage extends)
- `geopass_run` on / and /tools
- Append a row to the session findings log in `docs/visibility-playbook.md`
