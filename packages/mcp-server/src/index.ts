#!/usr/bin/env node
// Default: start the MCP stdio server. The one subcommand, `seat-bridge`,
// instead runs the local subscription-seat worker for the website chat
// (see seat-bridge.ts); MCP clients never pass argv, so plain installs are
// unaffected.
if (process.argv[2] === "seat-bridge") {
  const { runSeatBridgeCli } = await import("./seat-bridge.js");
  runSeatBridgeCli(process.argv.slice(3)).catch((err: unknown) => {
    process.stderr.write(
      `Fatal seat-bridge error: ${err instanceof Error ? err.message : String(err)}\n`,
    );
    process.exit(1);
  });
} else {
  const { startServer } = await import("./server.js");
  startServer().catch((err: unknown) => {
    process.stderr.write(
      `Fatal error starting UnClick MCP server: ${err instanceof Error ? err.message : String(err)}\n`,
    );
    process.exit(1);
  });
}
