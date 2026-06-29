// wiring/testpass.ts
// Per-app MCP wiring for the testpass connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: TestPass

import { testpassListPacks, testpassRun, testpassStatus, testpassSavePack, testpassEditItem, testpassEvidence, testpassFixList, testpassReportHtml, testpassReportJson, testpassReportMd } from "../testpass-tool.js";

export const testpassTools = [
  // ── testpass-tool.ts ────────────────────────────────────────────────────────
  {
    name: "testpass_list_packs",
    description: "List TestPass packs available to the caller, including system packs and the caller's custom packs.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "testpass_run",
    description: "Start a TestPass run against an MCP server. Seeds deterministic and agent checks from the given pack and returns the run id plus an initial verdict summary. Response includes was_duplicate: boolean indicating whether the row was already present (idempotent retry).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        target_url: { type: "string", description: "HTTP URL of the MCP server to test" },
        pack_id: { type: "string", description: "Pack slug (default: testpass-core)" },
        profile: { type: "string", enum: ["smoke", "standard", "deep"], description: "Run profile (default: smoke)" },
        task_id: {
          type: "string",
          description: "Client-generated idempotency key. The API requires UUID format; non-UUID values are deterministically converted to a stable UUIDv5-shaped id, so any string is safe and retries stay idempotent. Required for safe retry. If omitted, the server creates a fresh row and you lose retry safety; sending the same task_id twice returns the original run_id with was_duplicate=true instead of creating a duplicate.",
        },
      },
      required: ["target_url"],
    },
  },
  {
    name: "testpass_status",
    description: "Fetch the current status, verdict summary, and fail count for a TestPass run.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The TestPass run id returned by testpass_run" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "testpass_save_pack",
    description: "Save a TestPass pack YAML definition for the caller. Creates or updates the pack identified by pack_id.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        pack_id: { type: "string", description: "Unique slug for the pack (e.g. 'my-mcp-pack')" },
        yaml: { type: "string", description: "Full pack definition as a YAML string" },
      },
      required: ["pack_id", "yaml"],
    },
  },
  {
    name: "testpass_edit_item",
    description: "Override the verdict and notes for a single check item in a TestPass run. Fail-to-pass edits are flagged in mc_signals.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The run the item belongs to" },
        item_id: { type: "string", description: "The testpass_items row id (uuid)" },
        verdict: { type: "string", enum: ["pass", "fail", "na", "other"], description: "New verdict" },
        notes: { type: "string", description: "Required reviewer note explaining the manual verdict edit" },
      },
      required: ["run_id", "item_id", "verdict", "notes"],
    },
  },
  {
    name: "testpass_evidence",
    description: "Fetch one TestPass item and its attached evidence by item_id or check_id. Use this when a chat agent needs proof for a specific checklist item.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The run id returned by testpass_run" },
        item_id: { type: "string", description: "Optional testpass_items row id" },
        check_id: { type: "string", description: "Optional checklist id such as RPC-001 or MCP-007" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "testpass_report_html",
    description: "Get the HTML report for a TestPass run.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The run id returned by testpass_run" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "testpass_report_json",
    description: "Get the JSON report for a TestPass run.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The run id returned by testpass_run" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "testpass_report_md",
    description: "Get the Markdown report for a TestPass run.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The run id returned by testpass_run" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "testpass_fix_list",
    description: "Get the Markdown fix-list for a TestPass run. This is an explicit alias for the markdown report so agents can discover the copy-paste repair artifact directly.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The run id returned by testpass_run" },
      },
      required: ["run_id"],
    },
  },
] as const;

export const testpassHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // testpass-tool.ts
  testpass_list_packs:  () => testpassListPacks(),
  testpass_run:         (args) => testpassRun(args),
  testpass_status:      (args) => testpassStatus(args),
  testpass_save_pack:   (args) => testpassSavePack(args),
  testpass_edit_item:   (args) => testpassEditItem(args),
  testpass_evidence:    (args) => testpassEvidence(args),
  testpass_report_html: (args) => testpassReportHtml(args),
  testpass_report_json: (args) => testpassReportJson(args),
  testpass_report_md:   (args) => testpassReportMd(args),
  testpass_fix_list:    (args) => testpassFixList(args),
};
