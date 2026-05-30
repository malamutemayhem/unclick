import { afterEach, describe, expect, it, vi } from "vitest";

import { ptvSearch, ptvDepartures } from "./ptv-tool.js";

// Colocated PTV connector tests. Exercise the L2 (resilience) and L4 (source
// stamp + memory defaults) behaviours so PTV is the reference for the depth ladder.

describe("ptv connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: (h: string) => (h === "Retry-After" ? "30" : null) },
      text: async () => "rate limited",
    })));
    await expect(ptvSearch({ search_term: "Richmond" })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 30s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(ptvSearch({ search_term: "Richmond" })).rejects.toThrow(/timed out/i);
  });

  it("wraps generic network failures with a clear message", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("ENOTFOUND"); }));
    await expect(ptvSearch({ search_term: "Richmond" })).rejects.toThrow(/network error: ENOTFOUND/i);
  });
});

describe("ptv source stamping + memory defaults (L4)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("stamps source, attribution, freshness, and next steps on search", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ stops: [] }) })));
    const result = await ptvSearch({ search_term: "Brighton Beach" }) as Record<string, any>;
    expect(result.unclick_meta).toMatchObject({
      source: "PTV Timetable API v3",
      next_steps: ["Use a returned stop_id with ptv_departures."],
    });
    expect(result.unclick_meta.attribution).toMatch(/Public Transport Victoria/);
    expect(typeof result.unclick_meta.fetched_at).toBe("string");
  });

  it("uses env home-stop defaults and records which defaults it used", async () => {
    vi.stubEnv("PTV_HOME_STOP_ID", "1071");
    vi.stubEnv("PTV_HOME_ROUTE_TYPE", "0");
    const fetchMock = vi.fn(async (..._a: unknown[]) => ({ ok: true, status: 200, json: async () => ({ departures: [] }) }));
    vi.stubGlobal("fetch", fetchMock);

    const result = await ptvDepartures({}) as Record<string, any>;

    expect(String(fetchMock.mock.calls[0][0])).toContain("/v3/departures/route_type/0/stop/1071");
    expect(result.unclick_meta.defaults_used).toEqual(
      expect.arrayContaining(["PTV_HOME_STOP_ID", "PTV_HOME_ROUTE_TYPE"]),
    );
  });

  it("explicit args override env defaults (and are not flagged as defaults)", async () => {
    vi.stubEnv("PTV_HOME_STOP_ID", "1071");
    const fetchMock = vi.fn(async (..._a: unknown[]) => ({ ok: true, status: 200, json: async () => ({ departures: [] }) }));
    vi.stubGlobal("fetch", fetchMock);

    const result = await ptvDepartures({ stop_id: "9999", route_type: 0 }) as Record<string, any>;

    expect(String(fetchMock.mock.calls[0][0])).toContain("/stop/9999");
    expect(result.unclick_meta.defaults_used).not.toContain("PTV_HOME_STOP_ID");
  });
});
