// wiring/vault.ts
// Per-app MCP wiring for the vault connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: AI

import { vaultAction } from "../vault-tool.js";

export const vaultTools = [
  // ── vault-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "vault_action",
    description: "Perform a vault action: vault_init, vault_store, vault_retrieve, vault_list, vault_delete, vault_rotate, vault_audit.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action: { type: "string" },
        master_password: { type: "string" },
        key: { type: "string" },
        value: { type: "string" },
        encrypt: { type: "boolean" },
      },
      required: ["action", "master_password"],
    },
  },
] as const;

export const vaultHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // vault-tool.ts
  vault_action:            (args) => vaultAction(String(args.action ?? ""), args),
};
