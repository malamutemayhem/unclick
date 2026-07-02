// wiring/qc.ts
// Per-app MCP wiring for the qc connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: AI

import { qcRunChecklist, qcCheckApi, qcCopyAudit } from "../qc-tool.js";

export const qcTools = [
  // ── qc-tool.ts ───────────────────────────────────────────────────────────────
  {
    name: "qc_run_checklist",
    description: "Run a sequential QC checklist against a website URL. Checks site load, SSL, meta tags, og:image, robots.txt, sitemap, console errors, broken links, response time, and copy quality (em dashes, banned words). Runs checks one at a time and returns a pass/fail/warn result for each.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        url: { type: "string", description: "The full URL to check (e.g. https://example.com)" },
        checks: {
          type: "array",
          items: { type: "string" },
          description: "Optional subset of checks to run. Available: site_loads, ssl_valid, meta_tags, og_image_valid, robots_txt, sitemap, no_console_errors, link_check, response_time, copy_check. Defaults to all.",
        },
      },
      required: ["url"],
    },
  },
  {
    name: "qc_check_api",
    description: "Test a list of API endpoints and report which ones return the expected HTTP status. Runs each endpoint sequentially.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        base_url: { type: "string", description: "Base URL for all endpoints (e.g. https://api.example.com)" },
        endpoints: {
          type: "array",
          description: "List of endpoints to test",
          items: {
            type: "object",
            properties: {
              path: { type: "string", description: "Endpoint path (e.g. /health)" },
              method: { type: "string", description: "HTTP method (default: GET)" },
              expected_status: { type: "number", description: "Expected HTTP status code (default: 200)" },
            },
            required: ["path"],
          },
        },
      },
      required: ["base_url", "endpoints"],
    },
  },
  {
    name: "qc_copy_audit",
    description: "Fetch a page and scan all visible text for em dashes (U+2014), en dashes (U+2013), and a configurable list of banned words. Returns every occurrence with surrounding context.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        url: { type: "string", description: "The full URL to audit (e.g. https://example.com)" },
        banned_words: {
          type: "array",
          items: { type: "string" },
          description: "Optional list of banned words. Defaults to: delve, tapestry, landscape, robust, leverage, harness, empower, revolutionize, seamlessly, utilize, facilitate, synergy.",
        },
      },
      required: ["url"],
    },
  },
] as const;

export const qcHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // qc-tool.ts
  qc_run_checklist:        (args) => qcRunChecklist(args),
  qc_check_api:            (args) => qcCheckApi(args),
  qc_copy_audit:           (args) => qcCopyAudit(args),
};
