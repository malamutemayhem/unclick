import { afterEach, describe, expect, it, vi } from "vitest";
import { circleci_list_pipelines, circleci_get_pipeline } from "./circleci-tool.js";

// L2 resilience contract for the CircleCI connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("circleci connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, json: async () => ({}),
    })));
    await expect(circleci_list_pipelines({ api_key: "k", project_slug: "gh/o/r" }))
      .rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(circleci_list_pipelines({ api_key: "k", project_slug: "gh/o/r" }))
      .rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    await expect(circleci_get_pipeline({ api_key: "k" })).rejects.toThrow(/pipeline_id is required/i);
  });

  it("maps pipeline listings into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ({ items: [{ id: "p1" }], next_page_token: null }),
    })));
    const result = await circleci_list_pipelines({ api_key: "k", project_slug: "gh/o/r" }) as Record<string, unknown>;
    expect(result.count).toBe(1);
    expect((result.pipelines as unknown[]).length).toBe(1);
  });
});
