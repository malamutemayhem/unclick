import { afterEach, describe, expect, it, vi } from "vitest";

import { bandsintownArtist } from "./bandsintown-tool.js";

// Colocated Bandsintown connector tests. bitFetch returns { error } objects.

describe("bandsintown connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: (h: string) => (h === "Retry-After" ? "30" : null) } })));
    const r = await bandsintownArtist({ artist_name: "Radiohead" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit reached \(HTTP 429\).*retry after 30s/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    const r = await bandsintownArtist({ artist_name: "Radiohead" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns a structured error when artist_name is missing", async () => {
    const r = await bandsintownArtist({}) as Record<string, unknown>;
    expect(r.error).toMatch(/artist_name is required/i);
  });

  it("passes through artist data", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ name: "Radiohead", id: "123" }) })));
    const r = await bandsintownArtist({ artist_name: "Radiohead" }) as Record<string, any>;
    expect(r.name).toBe("Radiohead");
  });
});
