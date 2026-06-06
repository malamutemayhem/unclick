import { afterEach, describe, expect, it, vi } from "vitest";
import { stabilityListEngines, stabilityTextToImage } from "./stability-tool.js";

// L2 resilience contract for the Stability AI connector: request timeout (longer
// for inference), clean 429 handling, input validation, and stable mapping.
describe("stability connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, json: async () => ({}),
    })));
    await expect(stabilityListEngines({ api_key: "k" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(stabilityListEngines({ api_key: "k" })).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    await expect(stabilityTextToImage({ api_key: "k" })).rejects.toThrow(/prompt is required/i);
  });

  it("maps engine listings into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ([{ id: "sdxl", name: "SDXL", description: "d", type: "PICTURE", ready: true }]),
    })));
    const result = await stabilityListEngines({ api_key: "k" }) as Record<string, unknown>;
    expect(result.count).toBe(1);
    expect((result.engines as Array<Record<string, unknown>>)[0].id).toBe("sdxl");
  });
});
