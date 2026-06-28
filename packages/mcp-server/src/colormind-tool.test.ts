import { afterEach, describe, expect, it, vi } from "vitest";
import { colormindGeneratePalette, colormindListModels } from "./colormind-tool.js";

describe("colormind connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await colormindGeneratePalette({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await colormindListModels({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns palette with hex colors and unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ result: [[255, 0, 0], [0, 255, 0], [0, 0, 255], [128, 128, 128], [255, 255, 255]] }),
    })));
    const r = await colormindGeneratePalette({}) as Record<string, unknown>;
    const hex = r.palette_hex as string[];
    expect(hex).toHaveLength(5);
    expect(hex[0]).toBe("#ff0000");
    expect(r.unclick_meta).toBeDefined();
  });
});
