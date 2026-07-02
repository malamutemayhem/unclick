// wiring/diceware.ts
// Per-app MCP wiring for the diceware connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { dicewarePassphrase } from "../diceware-tool.js";

export const dicewareTools = [
  // ── diceware-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "diceware_passphrase",
    description: "Generate a secure random passphrase using the diceware word list.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        words: { type: "number" as const, description: "Number of words (3-12, default 6)." },
        separator: { type: "string" as const, description: "Word separator (default '-')." },
      },
    },
  },
] as const;

export const dicewareHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // diceware-tool.ts
  diceware_passphrase:       (args) => dicewarePassphrase(args),};
