import { afterEach, describe, expect, it, vi } from "vitest";
import { runway_get_task, runway_generate_video } from "./runway-tool.js";

// L2 resilience contract for the Runway connector: request timeout (longer for
// inference), clean 429 handling, input validation, and stable mapping.
describe("runway connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, json: async () => ({}),
    })));
    await expect(runway_get_task({ api_key: "k", task_id: "t1" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(runway_get_task({ api_key: "k", task_id: "t1" })).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    await expect(runway_generate_video({ api_key: "k" })).rejects.toThrow(/prompt/i);
  });

  it("maps task status into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ({ status: "SUCCEEDED", progress: 1, output: ["https://video.mp4"] }),
    })));
    const result = await runway_get_task({ api_key: "k", task_id: "t1" }) as Record<string, unknown>;
    expect(result.status).toBe("SUCCEEDED");
    expect(result.video_url).toBe("https://video.mp4");
  });
});
