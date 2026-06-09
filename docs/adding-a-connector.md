# Adding a connector (an "App") - playbook for a new AI seat

Read this end to end before adding an integration. It is the hard-coded memory
of how the connector library is built so you can continue the trend exactly.
Pair it with `docs/connector-standard.md` (the quality-ladder definitions).

---

## 0. Orient first (always)

1. **Load memory.** Call `load_memory` before your first action (UnClick session
   protocol). It carries standing rules and current work.
2. **Read this doc + `docs/connector-standard.md`.** This is the how-to; the
   standard is the bar.
3. **Standing rule:** Cursor Bugbot is discontinued. Treat its checks as noise.
   The real CI gates are `Website (root package)`, `MCP server package`,
   `TestPass`, and `Vercel`.

---

## 1. The mental model - connectors are the "ant mound"

Each connector is one small, hardened REST wrapper. Together they are the ant
mound everyone builds on:

- An agent **discovers** it (`unclick_search` / `unclick_browse`) and **calls**
  it (`unclick_call`, or directly when advertised).
- UnClick **uses it automatically** (the AI picks the right app on its own).
- It is an **App** in the library (public `/apps` store + admin `/admin/tools`).
- It can be published as its **own standalone MCP** (`packages/standalone/<x>-mcp`).

**Where the code lives (important):** connectors are
`packages/mcp-server/src/<slug>-tool.ts`. They are **not** in `api/` (that dir
has one legacy file). Anything that says "create api/*-tool.ts" is out of date.

---

## 2. The quality ladder (build to L5)

See `docs/connector-standard.md` for the full definitions. Summary:

| Level | Name | What it adds |
|:--:|--|--|
| L1 | Wrapper | A callable endpoint. |
| L2 | Reliable | Request timeout, 429 handling, one clean error style, a colocated test. |
| L3 | Memory-aware | Fills a missing arg from a saved memory default (opt-in). |
| L4 | Proactive | Emits a signal on a user-actionable change (opt-in). |
| L5 | Agentic | Stamps `source` + `fetched_at` + `next_steps` on every read. |

- **Default target: L5** for any connector whose primary surface is a data read.
- **L2-capped by design** for write/send, generation, and single-tool
  action-multiplexers (nothing to stamp). The grader's `L2_CAPPED_BY_DESIGN` map
  records these so they are not counted as unfinished.
- **L3 and L4 are opt-in by nature** - only add them when the connector has a
  stable per-user default (L3) or reads a changeable, user-actionable quantity (L4).

---

## 3. The connector template (copy this)

Single-credential connector (the common case):

```ts
// packages/mcp-server/src/acme-tool.ts
import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const ACME_BASE = "https://api.acme.com/v1";
const ACME_SOURCE = "Acme API v1";

function requireToken(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("acme", args); // reads args.<arg> or env <envVar> from connector-setup row
}

async function acmeFetch<T>(token: string, path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${ACME_BASE}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const ACME_TIMEOUT_MS = Number(process.env.ACME_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ACME_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }, signal: controller.signal });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") throw new Error(`Acme request timed out after ${ACME_TIMEOUT_MS}ms.`);
    throw new Error(`Acme network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("Acme rate limit reached (HTTP 429). Please wait and retry.");
  const data = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok) throw new Error(`Acme error (${res.status}): ${(data.message as string) ?? `status ${res.status}`}`);
  return data as T;
}

function stamp(result: unknown, nextSteps: string[]): Record<string, unknown> {
  return stampMeta(result, { source: ACME_SOURCE, fetched_at: new Date().toISOString(), next_steps: nextSteps });
}

export async function acmeListThings(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token; // returns the not-connected card
  const data = await acmeFetch(token, "/things");
  return stamp(data, ["Use acme_get_thing with a returned id for detail."]);
}
```

**Two-lane errors (required):** *throw* an `Error` for transport/HTTP problems;
*return* `{ error: "..." }` for input validation (missing args). Never emit a
bare `` `HTTP ${status}` `` (the grader counts those and blocks hardening).

**Auth variants** (mirror an existing connector):
- Single bearer / api key: `requireCredential("slug", args)` (datadog, hubspot, todoist).
- Multi-credential (site + email + token, etc.): read each value yourself and
  return `notConnectedFor("slug")` when missing (jira, confluence, zendesk).
- Key in a query param: append it to the URL (pipedrive, giphy, calcom).
- Key in a custom header: set it directly (unsplash `Client-ID`, shortcut `Shortcut-Token`).
- No key (public API): no credential; keep the timeout/429/stamp shape (wikipedia, ptv).

---

## 4. Wiring - the files you touch every time

1. `packages/mcp-server/src/<slug>-tool.ts` - the connector (template above).
2. `packages/mcp-server/src/<slug>-tool.test.ts` - colocated test (see §6). **Required for L2.**
3. `packages/mcp-server/src/tool-wiring.ts` - three edits:
   - the `import { ... } from "./<slug>-tool.js";` block,
   - the `ADDITIONAL_TOOLS` array: one `{ name, description, inputSchema }` per tool
     (`additionalProperties: false`, list `required`),
   - the `ADDITIONAL_HANDLERS` map: `<tool_name>: (args) => fn(args),`.
4. `packages/mcp-server/src/connector-setup.ts` - one `CONNECTOR_SETUP` row:
   `{ displayName, credential, arg, envVar, setupUrl, note? }`. This drives the
   `requireCredential` lookup and the not-connected card.
5. `scripts/generate-app-catalog.mjs` - put the slug in a category `bucket(...)`
   (never leave it to "Other"; the integrity test fails). Optionally add
   `NAME_OF` (brand casing), `BLURB_OF` (a short, simple-English one-liner,
   <=120 chars, ends like a sentence), and `DOMAIN_OF` (brand domain for the favicon).

No website tile edit is needed - the Apps pages render from the generated catalog.

---

## 5. Bolt-ons (optional rungs)

- **L3 memory default:** add the tool to `CONNECTOR_DEFAULTS_REGISTRY` in
  `packages/mcp-server/src/tool-memory-defaults.ts`
  (`{ connector, guardArgs, fillArgs }`), and surface `defaults_used` on the
  stamp (read `args.__unclick_memory_defaults`). Only do this when there is a
  stable per-user value (home org/project/site/location). See jira, neon, posthog, netlify.
- **L4 proactive:** call `emitConnectorSignal({ tool, action, severity, summary,
  deepLink, payload })` from `signals/emit.js` when a read spots a
  user-actionable condition (failed deploy, open incident, disruption). It is
  key-scoped and fire-and-forget. See ptv, pagerduty, datadog, netlify, zendesk.
- **Enforcement (no per-connector work):** `packages/mcp-server/src/tool-gating.ts`
  builds the tool→app map from the generated tool index and hides/blocks apps a
  tenant turned off (`tenant_app_state`). New connectors are covered automatically.

---

## 6. The test (required)

Colocate `<slug>-tool.test.ts` (vitest). Cover the L2 contract + the stamp:

```ts
import { afterEach, describe, expect, it, vi } from "vitest";
import { acmeListThings } from "./acme-tool.js";

