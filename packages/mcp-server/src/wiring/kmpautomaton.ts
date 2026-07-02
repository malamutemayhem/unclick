// wiring/kmpautomaton.ts
// Per-app MCP wiring for the kmpautomaton connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const kmpautomatonTools = [
  // ── kmpautomaton-tool.ts ───────────────────────────────────────────────────
  {
    name: "kmp_automaton",
    description: "Build a full KMP DFA transition table for streaming pattern matching.",
    inputSchema: {
      type: "object" as const,
      properties: {
        pattern: { type: "string", description: "Pattern string (max 1000 chars)" },
        alphabet: { type: "string", description: "Alphabet characters (default a-z)" },
      }, required: ["pattern"],
    },
  },
] as const;
