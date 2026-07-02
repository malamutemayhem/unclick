import { afterEach, describe, expect, it, vi } from "vitest";
import { nationalizePredict } from "./nationalize-tool.js";

describe("nationalize connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await nationalizePredict({ name: "michael" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await nationalizePredict({ name: "michael" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns prediction with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ count: 500, name: "michael", country: [{ country_id: "US", probability: 0.08 }] }),
    })));
    const r = await nationalizePredict({ name: "michael" }) as Record<string, unknown>;
    expect(r.prediction).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("requires name parameter", async () => {
    const r = await nationalizePredict({}) as Record<string, unknown>;
    expect(r.error).toMatch(/name/i);
  });
});
