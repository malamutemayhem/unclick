import { afterEach, describe, expect, it, vi } from "vitest";
import { pagerduty_list_incidents, pagerduty_get_incident } from "./pagerduty-tool.js";

// L2 resilience contract for the PagerDuty connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("pagerduty connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, json: async () => ({}),
    })));
    await expect(pagerduty_list_incidents({ api_key: "k" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(pagerduty_list_incidents({ api_key: "k" })).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    await expect(pagerduty_get_incident({ api_key: "k" })).rejects.toThrow(/incident_id is required/i);
  });

  it("maps incident listings into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ({ incidents: [{ id: "I1", title: "Outage" }], total: 1 }),
    })));
    const result = await pagerduty_list_incidents({ api_key: "k" }) as Record<string, unknown>;
    expect(result.count).toBe(1);
    expect((result.incidents as unknown[]).length).toBe(1);
  });
});
