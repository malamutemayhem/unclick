// wiring/dotproduct.ts
// Per-app MCP wiring for the dotproduct connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { dotProduct } from "../dotproduct-tool.js";

export const dotproductTools = [
  // ── dotproduct-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "dot_product",
    description: "Compute the dot product of two vectors. Returns magnitude, angle, and orthogonality check.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        a: { type: "array" as const, items: { type: "number" as const }, description: "First vector." },
        b: { type: "array" as const, items: { type: "number" as const }, description: "Second vector (same length)." },
      }, required: ["a", "b"],
    },
  },
] as const;

export const dotproductHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // dotproduct-tool.ts
  dot_product:               (args) => dotProduct(args),
};
