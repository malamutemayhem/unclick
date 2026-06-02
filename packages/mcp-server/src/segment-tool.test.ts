import { afterEach, describe, expect, it, vi } from "vitest";
import { segment_list_sources, segment_track_event } from "./segment-tool.js";

// L2 resilience contract for the Segment connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("segment connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, json: async () => ({}), text: async () => "",
    })));
    await expect(segment_list_sources({ api_token: "t", workspace_id: "w" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(segment_list_sources({ api_token: "t", workspace_id: "w" })).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    await expect(segment_track_event({ write_key: "k" })).rejects.toThrow(/event is required/i);
  });

  it("maps source listings into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ({ data: { sources: [{ id: "src1" }] } }),
    })));
    const result = await segment_list_sources({ api_token: "t", workspace_id: "w" }) as Record<string, unknown>;
    expect(result.count).toBe(1);
    expect((result.sources as unknown[]).length).toBe(1);
  });
});
