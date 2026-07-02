// wiring/urlscan.ts
// Per-app MCP wiring for the urlscan connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Security

import { scanUrlUrlscan, getScanResult, searchUrlscan } from "../urlscan-tool.js";

export const urlscanTools = [
  // ── urlscan-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "urlscan_scan",
    description: "Submit a URL for scanning on urlscan.io.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        url: { type: "string" },
        visibility: { type: "string", enum: ["public", "private", "unlisted"], description: "public, private, or unlisted" },
        api_key: { type: "string" },
      },
      required: ["url"],
    },
  },
  {
    name: "urlscan_get_result",
    description: "Get the result of a urlscan.io scan by UUID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        uuid: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["uuid"],
    },
  },
  {
    name: "urlscan_search",
    description: "Search urlscan.io scan results.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string" },
        size: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["q"],
    },
  },
] as const;

export const urlscanHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // urlscan-tool.ts
  urlscan_scan:         (args) => scanUrlUrlscan(args),
  urlscan_get_result:   (args) => getScanResult(args),
  urlscan_search:       (args) => searchUrlscan(args),
};
