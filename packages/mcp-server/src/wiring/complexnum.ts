// wiring/complexnum.ts
// Per-app MCP wiring for the complexnum connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { complexCalc } from "../complexnum-tool.js";

export const complexnumTools = [
  // ── complexnum-tool.ts ────────────────────────────────────────────────────────
  {
    name: "complex_calc",
    description: "Complex number arithmetic: add, subtract, multiply, divide, magnitude, conjugate, or polar conversion.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        operation: { type: "string" as const, description: "Operation: add, subtract, multiply, divide, magnitude, conjugate, or polar." },
        real1: { type: "number" as const, description: "Real part of first complex number." },
        imag1: { type: "number" as const, description: "Imaginary part of first complex number." },
        real2: { type: "number" as const, description: "Real part of second complex number (for binary ops)." },
        imag2: { type: "number" as const, description: "Imaginary part of second complex number (for binary ops)." },
      }, required: ["operation", "real1", "imag1"],
    },
  },
] as const;

export const complexnumHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // complexnum-tool.ts
  complex_calc:              (args) => complexCalc(args),
};
