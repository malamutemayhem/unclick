// wiring/lrucache.ts
// Per-app MCP wiring for the lrucache connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const lrucacheTools = [
  // ── lrucache-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "lru_simulate",
    description: "Simulate an LRU cache over a sequence of key accesses and report hit/miss rates.",
    inputSchema: {
      type: "object" as const,
      properties: {
        accesses: { type: "array", items: {}, description: "Sequence of key accesses" },
        capacity: { type: "number", description: "Cache capacity (default 4)" },
      }, required: ["accesses"],
    },
  },
] as const;
