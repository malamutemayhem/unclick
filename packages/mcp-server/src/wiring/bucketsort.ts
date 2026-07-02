// wiring/bucketsort.ts
// Per-app MCP wiring for the bucketsort connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const bucketsortTools = [
  // ── bucketsort-tool.ts ───────────────────────────────────────────────────────
  {
    name: "bucket_sort",
    description: "Sort numbers using the bucket sort algorithm. Distributes elements into buckets, sorts each, then concatenates.",
    inputSchema: {
      type: "object" as const,
      properties: {
        array: { type: "array", items: { type: "number" }, description: "Array of numbers to sort" },
        bucket_count: { type: "number", description: "Number of buckets (default: sqrt of array length)" },
      }, required: ["array"],
    },
  },
] as const;
