// wiring/contfrac.ts
// Per-app MCP wiring for the contfrac connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const contfracTools = [
  // ── contfrac-tool.ts ───────────────────────────────────────────────────────
  {
    name: "continued_fraction",
    description: "Convert a rational number to its continued fraction representation with convergents.",
    inputSchema: {
      type: "object" as const,
      properties: {
        numerator: { type: "number", description: "Numerator of the rational number" },
        denominator: { type: "number", description: "Denominator of the rational number" },
        max_terms: { type: "number", description: "Maximum number of terms (default 50)" },
      }, required: ["numerator", "denominator"],
    },
  },
] as const;
