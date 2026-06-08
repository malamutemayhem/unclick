import { afterEach, describe, expect, it, vi } from "vitest";
import { amiiboSearch, amiiboBySeries, amiiboTypes } from "./amiibo-tool.js";

describe("amiibo connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await amiiboSearch({ name: "mario" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await amiiboTypes({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates name is required for search", async () => {
    const r = await amiiboSearch({}) as Record<string, unknown>;
    expect(r.error).toMatch(/name is required/i);
  });

  it("validates series is required", async () => {
    const r = await amiiboBySeries({}) as Record<string, unknown>;
    expect(r.error).toMatch(/series is required/i);
  });

  it("returns amiibo data with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ amiibo: [{ name: "Mario", amiiboSeries: "Super Mario" }] }),
    })));
    const r = await amiiboSearch({ name: "mario" }) as Record<string, unknown>;
    expect(r.amiibo).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
