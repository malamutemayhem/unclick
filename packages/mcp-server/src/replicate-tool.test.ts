import { afterEach, describe, expect, it, vi } from "vitest";

import { replicateGetPrediction } from "./replicate-tool.js";

describe("replicate connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: (h: string) => (h === "Retry-After" ? "30" : null) }, json: async () => ({}) })));
    await expect(replicateGetPrediction({ api_token: "t", prediction_id: "p1" })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 30s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    await expect(replicateGetPrediction({ api_token: "t", prediction_id: "p1" })).rejects.toThrow(/timed out/i);
  });

  it("validates input before any network call", async () => {
    await expect(replicateGetPrediction({ api_token: "t" })).rejects.toThrow(/prediction_id is required/i);
  });

  it("maps a prediction", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ id: "p1", status: "succeeded", urls: { get: "u", cancel: "c" }, input: {}, output: "result", created_at: "2026-01-01" }) })));
    const r = await replicateGetPrediction({ api_token: "t", prediction_id: "p1" }) as Record<string, any>;
    expect(r.id).toBe("p1");
    expect(r.status).toBe("succeeded");
  });
});
