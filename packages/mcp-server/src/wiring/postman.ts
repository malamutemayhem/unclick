// wiring/postman.ts
// Per-app MCP wiring for the postman connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Developer / Productivity

import { postmanAction } from "../postman-tool.js";

export const postmanTools = [
  // ── postman-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "postman_action",
    description: "Interact with the Postman API: list and retrieve collections, list environments, and list monitors.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action:        { type: "string", enum: ["list_collections", "get_collection", "list_environments", "list_monitors"], description: "Action: list_collections, get_collection, list_environments, list_monitors." },
        api_key:       { type: "string", description: "Postman API key." },
        collection_id: { type: "string", description: "Collection UID (for get_collection)." },
        workspace_id:  { type: "string", description: "Workspace ID to filter results." },
      },
      required: ["action", "api_key"],
    },
  },
] as const;

export const postmanHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // postman-tool.ts
  postman_action:          (args) => postmanAction(String(args.action ?? ""), args),
};
