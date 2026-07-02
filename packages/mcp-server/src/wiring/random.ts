// wiring/random.ts
// Per-app MCP wiring for the random connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Utilities

import { generateUuid, generateRandomNumber, generateRandomString, pickRandomFromList, flipCoin, rollDice, shuffleList, generateLoremIpsum } from "../random-tool.js";

export const randomTools = [
  // ── random-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "random_uuid",
    description: "Generate a random UUID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "random_number",
    description: "Generate a random number within a range.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        min: { type: "number" },
        max: { type: "number" },
        count: { type: "number" },
        integer: { type: "boolean" },
      },
    },
  },
  {
    name: "random_string",
    description: "Generate a random string.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        length: { type: "number" },
        charset: { type: "string" },
      },
    },
  },
  {
    name: "random_pick_from_list",
    description: "Pick random item(s) from a list.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        items: { type: "array", items: {} },
        count: { type: "number" },
      },
      required: ["items"],
    },
  },
  {
    name: "random_flip_coin",
    description: "Flip a coin.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        times: { type: "number" },
      },
    },
  },
  {
    name: "random_roll_dice",
    description: "Roll dice.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        dice: { type: "string", description: "e.g. 2d6, 1d20" },
      },
    },
  },
  {
    name: "random_shuffle_list",
    description: "Shuffle a list randomly.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        items: { type: "array", items: {} },
      },
      required: ["items"],
    },
  },
  {
    name: "random_lorem_ipsum",
    description: "Generate lorem ipsum placeholder text.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        paragraphs: { type: "number" },
        words: { type: "number" },
        sentences: { type: "number" },
      },
    },
  },
] as const;

export const randomHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // random-tool.ts
  random_uuid:             (args) => Promise.resolve(generateUuid(args)),
  random_number:           (args) => Promise.resolve(generateRandomNumber(args)),
  random_string:           (args) => Promise.resolve(generateRandomString(args)),
  random_pick_from_list:   (args) => Promise.resolve(pickRandomFromList(args)),
  random_flip_coin:        (args) => Promise.resolve(flipCoin(args)),
  random_roll_dice:        (args) => Promise.resolve(rollDice(args)),
  random_shuffle_list:     (args) => Promise.resolve(shuffleList(args)),
  random_lorem_ipsum:      (args) => Promise.resolve(generateLoremIpsum(args)),
};
