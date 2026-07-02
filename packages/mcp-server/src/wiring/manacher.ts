// wiring/manacher.ts
// Per-app MCP wiring for the manacher connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const manacherTools = [
  // ── manacher-tool.ts ────────────────────────────────────────────────────────
  {
    name: "manacher_palindrome",
    description: "Find the longest palindromic substring in linear time using Manacher's algorithm.",
    inputSchema: {
      type: "object" as const,
      properties: {
        text: { type: "string", description: "Input string" },
        all: { type: "boolean", description: "List all palindromic substrings of length >= 2 (default false)" },
      }, required: ["text"],
    },
  },
] as const;
