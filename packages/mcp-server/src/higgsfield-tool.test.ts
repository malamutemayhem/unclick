import { afterEach, describe, expect, it, vi } from "vitest";
import { higgsfield_get_styles, higgsfield_generate_video } from "./higgsfield-tool.js";

// L2 resilience contract for the Higgsfield connector: request timeout (longer
// for inference), clean 429 handling, input validation, and stable mapping.
describe("higgsfield connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, json: async () => ({}),
    })));
    await expect(higgsfield_get_styles({ api_key: "k" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(higgsfield_get_styles({ api_key: "k" })).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    await expect(higgsfield_generate_video({ api_key: "k" })).rejects.toThrow(/prompt is required/i);
  });

  it("maps style listings into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ({ styles: [{ id: "cinematic" }, { id: "anime" }] }),
    })));
    const result = await higgsfield_get_styles({ api_key: "k" }) as Record<string, unknown>;
    expect(result.count).toBe(2);
    expect((result.styles as unknown[]).length).toBe(2);
  });
});
