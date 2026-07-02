// wiring/debruijn.ts
// Per-app MCP wiring for the debruijn connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const debruijnTools = [
  // ── debruijn-tool.ts ───────────────────────────────────────────────────────
  {
    name: "de_bruijn",
    description: "Generate a de Bruijn sequence B(k,n) containing every k-ary substring of length n exactly once.",
    inputSchema: {
      type: "object" as const,
      properties: {
        k: { type: "number", description: "Alphabet size (2-10)" },
        n: { type: "number", description: "Substring length (1-10)" },
      }, required: ["k", "n"],
    },
  },
] as const;
