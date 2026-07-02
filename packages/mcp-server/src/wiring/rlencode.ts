// wiring/rlencode.ts
// Per-app MCP wiring for the rlencode connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const rlencodeTools = [
  // ── rlencode-tool.ts ──────────────────────────────────────────────────────
  {
    name: "rl_encode",
    description: "Run-length encode or decode a string.",
    inputSchema: {
      type: "object" as const,
      properties: {
        text: { type: "string", description: "Input string to encode or RLE-encoded string to decode" },
        decode: { type: "boolean", description: "If true, decode RLE input (default false)" },
      }, required: ["text"],
    },
  },
] as const;
