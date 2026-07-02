// wiring/epoch.ts
// Per-app MCP wiring for the epoch connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { epochConvert, epochNow } from "../epoch-tool.js";

export const epochTools = [
  // ── epoch-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "epoch_convert",
    description: "Convert a Unix epoch timestamp to ISO 8601 and human-readable formats.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        timestamp: { type: "number" as const, description: "Unix epoch (seconds or milliseconds)." },
      }, required: ["timestamp"],
    },
  },
  {
    name: "epoch_now",
    description: "Get the current Unix epoch timestamp in seconds and milliseconds.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const epochHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // epoch-tool.ts
  epoch_convert:             (args) => epochConvert(args),
  epoch_now:                 (args) => epochNow(args),
};
