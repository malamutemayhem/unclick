// wiring/catalan.ts
// Per-app MCP wiring for the catalan connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const catalanTools = [
  // ── catalan-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "catalan_calc",
    description: "Compute the nth Catalan number and its combinatorial interpretations.",
    inputSchema: {
      type: "object" as const,
      properties: {
        n: { type: "number", description: "Non-negative integer index" },
        sequence: { type: "boolean", description: "Return the full sequence from 0 to n (default false)" },
        count: { type: "number", description: "Limit sequence length (used with sequence: true)" },
      }, required: ["n"],
    },
  },
] as const;
