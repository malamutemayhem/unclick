#!/usr/bin/env node
// Open-Meteo Weather MCP. Standalone MCP server by UnClick.
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
  weatherCurrent,
  weatherForecast,
  weatherHourly,
} from "./openmeteo-tool.js";

const TOOLS = [
  {
    name: "weather_current",
    description: "Get current weather for a location from Open-Meteo (no API key required).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        latitude: { type: "number" },
        longitude: { type: "number" },
        timezone: { type: "string" },
      },
      required: ["latitude", "longitude"],
    },
  },
  {
    name: "weather_forecast",
    description: "Get weather forecast for a location from Open-Meteo.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        latitude: { type: "number" },
        longitude: { type: "number" },
        days: { type: "number" },
        timezone: { type: "string" },
      },
      required: ["latitude", "longitude"],
    },
  },
  {
    name: "weather_hourly",
    description: "Get hourly weather forecast from Open-Meteo.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        latitude: { type: "number" },
        longitude: { type: "number" },
        days: { type: "number" },
        timezone: { type: "string" },
      },
      required: ["latitude", "longitude"],
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  weather_current: (args) => weatherCurrent(args as unknown as Parameters<typeof weatherCurrent>[0]),
  weather_forecast: (args) => weatherForecast(args as unknown as Parameters<typeof weatherForecast>[0]),
  weather_hourly: (args) => weatherHourly(args as unknown as Parameters<typeof weatherHourly>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/openmeteo", version: "0.1.0" },
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
  process.stderr.write(`[openmeteo-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
