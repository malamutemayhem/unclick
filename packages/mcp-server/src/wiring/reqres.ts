// wiring/reqres.ts
// Per-app MCP wiring for the reqres connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { reqresListUsers, reqresGetUser, reqresListResources } from "../reqres-tool.js";

export const reqresTools = [
  // ── reqres-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "reqres_list_users",
    description: "List fake users from Reqres (test API).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        page: { type: "number", description: "Page number (default 1)" },
      },
    },
  },
  {
    name: "reqres_get_user",
    description: "Get a specific fake user by ID from Reqres.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number", description: "User ID (1-12)" },
      },
      required: ["id"],
    },
  },
  {
    name: "reqres_list_resources",
    description: "List fake color resources from Reqres (test API).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        page: { type: "number", description: "Page number (default 1)" },
      },
    },
  },
] as const;

export const reqresHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // reqres-tool.ts
  reqres_list_users:       (args) => reqresListUsers(args),
  reqres_get_user:         (args) => reqresGetUser(args),
  reqres_list_resources:   (args) => reqresListResources(args),
};
