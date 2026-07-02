// wiring/partition.ts
// Per-app MCP wiring for the partition connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const partitionTools = [
  // ── partition-tool.ts ─────────────────────────────────────────────────────
  {
    name: "partition_count",
    description: "Count integer partitions of n with optional max part size and part count constraints.",
    inputSchema: {
      type: "object" as const,
      properties: {
        n: { type: "number", description: "Non-negative integer to partition (0-10000)" },
        max_part: { type: "number", description: "Maximum part size" },
        num_parts: { type: "number", description: "Exact number of parts" },
      }, required: ["n"],
    },
  },
] as const;
