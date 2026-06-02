import { afterEach, describe, expect, it, vi } from "vitest";
import { kling_get_task, kling_generate_video } from "./kling-tool.js";

// L2 resilience contract for the Kling AI connector: request timeout (longer for
// inference), clean 429 handling, input validation, and stable mapping.
describe("kling connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, json: async () => ({}),
    })));
    await expect(kling_get_task({ api_key: "k", task_id: "t1" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(kling_get_task({ api_key: "k", task_id: "t1" })).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    await expect(kling_generate_video({ api_key: "k" })).rejects.toThrow(/prompt is required/i);
  });

  it("maps task status into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ({ data: { task_status: "succeed", task_result: { videos: [{ url: "https://v.mp4" }] } } }),
    })));
    const result = await kling_get_task({ api_key: "k", task_id: "t1" }) as Record<string, unknown>;
    expect(result.status).toBe("succeed");
    expect(result.video_url).toBe("https://v.mp4");
  });
});
