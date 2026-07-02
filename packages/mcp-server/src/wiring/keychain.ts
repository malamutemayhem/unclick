// wiring/keychain.ts
// Per-app MCP wiring for the keychain connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: AI

import { keychainAction } from "../keychain-tool.js";

export const keychainTools = [
  // ── keychain-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "keychain_connect",
    description: "Store an encrypted platform credential in the UnClick Keychain. Tests the credential against the platform API before saving. Scoped to the caller's UNCLICK_API_KEY.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        platform:   { type: "string", description: "Platform ID: github, supabase, vercel, stripe, cloudflare." },
        credential: { type: "string", description: "API key or token for the platform." },
        label:      { type: "string", description: "Optional label to distinguish multiple credentials for the same platform (default: 'default')." },
      },
      required: ["platform", "credential"],
    },
  },
  {
    name: "keychain_status",
    description: "Check the connection status of one or all platform credentials stored in the UnClick Keychain for the current UNCLICK_API_KEY.",
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
    description: "Remove a platform credential from the UnClick Keychain. Scoped to the caller's UNCLICK_API_KEY.",
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
    description: "List all available platform connectors in the UnClick Keychain catalog, with connection status for the current UNCLICK_API_KEY.",
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
    description: "Securely connect a platform credential without exposing the key in chat. Checks environment variables first; if not found, opens a localhost secure input page for the user to paste their key. Call once to get the URL, then call again after the user submits to complete the connection.",
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
