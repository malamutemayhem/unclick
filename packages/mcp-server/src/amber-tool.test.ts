import { afterEach, describe, expect, it, vi } from "vitest";

import { getAmberCurrentPrice, getAmberSites } from "./amber-tool.js";

// Colocated Amber tests: L2 resilience + L3 memory defaults + L4 source stamping,
// using the shared connector-kit. Amber is the second reference for the ladder.

const okJson = (body: unknown) =>
  vi.fn(async (..._a: unknown[]) => ({ ok: true, status: 200, json: async () => body }));

describe("amber connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubEnv("AMBER_API_KEY", "k");
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: (h: string) => (h === "Retry-After" ? "12" : null) },
      text: async () => "slow down",
    })));
    const res = await getAmberSites({}) as Record<string, any>;
    expect(res.error).toMatch(/rate limit reached \(HTTP 429\).*retry after 12s/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubEnv("AMBER_API_KEY", "k");
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    const res = await getAmberSites({}) as Record<string, any>;
    expect(res.error).toMatch(/timed out/i);
  });
});

describe("amber memory defaults + stamping (L3/L4)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("uses AMBER_HOME_SITE_ID and records the default used", async () => {
    vi.stubEnv("AMBER_API_KEY", "k");
    vi.stubEnv("AMBER_HOME_SITE_ID", "site-123");
    const fetchMock = okJson([{ channelType: "general", perKwh: 30 }]);
    vi.stubGlobal("fetch", fetchMock);

    const res = await getAmberCurrentPrice({}) as Record<string, any>;

    expect(String(fetchMock.mock.calls[0][0])).toContain("/sites/site-123/prices/current");
    expect(res.site_id).toBe("site-123");
    expect(res.unclick_meta.source).toBe("Amber Electric API v1");
    expect(res.unclick_meta.defaults_used).toContain("AMBER_HOME_SITE_ID");
    expect(typeof res.unclick_meta.fetched_at).toBe("string");
  });

  it("explicit site_id overrides env and is not flagged as a default", async () => {
    vi.stubEnv("AMBER_API_KEY", "k");
    vi.stubEnv("AMBER_HOME_SITE_ID", "site-123");
    const fetchMock = okJson([]);
    vi.stubGlobal("fetch", fetchMock);

    const res = await getAmberCurrentPrice({ site_id: "site-999" }) as Record<string, any>;

    expect(String(fetchMock.mock.calls[0][0])).toContain("/sites/site-999/");
    expect(res.unclick_meta.defaults_used).not.toContain("AMBER_HOME_SITE_ID");
  });
});
