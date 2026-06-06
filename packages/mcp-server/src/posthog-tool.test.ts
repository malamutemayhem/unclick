import { afterEach, describe, expect, it, vi } from "vitest";

import { posthogListFeatureFlags, posthogQuery } from "./posthog-tool.js";

// L2 resilience + L3 default + L5 stamp contract for the PostHog connector.
describe("posthog connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, json: async () => ({}) })));
    await expect(posthogListFeatureFlags({ api_key: "k", project_id: "1" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(posthogListFeatureFlags({ api_key: "k", project_id: "1" })).rejects.toThrow(/timed out/i);
  });

  it("returns a not-connected card when no api key is supplied", async () => {
    vi.stubEnv("POSTHOG_API_KEY", "");
    const result = await posthogListFeatureFlags({ project_id: "1" }) as Record<string, unknown>;
    expect(result.not_connected).toBe(true);
  });

  it("errors clearly when project_id is missing", async () => {
    vi.stubEnv("POSTHOG_PROJECT_ID", "");
    const result = await posthogListFeatureFlags({ api_key: "k" }) as Record<string, unknown>;
    expect(result.error).toMatch(/project_id is required/i);
  });

  it("validates the query before calling the API", async () => {
    const result = await posthogQuery({ api_key: "k", project_id: "1" }) as Record<string, unknown>;
    expect(result.error).toMatch(/query is required/i);
  });
});

describe("posthog stamping + memory default (L5 / L3)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("stamps source and surfaces a project_id filled from memory", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ results: [] }) })));
    const result = await posthogListFeatureFlags({
      api_key: "k",
      project_id: "42",
      __unclick_memory_defaults: ["memory.project_id"],
    }) as Record<string, any>;
    expect(result.unclick_meta.source).toBe("PostHog API");
    expect(result.unclick_meta.defaults_used).toContain("memory.project_id");
  });

  it("defaults the host to US cloud and sends a HogQL POST body", async () => {
    const fetchMock = vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ results: [] }) }));
    vi.stubGlobal("fetch", fetchMock);
    await posthogQuery({ api_key: "k", project_id: "1", query: "select count() from events" });
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, { method: string; body: string }];
    expect(String(url)).toMatch(/^https:\/\/us\.posthog\.com\/api\/projects\/1\/query\//);
    expect(JSON.parse(init.body).query.kind).toBe("HogQLQuery");
  });
});
