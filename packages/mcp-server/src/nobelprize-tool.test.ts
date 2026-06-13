import { afterEach, describe, expect, it, vi } from "vitest";
import { nobelPrizes, nobelLaureates } from "./nobelprize-tool.js";

describe("nobelprize connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await nobelPrizes({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await nobelLaureates({ name: "Einstein" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns prizes with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ nobelPrizes: [{ awardYear: "2023", category: { en: "Physics" } }] }),
    })));
    const r = await nobelPrizes({ year: 2023 }) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
