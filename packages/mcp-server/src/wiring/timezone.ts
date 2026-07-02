// wiring/timezone.ts
// Per-app MCP wiring for the timezone connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { timezoneInfo } from "../timezone-tool.js";

export const timezoneTools = [
  // ── timezone-tool.ts ───────────────────────────────────────────────────────
  {
    name: "timezone_info",
    description: "Look up timezone offset and details by abbreviation, or list all timezones.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        timezone: { type: "string" as const, description: "Timezone abbreviation (e.g. EST, AEST). Omit to list all." },
      },
    },
  },
] as const;

export const timezoneHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // timezone-tool.ts
  timezone_info:             (args) => timezoneInfo(args),
};
