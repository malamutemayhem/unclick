import { afterEach, describe, expect, it, vi } from "vitest";

import { openlibrarySearch, openlibraryGetBook } from "./openlibrary-tool.js";

// Colocated Open Library connector tests. Exercise the L2 (resilience) behaviour.

describe("open library connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: (h: string) => (h === "Retry-After" ? "10" : null) },
      text: async () => "rate limited",
    })));
    await expect(openlibrarySearch({ q: "dune" })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 10s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(openlibrarySearch({ q: "dune" })).rejects.toThrow(/timed out/i);
  });

  it("wraps generic network failures with a clear message", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("ENOTFOUND"); }));
    await expect(openlibrarySearch({ q: "dune" })).rejects.toThrow(/network error: ENOTFOUND/i);
  });

  it("validates input before any network call", async () => {
    await expect(openlibraryGetBook({})).rejects.toThrow(/key is required/i);
  });

  it("returns parsed results", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ numFound: 1, docs: [{ title: "Dune" }] }),
    })));
    const result = await openlibrarySearch({ q: "dune" }) as Record<string, any>;
    expect(result.numFound).toBe(1);
    expect(result.docs[0].title).toBe("Dune");
  });
});
