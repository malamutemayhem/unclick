// ToolStats: per-tool reliability telemetry for this MCP server process.
// Reads the in-process stats recorded by reliable-fetch.ts: call counts,
// error classes, latency, rate-limit hits, retries, and circuit-breaker
// state. No credentials, no network calls, read-only.
//
// Scope note: stats cover connectors that route through reliableFetch and
// reset when the process (or warm serverless instance) recycles. They answer
// "how are tools behaving in this session", not long-term analytics.

import { getToolStats, type ToolCallStats } from "./reliable-fetch.js";
import { stampMeta } from "./connector-meta.js";

export async function toolStats(args: Record<string, unknown>): Promise<Record<string, unknown>> {
  const toolFilter = typeof args.tool === "string" && args.tool.trim() ? args.tool.trim() : undefined;
  const unhealthyOnly = args.unhealthy_only === true;

  let stats: ToolCallStats[] = getToolStats();
  if (toolFilter) stats = stats.filter((row) => row.tool === toolFilter);
  if (unhealthyOnly) {
    stats = stats.filter(
      (row) => row.consecutive_failures > 0 || row.breaker.state !== "closed" || row.rate_limited > 0
    );
  }

  const unhealthy = stats.filter((row) => row.breaker.state !== "closed" || row.consecutive_failures >= 3);
  const summary =
    stats.length === 0
      ? "No reliableFetch-instrumented tool calls recorded in this process yet."
      : unhealthy.length === 0
        ? `${stats.length} instrumented tool(s), all healthy.`
        : `${stats.length} instrumented tool(s); needs attention: ${unhealthy.map((row) => row.tool).join(", ")}.`;

  return stampMeta(
    { summary, tools: stats, count: stats.length },
    {
      source: "UnClick reliable-fetch in-process telemetry",
      fetched_at: new Date().toISOString(),
      next_steps: [
        "If a tool shows breaker state open, wait for retry_after_ms before calling it again",
        "Pass tool: '<slug>' to filter to one connector, or unhealthy_only: true to triage",
        "Stats are per process and reset on restart; use them as a live health signal, not history",
      ],
    }
  );
}
