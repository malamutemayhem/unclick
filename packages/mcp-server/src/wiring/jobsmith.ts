// wiring/jobsmith.ts
// Per-app MCP wiring for the jobsmith connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { jobsmithCheck, jobsmithRules } from "../jobsmith-tool.js";

export const jobsmithTools = [
  // ── jobsmith-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "jobsmith_check",
    description: "Run JobSmith's CV / cover-letter quality rules over a piece of text. No key needed.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        text: { type: "string", description: "The CV or cover-letter text to check" },
      },
      required: ["text"],
    },
  },
  {
    name: "jobsmith_rules",
    description: "Browse JobSmith's rule pack (counts by category and severity), optionally filtered by category.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        category: { type: "string", description: "Filter to one category (e.g. ATS, TRUTH, VOICE, PRIVACY)" },
      },
      required: [],
    },
  },
] as const;

export const jobsmithHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // jobsmith-tool.ts
  jobsmith_check:          (args) => jobsmithCheck(args),
  jobsmith_rules:          (args) => jobsmithRules(args),
};
