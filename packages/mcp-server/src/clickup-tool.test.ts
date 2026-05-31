import { afterEach, describe, expect, it, vi } from "vitest";
import { clickupAction } from "./clickup-tool.js";

// L2 resilience contract for the ClickUp connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("clickup connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, text: async () => "rate limited",
    })));
    const result = await clickupAction("get_workspaces", { api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
    expect(result.status).toBe(429);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await clickupAction("get_workspaces", { api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await clickupAction("get_spaces", { api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/team_id/i);
  });

  it("passes through successful workspace responses", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      text: async () => JSON.stringify({ teams: [{ id: "t1", name: "Team" }] }),
    })));
    const result = await clickupAction("get_workspaces", { api_key: "k" }) as Record<string, unknown>;
    expect((result.teams as unknown[]).length).toBe(1);
  });
});