describe("acme connector (L2/L5)", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });
  it("clean 429", async () => { vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, json: async () => ({}) }))); await expect(acmeListThings({ api_key: "k" })).rejects.toThrow(/rate limit/i); });
  it("clean timeout", async () => { vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("x"); e.name = "AbortError"; throw e; })); await expect(acmeListThings({ api_key: "k" })).rejects.toThrow(/timed out/i); });
  it("not connected", async () => { vi.stubEnv("ACME_API_KEY", ""); const r = await acmeListThings({}) as Record<string, unknown>; expect(r.not_connected).toBe(true); });
  it("stamps source", async () => { vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ data: [] }) }))); const r = await acmeListThings({ api_key: "k" }) as Record<string, any>; expect(r.unclick_meta.source).toMatch(/Acme/); });
});
```

**Do not** write a full-page render integration test that mounts the whole
admin Apps catalog (~200 rows) and clicks around - jsdom is so slow it stalls
the suite and hangs CI. Cover behaviour with focused unit tests.

---

## 7. Regenerate - ORDER MATTERS (this has bitten us)

Only after the connector file **and its test** exist, regenerate in this order:

```bash
cd packages/mcp-server && node scripts/generate-tool-index.mjs   # tool surface
node scripts/connector-depth-ladder.mjs                          # quality grades (depends on the test existing)
cd ../.. && node scripts/generate-app-catalog.mjs                # Apps catalog (depends on the ladder)
node scripts/UnClick-brainmap.mjs                                # brainmap (hashes EVERY source file)
```

Why the order: the depth ladder marks a connector "hardened/L5" only if its
colocated test exists; the app catalog reads the ladder's level; the brainmap
records a content hash of every file (so it goes stale on **any** edit,
including docs). If you skip a regen, a `--check` guard fails in CI.

---

## 8. Verify before pushing

```bash
cd packages/mcp-server && npx tsc --noEmit                        # types
npm run test --workspace=@unclick/mcp-server                      # 1000+ tests + tool-index/ladder/standalone --check
cd ../.. && npm run brainmap:check                                # brainmap in sync
node scripts/generate-app-catalog.mjs --check                     # app catalog in sync
npx vitest run src/lib/appCatalog.test.ts src/lib/appCatalog.copyqc.test.ts   # catalog integrity + simple-English copy
```

The MCP `test` script chains the `--check` gates; if it exits non-zero after the
tests pass, a generator is stale (re-run §7).

---

## 9. Ship

1. Commit on the working branch (see `CLAUDE.md` for the current branch).
2. Push, open a **draft PR**.
3. Enable auto-merge (squash): it merges when the required checks pass.
4. The `Website (root package)` job runs the whole site build + suite and is
   slow (~20-30 min); that is normal. Ignore Cursor Bugbot.
5. On merge to `main`: Vercel deploys to `unclick.world` and the apply-migrations
   workflow runs any new `supabase/migrations/**`.

---

## 10. Picking what to add

Favour **popular + clean auth** (bearer / api key / basic, REST JSON). Copy what
works. Avoid OAuth-heavy platforms (Google Workspace, Microsoft Graph) unless you
are doing the full OAuth flow. Confirm the slug is not already in
`docs/tool-index.generated.json`.

---

## Copy-paste checklist

- [ ] `load_memory` run; read this + `connector-standard.md`
- [ ] `src/<slug>-tool.ts` (timeout, 429, two-lane errors, `stampMeta`)
- [ ] `src/<slug>-tool.test.ts` (429, timeout, not-connected, stamp)
- [ ] `tool-wiring.ts`: import + `ADDITIONAL_TOOLS` defs + `ADDITIONAL_HANDLERS`
- [ ] `connector-setup.ts`: `CONNECTOR_SETUP` row
- [ ] `generate-app-catalog.mjs`: category bucket (+ name/blurb/domain)
- [ ] (optional) L3 registry / L4 signal
- [ ] Regenerate in order: tool-index -> ladder -> app-catalog -> brainmap
- [ ] `tsc` + MCP `test` chain + `brainmap:check` + app-catalog `--check` + frontend catalog tests
- [ ] Branch, push, draft PR, auto-merge
