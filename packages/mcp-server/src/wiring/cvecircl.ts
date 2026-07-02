// wiring/cvecircl.ts
// Per-app MCP wiring for the cvecircl connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { circlCveLookup, circlCveRecent } from "../cvecircl-tool.js";

export const cvecirclTools = [
  // ── cvecircl-tool.ts ──────────────────────────────────────────────────────
  {
    name: "circl_cve_lookup",
    description: "Look up a CVE vulnerability by ID from CIRCL (cve.circl.lu).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        cve_id: { type: "string" as const, description: "CVE ID (e.g. CVE-2024-1234)." },
      }, required: ["cve_id"],
    },
  },
  {
    name: "circl_cve_recent",
    description: "Get the most recently published CVE vulnerabilities from CIRCL.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const cvecirclHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // cvecircl-tool.ts
  circl_cve_lookup:          (args) => circlCveLookup(args),
  circl_cve_recent:          (args) => circlCveRecent(args),};
