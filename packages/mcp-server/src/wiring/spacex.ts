// wiring/spacex.ts
// Per-app MCP wiring for the spacex connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { spacexLatestLaunch, spacexLaunches, spacexRockets } from "../spacex-tool.js";

export const spacexTools = [
  // ── spacex-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "spacex_latest_launch",
    description: "Get the most recent SpaceX launch details.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "spacex_launches",
    description: "List recent SpaceX launches.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        limit: { type: "number" as const, description: "Number of most recent launches to return (default 10)." },
      },
    },
  },
  {
    name: "spacex_rockets",
    description: "List all SpaceX rockets with specifications.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const spacexHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // spacex-tool.ts
  spacex_latest_launch:      (args) => spacexLatestLaunch(args),
  spacex_launches:           (args) => spacexLaunches(args),
  spacex_rockets:            (args) => spacexRockets(args),};
