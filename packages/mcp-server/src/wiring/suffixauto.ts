// wiring/suffixauto.ts
// Per-app MCP wiring for the suffixauto connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const suffixautoTools = [
  // ── suffixauto-tool.ts ───────────────────────────────────────────────────────
  {
    name: "suffix_automaton",
    description: "Build a suffix automaton for a string and count distinct substrings.",
    inputSchema: {
      type: "object" as const,
      properties: {
        text: { type: "string", description: "Input string (max 100,000 characters)" },
      }, required: ["text"],
    },
  },
] as const;
