import { afterEach, describe, expect, it, vi } from "vitest";

import { nasaApod, nasaAsteroids } from "./nasa-tool.js";

// Colocated NASA connector tests. Exercise the L2 (resilience) behaviour.

describe("nasa connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: (h: string) => (h === "Retry-After" ? "3600" : null) },
      json: async () => ({}),
    })));
    await expect(nasaApod({})).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 3600s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(nasaApod({})).rejects.toThrow(/timed out/i);
  });

  it("wraps generic network failures with a clear message", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("ENOTFOUND"); }));
    await expect(nasaApod({})).rejects.toThrow(/network error: ENOTFOUND/i);
  });

  it("validates input before any network call", async () => {
    await expect(nasaAsteroids({})).rejects.toThrow(/start_date is required/i);
  });

  it("maps the astronomy picture of the day", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ date: "2026-01-01", title: "Galaxy", explanation: "A galaxy.", url: "https://x", media_type: "image" }),
    })));
    const result = await nasaApod({}) as Record<string, any>;
    expect(result.title).toBe("Galaxy");
    expect(result.media_type).toBe("image");
  });
});
