import { afterEach, describe, expect, it, vi } from "vitest";
import { corporateBsPhrase } from "./corporatebs-tool.js";

describe("corporatebs connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await corporateBsPhrase({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await corporateBsPhrase({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("corporateBsPhrase returns a phrase with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ phrase: "synergize cross-platform deliverables" }),
    })));
    const r = await corporateBsPhrase({}) as Record<string, unknown>;
    expect(r.phrase).toContain("synergize");
    expect(r.unclick_meta).toBeDefined();
  });
});
