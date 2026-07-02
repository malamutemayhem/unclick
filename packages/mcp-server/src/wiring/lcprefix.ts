// wiring/lcprefix.ts
// Per-app MCP wiring for the lcprefix connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const lcprefixTools = [
  // ── lcprefix-tool.ts ──────────────────────────────────────────────────────
  {
    name: "longest_common_prefix",
    description: "Find the longest common prefix among an array of strings.",
    inputSchema: {
      type: "object" as const,
      properties: {
        strings: { type: "array", items: { type: "string" }, description: "Array of strings (max 10,000)" },
      }, required: ["strings"],
    },
  },
] as const;
