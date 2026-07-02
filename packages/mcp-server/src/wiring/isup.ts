// wiring/isup.ts
// Per-app MCP wiring for the isup connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { isupCheck } from "../isup-tool.js";

export const isupTools = [
  // ── isup-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "isup_check",
    description: "Check if a website/domain is up or down via isitup.org.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        domain: { type: "string" as const, description: "Domain to check (e.g. google.com)." },
      }, required: ["domain"],
    },
  },
] as const;

export const isupHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // isup-tool.ts
  isup_check:                (args) => isupCheck(args),
};
