# UnClick session handoff — Connections, Workspace, Admin polish (2026-06-11 → 06-13)

Purpose: context capsule for a NEW chat thread. Read this top to bottom and you have everything this multi-phase session decided, shipped, and left open. A note on scope: this is a faithful structured report of the whole session, not a verbatim turn-by-turn transcript (no raw-log export exists). Every decision, PR, and open item is captured.

Operator: Chris (creativelead@malamutemayhem.com), Australia/Sydney. Product: UnClick (unclick.world), the universal remote for AI — one MCP install gives agents 450+ endpoints across 60+ integrations plus persistent memory. Positioning: a LAYER agents plug into ("Stripe model, not Windows model"), never an OS.

---

## 1. THE LIVE BLOCKER (start here): GitHub connect returns 500

Symptom: clicking Connect on GitHub shows "Connection failed - Server error (500). ...the sign-in app may not be fully configured yet."

Root cause (confirmed from code): the OAuth flow's first step, `/api/oauth-init`, builds a signed state token via `createOAuthStateToken` in `api/oauth-state.ts`. That function HMAC-signs the token with the provider's CLIENT SECRET (`getPlatformSecret`). If `GITHUB_CLIENT_SECRET` is not set in the Vercel production environment, it throws -> 500. **There is no code fix. GitHub cannot connect until its OAuth app is registered and these env vars are set in Vercel (Production scope):**
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `GITHUB_REDIRECT_URI` = `https://unclick.world/connect/github`
- `VITE_GITHUB_CLIENT_ID` = same client id (client-side; needs a rebuild/redeploy to take effect)

Register at https://github.com/settings/developers -> New OAuth App -> Homepage `https://unclick.world`, Authorization callback `https://unclick.world/connect/github`. This is the open human-lane job (Boardroom todo, title "Register OAuth apps + set env vars", assigned human-chris). Server env vars take effect on next function invocation; the `VITE_` one needs a redeploy.

Note: server env vars (CLIENT_ID/SECRET/REDIRECT) are read at runtime; the `VITE_GITHUB_CLIENT_ID` is compiled into the browser bundle so it needs a deploy AFTER it's set.

## 2. TWO CODE FIXES STILL TO SHIP (not yet on main)

a. **`getPlatformSecret` is incomplete (latent bug).** `api/oauth-state.ts` only handles github/xero/reddit/shopify. PR #1487 added spotify, dropbox, google-workspace, microsoft-graph to the init allow-list and callback configs, but NOT to `getPlatformSecret`. Result: once those four are registered, `/api/oauth-init` will still 500 for them until each case is added (returning `env.SPOTIFY_CLIENT_SECRET` etc., matching the callback's `clientSecretEnv` names: `SPOTIFY_CLIENT_SECRET`, `DROPBOX_CLIENT_SECRET`, `GOOGLE_WORKSPACE_CLIENT_SECRET`, `MICROSOFT_GRAPH_CLIENT_SECRET`).

b. **`/api/oauth-init` should fail friendly, not 500.** When a platform's secret is missing it currently throws -> 500. Better: detect the missing secret and return HTTP 400 with a clear JSON message ("GitHub sign-in isn't configured yet"). Then the connect page shows a calm "configuration pending" message instead of a scary server error.

