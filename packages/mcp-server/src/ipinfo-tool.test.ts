import { afterEach, describe, expect, it, vi } from "vitest";
import { ipInfoLookup } from "./ipinfo-tool.js";

describe("ipinfo connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await ipInfoLookup({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await ipInfoLookup({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns IP info with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ ip: "8.8.8.8", city: "Mountain View", region: "California", country: "US" }),
    })));
    const r = await ipInfoLookup({ ip: "8.8.8.8" }) as Record<string, unknown>;
    expect(r.ip).toBe("8.8.8.8");
    expect(r.city).toBe("Mountain View");
    expect(r.unclick_meta).toBeDefined();
  });
});
