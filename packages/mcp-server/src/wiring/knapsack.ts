// wiring/knapsack.ts
// Per-app MCP wiring for the knapsack connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const knapsackTools = [
  // ── knapsack-tool.ts ────────────────────────────────────────────────────────
  {
    name: "knapsack_solve",
    description: "Solve the 0-1 knapsack problem: pick items to maximize value within a weight capacity.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        capacity: { type: "number" as const, description: "Maximum weight capacity (integer units, max 100000)." },
        items: { type: "array" as const, description: "Array of { name?, weight, value } objects.", items: { type: "object" as const, properties: { name: { type: "string" as const }, weight: { type: "number" as const }, value: { type: "number" as const } }, required: ["weight", "value"] } },
      }, required: ["capacity", "items"],
    },
  },] as const;
