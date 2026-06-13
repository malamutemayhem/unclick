import { afterEach, describe, expect, it, vi } from "vitest";
import { randomTaco } from "./tacofancy-tool.js";

describe("tacofancy connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await randomTaco({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await randomTaco({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns taco data with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ name: "Classic Taco", base_layer: { name: "Beef" }, seasoning: { name: "Cumin" } }),
    })));
    const r = await randomTaco({}) as Record<string, unknown>;
    expect(r.taco).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
