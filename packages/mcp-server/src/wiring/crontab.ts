// wiring/crontab.ts
// Per-app MCP wiring for the crontab connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { crontabExplain } from "../crontab-tool.js";

export const crontabTools = [
  // ── crontab-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "crontab_explain",
    description: "Explain a cron expression in human-readable terms.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        expression: { type: "string" as const, description: "Cron expression (e.g. '0 9 * * 1-5') or shortcut (@daily, @hourly)." },
      }, required: ["expression"],
    },
  },
] as const;

export const crontabHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // crontab-tool.ts
  crontab_explain:           (args) => crontabExplain(args),
};
