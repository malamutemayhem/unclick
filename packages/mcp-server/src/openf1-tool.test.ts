import { afterEach, describe, expect, it, vi } from "vitest";
import { f1Sessions, f1Positions } from "./openf1-tool.js";

// L2 resilience contract for the OpenF1 connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("openf1 connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, text: async () => "", json: async () => ([]),
    })));
    await expect(f1Sessions({ year: 2024 })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(f1Sessions({ year: 2024 })).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    await expect(f1Positions({})).rejects.toThrow(/session_key is required/i);
  });

  it("maps session listings into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ([{ session_key: 1, session_name: "Race", year: 2024, country_name: "Bahrain" }]),
    })));
    const result = await f1Sessions({ year: 2024 }) as Record<string, unknown>;
    expect(result.count).toBe(1);
    expect((result.sessions as Array<Record<string, unknown>>)[0].session_key).toBe(1);
  });
});
