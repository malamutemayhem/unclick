// wiring/necklace.ts
// Per-app MCP wiring for the necklace connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const necklaceTools = [
  // ── necklace-tool.ts ──────────────────────────────────────────────────────
  {
    name: "necklace_count",
    description: "Count distinct necklaces and bracelets using Burnside's lemma.",
    inputSchema: {
      type: "object" as const,
      properties: {
        n: { type: "number", description: "Length (1-1000)" },
        k: { type: "number", description: "Number of colors (1-1000)" },
      }, required: ["n", "k"],
    },
  },
] as const;
