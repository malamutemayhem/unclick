// wiring/crossproduct.ts
// Per-app MCP wiring for the crossproduct connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { crossProduct } from "../crossproduct-tool.js";

export const crossproductTools = [
  // ── crossproduct-tool.ts ──────────────────────────────────────────────────────
  {
    name: "cross_product",
    description: "Compute the cross product of two 3D vectors. Returns magnitude and parallelism check.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        a: { type: "array" as const, items: { type: "number" as const }, description: "First 3D vector [x,y,z]." },
        b: { type: "array" as const, items: { type: "number" as const }, description: "Second 3D vector [x,y,z]." },
      }, required: ["a", "b"],
    },
  },
] as const;

export const crossproductHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // crossproduct-tool.ts
  cross_product:             (args) => crossProduct(args),
};
