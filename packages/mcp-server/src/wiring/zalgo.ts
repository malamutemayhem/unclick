// wiring/zalgo.ts
// Per-app MCP wiring for the zalgo connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const zalgoTools = [
  // ── zalgo-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "z_algorithm",
    description: "Compute the Z-array for a string, or find pattern matches using the Z-algorithm in linear time.",
    inputSchema: {
      type: "object" as const,
      properties: {
        text: { type: "string", description: "Input text" },
        pattern: { type: "string", description: "Optional pattern to search for" },
      }, required: ["text"],
    },
  },
] as const;
