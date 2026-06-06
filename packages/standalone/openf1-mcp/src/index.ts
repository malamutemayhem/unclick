#!/usr/bin/env node
// OpenF1 MCP. Standalone MCP server by UnClick.
// By UnClick. 180+ tools plus persistent agent memory in one install: https://unclick.world
//
// Generated from the UnClick connector by scripts/generate-standalone-mcp.mjs.
// Edit the connector in the UnClick monorepo, not here.

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {
  f1Sessions,
  f1Drivers,
  f1Positions,
  f1Laps,
  f1PitStops,
  f1CarData,
  f1TeamRadio,
  f1Weather,
} from "./openf1-tool.js";

const TOOLS = [
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
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  f1_sessions: (args) => f1Sessions(args as unknown as Parameters<typeof f1Sessions>[0]),
  f1_drivers: (args) => f1Drivers(args as unknown as Parameters<typeof f1Drivers>[0]),
  f1_positions: (args) => f1Positions(args as unknown as Parameters<typeof f1Positions>[0]),
  f1_laps: (args) => f1Laps(args as unknown as Parameters<typeof f1Laps>[0]),
  f1_pit_stops: (args) => f1PitStops(args as unknown as Parameters<typeof f1PitStops>[0]),
  f1_car_data: (args) => f1CarData(args as unknown as Parameters<typeof f1CarData>[0]),
  f1_team_radio: (args) => f1TeamRadio(args as unknown as Parameters<typeof f1TeamRadio>[0]),
  f1_weather: (args) => f1Weather(args as unknown as Parameters<typeof f1Weather>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/openf1", version: "0.1.0" },
  { capabilities: { tools: {} } },
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const handler = HANDLERS[req.params.name];
  if (!handler) {
    return { content: [{ type: "text", text: `Unknown tool: ${req.params.name}` }], isError: true };
  }
  try {
    const result = await handler((req.params.arguments ?? {}) as Record<string, unknown>);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { content: [{ type: "text", text: message }], isError: true };
  }
});

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  process.stderr.write(`[openf1-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
