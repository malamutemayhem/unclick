// wiring/multiavatar.ts
// Per-app MCP wiring for the multiavatar connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { multiavatarGenerate } from "../multiavatar-tool.js";

export const multiavatarTools = [
  // ── multiavatar-tool.ts ──────────────────────────────────────────────────────
  {
    name: "multiavatar_generate",
    description: "Generate a unique avatar image URL from any string (no network call).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        name: { type: "string" as const, description: "Any string to generate a deterministic avatar (default: 'default')." },
      },
    },
  },
] as const;

export const multiavatarHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // multiavatar-tool.ts
  multiavatar_generate:      (args) => multiavatarGenerate(args),};
