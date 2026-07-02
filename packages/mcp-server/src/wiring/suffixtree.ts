// wiring/suffixtree.ts
// Per-app MCP wiring for the suffixtree connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const suffixtreeTools = [
  // ── suffixtree-tool.ts ────────────────────────────────────────────────────────
  {
    name: "suffix_tree",
    description: "Build a suffix tree (Ukkonen's algorithm) and compute distinct substrings and longest repeated substring.",
    inputSchema: {
      type: "object" as const,
      properties: {
        text: { type: "string", description: "Input text (max 10,000 chars)" },
      }, required: ["text"],
    },
  },
] as const;
