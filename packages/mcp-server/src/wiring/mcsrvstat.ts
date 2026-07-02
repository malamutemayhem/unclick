// wiring/mcsrvstat.ts
// Per-app MCP wiring for the mcsrvstat connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { mcServerStatus } from "../mcsrvstat-tool.js";

export const mcsrvstatTools = [
  // ── mcsrvstat-tool.ts ──────────────────────────────────────────────────────
  {
    name: "mc_server_status",
    description: "Check the status of a Minecraft server (Java or Bedrock).",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        address: { type: "string", description: "Server address (e.g. mc.hypixel.net)" },
        edition: { type: "string", description: "java or bedrock (default java)" },
      },
      required: ["address"],
    },
  },
] as const;

export const mcsrvstatHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // mcsrvstat-tool.ts
  mc_server_status:        (args) => mcServerStatus(args),
};
