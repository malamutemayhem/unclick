// wiring/finalspace.ts
// Per-app MCP wiring for the finalspace connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { finalSpaceCharacters, finalSpaceEpisodes } from "../finalspace-tool.js";

export const finalspaceTools = [
  // ── finalspace-tool.ts ─────────────────────────────────────────────────────
  {
    name: "final_space_characters",
    description: "List all Final Space characters.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "final_space_episodes",
    description: "List all Final Space episodes.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const finalspaceHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // finalspace-tool.ts
  final_space_characters:  (args) => finalSpaceCharacters(args),
  final_space_episodes:    (args) => finalSpaceEpisodes(args),
};
