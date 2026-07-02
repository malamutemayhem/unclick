// wiring/dnd5e.ts
// Per-app MCP wiring for the dnd5e connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { dndGetClass, dndListClasses, dndGetSpell, dndListSpells, dndGetMonster, dndListMonsters } from "../dnd5e-tool.js";

export const dnd5eTools = [
  // ── dnd5e-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "dnd_get_class",
    description: "Get a D&D 5e class by index (e.g. wizard, fighter).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        class: { type: "string", description: "Class index (e.g. 'wizard', 'fighter')" },
      },
      required: ["class"],
    },
  },
  {
    name: "dnd_list_classes",
    description: "List all D&D 5e character classes.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "dnd_get_spell",
    description: "Get a D&D 5e spell by name/index.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        spell: { type: "string", description: "Spell index (e.g. 'fireball', 'magic-missile')" },
      },
      required: ["spell"],
    },
  },
  {
    name: "dnd_list_spells",
    description: "List D&D 5e spells, optionally filtered.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        school: { type: "string", description: "Filter by school (e.g. 'evocation')" },
        level: { type: "number", description: "Filter by spell level (0-9)" },
      },
    },
  },
  {
    name: "dnd_get_monster",
    description: "Get a D&D 5e monster stat block by index.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        monster: { type: "string", description: "Monster index (e.g. 'goblin', 'adult-red-dragon')" },
      },
      required: ["monster"],
    },
  },
  {
    name: "dnd_list_monsters",
    description: "List D&D 5e monsters, optionally by challenge rating.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        challenge_rating: { type: "string", description: "Filter by CR (e.g. '1', '0.25')" },
      },
    },
  },
] as const;

export const dnd5eHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // dnd5e-tool.ts
  dnd_get_class:           (args) => dndGetClass(args),
  dnd_list_classes:        (args) => dndListClasses(args),
  dnd_get_spell:           (args) => dndGetSpell(args),
  dnd_list_spells:         (args) => dndListSpells(args),
  dnd_get_monster:         (args) => dndGetMonster(args),
  dnd_list_monsters:       (args) => dndListMonsters(args),
};
