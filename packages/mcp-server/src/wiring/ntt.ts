// wiring/ntt.ts
// Per-app MCP wiring for the ntt connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const nttTools = [
  // ── ntt-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "ntt",
    description: "Multiply two polynomials using Number Theoretic Transform (mod 998244353).",
    inputSchema: {
      type: "object" as const,
      properties: {
        poly_a: { type: "array", items: { type: "number" }, description: "First polynomial coefficients" },
        poly_b: { type: "array", items: { type: "number" }, description: "Second polynomial coefficients" },
      }, required: ["poly_a", "poly_b"],
    },
  },
] as const;
