// wiring/airtable.ts
// Per-app MCP wiring for the airtable connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Developer / Productivity

import { airtableAction } from "../airtable-tool.js";

export const airtableTools = [
  // ── airtable-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "airtable_action",
    description: "Interact with the Airtable REST API: list bases, list and search records, get a single record, and create or update records.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action:       { type: "string", enum: ["list_bases", "list_records", "get_record", "create_record", "update_record", "search_records"], description: "Action: list_bases, list_records, get_record, create_record, update_record, search_records." },
        access_token: { type: "string", description: "Airtable personal access token (PAT)." },
        base_id:      { type: "string", description: "Airtable base ID (starts with 'app')." },
        table_name:   { type: "string", description: "Table name or ID." },
        record_id:    { type: "string", description: "Record ID (starts with 'rec')." },
        fields:       { type: "object", additionalProperties: true, description: "Record fields as key-value pairs (for create_record and update_record)." },
        formula:      { type: "string", description: "Airtable filter formula string (for search_records)." },
        view:         { type: "string", description: "View name or ID to use." },
        max_records:  { type: "number", description: "Maximum number of records to return." },
        page_size:    { type: "number", description: "Number of records per page (max 100)." },
        offset:       { type: "string", description: "Pagination offset token." },
      },
      required: ["action", "access_token"],
    },
  },
] as const;

export const airtableHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // airtable-tool.ts
  airtable_action:         (args) => airtableAction(String(args.action ?? ""), args),
};
