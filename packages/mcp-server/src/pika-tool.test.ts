import { afterEach, describe, expect, it, vi } from "vitest";
import { pika_get_generation, pika_generate_video } from "./pika-tool.js";

// L2 resilience contract for the Pika connector: request timeout (longer for
// inference), clean 429 handling, input validation, and stable mapping.
describe("pika connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: (): string | null => null }, json: async () => ({}),
    })));
    await expect(pika_get_generation({ api_key: "k", generation_id: "g1" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(pika_get_generation({ api_key: "k", generation_id: "g1" })).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    await expect(pika_generate_video({ api_key: "k" })).rejects.toThrow(/prompt is required/i);
  });

  it("maps generation status into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: (): string | null => null },
      json: async () => ({ status: "finished", video_url: "https://v.mp4" }),
    })));
    const result = await pika_get_generation({ api_key: "k", generation_id: "g1" }) as Record<string, unknown>;
    expect(result.status).toBe("finished");
    expect(result.video_url).toBe("https://v.mp4");
  });
});
