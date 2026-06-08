import { afterEach, describe, expect, it, vi } from "vitest";
import { archiveSearch, archiveMetadata } from "./archiveorg-tool.js";

describe("archiveorg connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await archiveSearch({ query: "test" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await archiveMetadata({ id: "test" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates required query for archiveSearch", async () => {
    const r = await archiveSearch({}) as Record<string, unknown>;
    expect(r.error).toMatch(/query is required/i);
  });

  it("validates required identifier for archiveMetadata", async () => {
    const r = await archiveMetadata({}) as Record<string, unknown>;
    expect(r.error).toMatch(/identifier is required/i);
  });

  it("archiveSearch returns results with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ response: { numFound: 5, docs: [{ identifier: "test1", title: "Test Item" }] } }),
    })));
    const r = await archiveSearch({ query: "test" }) as Record<string, unknown>;
    expect(r.unclick_meta).toBeDefined();
  });
});
