import { afterEach, describe, expect, it, vi } from "vitest";

import { calcomMe, calcomListBookings } from "./calcom-tool.js";

describe("calcom connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, json: async () => ({}) })));
    await expect(calcomMe({ api_key: "k" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("x"); e.name = "AbortError"; throw e; }));
    await expect(calcomMe({ api_key: "k" })).rejects.toThrow(/timed out/i);
  });

  it("returns a not-connected card when no api key is supplied", async () => {
    vi.stubEnv("CALCOM_API_KEY", "");
    const result = await calcomMe({}) as Record<string, unknown>;
    expect(result.not_connected).toBe(true);
  });

  it("passes the api key as a query param and stamps the result", async () => {
    const fetchMock = vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ bookings: [] }) }));
    vi.stubGlobal("fetch", fetchMock);
    const result = await calcomListBookings({ api_key: "secret", status: "upcoming" }) as Record<string, any>;
    const [url] = fetchMock.mock.calls[0] as unknown as [string];
    expect(String(url)).toContain("apiKey=secret");
    expect(String(url)).toContain("status=upcoming");
    expect(result.unclick_meta.source).toBe("Cal.com API v1");
  });
});
