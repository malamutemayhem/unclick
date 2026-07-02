// wiring/twosat.ts
// Per-app MCP wiring for the twosat connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const twosatTools = [
  // ── twosat-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "two_sat",
    description: "Solve a 2-SAT boolean satisfiability problem using implication graph and SCC.",
    inputSchema: {
      type: "object" as const,
      properties: {
        variable_count: { type: "number", description: "Number of boolean variables (1-based)" },
        clauses: { type: "array", items: { type: "array", items: { type: "number" } }, description: "Clauses as [a, b] pairs where positive = true, negative = negated" },
      }, required: ["variable_count", "clauses"],
    },
  },
] as const;
