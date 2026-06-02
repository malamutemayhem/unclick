import { afterEach, describe, expect, it, vi } from "vitest";
import { clockifyAction } from "./clockify-tool.js";

// L2 resilience contract for the Clockify connector: request timeout, clean 429
// handling, input validation, and stable response mapping. Inline api_key lets
// resolveCredentials short-circuit without a network hop.
describe("clockify connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, text: async () => "",
    })));
    const result = await clockifyAction("get_clockify_workspaces", { api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
    expect(result.status).toBe(429);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await clockifyAction("get_clockify_workspaces", { api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await clockifyAction("get_time_entries", { api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/workspace_id/i);
  });

  it("passes through successful workspace responses", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      text: async () => JSON.stringify([{ id: "w1", name: "Workspace" }]),
    })));
    const result = await clockifyAction("get_clockify_workspaces", { api_key: "k" });
    expect(Array.isArray(result)).toBe(true);
    expect((result as unknown[]).length).toBe(1);
  });
});
