# Scaling the UnClick tool catalogue (toward millions of apps)

Status: DRAFT for review (maintainers + context-packet owner). Do not build
tiers 2 or 3 from this doc alone; they change the published npm package and
likely the database. Tier 1 (file split) is safe and proceeds separately.

## The problem in one line

Today every tool's schema and handler is hand-written into compiled TypeScript
source that ships inside the `@unclick/mcp-server` npm package and is parsed as
text at build time. That model is fine for hundreds of tools, strained at
thousands, and impossible at millions.

## Why source files cannot reach millions

The catalogue currently lived in one ~25,000-line file (`tool-wiring.ts`), now
split into `additional-tools.ts` (~21k lines) and `additional-handlers.ts`
(~4k). At scale, source-file storage hits three hard walls:

1. Bundle and install size. Every tool schema is shipped to every user on
   `npm install`, even tools they never call. A million tools is hundreds of MB
   of JSON-shaped TypeScript in one package.
2. Parse and memory cost at startup. The server loads the entire catalogue into
   memory to answer `ListTools` and to dispatch. Millions of entries is a cold
   start and a memory footprint no client wants.
3. Build-time text scanning. Several scripts read the wiring files AS TEXT
   (`generate-tool-index.mjs`, `generate-standalone-mcp.mjs`,
   `audit-integrations.mjs`, `check-app-connection-readiness.mjs`, the
   `schema-handler-contract` test). Text-scanning a multi-gigabyte source tree
   is not viable, and it is brittle: the recent "Website" CI break happened
   precisely because a text scanner read `tool-wiring.ts` after we emptied it.

Conclusion: file splitting buys maintainability for the current ~600 connectors
and headroom into the low thousands. It does NOT reach millions. Millions
requires the catalogue to become queried DATA that is discovered and loaded on
demand, not enumerated source that is compiled and shipped.

## What is already pointing the right way

UnClick already exposes hidden meta-tools that assume "discover, do not list
everything":

- `unclick_search` - find tools by keyword
- `unclick_browse` - list tools, optionally by category
- `unclick_tool_info` - get one endpoint's parameter detail
- `unclick_call` - execute any endpoint by id

Agents are already told (per the MCP server instructions) to find a tool with
`unclick_search` and run it with `unclick_call`, rather than relying on a giant
`ListTools`. The discovery surface is therefore already built for scale. The
missing half is the storage and loading model behind it.

## The three tiers

### Tier 1 - Split into per-app files (this is Stage 3b, safe, in progress)

- One small module per connector: `packages/mcp-server/src/wiring/<slug>.ts`
  holding that connector's tool schemas, handler entries, and its imports.
- `additional-tools.ts` and `additional-handlers.ts` become small generated
  index files that import and assemble the per-app modules.
- The text scanners read the `wiring/` directory instead of one monolith.
- Behaviour-preserving: the runtime `ADDITIONAL_TOOLS` array and
  `ADDITIONAL_HANDLERS` map are byte-for-byte identical in content and order;
  generator outputs are proven identical.
- Buys: every file becomes small and reviewable; adding a connector touches one
  file; sets up Tier 2.
- Ceiling: low thousands of connectors.

### Tier 2 - Co-locate wiring inside each connector

- Move each connector's tool schemas and handler map from `wiring/<slug>.ts`
  into the connector's own `<slug>-tool.ts` (it already exists per the connector
  playbook in `docs/adding-a-connector.md`).
- A registry auto-collects every connector module's exported tools and handlers.
- The central `additional-*` files disappear entirely; adding a connector never
  edits a shared file (the "ant mound" model the connector docs describe).
- Buys: no monolith at all; clean ownership; removes the text-scan coupling.
- Ceiling: tens of thousands, still bounded by "everything ships in one package".

### Tier 3 - Catalogue as data, loaded on demand (the millions answer)

The core idea: tool schemas stop being compiled source and become rows in a
store. The npm package ships only a small CORE set (memory tools, the meta-tools,
the most-used connectors). Everything else is fetched on demand.

Shape:

- Storage. Tool definitions (name, description, inputSchema, category, owner,
  connector binding) live as DATA: a database table (Supabase) and/or a
  content-addressed, sharded JSON catalogue served from a CDN/edge. Each tool
  is one row keyed by a stable tool id.
- Discovery. `unclick_search` / `unclick_browse` query the store (full-text and
  category indexes), returning small result pages, never the whole catalogue.
  This already matches the agent workflow.
- Lazy load. `unclick_tool_info` and `unclick_call` fetch a single tool's schema
  and binding on demand and cache it for the session. Only touched tools are
  ever materialized in memory.
- Execution binding. A tool row points at how to run it: an HTTP endpoint
  template, a connector module, or a hosted-MCP passthrough. Handlers stop being
  hand-written closures and become a small number of generic executors driven by
  the row's binding metadata.
- Core vs long tail. A curated CORE (bundled in the npm package) guarantees
  offline/zero-latency for the essentials; the long tail is remote and lazy.
- Sharding. The store is partitioned (by category, owner, or hash) so no single
  index or shard grows unbounded; search fans out across shards.

Buys: millions of tools with bounded install size, bounded memory, and
sub-second discovery. The package size and cold start become independent of
catalogue size.

Costs and risks (why this needs sign-off):

- Changes the published `@unclick/mcp-server` contract (it becomes a thin client
  over a remote catalogue; offline behaviour must be defined).
- Adds a network dependency and a caching/consistency story for tool schemas.
- Needs an authn/authz and trust model for who can publish tools into the store
  (a million-app marketplace is a supply-chain surface; tool definitions are
  executable intent).
- Generic executors must safely cover the binding shapes that hand-written
  handlers cover today (arg munging, credential resolution via Backstage Pass,
  error normalization, freshness stamping).
- Build-time text scanners must be retired in favour of validating the data
  store directly.

## Recommended sequence

1. Ship Tier 1 (Stage 3b) now. Low risk, immediate maintainability win, and the
   stepping stone to Tier 2.
2. Pilot Tier 2 on a handful of connectors to prove the auto-collect registry
   and the export contract, then convert the rest mechanically.
3. Design Tier 3 with maintainers: pick the store (Supabase table vs sharded
   CDN JSON vs hybrid), define the CORE set, the binding-metadata schema, the
   generic executors, the publish/trust model, and the offline contract. Build
   behind a flag, migrate the long tail first, keep CORE bundled.

## Cross-cutting rule learned this cycle

Do not parse the catalogue as TEXT from source files. Every text scanner that
reads the wiring is a brittle coupling that breaks when the file layout changes
(this caused the readiness-gate CI break). As the catalogue becomes data, these
scanners should query the data/registry, not regex source.

## Open questions for maintainers

- Store of record for Tier 3: Supabase table, sharded CDN JSON, or hybrid?
- What is the CORE set that always ships bundled?
- Binding-metadata schema: how does a data row describe "how to call this tool"
  generically enough to retire bespoke handlers?
- Publish and trust model for third-party tool definitions at marketplace scale.
- Offline and stale-cache behaviour for the npm client.
