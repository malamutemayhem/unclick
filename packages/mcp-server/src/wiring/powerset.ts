// wiring/powerset.ts
// Per-app MCP wiring for the powerset connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const powersetTools = [
  // ── powerset-tool.ts ──────────────────────────────────────────────────────
  {
    name: "power_set",
    description: "Generate all subsets of a set (up to 20 elements).",
    inputSchema: {
      type: "object" as const,
      properties: {
        elements: { type: "array", description: "Array of elements (max 20)" },
      }, required: ["elements"],
    },
  },
] as const;
