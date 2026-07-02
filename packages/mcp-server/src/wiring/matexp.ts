// wiring/matexp.ts
// Per-app MCP wiring for the matexp connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const matexpTools = [
  // ── matexp-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "matrix_exponentiation",
    description: "Raise a square matrix to a non-negative integer power using fast exponentiation, with optional modular arithmetic.",
    inputSchema: {
      type: "object" as const,
      properties: {
        matrix: { type: "array", items: { type: "array", items: { type: "number" } }, description: "Square matrix (max 10x10)" },
        power: { type: "number", description: "Non-negative integer exponent (max 1 billion)" },
        mod: { type: "number", description: "Optional modulus for modular arithmetic" },
      }, required: ["matrix", "power"],
    },
  },
] as const;
