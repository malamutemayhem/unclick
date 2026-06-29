// wiring/wayback.ts
// Per-app MCP wiring for the wayback connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { waybackCheck } from "../wayback-tool.js";

export const waybackTools = [
  // ── wayback-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "wayback_check",
    description: "Check if a URL has been archived by the Wayback Machine and get the closest snapshot.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        url: { type: "string" as const, description: "URL to check for archived snapshots." },
        timestamp: { type: "string" as const, description: "Target timestamp (YYYYMMDDhhmmss) for closest snapshot." },
      }, required: ["url"],
    },
  },
] as const;

export const waybackHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // wayback-tool.ts
  wayback_check:             (args) => waybackCheck(args),
};
