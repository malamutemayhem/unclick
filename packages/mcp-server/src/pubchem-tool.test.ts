import { afterEach, describe, expect, it, vi } from "vitest";
import { pubchemSearch, pubchemProperties } from "./pubchem-tool.js";

describe("pubchem connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await pubchemSearch({ name: "aspirin" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await pubchemProperties({ cid: "2244" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns compound data with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ PC_Compounds: [{ id: { id: { cid: 2244 } } }] }),
    })));
    const r = await pubchemSearch({ name: "aspirin" }) as Record<string, unknown>;
    expect(r.compound).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("requires name for search", async () => {
    const r = await pubchemSearch({}) as Record<string, unknown>;
    expect(r.error).toMatch(/name/i);
  });
});
