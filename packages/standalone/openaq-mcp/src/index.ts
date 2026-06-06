#!/usr/bin/env node
// OpenAQ Air Quality MCP. Standalone MCP server by UnClick.
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
  getAirQuality,
  getAirMeasurements,
  getAqCountries,
} from "./openaq-tool.js";

const TOOLS = [
  {
    name: "openaq_air_quality",
    description: "Get air quality data for a location from OpenAQ.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        city: { type: "string" },
        country: { type: "string" },
        parameter: { type: "string" },
        limit: { type: "number" },
      },
    },
  },
  {
    name: "openaq_measurements",
    description: "Get air quality measurements from OpenAQ.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        location_id: { type: "number" },
        parameter: { type: "string" },
        date_from: { type: "string" },
        date_to: { type: "string" },
        limit: { type: "number" },
      },
      required: ["location_id"],
    },
  },
  {
    name: "openaq_countries",
    description: "List countries with air quality data on OpenAQ.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  openaq_air_quality: (args) => getAirQuality(args as unknown as Parameters<typeof getAirQuality>[0]),
  openaq_measurements: (args) => getAirMeasurements(args as unknown as Parameters<typeof getAirMeasurements>[0]),
  openaq_countries: (args) => getAqCountries(args as unknown as Parameters<typeof getAqCountries>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/openaq", version: "0.1.0" },
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
  process.stderr.write(`[openaq-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
