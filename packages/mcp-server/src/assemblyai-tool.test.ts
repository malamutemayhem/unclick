import { afterEach, describe, expect, it, vi } from "vitest";
import { assemblyaiGetTranscript } from "./assemblyai-tool.js";

// L2 resilience contract for the AssemblyAI connector: request timeout (longer
// for AI inference), clean 429 handling, input validation, and stable mapping.
describe("assemblyai connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, json: async () => ({}),
    })));
    await expect(assemblyaiGetTranscript({ api_key: "k", transcript_id: "t1" }))
      .rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(assemblyaiGetTranscript({ api_key: "k", transcript_id: "t1" }))
      .rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    await expect(assemblyaiGetTranscript({ api_key: "k" })).rejects.toThrow(/transcript_id is required/i);
  });

  it("passes through successful transcript reads", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ({ id: "t1", status: "completed", text: "hello" }),
    })));
    const result = await assemblyaiGetTranscript({ api_key: "k", transcript_id: "t1" }) as Record<string, unknown>;
    expect(result.id).toBe("t1");
    expect(result.status).toBe("completed");
  });
});
