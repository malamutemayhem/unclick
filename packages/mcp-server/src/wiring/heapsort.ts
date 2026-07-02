// wiring/heapsort.ts
// Per-app MCP wiring for the heapsort connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const heapsortTools = [
  // ── heapsort-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "heap_sort",
    description: "Sort numbers using the heap sort algorithm. Guaranteed O(n log n) in-place sorting with swap count.",
    inputSchema: {
      type: "object" as const,
      properties: {
        array: { type: "array", items: { type: "number" }, description: "Array of numbers to sort" },
      }, required: ["array"],
    },
  },
] as const;
