import { afterEach, describe, expect, it, vi } from "vitest";
import { makeupSearch } from "./makeup-tool.js";

describe("makeup connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await makeupSearch({ brand: "maybelline" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await makeupSearch({ brand: "maybelline" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("makeupSearch returns products with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ([{ id: 1, name: "Voluminous Lash Paradise", brand: "maybelline", product_type: "mascara" }]),
    })));
    const r = await makeupSearch({ brand: "maybelline" }) as Record<string, unknown>;
    expect(r.count).toBe(1);
    expect(r.unclick_meta).toBeDefined();
  });
});
