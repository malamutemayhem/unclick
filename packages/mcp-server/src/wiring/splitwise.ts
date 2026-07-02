// wiring/splitwise.ts
// Per-app MCP wiring for the splitwise connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Productivity

import { splitwiseAction } from "../splitwise-tool.js";

export const splitwiseTools = [
  // ── splitwise-tool.ts ────────────────────────────────────────────────────────
  {
    name: "splitwise_action",
    description: "Perform a Splitwise action: get_groups, get_expenses, get_balances, create_expense, get_friends.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action: { type: "string" },
        api_key: { type: "string" },
        group_id: { type: "number" },
        description: { type: "string" },
        cost: { type: "string" },
        currency_code: { type: "string" },
        users: { type: "array", items: {} },
      },
      required: ["action"],
    },
  },
] as const;

export const splitwiseHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // splitwise-tool.ts
  splitwise_action:        (args) => splitwiseAction(String(args.action ?? ""), args),
};
