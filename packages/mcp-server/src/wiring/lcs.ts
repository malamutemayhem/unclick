// wiring/lcs.ts
// Per-app MCP wiring for the lcs connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const lcsTools = [
  // ── lcs-tool.ts ──────────────────────────────────────────────────────────────
  {
    name: "string_lcs",
    description: "Find the longest common subsequence of two strings with similarity score.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        a: { type: "string" as const, description: "First string." },
        b: { type: "string" as const, description: "Second string." },
      }, required: ["a", "b"],
    },
  },] as const;
