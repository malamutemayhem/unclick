// wiring/matrix.ts
// Per-app MCP wiring for the matrix connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { matrixOperate } from "../matrix-tool.js";

export const matrixTools = [
  // ── matrix-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "matrix_operate",
    description: "Perform matrix operations: add, multiply, transpose, or determinant.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        matrix_a: { type: "array" as const, description: "First matrix (2D number array)." },
        matrix_b: { type: "array" as const, description: "Second matrix (for add/multiply)." },
        operation: { type: "string" as const, description: "Operation: add, multiply, transpose, determinant." },
      }, required: ["matrix_a"],
    },
  },
] as const;

export const matrixHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // matrix-tool.ts
  matrix_operate:            (args) => matrixOperate(args),
};
