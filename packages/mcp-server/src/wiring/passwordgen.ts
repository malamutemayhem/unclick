// wiring/passwordgen.ts
// Per-app MCP wiring for the passwordgen connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { passwordGenerate } from "../passwordgen-tool.js";

export const passwordgenTools = [
  // ── passwordgen-tool.ts ────────────────────────────────────────────────────
  {
    name: "password_generate",
    description: "Generate a cryptographically secure random password.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        length: { type: "number" as const, description: "Password length (4-128, default 16)." },
        uppercase: { type: "boolean" as const, description: "Include uppercase letters (default true)." },
        lowercase: { type: "boolean" as const, description: "Include lowercase letters (default true)." },
        digits: { type: "boolean" as const, description: "Include digits (default true)." },
        symbols: { type: "boolean" as const, description: "Include symbols (default true)." },
      },
    },
  },
] as const;

export const passwordgenHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // passwordgen-tool.ts
  password_generate:         (args) => passwordGenerate(args),
};
