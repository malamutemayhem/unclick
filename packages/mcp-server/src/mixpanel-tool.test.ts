import { afterEach, describe, expect, it, vi } from "vitest";
import { mixpanelGetEvents, mixpanelGetFunnels } from "./mixpanel-tool.js";

// L2 resilience contract for the Mixpanel connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
const CREDS = { service_account_username: "u", service_account_secret: "s", project_id: "1" };

describe("mixpanel connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, text: async () => "",
    })));
    await expect(mixpanelGetEvents({ ...CREDS })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(mixpanelGetEvents({ ...CREDS })).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    await expect(mixpanelGetFunnels({ ...CREDS })).rejects.toThrow(/funnel_id is required/i);
  });

  it("passes through successful event queries", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      text: async () => JSON.stringify({ data: { values: { "Signup": { "2026-01-01": 5 } } } }),
    })));
    const result = await mixpanelGetEvents({ ...CREDS }) as Record<string, unknown>;
    expect(result.data).toBeDefined();
  });
});
