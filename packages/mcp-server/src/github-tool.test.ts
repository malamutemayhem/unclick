import { afterEach, describe, expect, it, vi } from "vitest";
import { githubAction } from "./github-tool.js";

// L2 resilience contract for the GitHub connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("github connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.UNCLICK_API_KEY;
    delete process.env.UNCLICK_API_URL;
  });

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

  it("uses a saved UnClick GitHub login and stamps live proof on success", async () => {
    process.env.UNCLICK_API_KEY = "uc_test";
    process.env.UNCLICK_API_URL = "https://unclick.test";
    const fetchMock = vi.fn(async (input: string | URL, init?: RequestInit) => {
      const url = String(input);
      if (url === "https://unclick.test/api/credentials?platform=github") {
        expect((init?.headers as Record<string, string>).Authorization).toBe("Bearer uc_test");
        return new Response(JSON.stringify({ api_key: "stored-github-token" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url === "https://api.github.com/user") {
        expect((init?.headers as Record<string, string>).Authorization).toBe("Bearer stored-github-token");
        return new Response(JSON.stringify({ login: "creativelead" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url === "https://unclick.test/api/credentials") {
        expect(init?.method).toBe("PATCH");
        expect(JSON.parse(String(init?.body))).toEqual({ platform: "github" });
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      throw new Error(`Unexpected fetch: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await githubAction("get_user", {}) as Record<string, unknown>;

    expect(result.login).toBe("creativelead");
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it("does not stamp live proof for public unauthenticated user lookups", async () => {
    const fetchMock = vi.fn(async (input: string | URL, init?: RequestInit) => {
      expect(String(input)).toBe("https://api.github.com/users/octocat");
      expect((init?.headers as Record<string, string>).Authorization).toBeUndefined();
      return new Response(JSON.stringify({ login: "octocat" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await githubAction("get_user", { username: "octocat" }) as Record<string, unknown>;

    expect(result.login).toBe("octocat");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
