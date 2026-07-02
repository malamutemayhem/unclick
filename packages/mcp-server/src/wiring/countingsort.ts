// wiring/countingsort.ts
// Per-app MCP wiring for the countingsort connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const countingsortTools = [
  // ── countingsort-tool.ts ────────────────────────────────────────────────────
  {
    name: "counting_sort",
    description: "Sort an array of integers in O(n+k) time using counting sort, with frequency analysis.",
    inputSchema: {
      type: "object" as const,
      properties: {
        values: { type: "array", items: { type: "number" }, description: "Array of integers to sort" },
      }, required: ["values"],
    },
  },
] as const;
