// wiring/hunter.ts
// Per-app MCP wiring for the hunter connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Security

import { findEmail, verifyEmail, getDomainInfo } from "../hunter-tool.js";

export const hunterTools = [
  // ── hunter-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "hunter_find_email",
    description: "Find email addresses for a domain using Hunter.io.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        domain: { type: "string" },
        first_name: { type: "string" },
        last_name: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["domain"],
    },
  },
  {
    name: "hunter_verify_email",
    description: "Verify an email address with Hunter.io.",
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
    name: "hunter_domain_info",
    description: "Get email information for a domain from Hunter.io.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        domain: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["domain"],
    },
  },
] as const;

export const hunterHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // hunter-tool.ts
  hunter_find_email:    (args) => findEmail(args),
  hunter_verify_email:  (args) => verifyEmail(args),
  hunter_domain_info:   (args) => getDomainInfo(args),
};
