import { afterEach, describe, expect, it, vi } from "vitest";
import { githubAction } from "./github-tool.js";

// L2 resilience contract for the GitHub connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("github connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: (): string | null => null }, text: async () => "",
    })));
    const result = await githubAction("get_repo", { access_token: "t", owner: "o", repo: "r" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
    expect(result.status).toBe(429);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await githubAction("get_repo", { access_token: "t", owner: "o", repo: "r" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await githubAction("get_repo", { access_token: "t" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/owner and repo/i);
  });

  it("passes through successful repo lookups", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: (): string | null => null },
      text: async () => JSON.stringify({ id: 1, full_name: "o/r" }),
    })));
    const result = await githubAction("get_repo", { access_token: "t", owner: "o", repo: "r" }) as Record<string, unknown>;
    expect(result.full_name).toBe("o/r");
  });
});
