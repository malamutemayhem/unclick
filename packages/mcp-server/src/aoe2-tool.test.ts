import { afterEach, describe, expect, it, vi } from "vitest";
import { aoe2Civilizations, aoe2Civilization, aoe2Units, aoe2Unit, aoe2Technologies } from "./aoe2-tool.js";

describe("aoe2 connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await aoe2Civilizations({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await aoe2Units({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates required id for civilization", async () => {
    const r = await aoe2Civilization({}) as Record<string, unknown>;
    expect(r.error).toMatch(/id is required/i);
  });

  it("validates required id for unit", async () => {
    const r = await aoe2Unit({}) as Record<string, unknown>;
    expect(r.error).toMatch(/id is required/i);
  });

  it("aoe2Civilizations returns data with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ civilizations: [{ id: 1, name: "Britons" }] }),
    })));
    const r = await aoe2Civilizations({}) as Record<string, unknown>;
    expect(r.unclick_meta).toBeDefined();
  });
});
