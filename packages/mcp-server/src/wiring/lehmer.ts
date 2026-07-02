// wiring/lehmer.ts
// Per-app MCP wiring for the lehmer connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const lehmerTools = [
  // ── lehmer-tool.ts ────────────────────────────────────────────────────────
  {
    name: "lehmer_code",
    description: "Convert between permutations and Lehmer codes, compute permutation rank and unrank.",
    inputSchema: {
      type: "object" as const,
      properties: {
        permutation: { type: "array", items: { type: "number" }, description: "Permutation of [0..n-1] to encode" },
        rank: { type: "number", description: "Lexicographic rank to decode (use with n)" },
        n: { type: "number", description: "Permutation size for unranking (use with rank)" },
      }, required: [],
    },
  },
] as const;
