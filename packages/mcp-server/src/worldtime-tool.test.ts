import { afterEach, describe, expect, it, vi } from "vitest";
import { worldTimeByTimezone, worldTimeByIp, worldTimeListTimezones } from "./worldtime-tool.js";

describe("worldtime connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await worldTimeByIp({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await worldTimeListTimezones({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates required timezone for worldTimeByTimezone", async () => {
    const r = await worldTimeByTimezone({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timezone is required/i);
  });

  it("worldTimeByIp returns time data with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ timezone: "America/New_York", datetime: "2026-06-08T12:00:00", utc_offset: "-04:00" }),
    })));
    const r = await worldTimeByIp({}) as Record<string, unknown>;
    expect(r.timezone).toBe("America/New_York");
    expect(r.unclick_meta).toBeDefined();
  });
});
