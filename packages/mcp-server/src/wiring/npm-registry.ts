// wiring/npm-registry.ts
// Per-app MCP wiring for the npm-registry connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { npmSearch, npmGetPackage } from "../npm-registry-tool.js";

export const npmRegistryTools = [
  // ── npm-registry-tool.ts ──────────────────────────────────────────────────
  {
    name: "npm_search",
    description: "Search npm packages by name or keyword.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        query: { type: "string" as const, description: "Package name or keyword." },
        size: { type: "number" as const, description: "Max results (default 10, max 50)." },
      }, required: ["query"],
    },
  },
  {
    name: "npm_get_package",
    description: "Get metadata for an npm package (latest version).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        name: { type: "string" as const, description: "Package name." },
      }, required: ["name"],
    },
  },
] as const;

export const npmRegistryHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // npm-registry-tool.ts
  npm_search:                (args) => npmSearch(args),
  npm_get_package:           (args) => npmGetPackage(args),};
