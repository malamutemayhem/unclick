import { afterEach, describe, expect, it, vi } from "vitest";

import { zendeskSearch, zendeskListTickets, zendeskGetTicket } from "./zendesk-tool.js";

const CREDS = { subdomain: "acme", email: "agent@acme.com", api_token: "t" };

describe("zendesk connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, json: async () => ({}) })));
    await expect(zendeskSearch({ ...CREDS, query: "status:open" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("x"); e.name = "AbortError"; throw e; }));
    await expect(zendeskSearch({ ...CREDS, query: "status:open" })).rejects.toThrow(/timed out/i);
  });

  it("returns a not-connected card when credentials are missing", async () => {
    vi.stubEnv("ZENDESK_SUBDOMAIN", ""); vi.stubEnv("ZENDESK_EMAIL", ""); vi.stubEnv("ZENDESK_API_TOKEN", "");
    const result = await zendeskSearch({ query: "x" }) as Record<string, unknown>;
    expect(result.not_connected).toBe(true);
  });

  it("validates required params before calling the API", async () => {
    const result = await zendeskGetTicket({ ...CREDS }) as Record<string, unknown>;
    expect(result.error).toMatch(/ticket_id is required/i);
  });

  it("stamps source on a ticket listing", async () => {
    vi.stubEnv("UNCLICK_API_KEY", ""); vi.stubEnv("UNCLICK_API_KEY_HASH", "");
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ tickets: [{ id: 1, status: "open" }] }) })));
    const result = await zendeskListTickets({ ...CREDS }) as Record<string, any>;
    expect(result.unclick_meta.source).toBe("Zendesk API v2");
  });
});
