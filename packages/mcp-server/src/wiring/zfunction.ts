// wiring/zfunction.ts
// Per-app MCP wiring for the zfunction connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const zfunctionTools = [
  // ── zfunction-tool.ts ─────────────────────────────────────────────────────
  {
    name: "z_function",
    description: "Compute Z-function of a string with optional pattern matching.",
    inputSchema: {
      type: "object" as const,
      properties: {
        text: { type: "string", description: "Input string to compute Z-function for" },
        pattern: { type: "string", description: "Optional pattern to search for in text" },
      }, required: ["text"],
    },
  },
] as const;
