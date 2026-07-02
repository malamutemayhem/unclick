// wiring/ternarysearch.ts
// Per-app MCP wiring for the ternarysearch connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const ternarysearchTools = [
  // ── ternarysearch-tool.ts ───────────────────────────────────────────────────
  {
    name: "ternary_search",
    description: "Ternary search on a sorted array (search mode) or find the extremum of a unimodal array (max/min mode).",
    inputSchema: {
      type: "object" as const,
      properties: {
        array: { type: "array", items: { type: "number" }, description: "Array of numbers" },
        target: { type: "number", description: "Value to search for (search mode only)" },
        mode: { type: "string", enum: ["search", "max", "min"], description: "Mode: search (default), max, or min" },
      }, required: ["array"],
    },
  },
] as const;
