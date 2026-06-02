import { afterEach, describe, expect, it, vi } from "vitest";
import { splitwiseAction } from "./splitwise-tool.js";

// L2 resilience contract for the Splitwise connector: request timeout, clean
// 429 handling, input validation, and stable response mapping. Credentials are
// passed inline so resolveCredentials short-circuits without a network hop.
describe("splitwise connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: () => null },
      text: async () => "rate limited",
    })));
    const result = await splitwiseAction("get_groups", { api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
    expect(result.status).toBe(429);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await splitwiseAction("get_groups", { api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await splitwiseAction("get_expenses", { api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/group_id/i);
  });

  it("passes through successful group responses", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      headers: { get: () => null },
      text: async () => JSON.stringify({ groups: [{ id: 1, name: "Trip" }] }),
    })));
    const result = await splitwiseAction("get_groups", { api_key: "k" }) as Record<string, unknown>;
    expect((result.groups as unknown[]).length).toBe(1);
  });
});