c. **safeJson hardening (local commit c157264, NOT on main).** `src/pages/Connect.tsx` was patched so all 5 `res.json()` calls go through a `safeJson()` helper that turns non-JSON server replies (Vercel's plaintext "A server error has occurred" page) into readable messages. This is the reason the operator saw a readable 500 instead of "Unexpected token 'A'". It lives on the working branch but the squash-merge of #1487 did not include it. SHIP THIS (re-apply / cherry-pick onto a fresh branch off main).

Suggested next PR: one branch off origin/main containing (a) + (b) + (c). Small, ~3 files (api/oauth-state.ts, api/oauth-init.ts, src/pages/Connect.tsx). Per-repo rule below: regenerate brainmap and run the FULL vitest suite before pushing.

## 3. WHAT SHIPPED THIS SESSION (all merged to main)

- **#1466** SEO/GEO audit: SEOPass 100 / GEOPass 95 verified live; fixed agent-card.json (wrong repo URL), added security.txt + IndexNow key + `scripts/geo-probe.mjs` + `scripts/indexnow-submit.mjs`. Doc: `docs/seo-geo-audit-2026-06-11.md`.
- **#1470** UnClick Local browser extension Phase 1 (`apps/extension/`: mandates, redacted receipts, one-button revoke, zero-credential Wayback archive-save) + Connections hardening plan + Circle decisions + **two-block admin sidebar (Human / Agents)** + **Jobs (Human) lane** (zero-schema: assignees `human` / `human-*` / `human:*`; agents push humans jobs).
- **#1476** (other seat) crash-safe Passport API + retry UI + `docs/connections-ia.md`.
- **#1459** (other seat) visibility playbook + traction log.
- **#1477** Apps holistic: one list, lens views (All/Popular/Connected/Not connected/Sign-in apps/Key apps/Built-in) driven by ONE url state; Connect/Add key/Manage action.
- **#1478** fixed dead Ctrl+K search (was auth'd only by a localStorage key normal sign-ins lack; now uses the session token), full-width Apps (removed left rail; category + internet became compact dropdowns), sidebar Connections group. Also fixed a real infinite-render hang (AdminSearchBar effect depended on the session OBJECT identity; now the token string).
- **#1479** admin style sweep: Orchestrator context card off solid near-black `#101818` to standard translucent card + smaller story type; Control Tower + Seats modal canon backgrounds; **one chip per row** on Apps (operator caught Add key + Needs key redundancy: the chip now states the truth AND is the action); **Passport stripped to one job** (header counts inline, explainer+zero-counters removed, "Advanced system inventory" gated to admins only and relabelled Internal).
- **#1487** Connections auth-truth + sign-in expansion: flipped GitHub DB row api_key -> oauth2 (migration applied live, idempotent); normalized oauth->oauth2 (google-workspace, microsoft-graph); added spotify + dropbox connector rows; wired OAuth for Spotify, Dropbox, Google Workspace, Microsoft 365 (init allow-list, callback token-exchange configs, frontend connector configs with scopes + extraAuthParams, hyphenated-slug env-name fix).

## 4. LOCKED PRODUCT DECISIONS (bind all future work)

- **Naming registry**: Crews = agent packs/council. Rooms = Autopilot process stages. Seats = AI chairs only. You = the human. Circle = linked human accounts (people-linking; operator-confirmed name). Members = RESERVED for a future shared-workspace/org container.
- **Rename rule (no second Fishbowl)**: brand names live ONLY in `src/config/product-names.ts`; all contracts (tables, routes, MCP tool names, env vars) use neutral identifiers. Circle's contract identifiers are `account_links`-style.
- **Account-first identity**: the email account is durable; UnClick API keys are disposable keycards that churn rapidly. Nothing durable (vault, Circle links, memory) may anchor to a key.
- **Humans have accounts, AIs have seats; one seat per human account.** Attribution is human-first: thumbnail + name, then AI badge ("Chris - Claude Code").
- **Vault crypto = Option C** (per-account data key, server-wrapped by default, optional user passphrase). No certification needed; encrypted API-key storage is lawful (ISO/SOC are optional trust badges). Crypto code still needs an operator-approved design note before implementation (hardening phase H1).
- **Connections umbrella (sidebar, HUMAN block)**: Apps (THE list + lens submenus) + Passport (until it dissolves) + Circle + Websites (extension, "soon"). Passport DISSOLVES in P2: reveal/rotate/delete move into each app's row drawer; P3 retires the page with `/admin/keychain` -> `/admin/apps?lens=connected` redirect.
- **Connection setup kinds**: Sign-in apps (OAuth: Connect button) / Key apps (paste once: Add key) / Built-in. One app per service, never two — auth method is a property of the connection. Vercel + Supabase deliberately stay Key apps (token-first platforms).
- **Three connection types incl. browser-login** (Amazon/eBay/portals): never stored in UnClick, run via the UnClick Local extension under a mandate (no vault needed). Shown as "local session (this browser)", per-machine (does not travel like OAuth/key connections).

## 5. THE WORKSPACE MOAT (separate deep-research thread)

Brief is on main: `docs/prd/workspace-team-layer-brief.md` (a standalone context capsule). Vision: UnClick enters the team-workspace category (Todoist/Asana/Slack/Teams/Zoom/calendar) via the 80/20 best features of each, for ~10-person mixed human+AI teams who keep their own AI subscriptions. The moat is the SUBSTRATE (verified-work culture, memory, the four-way assignment matrix H-A/A-H/A-A/H-H), not the workspace features themselves. Calendar/email pain (multiple company + personal accounts): aggregate-first, owning email/calendar must prove itself. Constraints: 80/20 no bloat, maximum build automation, dogfood before public competitor claims.

## 6. OPEN ITEMS / NEXT CHIPS

- SHIP the section-2 fix (getPlatformSecret + friendly oauth-init + safeJson) — directly unblocks Spotify/Dropbox/Google/Microsoft connect once registered.
- Operator human jobs (Boardroom, assigned human-chris): register OAuth apps + env vars (GitHub first); the visibility batch (Wayback/Bing/GSC/repo topics); npm publish (enriched metadata, mcpName mismatch check).
- Connector TOOLS for Google Workspace / Microsoft 365 do not exist yet — connecting stores tokens but Gmail/Drive/Outlook/OneDrive actions are the next connector builds. GitHub/Spotify/Dropbox tools exist and consume connections today.
- Circle PR 1 (account_links + sharing toggles + You/Profile name+thumbnail + sidebar grouping — chip dfa23691).
- Passport P2 credential drawer (depends on #1476 API hardening, now merged).
- Hardening H0 (audit parity on the keychain MCP path) and H1 (vault crypto design note before code).
- Inventory-overlap CSS bug (a7e79d07) — now admin-gated so low priority; needs a real browser devtools report.

## 7. PER-REPO WORKING RULES (learned the hard way this session)

- **Always regenerate the brainmap before pushing ANY commit**: `node scripts/UnClick-brainmap.mjs` then verify `node scripts/UnClick-brainmap.mjs --check`. The CI "Website (root package)" job runs `brainmap:check` and `boardroom:check` and will fail on staleness. This bit multiple PRs.
- **Run the FULL `npx vitest run` locally before pushing**, not just the touched folder — the Website CI job runs everything (and a render-loop bug once hung it 20+ minutes).
- Naming ratchet: `npm run boardroom:check` must be clean; never write the legacy room name "Fishbowl" in new content (say "Boardroom").
- No em dashes in code or content.
- MCP package tests run from `packages/mcp-server` (root vitest config excludes it).
- CI gate quirk: branch protection needs the branch up-to-date with main; main moved every ~10 min tonight, so use enable-auto-merge + update-branch and re-kick on each "main moved".
- Security/auth/billing/DNS/migration changes need operator approval (FLEET_SYNC).

## 8. KEY FILES

- `src/pages/admin/AdminShell.tsx` — sidebar (Human/Agents blocks, Connections group, Jobs lanes)
- `src/pages/admin/AdminTools.tsx` + `src/components/apps/AppsTable.tsx` + `appLenses.ts` + `AppLensBar.tsx` — Apps page
- `src/pages/admin/AdminKeychain.tsx` — Passport
- `src/lib/connectors.ts` — frontend OAuth connector configs
- `api/oauth-init.ts`, `api/oauth-callback.ts`, `api/oauth-state.ts` — the OAuth flow (where the 500 lives)
- `src/config/product-names.ts` — the rename-safe brand-name module
- `docs/prd/` — connections-circle, connections-apps-holistic, jobs-human-lane, unclick-local-extension, workspace-team-layer-brief; `docs/connectors/connections-hardening-plan.md`; `docs/connections-ia.md`
- Supabase project id: `xmooqsylqlknuksiddca` (table `platform_connectors` drives connect chips)
