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

  // ─── L5 smart layer: source/freshness stamp + next-step hint ─────────────────

  it("stamps every response with source, freshness, and a next step", async () => {
    vi.stubEnv("AMBER_API_KEY", "k");
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ([]),
    })));
    const r = await getAmberSites({}) as Record<string, any>;
    expect(r.unclick_meta.source).toMatch(/Amber Electric/i);
    expect(typeof r.unclick_meta.fetched_at).toBe("string");
    expect(r.unclick_meta.next_steps[0]).toMatch(/get_amber_current_price/);
  });

  // ─── L3 memory-aware: fill site_id from the AMBER_HOME_SITE_ID default ────────

  it("fills a missing site_id from the AMBER_HOME_SITE_ID memory default", async () => {
    vi.stubEnv("AMBER_API_KEY", "k");
    vi.stubEnv("AMBER_HOME_SITE_ID", "01HOME");
    const fetchMock = vi.fn(async () => ({ ok: true, status: 200, json: async () => ([]) }));
    vi.stubGlobal("fetch", fetchMock);

    const r = await getAmberCurrentPrice({}) as Record<string, any>;
    expect(r.site_id).toBe("01HOME");
    expect(r.unclick_meta.defaults_used).toContain("AMBER_HOME_SITE_ID");
    // The resolved site flowed into the request URL.
    const firstCallUrl = String((fetchMock.mock.calls[0] as unknown[])[0]);
    expect(firstCallUrl).toContain("/sites/01HOME/prices/current");
  });

  it("does not record a default when site_id is supplied explicitly", async () => {
    vi.stubEnv("AMBER_API_KEY", "k");
    vi.stubEnv("AMBER_HOME_SITE_ID", "01HOME");
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ([]) })));

    const r = await getAmberCurrentPrice({ site_id: "01EXPLICIT" }) as Record<string, any>;
    expect(r.site_id).toBe("01EXPLICIT");
    expect(r.unclick_meta.defaults_used).not.toContain("AMBER_HOME_SITE_ID");
  });
});
