import { afterEach, describe, expect, it, vi } from "vitest";
import { scanUrlUrlscan } from "./urlscan-tool.js";

// L2 resilience contract for the URLScan connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("urlscan connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, text: async () => "", json: async () => ({}),
    })));
    const result = await scanUrlUrlscan({ api_key: "k", url: "http://example.com" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await scanUrlUrlscan({ api_key: "k", url: "http://example.com" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await scanUrlUrlscan({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/url is required/i);
  });

  it("maps a queued scan into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ({ uuid: "u1", api: "https://urlscan.io/api/v1/result/u1/", result: "https://urlscan.io/result/u1/", visibility: "public" }),
    })));
    const result = await scanUrlUrlscan({ api_key: "k", url: "http://example.com" }) as Record<string, unknown>;
    expect(result.uuid).toBe("u1");
  });
});
