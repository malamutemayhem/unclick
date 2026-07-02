// wiring/kmp.ts
// Per-app MCP wiring for the kmp connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const kmpTools = [
  // ── kmp-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "kmp_search",
    description: "Find all occurrences of a pattern in text using Knuth-Morris-Pratt algorithm with failure function.",
    inputSchema: {
      type: "object" as const,
      properties: {
        text: { type: "string", description: "Text to search in" },
        pattern: { type: "string", description: "Pattern to find" },
      }, required: ["text", "pattern"],
    },
  },
] as const;
