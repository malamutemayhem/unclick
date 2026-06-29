// wiring/hypothesis.ts
// Per-app MCP wiring for the hypothesis connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const hypothesisTools = [
  // ── hypothesis-tool.ts ──────────────────────────────────────────────────────
  {
    name: "hypothesis_test",
    description: "Perform statistical hypothesis tests: z-test, t-test, or chi-squared test. Returns test statistic, p-value, and rejection decision.",
    inputSchema: {
      type: "object" as const,
      properties: {
        test: { type: "string", enum: ["z", "t", "chi2"], description: "Type of test" },
        sample_mean: { type: "number", description: "Sample mean (for z/t tests)" },
        population_mean: { type: "number", description: "Population mean / null hypothesis value" },
        population_std: { type: "number", description: "Population standard deviation (for z-test)" },
        sample_std: { type: "number", description: "Sample standard deviation (for t-test)" },
        sample_size: { type: "integer", description: "Sample size (for z/t tests)" },
        alpha: { type: "number", description: "Significance level (default 0.05)" },
        tail: { type: "string", enum: ["two", "left", "right"], description: "Tail type (default two)" },
        observed: { type: "array", items: { type: "number" }, description: "Observed frequencies (for chi2)" },
        expected: { type: "array", items: { type: "number" }, description: "Expected frequencies (for chi2)" },
      }, required: ["test"],
    },
  },
] as const;
