// wiring/reservoir.ts
// Per-app MCP wiring for the reservoir connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const reservoirTools = [
  // ── reservoir-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "reservoir_sample",
    description: "Select k random items from a list with equal probability using reservoir sampling.",
    inputSchema: {
      type: "object" as const,
      properties: {
        items: { type: "array", items: {}, description: "Array of items to sample from" },
        k: { type: "number", description: "Number of items to sample (default 1)" },
        seed: { type: "number", description: "Optional seed for reproducible results" },
      }, required: ["items"],
    },
  },
] as const;
