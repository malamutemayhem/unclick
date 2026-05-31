import { afterEach, describe, expect, it, vi } from "vitest";
import { datadogListMonitors, datadogGetMonitor } from "./datadog-tool.js";

// L2 resilience contract for the Datadog connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
const KEYS = { api_key: "k", app_key: "a" };

describe("datadog connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, json: async () => ({}),
    })));
    await expect(datadogListMonitors({ ...KEYS })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(datadogListMonitors({ ...KEYS })).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    await expect(datadogGetMonitor({ ...KEYS })).rejects.toThrow(/monitor_id is required/i);
  });

  it("maps monitor listings into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ([{ id: 1, name: "CPU" }, { id: 2, name: "Mem" }]),
    })));
    const result = await datadogListMonitors({ ...KEYS }) as Record<string, unknown>;
    expect(result.count).toBe(2);
    expect((result.monitors as unknown[]).length).toBe(2);
  });
});
