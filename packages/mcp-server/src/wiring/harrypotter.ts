// wiring/harrypotter.ts
// Per-app MCP wiring for the harrypotter connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { hpAllCharacters, hpStudents, hpStaff, hpByHouse } from "../harrypotter-tool.js";

export const harrypotterTools = [
  // ── harrypotter-tool.ts ────────────────────────────────────────────────────
  {
    name: "hp_all_characters",
    description: "List all Harry Potter characters.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "hp_students",
    description: "List Hogwarts students.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "hp_staff",
    description: "List Hogwarts staff.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "hp_by_house",
    description: "List characters by Hogwarts house.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        house: { type: "string", description: "House name: gryffindor, slytherin, hufflepuff, or ravenclaw" },
      },
      required: ["house"],
    },
  },
] as const;

export const harrypotterHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // harrypotter-tool.ts
  hp_all_characters:       (args) => hpAllCharacters(args),
  hp_students:             (args) => hpStudents(args),
  hp_staff:                (args) => hpStaff(args),
  hp_by_house:             (args) => hpByHouse(args),
};
