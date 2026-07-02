// wiring/rabinkarp.ts
// Per-app MCP wiring for the rabinkarp connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const rabinkarpTools = [
  // ── rabinkarp-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "rabin_karp_search",
    description: "Find all occurrences of a pattern in text using the Rabin-Karp rolling hash algorithm.",
    inputSchema: {
      type: "object" as const,
      properties: {
        text: { type: "string", description: "Text to search in" },
        pattern: { type: "string", description: "Pattern to find" },
      }, required: ["text", "pattern"],
    },
  },
] as const;
