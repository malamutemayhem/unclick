import { afterEach, describe, expect, it, vi } from "vitest";

import { contentfulListEntries, contentfulGetEntry } from "./contentful-tool.js";

describe("contentful connector resilience (L2 / L3)", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, json: async () => ({}) })));
    await expect(contentfulListEntries({ access_token: "k", space_id: "s" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("x"); e.name = "AbortError"; throw e; }));
    await expect(contentfulListEntries({ access_token: "k", space_id: "s" })).rejects.toThrow(/timed out/i);
  });

  it("returns a not-connected card when no token is supplied", async () => {
    vi.stubEnv("CONTENTFUL_ACCESS_TOKEN", "");
    const result = await contentfulListEntries({ space_id: "s" }) as Record<string, unknown>;
    expect(result.not_connected).toBe(true);
  });

  it("errors clearly when space_id is missing", async () => {
    vi.stubEnv("CONTENTFUL_SPACE_ID", "");
    const result = await contentfulListEntries({ access_token: "k" }) as Record<string, unknown>;
    expect(result.error).toMatch(/space_id is required/i);
  });

  it("validates entry_id and surfaces a space_id filled from memory", async () => {
    const missing = await contentfulGetEntry({ access_token: "k", space_id: "s" }) as Record<string, unknown>;
    expect(missing.error).toMatch(/entry_id is required/i);

    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ items: [] }) })));
    const result = await contentfulListEntries({
      access_token: "k", space_id: "s", __unclick_memory_defaults: ["memory.space_id"],
    }) as Record<string, any>;
    expect(result.unclick_meta.source).toBe("Contentful Content Delivery API");
    expect(result.unclick_meta.defaults_used).toContain("memory.space_id");
  });
});
