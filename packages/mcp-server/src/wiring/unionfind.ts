// wiring/unionfind.ts
// Per-app MCP wiring for the unionfind connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const unionfindTools = [
  // ── unionfind-tool.ts ───────────────────────────────────────────────────────
  {
    name: "union_find",
    description: "Perform union-find (disjoint set) operations: merge elements and query connectivity.",
    inputSchema: {
      type: "object" as const,
      properties: {
        unions: { type: "array", items: { type: "object", properties: { a: { type: "string" }, b: { type: "string" } }, required: ["a", "b"] }, description: "Pairs to merge" },
        queries: { type: "array", items: { type: "object", properties: { a: { type: "string" }, b: { type: "string" } }, required: ["a", "b"] }, description: "Optional pairs to check connectivity" },
      }, required: ["unions"],
    },
  },
] as const;
