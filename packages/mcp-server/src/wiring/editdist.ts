// wiring/editdist.ts
// Per-app MCP wiring for the editdist connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const editdistTools = [
  // ── editdist-tool.ts ──────────────────────────────────────────────────────
  {
    name: "edit_distance",
    description: "Compute edit distance with full backtrace of insert/delete/replace operations.",
    inputSchema: {
      type: "object" as const,
      properties: {
        source: { type: "string", description: "Source string (max 5,000 chars)" },
        target: { type: "string", description: "Target string (max 5,000 chars)" },
      }, required: ["source", "target"],
    },
  },
] as const;
