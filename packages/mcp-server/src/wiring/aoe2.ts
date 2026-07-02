// wiring/aoe2.ts
// Per-app MCP wiring for the aoe2 connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { aoe2Civilizations, aoe2Civilization, aoe2Units, aoe2Unit, aoe2Technologies } from "../aoe2-tool.js";

export const aoe2Tools = [
  // ── aoe2-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "aoe2_civilizations",
    description: "List all Age of Empires II civilizations.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "aoe2_civilization",
    description: "Get an Age of Empires II civilization by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number", description: "Civilization ID" },
      },
      required: ["id"],
    },
  },
  {
    name: "aoe2_units",
    description: "List all Age of Empires II units.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "aoe2_unit",
    description: "Get an Age of Empires II unit by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number", description: "Unit ID" },
      },
      required: ["id"],
    },
  },
  {
    name: "aoe2_technologies",
    description: "List all Age of Empires II technologies.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const aoe2Handlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // aoe2-tool.ts
  aoe2_civilizations:      (args) => aoe2Civilizations(args),
  aoe2_civilization:       (args) => aoe2Civilization(args),
  aoe2_units:              (args) => aoe2Units(args),
  aoe2_unit:               (args) => aoe2Unit(args),
  aoe2_technologies:       (args) => aoe2Technologies(args),
};
