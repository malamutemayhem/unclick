// wiring/csuite.ts
// Per-app MCP wiring for the csuite connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: AI

import { csuitAnalyze } from "../csuite-tool.js";

export const csuiteTools = [
  // ── csuite-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "csuite_analyze",
    description: "Run a C-Suite multi-perspective analysis on a business scenario.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        scenario: { type: "string" },
        context: { type: "string" },
        perspectives: { type: "array", items: {}, description: "e.g. [\"CEO\",\"CFO\",\"CTO\"]" },
        depth: { type: "string", enum: ["quick", "standard", "deep"], description: "quick, standard, or deep" },
        focus: { type: "string" },
      },
      required: ["scenario"],
    },
  },
] as const;

export const csuiteHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // csuite-tool.ts
  csuite_analyze: (args) => Promise.resolve(csuitAnalyze(
    String(args.scenario ?? ""),
    {
      context:      args.context      ? String(args.context)      : undefined,
      perspectives: Array.isArray(args.perspectives) ? args.perspectives as string[] : undefined,
      depth:        args.depth        ? (args.depth as "quick" | "standard" | "deep") : undefined,
      focus:        args.focus        ? String(args.focus)        : undefined,
    }
  )),
};
