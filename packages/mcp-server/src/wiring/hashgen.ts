// wiring/hashgen.ts
// Per-app MCP wiring for the hashgen connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { hashGenerate, hashCompare } from "../hashgen-tool.js";

export const hashgenTools = [
  // ── hashgen-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "hash_generate",
    description: "Generate a cryptographic hash (md5, sha1, sha256, sha384, sha512) of text.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text to hash." },
        algorithm: { type: "string" as const, description: "Hash algorithm (default: sha256)." },
      }, required: ["text"],
    },
  },
  {
    name: "hash_compare",
    description: "Compare text against an expected hash to verify integrity.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text to hash and compare." },
        hash: { type: "string" as const, description: "Expected hash value." },
        algorithm: { type: "string" as const, description: "Hash algorithm (default: sha256)." },
      }, required: ["text", "hash"],
    },
  },
] as const;

export const hashgenHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // hashgen-tool.ts
  hash_generate:             (args) => hashGenerate(args),
  hash_compare:              (args) => hashCompare(args),
};
