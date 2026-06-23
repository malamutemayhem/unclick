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

  it("creates a branch from a base branch", async () => {
    const fetchMock = vi.fn(async (input: string | URL, init?: RequestInit) => {
      const url = String(input);
      if (url === "https://api.github.com/repos/o/r/git/ref/heads/main") {
        expect(init?.method).toBe("GET");
        return new Response(JSON.stringify({ object: { sha: "base-sha" } }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url === "https://api.github.com/repos/o/r/git/refs") {
        expect(init?.method).toBe("POST");
        expect(JSON.parse(String(init?.body))).toEqual({
          ref: "refs/heads/codex/test",
          sha: "base-sha",
        });
        return new Response(JSON.stringify({ ref: "refs/heads/codex/test", object: { sha: "base-sha" } }), {
          status: 201,
          headers: { "Content-Type": "application/json" },
        });
      }
      throw new Error(`Unexpected fetch: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await githubAction("create_branch", {
      access_token: "t",
      owner: "o",
      repo: "r",
      base_branch: "main",
      new_branch: "codex/test",
    }) as Record<string, unknown>;

    expect(result.ref).toBe("refs/heads/codex/test");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("pushes multiple file changes as one commit through the Git data API", async () => {
    const fetchMock = vi.fn(async (input: string | URL, init?: RequestInit) => {
      const url = String(input);
      if (url === "https://api.github.com/repos/o/r/git/ref/heads/codex%2Ftest") {
        expect(init?.method).toBe("GET");
        return new Response(JSON.stringify({ object: { sha: "head-sha" } }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url === "https://api.github.com/repos/o/r/git/commits/head-sha") {
        expect(init?.method).toBe("GET");
        return new Response(JSON.stringify({ tree: { sha: "base-tree-sha" } }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url === "https://api.github.com/repos/o/r/git/blobs") {
        expect(init?.method).toBe("POST");
        const body = JSON.parse(String(init?.body)) as Record<string, unknown>;
        return new Response(JSON.stringify({ sha: body.content === "one" ? "blob-one" : "blob-two" }), {
          status: 201,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url === "https://api.github.com/repos/o/r/git/trees") {
        expect(init?.method).toBe("POST");
        expect(JSON.parse(String(init?.body))).toEqual({
          base_tree: "base-tree-sha",
          tree: [
            { path: "a.txt", mode: "100644", type: "blob", sha: "blob-one" },
            { path: "nested/b.txt", mode: "100644", type: "blob", sha: "blob-two" },
            { path: "old.txt", mode: "100644", type: "blob", sha: null },
          ],
        });
        return new Response(JSON.stringify({ sha: "new-tree-sha" }), {
          status: 201,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url === "https://api.github.com/repos/o/r/git/commits") {
        expect(init?.method).toBe("POST");
        expect(JSON.parse(String(init?.body))).toEqual({
          message: "test commit",
          tree: "new-tree-sha",
          parents: ["head-sha"],
        });
        return new Response(JSON.stringify({ sha: "new-commit-sha" }), {
          status: 201,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url === "https://api.github.com/repos/o/r/git/refs/heads/codex%2Ftest") {
        expect(init?.method).toBe("PATCH");
        expect(JSON.parse(String(init?.body))).toEqual({
          sha: "new-commit-sha",
          force: false,
        });
        return new Response(JSON.stringify({ object: { sha: "new-commit-sha" } }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      throw new Error(`Unexpected fetch: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await githubAction("push_files", {
      access_token: "t",
      owner: "o",
      repo: "r",
      branch: "codex/test",
      message: "test commit",
      files: [
        { path: "/a.txt", content: "one" },
        { path: "nested/b.txt", content: "two" },
      ],
      deletions: ["old.txt"],
    }) as Record<string, unknown>;

    expect(result.commit_sha).toBe("new-commit-sha");
    expect(result.files).toBe(2);
    expect(result.deletions).toBe(1);
    expect(fetchMock).toHaveBeenCalledTimes(7);
  });

  it("opens a pull request and reads check runs", async () => {
    const fetchMock = vi.fn(async (input: string | URL, init?: RequestInit) => {
      const url = String(input);
      if (url === "https://api.github.com/repos/o/r/pulls") {
        expect(init?.method).toBe("POST");
        expect(JSON.parse(String(init?.body))).toMatchObject({
          title: "Ship it",
          head: "codex/test",
          base: "main",
          draft: true,
        });
        return new Response(JSON.stringify({ number: 12, html_url: "https://github.com/o/r/pull/12" }), {
          status: 201,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url === "https://api.github.com/repos/o/r/commits/codex%2Ftest/check-runs?per_page=30") {
        expect(init?.method).toBe("GET");
        return new Response(JSON.stringify({ total_count: 1, check_runs: [{ name: "build" }] }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      throw new Error(`Unexpected fetch: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    const pr = await githubAction("create_pull_request", {
      access_token: "t",
      owner: "o",
      repo: "r",
      title: "Ship it",
      branch: "codex/test",
      base_branch: "main",
      draft: true,
    }) as Record<string, unknown>;
    const checks = await githubAction("list_checks", {
      access_token: "t",
      owner: "o",
      repo: "r",
      ref: "codex/test",
    }) as Record<string, unknown>;

    expect(pr.number).toBe(12);
    expect(checks.total_count).toBe(1);
    expect(fetchMock).toHaveBeenCalledTimes(2);
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
