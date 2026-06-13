import { afterEach, describe, expect, it, vi } from "vitest";
import { excuserRandom } from "./excuser-tool.js";

describe("excuser connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await excuserRandom({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await excuserRandom({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns an excuse with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ([{ id: 1, excuse: "My dog ate my homework.", category: "family" }]),
    })));
    const r = await excuserRandom({}) as Record<string, unknown>;
    const excuse = r.excuse as Record<string, unknown>;
    expect(excuse.excuse).toBe("My dog ate my homework.");
    expect(r.unclick_meta).toBeDefined();
  });
});
