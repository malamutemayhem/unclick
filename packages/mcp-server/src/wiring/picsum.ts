// wiring/picsum.ts
// Per-app MCP wiring for the picsum connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { picsumList, picsumGet, picsumRandomUrl } from "../picsum-tool.js";

export const picsumTools = [
  // ── picsum-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "picsum_list",
    description: "List photos available on Lorem Picsum.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        page: { type: "number", description: "Page number (default 1)" },
        limit: { type: "number", description: "Photos per page (default 20, max 100)" },
      },
    },
  },
  {
    name: "picsum_get",
    description: "Get info about a specific Lorem Picsum photo by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string", description: "Photo ID" },
      },
      required: ["id"],
    },
  },
  {
    name: "picsum_random_url",
    description: "Generate a random placeholder image URL from Lorem Picsum (no fetch needed).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        width: { type: "number", description: "Image width in pixels (default 800)" },
        height: { type: "number", description: "Image height in pixels (default 600)" },
        grayscale: { type: "boolean", description: "Convert to grayscale" },
        blur: { type: "number", description: "Blur amount (1-10)" },
      },
    },
  },
] as const;

export const picsumHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // picsum-tool.ts
  picsum_list:             (args) => picsumList(args),
  picsum_get:              (args) => picsumGet(args),
  picsum_random_url:       (args) => picsumRandomUrl(args),
};
