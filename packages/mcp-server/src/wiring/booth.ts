// wiring/booth.ts
// Per-app MCP wiring for the booth connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const boothTools = [
  // ── booth-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "booth_rotation",
    description: "Find the lexicographically smallest rotation of a string using Booth's algorithm.",
    inputSchema: {
      type: "object" as const,
      properties: {
        text: { type: "string", description: "Input string (max 1,000,000 chars)" },
      }, required: ["text"],
    },
  },
] as const;
