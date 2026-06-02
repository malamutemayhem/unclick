import { afterEach, describe, expect, it, vi } from "vitest";
import { upstashRedisGet } from "./upstash-tool.js";

// L2 resilience contract for the Upstash connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
const AUTH = { api_key: "k", email: "user@example.com" };

describe("upstash connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, text: async () => "",
    })));
    const result = await upstashRedisGet({ ...AUTH, db_id: "d", key: "k1" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
    expect(result.status).toBe(429);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await upstashRedisGet({ ...AUTH, db_id: "d", key: "k1" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await upstashRedisGet({ ...AUTH }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/db_id/i);
  });

  it("passes through successful reads", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      text: async () => JSON.stringify({ result: "value" }),
    })));
    const result = await upstashRedisGet({ ...AUTH, db_id: "d", key: "k1" }) as Record<string, unknown>;
    expect(result.result).toBe("value");
  });
});
