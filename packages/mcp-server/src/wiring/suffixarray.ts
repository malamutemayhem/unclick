// wiring/suffixarray.ts
// Per-app MCP wiring for the suffixarray connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const suffixarrayTools = [
  // ── suffixarray-tool.ts ─────────────────────────────────────────────────────
  {
    name: "suffix_array_build",
    description: "Build a suffix array for a string, with optional LCP (longest common prefix) array.",
    inputSchema: {
      type: "object" as const,
      properties: {
        text: { type: "string", description: "Input string" },
        lcp: { type: "boolean", description: "Also compute the LCP array (default false)" },
      }, required: ["text"],
    },
  },
] as const;
