import { afterEach, describe, expect, it, vi } from "vitest";
import { picsumList, picsumGet, picsumRandomUrl } from "./picsum-tool.js";

describe("picsum connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await picsumList({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await picsumGet({ id: "1" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates required id for picsumGet", async () => {
    const r = await picsumGet({}) as Record<string, unknown>;
    expect(r.error).toMatch(/id is required/i);
  });

  it("picsumRandomUrl returns a URL without fetch", async () => {
    const r = await picsumRandomUrl({ width: 400, height: 300 }) as Record<string, unknown>;
    expect(r.url).toContain("picsum.photos/400/300");
    expect(r.unclick_meta).toBeDefined();
  });

  it("picsumList returns photos", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ([{ id: "0", author: "Test", width: 5000, height: 3333 }]),
    })));
    const r = await picsumList({}) as Record<string, unknown>;
    expect(r.unclick_meta).toBeDefined();
  });
});
