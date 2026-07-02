// wiring/bwt.ts
// Per-app MCP wiring for the bwt connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const bwtTools = [
  // ── bwt-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "burrows_wheeler",
    description: "Compute the Burrows-Wheeler Transform (forward or inverse).",
    inputSchema: {
      type: "object" as const,
      properties: {
        text: { type: "string", description: "Input string (or BWT output for inverse mode)" },
        inverse: { type: "boolean", description: "If true, perform inverse BWT" },
        original_index: { type: "number", description: "Original index (required for inverse mode)" },
      }, required: ["text"],
    },
  },
] as const;
