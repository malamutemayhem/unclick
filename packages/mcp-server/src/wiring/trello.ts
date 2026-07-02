// wiring/trello.ts
// Per-app MCP wiring for the trello connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Developer / Productivity

import { trelloAction } from "../trello-tool.js";

export const trelloTools = [
  // ── trello-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "trello_action",
    description: "Interact with the Trello REST API: list boards and lists, get and search cards, create cards, and update card properties.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action:    { type: "string", enum: ["get_boards", "get_lists", "get_cards", "create_card", "update_card", "search_cards"], description: "Action: get_boards, get_lists, get_cards, create_card, update_card, search_cards." },
        api_key:   { type: "string", description: "Trello API key." },
        token:     { type: "string", description: "Trello user token." },
        board_id:  { type: "string", description: "Board ID." },
        list_id:   { type: "string", description: "List ID." },
        card_id:   { type: "string", description: "Card ID (for update_card)." },
        name:      { type: "string", description: "Card name (for create_card and update_card)." },
        desc:      { type: "string", description: "Card description." },
        due:       { type: "string", description: "Due date as ISO 8601 string." },
        due_complete: { type: "boolean", description: "Whether the due date is marked complete." },
        closed:    { type: "boolean", description: "Archive or unarchive the card." },
        id_list:   { type: "string", description: "Move card to this list ID." },
        pos:       { type: "string", description: "Card position: top, bottom, or a positive float." },
        query:     { type: "string", description: "Search query (for search_cards)." },
        member_id: { type: "string", description: "Member ID for get_boards (default: me)." },
        filter:    { type: "string", description: "Filter for boards or lists: open, closed, all." },
        limit:     { type: "number", description: "Max results for search_cards." },
      },
      required: ["action", "api_key", "token"],
    },
  },
] as const;

export const trelloHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // trello-tool.ts
  trello_action:           (args) => trelloAction(String(args.action ?? ""), args),
};
