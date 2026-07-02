// wiring/derangement.ts
// Per-app MCP wiring for the derangement connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const derangementTools = [
  // ── derangement-tool.ts ─────────────────────────────────────────────────────
  {
    name: "derangement_calc",
    description: "Count and optionally enumerate derangements (permutations with no fixed points).",
    inputSchema: {
      type: "object" as const,
      properties: {
        n: { type: "number", description: "Size of permutation (1-20)" },
        enumerate: { type: "boolean", description: "List all derangements (n <= 8)" },
      }, required: ["n"],
    },
  },
] as const;
