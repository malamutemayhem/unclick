// wiring/bloomfilter.ts
// Per-app MCP wiring for the bloomfilter connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const bloomfilterTools = [
  // ── bloomfilter-tool.ts ─────────────────────────────────────────────────────
  {
    name: "bloom_filter",
    description: "Build a Bloom filter from items and test membership of query items (probabilistic, no false negatives).",
    inputSchema: {
      type: "object" as const,
      properties: {
        items: { type: "array", items: { type: "string" }, description: "Strings to insert into the filter" },
        query: { type: "array", items: { type: "string" }, description: "Strings to check for membership" },
        fp_rate: { type: "number", description: "Target false positive rate (default 0.01)" },
      }, required: ["items", "query"],
    },
  },
] as const;
