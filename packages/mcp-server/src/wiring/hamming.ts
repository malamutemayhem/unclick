// wiring/hamming.ts
// Per-app MCP wiring for the hamming connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { hammingDistance } from "../hamming-tool.js";

export const hammingTools = [
  // ── hamming-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "hamming_distance",
    description: "Calculate Hamming distance between two equal-length strings.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text_a: { type: "string" as const, description: "First string." },
        text_b: { type: "string" as const, description: "Second string (must be same length)." },
      }, required: ["text_a", "text_b"],
    },
  },
] as const;

export const hammingHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // hamming-tool.ts
  hamming_distance:          (args) => hammingDistance(args),
};
