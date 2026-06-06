import { afterEach, describe, expect, it, vi } from "vitest";

import { guardianSearchArticles } from "./guardian-tool.js";

// Colocated Guardian connector tests. Functions catch and return { error }.

describe("guardian connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await guardianSearchArticles({ api_key: "k", query: "election" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit reached \(HTTP 429\)/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    const r = await guardianSearchArticles({ api_key: "k", query: "election" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns a structured error when query is missing", async () => {
    const r = await guardianSearchArticles({ api_key: "k" }) as Record<string, unknown>;
    expect(r.error).toMatch(/query is required/i);
  });

  it("maps search results", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ response: { total: 1, currentPage: 1, pages: 1, results: [{ id: "world/x", webTitle: "Headline" }] } }),
    })));
    const r = await guardianSearchArticles({ api_key: "k", query: "election" }) as Record<string, any>;
    expect(r.total).toBe(1);
    expect(r.articles[0].id).toBe("world/x");
  });
});
