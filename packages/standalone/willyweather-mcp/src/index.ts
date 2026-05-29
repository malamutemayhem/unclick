#!/usr/bin/env node
// WillyWeather MCP — standalone MCP server.
// Part of UnClick — 180+ tools plus persistent agent memory in one install. https://unclick.world
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
  getWillyweatherForecast,
  getWillyweatherSurf,
  getWillyweatherTide,
} from "./willyweather-tool.js";

const TOOLS = [
  {
    name: "willyweather_forecast",
    description: "Get weather forecast from WillyWeather for an Australian location.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        location_id: { type: "number", description: "WillyWeather location ID" },
        days: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["location_id"],
    },
  },
  {
    name: "willyweather_surf",
    description: "Get surf report from WillyWeather.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        location_id: { type: "number" },
        days: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["location_id"],
    },
  },
  {
    name: "willyweather_tide",
    description: "Get tide times from WillyWeather.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        location_id: { type: "number" },
        days: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["location_id"],
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  willyweather_forecast: (args) => getWillyweatherForecast(args),
  willyweather_surf: (args) => getWillyweatherSurf(args),
  willyweather_tide: (args) => getWillyweatherTide(args),
};

const server = new Server(
  { name: "io.github.malamutemayhem/willyweather", version: "0.1.0" },
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
  process.stderr.write(`[willyweather-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
