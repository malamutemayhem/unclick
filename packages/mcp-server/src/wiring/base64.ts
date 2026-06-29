// wiring/base64.ts
// Per-app MCP wiring for the base64 connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { base64Encode, base64Decode } from "../base64-tool.js";

export const base64Tools = [
  // ── base64-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "base64_encode",
    description: "Encode text to Base64.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text to encode." },
      }, required: ["text"],
    },
  },
  {
    name: "base64_decode",
    description: "Decode a Base64 string to text.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        encoded: { type: "string" as const, description: "Base64 string to decode." },
      }, required: ["encoded"],
    },
  },
] as const;

export const base64Handlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // base64-tool.ts
  base64_encode:             (args) => base64Encode(args),
  base64_decode:             (args) => base64Decode(args),
};
