#!/usr/bin/env node
// USGS Earthquakes MCP. Standalone MCP server by UnClick.
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
  getRecentEarthquakes,
  getEarthquakeDetail,
  getEarthquakesByRegion,
} from "./usgs-tool.js";

const TOOLS = [
  {
    name: "usgs_recent_earthquakes",
    description: "Get recent earthquakes from USGS.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        minmagnitude: { type: "number" },
        limit: { type: "number" },
        period: { type: "string", description: "hour, day, week, month" },
      },
    },
  },
  {
    name: "usgs_earthquake_detail",
    description: "Get details for a specific USGS earthquake event.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        event_id: { type: "string" },
      },
      required: ["event_id"],
    },
  },
  {
    name: "usgs_earthquakes_by_region",
    description: "Get USGS earthquakes within a geographic region.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        minlatitude: { type: "number" },
        maxlatitude: { type: "number" },
        minlongitude: { type: "number" },
        maxlongitude: { type: "number" },
        minmagnitude: { type: "number" },
        starttime: { type: "string" },
        endtime: { type: "string" },
      },
      required: ["minlatitude", "maxlatitude", "minlongitude", "maxlongitude"],
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  usgs_recent_earthquakes: (args) => getRecentEarthquakes(args as unknown as Parameters<typeof getRecentEarthquakes>[0]),
  usgs_earthquake_detail: (args) => getEarthquakeDetail(args as unknown as Parameters<typeof getEarthquakeDetail>[0]),
  usgs_earthquakes_by_region: (args) => getEarthquakesByRegion(args as unknown as Parameters<typeof getEarthquakesByRegion>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/usgs", version: "0.1.0" },
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
  process.stderr.write(`[usgs-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
