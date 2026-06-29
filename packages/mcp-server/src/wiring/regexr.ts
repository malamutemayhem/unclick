// wiring/regexr.ts
// Per-app MCP wiring for the regexr connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { regexTest } from "../regexr-tool.js";

export const regexrTools = [
  // ── regexr-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "regex_test",
    description: "Test a regex pattern against text and return all matches with positions.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        pattern: { type: "string" as const, description: "Regular expression pattern." },
        text: { type: "string" as const, description: "Text to test against." },
        flags: { type: "string" as const, description: "Regex flags (default: g). Options: g, i, m, s." },
      }, required: ["pattern", "text"],
    },
  },
] as const;

export const regexrHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // regexr-tool.ts
  regex_test:                (args) => regexTest(args),
};
