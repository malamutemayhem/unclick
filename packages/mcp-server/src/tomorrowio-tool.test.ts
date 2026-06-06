import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { tomorrowRealtime } from "./tomorrowio-tool.js";

// L2 resilience contract for the Tomorrow.io connector: request timeout, clean
// 429 handling, input validation, and stable response mapping.
describe("tomorrowio connector resilience (L2)", () => {
  beforeEach(() => { vi.stubEnv("TOMORROWIO_API_KEY", "key"); });
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, text: async () => "", json: async () => ({}),
    })));
    await expect(tomorrowRealtime({ location: "London" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(tomorrowRealtime({ location: "London" })).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    await expect(tomorrowRealtime({})).rejects.toThrow(/location is required/i);
  });

  it("maps realtime weather into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ({ location: { lat: 51, lon: 0, name: "London" }, data: { time: "t", values: { temperature: 20, humidity: 60 } } }),
    })));
    const result = await tomorrowRealtime({ location: "London" }) as Record<string, unknown>;
    expect(result.temperature_c).toBe(20);
    expect(result.humidity_pct).toBe(60);
  });
});
