// wiring/fibonacci.ts
// Per-app MCP wiring for the fibonacci connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { fibonacciSequence } from "../fibonacci-tool.js";

export const fibonacciTools = [
  // ── fibonacci-tool.ts ──────────────────────────────────────────────────────
  {
    name: "fibonacci_sequence",
    description: "Generate Fibonacci numbers and optionally check if a number is Fibonacci.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        n: { type: "number" as const, description: "How many Fibonacci numbers (1-100, default 10)." },
        check: { type: "number" as const, description: "Optional number to test if it is a Fibonacci number." },
      },
    },
  },
] as const;

export const fibonacciHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // fibonacci-tool.ts
  fibonacci_sequence:        (args) => fibonacciSequence(args),
};
