import { afterEach, describe, expect, it, vi } from "vitest";
import { worldbankCountry, worldbankIndicator } from "./worldbank-tool.js";

describe("worldbank connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await worldbankCountry({ code: "US" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await worldbankIndicator({ country: "US", indicator: "NY.GDP.MKTP.CD" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns country data with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ([{ page: 1 }, [{ id: "USA", name: "United States", region: { value: "North America" } }]]),
    })));
    const r = await worldbankCountry({ code: "US" }) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
