import { afterEach, describe, expect, it, vi } from "vitest";
import { openfdaDrugSearch, openfdaRecallSearch, openfdaAdverseEvents } from "./openfda-tool.js";

describe("openfda connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await openfdaDrugSearch({ query: "aspirin" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await openfdaRecallSearch({ query: "salmonella" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns drug data with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ meta: { results: { total: 1 } }, results: [{ openfda: { brand_name: ["Aspirin"] } }] }),
    })));
    const r = await openfdaDrugSearch({ query: "aspirin" }) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
