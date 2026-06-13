import { afterEach, describe, expect, it, vi } from "vitest";
import { marineForecast } from "./openmeteo-marine-tool.js";

describe("openmeteo-marine connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await marineForecast({ latitude: -37.8, longitude: 144.9 }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await marineForecast({ latitude: 0, longitude: 0 }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns forecast with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ daily: { wave_height_max: [1.5, 2.0], time: ["2026-06-08", "2026-06-09"] } }),
    })));
    const r = await marineForecast({ latitude: -37.8, longitude: 144.9 }) as Record<string, unknown>;
    expect(r.forecast).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("requires latitude", async () => {
    const r = await marineForecast({ longitude: 144 }) as Record<string, unknown>;
    expect(r.error).toMatch(/latitude/i);
  });
});
