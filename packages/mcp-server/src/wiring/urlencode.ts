// wiring/urlencode.ts
// Per-app MCP wiring for the urlencode connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { urlEncode, urlDecode } from "../urlencode-tool.js";

export const urlencodeTools = [
  // ── urlencode-tool.ts ────────────────────────────────────────────────────────
  {
    name: "url_encode",
    description: "URL-encode text (percent-encoding for query strings).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text to URL-encode." },
      }, required: ["text"],
    },
  },
  {
    name: "url_decode",
    description: "Decode a URL-encoded (percent-encoded) string.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        encoded: { type: "string" as const, description: "URL-encoded string to decode." },
      }, required: ["encoded"],
    },
  },
] as const;

export const urlencodeHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // urlencode-tool.ts
  url_encode:                (args) => urlEncode(args),
  url_decode:                (args) => urlDecode(args),
};
