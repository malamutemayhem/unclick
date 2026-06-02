import { afterEach, describe, expect, it, vi } from "vitest";
import { renderListServices, renderGetService } from "./render-tool.js";

// L2 resilience contract for the Render connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("render connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, text: async () => "",
    })));
    const result = await renderListServices({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
    expect(result.status).toBe(429);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await renderListServices({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await renderGetService({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/service_id/i);
  });

  it("passes through successful service listings", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      text: async () => JSON.stringify([{ service: { id: "s1", name: "web" } }]),
    })));
    const result = await renderListServices({ api_key: "k" }) as Record<string, unknown>;
    // List results are stamped with provenance, so the array is nested under `data`.
    expect(Array.isArray(result.data)).toBe(true);
    expect((result.data as unknown[]).length).toBe(1);
    expect((result.unclick_meta as Record<string, unknown>).source).toBe("Render");
  });
});
