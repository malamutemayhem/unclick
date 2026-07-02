// wiring/bitwise.ts
// Per-app MCP wiring for the bitwise connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { bitwiseCalc } from "../bitwise-tool.js";

export const bitwiseTools = [
  // ── bitwise-tool.ts ────────────────────────────────────────────────────────
  {
    name: "bitwise_calc",
    description: "Perform bitwise operations (AND, OR, XOR, NOT, NAND, NOR, shifts) on integers.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        a: { type: "number" as const, description: "First integer." },
        b: { type: "number" as const, description: "Second integer (not needed for NOT)." },
        operation: { type: "string" as const, description: "Operation: and, or, xor, not, nand, nor, shift_left, shift_right (default and)." },
      }, required: ["a"],
    },
  },
] as const;

export const bitwiseHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // bitwise-tool.ts
  bitwise_calc:              (args) => bitwiseCalc(args),
};
