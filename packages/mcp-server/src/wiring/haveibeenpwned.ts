// wiring/haveibeenpwned.ts
// Per-app MCP wiring for the haveibeenpwned connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Security

import { checkAccountBreaches, getAllBreaches, checkPassword } from "../haveibeenpwned-tool.js";

export const haveibeenpwnedTools = [
  // ── haveibeenpwned-tool.ts ───────────────────────────────────────────────────
  {
    name: "hibp_check_account",
    description: "Check if an email account has been in a data breach.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        email: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["email"],
    },
  },
  {
    name: "hibp_all_breaches",
    description: "Get all breaches tracked by Have I Been Pwned.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        domain: { type: "string" },
      },
    },
  },
  {
    name: "hibp_check_password",
    description: "Check if a password has appeared in a data breach.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        password: { type: "string" },
      },
      required: ["password"],
    },
  },
] as const;

export const haveibeenpwnedHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // haveibeenpwned-tool.ts
  hibp_check_account:   (args) => checkAccountBreaches(args),
  hibp_all_breaches:    (args) => getAllBreaches(args),
  hibp_check_password:  (args) => checkPassword(args),
};
