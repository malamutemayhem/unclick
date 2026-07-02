// wiring/domainsdb.ts
// Per-app MCP wiring for the domainsdb connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { domainsdbSearch, domainsdbTlds } from "../domainsdb-tool.js";

export const domainsdbTools = [
  // ── domainsdb-tool.ts ────────────────────────────────────────────────────────
  {
    name: "domainsdb_search",
    description: "Search registered domain names by keyword or pattern.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        domain: { type: "string" as const, description: "Domain keyword to search (e.g. 'google', 'shop')." },
        zone: { type: "string" as const, description: "TLD zone filter (e.g. 'com', 'org', 'io')." },
        limit: { type: "number" as const, description: "Max results (default 20)." },
      }, required: ["domain"],
    },
  },
  {
    name: "domainsdb_tlds",
    description: "List available top-level domains (TLDs) from DomainsDB.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
] as const;

export const domainsdbHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // domainsdb-tool.ts
  domainsdb_search:          (args) => domainsdbSearch(args),
  domainsdb_tlds:            (args) => domainsdbTlds(args),};
