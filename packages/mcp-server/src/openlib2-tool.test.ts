import { afterEach, describe, expect, it, vi } from "vitest";
import { gutenbergSearch, gutenbergBook } from "./openlib2-tool.js";

describe("openlib2 connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await gutenbergSearch({ query: "pride" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("validates query for search", async () => {
    const r = await gutenbergSearch({}) as Record<string, unknown>;
    expect(r.error).toMatch(/query is required/i);
  });

  it("validates id for book", async () => {
    const r = await gutenbergBook({}) as Record<string, unknown>;
    expect(r.error).toMatch(/id is required/i);
  });

  it("returns books with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ count: 1, results: [{ id: 1342, title: "Pride and Prejudice" }] }),
    })));
    const r = await gutenbergSearch({ query: "pride" }) as Record<string, unknown>;
    expect(r.count).toBe(1);
    expect(r.unclick_meta).toBeDefined();
  });
});
