// wiring/vigenere.ts
// Per-app MCP wiring for the vigenere connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { vigenereProcess } from "../vigenere-tool.js";

export const vigenereTools = [
  // ── vigenere-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "vigenere_process",
    description: "Encrypt or decrypt text using the Vigenere polyalphabetic cipher.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text to process." },
        key: { type: "string" as const, description: "Cipher key (letters only)." },
        decrypt: { type: "boolean" as const, description: "Decrypt instead of encrypt (default false)." },
      }, required: ["text", "key"],
    },
  },
] as const;

export const vigenereHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // vigenere-tool.ts
  vigenere_process:          (args) => vigenereProcess(args),
};
