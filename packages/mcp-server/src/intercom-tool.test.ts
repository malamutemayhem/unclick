import { afterEach, describe, expect, it, vi } from "vitest";

import { intercomListConversations, intercomGetConversation, intercomSearchContacts } from "./intercom-tool.js";

describe("intercom connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, json: async () => ({}) })));
    await expect(intercomListConversations({ access_token: "k" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("x"); e.name = "AbortError"; throw e; }));
    await expect(intercomListConversations({ access_token: "k" })).rejects.toThrow(/timed out/i);
  });

  it("returns a not-connected card when no token is supplied", async () => {
    vi.stubEnv("INTERCOM_ACCESS_TOKEN", "");
    const result = await intercomListConversations({}) as Record<string, unknown>;
    expect(result.not_connected).toBe(true);
  });

  it("validates required params before calling the API", async () => {
    const result = await intercomGetConversation({ access_token: "k" }) as Record<string, unknown>;
    expect(result.error).toMatch(/conversation_id is required/i);
  });

  it("sends a contact search as a POST body and stamps the result", async () => {
    const fetchMock = vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ data: [] }) }));
    vi.stubGlobal("fetch", fetchMock);
    const result = await intercomSearchContacts({ access_token: "k", query: "ada@example.com" }) as Record<string, any>;
    const [, init] = fetchMock.mock.calls[0] as unknown as [string, { method: string; body: string }];
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body).query.value).toBe("ada@example.com");
    expect(result.unclick_meta.source).toBe("Intercom API");
  });
});
