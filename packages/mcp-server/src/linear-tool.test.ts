import { afterEach, describe, expect, it, vi } from "vitest";
import { linearAction } from "./linear-tool.js";

// L2 resilience contract for the Linear connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("linear connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: (): string | null => null }, text: async () => "{}",
    })));
    const result = await linearAction("list_teams", { api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
    expect(result.status).toBe(429);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await linearAction("list_teams", { api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await linearAction("list_teams", {}) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/api_key is required/i);
  });

  it("passes through successful team queries", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: (): string | null => null },
      text: async () => JSON.stringify({ data: { teams: { nodes: [{ id: "1", name: "Eng" }] } } }),
    })));
    const result = await linearAction("list_teams", { api_key: "k" }) as Record<string, unknown>;
    expect(result.error).toBeUndefined();
  });
});
