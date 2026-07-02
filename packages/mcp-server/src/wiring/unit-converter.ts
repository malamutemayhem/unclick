// wiring/unit-converter.ts
// Per-app MCP wiring for the unit-converter connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Utilities

import { convertLength, convertWeight, convertTemperature, convertVolume, convertSpeed, convertArea, convertDataStorage } from "../unit-converter-tool.js";

export const unitConverterTools = [
  // ── unit-converter-tool.ts ───────────────────────────────────────────────────
  {
    name: "convert_length",
    description: "Convert between length units.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        value: { type: "number" },
        from: { type: "string" },
        to: { type: "string" },
      },
      required: ["value", "from", "to"],
    },
  },
  {
    name: "convert_weight",
    description: "Convert between weight/mass units.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        value: { type: "number" },
        from: { type: "string" },
        to: { type: "string" },
      },
      required: ["value", "from", "to"],
    },
  },
  {
    name: "convert_temperature",
    description: "Convert between temperature units (C, F, K).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        value: { type: "number" },
        from: { type: "string" },
        to: { type: "string" },
      },
      required: ["value", "from", "to"],
    },
  },
  {
    name: "convert_volume",
    description: "Convert between volume units.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        value: { type: "number" },
        from: { type: "string" },
        to: { type: "string" },
      },
      required: ["value", "from", "to"],
    },
  },
  {
    name: "convert_speed",
    description: "Convert between speed units.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        value: { type: "number" },
        from: { type: "string" },
        to: { type: "string" },
      },
      required: ["value", "from", "to"],
    },
  },
  {
    name: "convert_area",
    description: "Convert between area units.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        value: { type: "number" },
        from: { type: "string" },
        to: { type: "string" },
      },
      required: ["value", "from", "to"],
    },
  },
  {
    name: "convert_data_storage",
    description: "Convert between data storage units.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        value: { type: "number" },
        from: { type: "string" },
        to: { type: "string" },
      },
      required: ["value", "from", "to"],
    },
  },
] as const;

export const unitConverterHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // unit-converter-tool.ts
  convert_length:       (args) => Promise.resolve(convertLength(args)),
  convert_weight:       (args) => Promise.resolve(convertWeight(args)),
  convert_temperature:  (args) => Promise.resolve(convertTemperature(args)),
  convert_volume:       (args) => Promise.resolve(convertVolume(args)),
  convert_speed:        (args) => Promise.resolve(convertSpeed(args)),
  convert_area:         (args) => Promise.resolve(convertArea(args)),
  convert_data_storage: (args) => Promise.resolve(convertDataStorage(args)),
};
