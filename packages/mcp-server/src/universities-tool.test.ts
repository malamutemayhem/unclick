import { afterEach, describe, expect, it, vi } from "vitest";
import { universitiesSearch } from "./universities-tool.js";

describe("universities connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await universitiesSearch({ name: "MIT" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await universitiesSearch({ country: "Australia" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns universities with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ([{ name: "MIT", country: "United States", web_pages: ["http://mit.edu"] }]),
    })));
    const r = await universitiesSearch({ name: "MIT" }) as Record<string, unknown>;
    expect(r.universities).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("requires at least name or country", async () => {
    const r = await universitiesSearch({}) as Record<string, unknown>;
    expect(r.error).toMatch(/name or country/i);
  });
});
