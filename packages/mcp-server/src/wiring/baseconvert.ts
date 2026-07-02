// wiring/baseconvert.ts
// Per-app MCP wiring for the baseconvert connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { baseConvert } from "../baseconvert-tool.js";

export const baseconvertTools = [
  // ── baseconvert-tool.ts ─────────────────────────────────────────────────────
  {
    name: "base_convert",
    description: "Convert a number between bases (binary, octal, decimal, hex, or any base 2-36).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        value: { type: "string" as const, description: "The number to convert (as string)." },
        from_base: { type: "number" as const, description: "Source base (2-36, default 10)." },
        to_base: { type: "number" as const, description: "Target base (2-36, default 16)." },
      }, required: ["value"],
    },
  },
] as const;

export const baseconvertHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // baseconvert-tool.ts
  base_convert:              (args) => baseConvert(args),
};
