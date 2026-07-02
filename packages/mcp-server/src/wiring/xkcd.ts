// wiring/xkcd.ts
// Per-app MCP wiring for the xkcd connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { xkcdLatest, xkcdComic, xkcdRandom } from "../xkcd-tool.js";

export const xkcdTools = [
  // ── xkcd-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "xkcd_latest",
    description: "Get the latest xkcd comic.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "xkcd_comic",
    description: "Get a specific xkcd comic by number.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        number: { type: "number", description: "Comic number" },
      },
      required: ["number"],
    },
  },
  {
    name: "xkcd_random",
    description: "Get a random xkcd comic.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
] as const;

export const xkcdHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // xkcd-tool.ts
  xkcd_latest:             (args) => xkcdLatest(args),
  xkcd_comic:              (args) => xkcdComic(args),
  xkcd_random:             (args) => xkcdRandom(args),
};
