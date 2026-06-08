import { afterEach, describe, expect, it, vi } from "vitest";
import { ipAddressLookup } from "./ipaddrinfo-tool.js";

describe("ipaddrinfo connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await ipAddressLookup({ ip: "8.8.8.8" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await ipAddressLookup({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns location with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ ip: "8.8.8.8", country: "United States", city: "Mountain View", success: true }),
    })));
    const r = await ipAddressLookup({ ip: "8.8.8.8" }) as Record<string, unknown>;
    expect(r.location).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
