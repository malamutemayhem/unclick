// wiring/randomuser.ts
// Per-app MCP wiring for the randomuser connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { randomUser } from "../randomuser-tool.js";

export const randomuserTools = [
  // ── randomuser-tool.ts ───────────────────────────────────────────────────────
  {
    name: "random_user",
    description: "Generate random user profiles with names, emails, addresses, and photos.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        count: { type: "number", description: "Number of users to generate (default 1)" },
        gender: { type: "string", description: "Filter by gender: male or female" },
        nationality: { type: "string", description: "ISO 3166-1 alpha-2 codes, comma-separated (e.g. US,GB,AU)" },
      },
    },
  },
] as const;

export const randomuserHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // randomuser-tool.ts
  random_user:             (args) => randomUser(args),
};
