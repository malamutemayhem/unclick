// wiring/clockify.ts
// Per-app MCP wiring for the clockify connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Productivity

import { clockifyAction } from "../clockify-tool.js";

export const clockifyTools = [
  // ── clockify-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "clockify_action",
    description: "Perform a Clockify action: get_clockify_workspaces, get_time_entries, create_time_entry, get_clockify_projects, get_clockify_summary.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action: { type: "string" },
        api_key: { type: "string" },
        workspace_id: { type: "string" },
        start: { type: "string" },
        end: { type: "string" },
        project_id: { type: "string" },
        description: { type: "string" },
      },
      required: ["action"],
    },
  },
] as const;

export const clockifyHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // clockify-tool.ts
  clockify_action:         (args) => clockifyAction(String(args.action ?? ""), args),
};
