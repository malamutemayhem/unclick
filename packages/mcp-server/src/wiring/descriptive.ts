// wiring/descriptive.ts
// Per-app MCP wiring for the descriptive connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const descriptiveTools = [
  // ── descriptive-tool.ts ─────────────────────────────────────────────────────
  {
    name: "descriptive_stats",
    description: "Compute descriptive statistics: mean, median, mode, std, variance, skewness, kurtosis, quartiles, IQR, and more.",
    inputSchema: {
      type: "object" as const,
      properties: {
        data: { type: "array", items: { type: "number" }, description: "Numeric data array" },
      }, required: ["data"],
    },
  },
] as const;
