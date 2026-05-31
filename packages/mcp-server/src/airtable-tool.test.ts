import { afterEach, describe, expect, it, vi } from "vitest";
import { airtableAction } from "./airtable-tool.js";

// L2 resilience contract for the Airtable connector: request timeout, clean
// 429 handling, input validation, and stable response mapping.
describe("airtable connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, text: async () => "rate limited",
    })));
    const result = await airtableAction("list_bases", { access_token: "t" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
    expect(result.status).toBe(429);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await airtableAction("list_bases", { access_token: "t" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await airtableAction("list_records", { access_token: "t" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/base_id/i);
  });

  it("passes through successful base listings", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      text: async () => JSON.stringify({ bases: [{ id: "app1", name: "Base" }] }),
    })));
    const result = await airtableAction("list_bases", { access_token: "t" }) as Record<string, unknown>;
    expect((result.bases as unknown[]).length).toBe(1);
  });
});
