// wiring/radixsort.ts
// Per-app MCP wiring for the radixsort connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const radixsortTools = [
  // ── radixsort-tool.ts ────────────────────────────────────────────────────────
  {
    name: "radix_sort",
    description: "Sort non-negative integers using radix sort with configurable base.",
    inputSchema: {
      type: "object" as const,
      properties: {
        values: { type: "array", items: { type: "number" }, description: "Non-negative integers to sort" },
        base: { type: "number", description: "Radix base (default 10, range 2-256)" },
      }, required: ["values"],
    },
  },
] as const;
