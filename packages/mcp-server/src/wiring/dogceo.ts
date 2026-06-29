// wiring/dogceo.ts
// Per-app MCP wiring for the dogceo connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { dogRandomImage, dogBreedImage, dogListBreeds, dogBreedList } from "../dogceo-tool.js";

export const dogceoTools = [
  // ── dogceo-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "dog_random_image",
    description: "Get random dog image(s) from Dog CEO API.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        count: { type: "number", description: "Number of images (1-50, default 1)" },
      },
    },
  },
  {
    name: "dog_breed_image",
    description: "Get random image(s) of a specific dog breed.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        breed: { type: "string", description: "Breed name (e.g. husky, bulldog/french)" },
        count: { type: "number", description: "Number of images (1-50, default 1)" },
      },
      required: ["breed"],
    },
  },
  {
    name: "dog_list_breeds",
    description: "List all dog breeds and sub-breeds.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "dog_breed_list",
    description: "List sub-breeds of a specific dog breed.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        breed: { type: "string", description: "Breed name (e.g. bulldog, hound)" },
      },
      required: ["breed"],
    },
  },
] as const;

export const dogceoHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // dogceo-tool.ts
  dog_random_image:        (args) => dogRandomImage(args),
  dog_breed_image:         (args) => dogBreedImage(args),
  dog_list_breeds:         (args) => dogListBreeds(args),
  dog_breed_list:          (args) => dogBreedList(args),
};
