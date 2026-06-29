// wiring/goertzel.ts
// Per-app MCP wiring for the goertzel connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const goertzelTools = [
  // ── goertzel-tool.ts ──────────────────────────────────────────────────────
  {
    name: "goertzel",
    description: "Compute a single DFT frequency bin using the Goertzel algorithm.",
    inputSchema: {
      type: "object" as const,
      properties: {
        samples: { type: "array", items: { type: "number" }, description: "Array of real-valued samples" },
        bin: { type: "number", description: "Target frequency bin index (0 to N-1)" },
      }, required: ["samples", "bin"],
    },
  },
] as const;
