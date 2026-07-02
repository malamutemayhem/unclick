// wiring/huffman.ts
// Per-app MCP wiring for the huffman connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const huffmanTools = [
  // ── huffman-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "huffman_code",
    description: "Build a Huffman coding tree for the given text and return the code table, encoded bit count, compression ratio, and entropy.",
    inputSchema: {
      type: "object" as const,
      properties: {
        text: { type: "string", description: "Text to encode (max 100000 chars)" },
      }, required: ["text"],
    },
  },
] as const;
