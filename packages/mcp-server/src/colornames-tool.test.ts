import { afterEach, describe, expect, it, vi } from "vitest";
import { colorNameLookup, colorNameRandom } from "./colornames-tool.js";

describe("colornames connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await colorNameLookup({ hex: "ff5733" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await colorNameRandom({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns color name with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ colors: [{ name: "Red Orange", hex: "#ff5733", distance: 0.5 }] }),
    })));
    const r = await colorNameLookup({ hex: "ff5733" }) as Record<string, unknown>;
    expect(r.color).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("requires hex parameter", async () => {
    const r = await colorNameLookup({}) as Record<string, unknown>;
    expect(r.error).toMatch(/hex/i);
  });
});
