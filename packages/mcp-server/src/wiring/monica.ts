// wiring/monica.ts
// Per-app MCP wiring for the monica connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Productivity

import { monicaAction } from "../monica-tool.js";

export const monicaTools = [
  // ── monica-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "monica_action",
    description: "Perform a Monica CRM action: get_contacts, search_contacts, get_contact, create_contact, get_contact_reminders, get_activities, add_note.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action: { type: "string" },
        api_key: { type: "string" },
        contact_id: { type: "number" },
        query: { type: "string" },
        first_name: { type: "string" },
        last_name: { type: "string" },
        body: { type: "string" },
      },
      required: ["action"],
    },
  },
] as const;

export const monicaHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // monica-tool.ts
  monica_action:           (args) => monicaAction(String(args.action ?? ""), args),
};
