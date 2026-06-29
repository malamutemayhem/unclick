// wiring/duval.ts
// Per-app MCP wiring for the duval connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const duvalTools = [
  // ── duval-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "duval_factorize",
    description: "Compute the Lyndon factorization of a string using Duval's algorithm.",
    inputSchema: {
      type: "object" as const,
      properties: {
        text: { type: "string", description: "Input string to factorize (max 1,000,000 chars)" },
      }, required: ["text"],
    },
  },
] as const;
