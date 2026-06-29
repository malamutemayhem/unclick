// wiring/lucas.ts
// Per-app MCP wiring for the lucas connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const lucasTools = [
  // ── lucas-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "lucas_theorem",
    description: "Compute binomial coefficient C(n,k) mod prime using Lucas' theorem.",
    inputSchema: {
      type: "object" as const,
      properties: {
        n: { type: "number", description: "Non-negative integer n" },
        k: { type: "number", description: "Non-negative integer k (k <= n)" },
        p: { type: "number", description: "Prime modulus" },
      }, required: ["n", "k", "p"],
    },
  },
] as const;
