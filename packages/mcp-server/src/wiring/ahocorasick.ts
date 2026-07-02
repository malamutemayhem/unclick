// wiring/ahocorasick.ts
// Per-app MCP wiring for the ahocorasick connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const ahocorasickTools = [
  // ── ahocorasick-tool.ts ─────────────────────────────────────────────────────
  {
    name: "aho_corasick_search",
    description: "Find all occurrences of multiple patterns in text simultaneously using the Aho-Corasick algorithm.",
    inputSchema: {
      type: "object" as const,
      properties: {
        text: { type: "string", description: "Text to search in" },
        patterns: { type: "array", items: { type: "string" }, description: "Patterns to search for" },
      }, required: ["text", "patterns"],
    },
  },
] as const;
