#!/usr/bin/env node
import { startServer } from "./server.js";

startServer().catch((err: unknown) => {
  process.stderr.write(
    `Fatal error starting UnClick MCP server: ${err instanceof Error ? err.message : String(err)}\n`
  );
  process.exit(1);
});
