// wiring/keychain.ts
// Per-app MCP wiring for the keychain connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: AI

import { keychainAction } from "../keychain-tool.js";

export const keychainTools = [
  // ── keychain-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "keychain_connect",
    description: "Connect a platform to the current UnClick account. In a hosted paired session this returns the signed-in secure web setup URL; do not pass third-party credentials through chat. The direct credential form is retained for local API-key installations.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        platform:   { type: "string", description: "Platform ID: github, supabase, vercel, stripe, cloudflare." },
        credential: { type: "string", description: "Local-installation only: API key or token for the platform. Omit for hosted paired sessions." },
        label:      { type: "string", description: "Optional label to distinguish multiple credentials for the same platform (default: 'default')." },
      },
      required: ["platform"],
    },
  },
  {
    name: "keychain_status",
    description: "Check connection status for one or all platform credentials in the current UnClick account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        platform: { type: "string", description: "Platform ID to check. Omit to return all connected platforms." },
      },
    },
  },
  {
    name: "keychain_disconnect",
    description: "Remove a platform credential. Hosted paired sessions receive the signed-in Apps URL, where removal stays account-scoped; local API-key installations may remove it directly.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        platform: { type: "string", description: "Platform ID to disconnect: github, supabase, vercel, stripe, cloudflare." },
        label:    { type: "string", description: "Label of the credential to remove. Omit to remove all labels for the platform." },
      },
      required: ["platform"],
    },
  },
  {
    name: "keychain_list_platforms",
    description: "List available platform connectors, with connection status for the current UnClick account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        category: { type: "string", description: "Filter by category (e.g. 'Developer Tools', 'Business')." },
      },
    },
  },
  {
    name: "keychain_secure_connect",
    description: "Securely connect a platform credential without exposing it in chat. Hosted paired sessions receive the signed-in UnClick web setup URL. Local API-key installations may use the legacy localhost input page.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        platform:  { type: "string", description: "Platform ID: github, stripe, openai, vercel, cloudflare, etc." },
        label:     { type: "string", description: "Optional label to distinguish multiple credentials for the same platform (default: 'default')." },
        setup_url: { type: "string", description: "Optional URL to the platform's API key settings page, shown on the input page." },
      },
      required: ["platform"],
    },
  },
] as const;

export const keychainHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // keychain-tool.ts
  keychain_connect:        (args) => keychainAction("keychain_connect",        args),
  keychain_status:         (args) => keychainAction("keychain_status",         args),
  keychain_disconnect:     (args) => keychainAction("keychain_disconnect",     args),
  keychain_list_platforms: (args) => keychainAction("keychain_list_platforms", args),
  keychain_secure_connect: (args) => keychainAction("keychain_secure_connect", args),
};
