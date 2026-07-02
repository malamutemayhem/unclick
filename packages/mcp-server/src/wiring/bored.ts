// wiring/bored.ts
// Per-app MCP wiring for the bored connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { boredRandom, boredByType, boredByParticipants } from "../bored-tool.js";

export const boredTools = [
  // ── bored-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "bored_random",
    description: "Get a random activity suggestion.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "bored_by_type",
    description: "Get an activity by type (education, recreational, social, diy, charity, cooking, relaxation, music, busywork).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        type: { type: "string", description: "Activity type" },
      },
      required: ["type"],
    },
  },
  {
    name: "bored_by_participants",
    description: "Get an activity for a specific number of participants.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        participants: { type: "number", description: "Number of participants" },
      },
      required: ["participants"],
    },
  },
] as const;

export const boredHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // bored-tool.ts
  bored_random:            (args) => boredRandom(args),
  bored_by_type:           (args) => boredByType(args),
  bored_by_participants:   (args) => boredByParticipants(args),
};
