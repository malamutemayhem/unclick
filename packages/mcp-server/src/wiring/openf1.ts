// wiring/openf1.ts
// Per-app MCP wiring for the openf1 connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { f1Sessions, f1Drivers, f1Positions, f1Laps, f1PitStops, f1CarData, f1TeamRadio, f1Weather } from "../openf1-tool.js";

export const openf1Tools = [
  // ── openf1-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "f1_sessions",
    description: "Get Formula 1 sessions from OpenF1.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        year: { type: "number" },
        session_type: { type: "string" },
        country_name: { type: "string" },
      },
    },
  },
  {
    name: "f1_drivers",
    description: "Get Formula 1 driver info from OpenF1.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        session_key: { type: "number" },
        driver_number: { type: "number" },
      },
    },
  },
  {
    name: "f1_positions",
    description: "Get Formula 1 position data from OpenF1.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        session_key: { type: "number" },
        driver_number: { type: "number" },
      },
      required: ["session_key"],
    },
  },
  {
    name: "f1_laps",
    description: "Get Formula 1 lap data from OpenF1.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        session_key: { type: "number" },
        driver_number: { type: "number" },
        lap_number: { type: "number" },
      },
      required: ["session_key"],
    },
  },
  {
    name: "f1_pit_stops",
    description: "Get Formula 1 pit stop data from OpenF1.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        session_key: { type: "number" },
        driver_number: { type: "number" },
      },
      required: ["session_key"],
    },
  },
  {
    name: "f1_car_data",
    description: "Get Formula 1 car telemetry data from OpenF1.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        session_key: { type: "number" },
        driver_number: { type: "number" },
      },
      required: ["session_key", "driver_number"],
    },
  },
  {
    name: "f1_team_radio",
    description: "Get Formula 1 team radio messages from OpenF1.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        session_key: { type: "number" },
        driver_number: { type: "number" },
      },
      required: ["session_key"],
    },
  },
  {
    name: "f1_weather",
    description: "Get Formula 1 weather data from OpenF1.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        session_key: { type: "number" },
      },
      required: ["session_key"],
    },
  },
] as const;

export const openf1Handlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // openf1-tool.ts
  f1_sessions:             (args) => f1Sessions(args),
  f1_drivers:              (args) => f1Drivers(args),
  f1_positions:            (args) => f1Positions(args),
  f1_laps:                 (args) => f1Laps(args),
  f1_pit_stops:            (args) => f1PitStops(args),
  f1_car_data:             (args) => f1CarData(args),
  f1_team_radio:           (args) => f1TeamRadio(args),
  f1_weather:              (args) => f1Weather(args),
};
