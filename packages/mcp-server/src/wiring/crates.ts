// wiring/crates.ts
// Per-app MCP wiring for the crates connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { cratesSearch, cratesGet } from "../crates-tool.js";

export const cratesTools = [
  // ── crates-tool.ts ────────────────────────────────────────────────────────
  {
    name: "crates_search",
    description: "Search Rust crates on crates.io by name or keyword.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        query: { type: "string" as const, description: "Crate name or keyword." },
        per_page: { type: "number" as const, description: "Results per page (default 10, max 50)." },
      }, required: ["query"],
    },
  },
  {
    name: "crates_get",
    description: "Get detailed info for a Rust crate by name from crates.io.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        name: { type: "string" as const, description: "Crate name." },
      }, required: ["name"],
    },
  },
] as const;

export const cratesHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // crates-tool.ts
  crates_search:             (args) => cratesSearch(args),
  crates_get:                (args) => cratesGet(args),};
