// wiring/jwt.ts
// Per-app MCP wiring for the jwt connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { jwtDecode } from "../jwt-tool.js";

export const jwtTools = [
  // ── jwt-tool.ts ──────────────────────────────────────────────────────────────
  {
    name: "jwt_decode",
    description: "Decode a JWT token to inspect header and payload claims (does NOT verify signature).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        token: { type: "string" as const, description: "JWT token string." },
      }, required: ["token"],
    },
  },
] as const;

export const jwtHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // jwt-tool.ts
  jwt_decode:                (args) => jwtDecode(args),
};
