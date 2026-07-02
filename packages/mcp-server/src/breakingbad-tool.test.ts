import { afterEach, describe, expect, it, vi } from "vitest";
import { breakingBadQuote } from "./breakingbad-tool.js";

describe("breakingbad connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await breakingBadQuote({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await breakingBadQuote({ count: 1 }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns quotes with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ([{ quote: "I am the one who knocks.", author: "Walter White" }]),
    })));
    const r = await breakingBadQuote({ count: 1 }) as Record<string, unknown>;
    expect(r.quotes).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
