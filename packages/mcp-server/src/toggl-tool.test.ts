import { afterEach, describe, expect, it, vi } from "vitest";
import { getTogglTimeEntries, createTimeEntryToggl } from "./toggl-tool.js";

// L2 resilience contract for the Toggl connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("toggl connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, text: async () => "", json: async () => ([]),
    })));
    const result = await getTogglTimeEntries({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await getTogglTimeEntries({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await createTimeEntryToggl({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/workspace_id/i);
  });

  it("maps time-entry listings into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ([{ id: 1, description: "work", duration: 3600 }]),
    })));
    const result = await getTogglTimeEntries({ api_key: "k" }) as Record<string, unknown>;
    expect(result.count).toBe(1);
    expect((result.entries as Array<Record<string, unknown>>)[0].id).toBe(1);
  });
});
