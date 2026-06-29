// wiring/prefixfn.ts
// Per-app MCP wiring for the prefixfn connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const prefixfnTools = [
  // ── prefixfn-tool.ts ──────────────────────────────────────────────────────
  {
    name: "prefix_function",
    description: "Compute the KMP prefix/failure function array, with optional pattern occurrence counting.",
    inputSchema: {
      type: "object" as const,
      properties: {
        text: { type: "string", description: "Input string (max 1,000,000 chars)" },
        pattern: { type: "string", description: "Optional pattern to count occurrences of" },
      }, required: ["text"],
    },
  },
] as const;
