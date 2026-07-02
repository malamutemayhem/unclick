// wiring/typeform.ts
// Per-app MCP wiring for the typeform connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { typeformListForms, typeformGetForm, typeformGetResponses } from "../typeform-tool.js";

export const typeformTools = [
  // ── typeform-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "typeform_list_forms",
    description: "List your Typeform forms.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Typeform personal access token" },
        search: { type: "string", description: "Filter forms by title" },
        limit: { type: "number", description: "Forms to return (max 200, default 25)" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "typeform_get_form",
    description: "Get a Typeform form definition (fields and titles) by id.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Typeform personal access token" },
        form_id: { type: "string", description: "Form id" },
      },
      required: ["access_token", "form_id"],
    },
  },
  {
    name: "typeform_get_responses",
    description: "Get submissions for a Typeform form.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Typeform personal access token" },
        form_id: { type: "string", description: "Form id" },
        since: { type: "string", description: "ISO 8601 lower bound on submission time" },
        limit: { type: "number", description: "Responses to return (max 1000, default 25)" },
      },
      required: ["access_token", "form_id"],
    },
  },
] as const;

export const typeformHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // typeform-tool.ts
  typeform_list_forms:     (args) => typeformListForms(args),
  typeform_get_form:       (args) => typeformGetForm(args),
  typeform_get_responses:  (args) => typeformGetResponses(args),
};
