import { afterEach, describe, expect, it, vi } from "vitest";

import { getAmberSites, getAmberCurrentPrice } from "./amber-tool.js";

// Colocated Amber connector tests. Exercise the L2 (resilience) behaviour:
// request timeout, clean 429 handling, input validation, and stable mapping.
// Amber wraps each handler in try/catch and returns { error }, so failures
// surface as a structured result rather than a thrown rejection.

describe("amber connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubEnv("AMBER_API_KEY", "k");
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: (h: string) => (h === "Retry-After" ? "30" : null) },
      text: async () => "rate limited",
    })));
    const r = await getAmberSites({}) as Record<string, unknown>;
    expect(String(r.error)).toMatch(/rate limit exceeded \(HTTP 429\).*retry after 30s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubEnv("AMBER_API_KEY", "k");
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    const r = await getAmberSites({}) as Record<string, unknown>;
    expect(String(r.error)).toMatch(/timed out/i);
  });

  it("returns a not-connected card when the API key is missing", async () => {
    const r = await getAmberSites({}) as Record<string, unknown>;
    expect(r.not_connected).toBe(true);
    expect(r.connector).toBe("amber");
  });

  it("validates input before any network call", async () => {
    vi.stubEnv("AMBER_API_KEY", "k");
    const r = await getAmberCurrentPrice({}) as Record<string, unknown>;
    expect(String(r.error)).toMatch(/site_id is required/i);
  });

  it("maps the sites list into a clean shape", async () => {
    vi.stubEnv("AMBER_API_KEY", "k");
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ([
        { id: "01ABC", nmi: "6123456789", status: "active", network: "Ausgrid", lossFactor: 1.05, channels: [] },
      ]),
    })));
    const r = await getAmberSites({}) as Record<string, any>;
    expect(r.count).toBe(1);
    expect(r.sites[0].id).toBe("01ABC");
    expect(r.sites[0].nmi).toBe("6123456789");
  });
});
