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

  it("requires a token before closing a pull request", async () => {
    const result = await githubAction("close_pull_request", { owner: "o", repo: "r", pull_number: 5 }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/access_token is required/i);
  });

  it("validates pull_number before closing a pull request", async () => {
    const result = await githubAction("close_pull_request", { access_token: "t", owner: "o", repo: "r" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/pull_number/i);
  });

  it("closes a pull request via PATCH state=closed", async () => {
    const fetchMock = vi.fn(async () => ({
      ok: true, status: 200, headers: { get: (): string | null => null },
      text: async () => JSON.stringify({ number: 5, state: "closed" }),
    }));
    vi.stubGlobal("fetch", fetchMock);
    const result = await githubAction("close_pull_request", { access_token: "t", owner: "o", repo: "r", pull_number: 5 }) as Record<string, unknown>;
    expect(result.state).toBe("closed");
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toContain("/repos/o/r/pulls/5");
    expect(init.method).toBe("PATCH");
    expect(JSON.parse(String(init.body))).toEqual({ state: "closed" });
  });
});
