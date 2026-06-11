import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getToolStats, reliableFetch, resetToolTelemetry } from "./reliable-fetch.js";
import { toolStats } from "./toolstats-tool.js";

function response(status: number, headers: Record<string, string> = {}): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: `status-${status}`,
    headers: { get: (name: string) => headers[name.toLowerCase()] ?? null },
    json: async () => ({}),
    text: async () => "",
  } as unknown as Response;
}

describe("tool_stats endpoint", () => {
  beforeEach(() => {
    resetToolTelemetry();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("reports an empty process honestly", async () => {
    const result = await toolStats({});
    expect(result.count).toBe(0);
    expect(String(result.summary)).toMatch(/No reliableFetch-instrumented tool calls/);
  });

  it("reports per-tool stats with filters", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => response(200)));
    await reliableFetch("https://api.example.com/a", { tool: "alpha" });
    await reliableFetch("https://api.example.com/b", { tool: "beta" });

    const all = await toolStats({});
    expect(all.count).toBe(2);
    expect(String(all.summary)).toMatch(/all healthy/);

    const one = await toolStats({ tool: "alpha" });
    expect(one.count).toBe(1);
    const tools = one.tools as Array<{ tool: string }>;
    expect(tools[0].tool).toBe("alpha");

    const unhealthy = await toolStats({ unhealthy_only: true });
    expect(unhealthy.count).toBe(0);
  });

  it("flags tools with failure streaks as needing attention", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("connection refused");
      })
    );
    for (let i = 0; i < 3; i++) {
      await expect(
        reliableFetch("https://api.example.com/x", { tool: "gamma", retries: 0 })
      ).rejects.toThrow();
    }
    const result = await toolStats({});
    expect(String(result.summary)).toMatch(/needs attention: gamma/);
  });
});
