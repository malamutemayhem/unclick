import { afterEach, describe, expect, it, vi } from "vitest";

import {
  hubspotListContacts,
  hubspotGetContact,
  hubspotSearchContacts,
} from "./hubspot-tool.js";

// L2 resilience + L5 stamp contract for the HubSpot connector.
describe("hubspot connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, json: async () => ({}),
    })));
    await expect(hubspotListContacts({ access_token: "k" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(hubspotListContacts({ access_token: "k" })).rejects.toThrow(/timed out/i);
  });

  it("returns a not-connected card when no token is supplied", async () => {
    vi.stubEnv("HUBSPOT_ACCESS_TOKEN", "");
    const result = await hubspotListContacts({}) as Record<string, unknown>;
    expect(result.not_connected).toBe(true);
    vi.unstubAllEnvs();
  });

  it("validates required params before calling the API", async () => {
    const result = await hubspotGetContact({ access_token: "k" }) as Record<string, unknown>;
    expect(result.error).toMatch(/contact_id is required/i);
  });
});

describe("hubspot source stamping (L5)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("stamps source and next steps on a contact listing", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, json: async () => ({ results: [{ id: "1" }] }),
    })));
    const result = await hubspotListContacts({ access_token: "k" }) as Record<string, any>;
    expect(result.unclick_meta.source).toBe("HubSpot CRM API v3");
    expect(result.unclick_meta.next_steps.length).toBeGreaterThan(0);
    expect((result.results as unknown[]).length).toBe(1);
  });

  it("sends a search query as a POST body", async () => {
    const fetchMock = vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ results: [] }) }));
    vi.stubGlobal("fetch", fetchMock);
    await hubspotSearchContacts({ access_token: "k", query: "ada@example.com" });
    const [, init] = fetchMock.mock.calls[0] as unknown as [string, { method: string; body: string }];
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body).query).toBe("ada@example.com");
  });
});
