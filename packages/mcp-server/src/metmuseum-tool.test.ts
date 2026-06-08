import { afterEach, describe, expect, it, vi } from "vitest";
import { metSearch, metObject, metDepartments } from "./metmuseum-tool.js";

describe("metmuseum connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await metSearch({ query: "sunflowers" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await metDepartments({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates required query for metSearch", async () => {
    const r = await metSearch({}) as Record<string, unknown>;
    expect(r.error).toMatch(/query is required/i);
  });

  it("validates required objectID for metObject", async () => {
    const r = await metObject({}) as Record<string, unknown>;
    expect(r.error).toMatch(/objectID is required/i);
  });

  it("metSearch returns results with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ total: 5, objectIDs: [436524, 437133, 438815] }),
    })));
    const r = await metSearch({ query: "sunflowers" }) as Record<string, unknown>;
    expect(r.total).toBe(5);
    expect(r.unclick_meta).toBeDefined();
  });
});
