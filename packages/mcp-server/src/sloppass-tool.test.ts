import { afterEach, describe, expect, it, vi } from "vitest";
import { ADDITIONAL_HANDLERS, ADDITIONAL_TOOLS } from "./tool-wiring.js";
import { sloppassRun } from "./sloppass-tool.js";

const ORIGINAL_API_KEY = process.env.UNCLICK_API_KEY;
const ORIGINAL_API_URL = process.env.UNCLICK_API_URL;
const ORIGINAL_FETCH = globalThis.fetch;

afterEach(() => {
  process.env.UNCLICK_API_KEY = ORIGINAL_API_KEY;
  process.env.UNCLICK_API_URL = ORIGINAL_API_URL;
  globalThis.fetch = ORIGINAL_FETCH;
  vi.restoreAllMocks();
});

describe("sloppass-tool", () => {
  it("registers sloppass_run", () => {
    expect(ADDITIONAL_TOOLS.map((tool) => tool.name)).toContain("sloppass_run");
    expect(ADDITIONAL_HANDLERS).toHaveProperty("sloppass_run");
  });

  it("requires a target and source", async () => {
    await expect(sloppassRun({})).resolves.toMatchObject({ error: "target is required" });
    await expect(sloppassRun({ target: { kind: "files", label: "empty" } })).resolves.toMatchObject({
      error: "files or diff is required",
    });
    await expect(
      sloppassRun({ target: { kind: "files", label: "blank" }, files: [{ path: "src/a.ts", content: "" }] }),
    ).resolves.toMatchObject({
      error: "files or diff is required",
    });
  });

  it("rejects empty requested check lists before calling the API", async () => {
    process.env.UNCLICK_API_KEY = "uc_test";
    const fetchMock = vi.fn();
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    await expect(
      sloppassRun({
        target: { kind: "files", label: "bad checks" },
        files: [{ path: "src/a.ts", content: "export const ok = true;" }],
        checks: [],
      }),
    ).resolves.toMatchObject({
      error: "checks must contain at least one SlopPass category when provided",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("posts caller-provided diff text to the SlopPass API", async () => {
    process.env.UNCLICK_API_KEY = "uc_test";
    process.env.UNCLICK_API_URL = "https://example.test";
    const fetchMock = vi.fn(async () =>
      new Response(JSON.stringify({ run_id: "sloppass_123", status: "complete", verdict: "fail" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const result = await sloppassRun({
      target: { kind: "diff", label: "PR #1" },
      diff: "diff --git a/src/a.ts b/src/a.ts\n+++ b/src/a.ts\n@@ -1 +1 @@\n+eval(input);",
      target_sha: "abc123",
    });

    expect(result).toMatchObject({ run_id: "sloppass_123", verdict: "fail" });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://example.test/api/sloppass?action=run",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({ Authorization: "Bearer uc_test" }),
      }),
    );
  });

  it("fetches a GitHub PR diff target before calling the SlopPass API", async () => {
    process.env.UNCLICK_API_KEY = "uc_test";
    process.env.UNCLICK_API_URL = "https://example.test";
    const fetchMock = vi.fn(async (input: Parameters<typeof fetch>[0], init?: Parameters<typeof fetch>[1]) => {
      const url = String(input);
      if (url === "https://github.com/malamutemayhem/unclick/pull/1200.diff") {
        expect(init?.headers).toMatchObject({ Accept: "text/plain" });
        return new Response(
          "diff --git a/src/a.ts b/src/a.ts\n+++ b/src/a.ts\n@@ -1 +1 @@\n+export const ok = true;",
          { status: 200, headers: { "Content-Type": "text/plain" } },
        );
      }
      if (url === "https://example.test/api/sloppass?action=run") {
        const body = JSON.parse(String(init?.body)) as {
          target: { kind?: string; repo?: string; number?: number; url?: string };
          diff?: string;
        };
        expect(body.target).toMatchObject({
          kind: "pr",
          repo: "malamutemayhem/unclick",
          number: 1200,
          url: "https://github.com/malamutemayhem/unclick/pull/1200",
        });
        expect(body.diff).toContain("diff --git");
        return new Response(JSON.stringify({ run_id: "sloppass_pr_1200", status: "complete", verdict: "pass" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      throw new Error(`unexpected fetch ${url}`);
    });
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const result = await sloppassRun({
      target: { kind: "pr", label: "PR #1200", repo: "malamutemayhem/unclick", number: 1200 },
      target_sha: "abc123",
    });

    expect(result).toMatchObject({ run_id: "sloppass_pr_1200", verdict: "pass" });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("accepts a GitHub PR URL target", async () => {
    process.env.UNCLICK_API_KEY = "uc_test";
    process.env.UNCLICK_API_URL = "https://example.test";
    const fetchMock = vi.fn(async (input: Parameters<typeof fetch>[0], init?: Parameters<typeof fetch>[1]) => {
      const url = String(input);
      if (url === "https://github.com/malamutemayhem/unclick/pull/1200.diff") {
        return new Response(
          "diff --git a/src/url.ts b/src/url.ts\n+++ b/src/url.ts\n@@ -1 +1 @@\n+export const urlTarget = true;",
          { status: 200, headers: { "Content-Type": "text/plain" } },
        );
      }
      if (url === "https://example.test/api/sloppass?action=run") {
        const body = JSON.parse(String(init?.body)) as {
          target: { repo?: string; number?: number; ref?: string };
        };
        expect(body.target).toMatchObject({
          repo: "malamutemayhem/unclick",
          number: 1200,
          ref: "https://github.com/malamutemayhem/unclick/pull/1200",
        });
        return new Response(JSON.stringify({ run_id: "sloppass_url_1200", status: "complete", verdict: "pass" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      throw new Error(`unexpected fetch ${url}`);
    });
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const result = await sloppassRun({
      target: { kind: "pr", label: "PR URL", url: "https://github.com/malamutemayhem/unclick/pull/1200" },
    });

    expect(result).toMatchObject({ run_id: "sloppass_url_1200", verdict: "pass" });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("rejects unsafe or incomplete PR targets before fetching", async () => {
    process.env.UNCLICK_API_KEY = "uc_test";
    const fetchMock = vi.fn();
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    await expect(sloppassRun({ target: { kind: "pr", label: "missing repo" } })).resolves.toMatchObject({
      error: "target.kind=pr requires target.repo plus target.number, or target.url/pr_url for a GitHub PR",
    });
    await expect(
      sloppassRun({ target: { kind: "pr", label: "bad url", url: "https://example.test/owner/repo/pull/1" } }),
    ).resolves.toMatchObject({
      error: "target.url/pr_url must be a GitHub pull request URL",
    });
    await expect(
      sloppassRun({ target: { kind: "pr", label: "bad number", repo: "malamutemayhem/unclick", number: 0 } }),
    ).resolves.toMatchObject({
      error: "target.number must be a positive integer",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns GitHub diff fetch errors before calling the SlopPass API", async () => {
    process.env.UNCLICK_API_KEY = "uc_test";
    process.env.UNCLICK_API_URL = "https://example.test";
    const fetchMock = vi.fn(async () => new Response("missing", { status: 404 }));
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    await expect(
      sloppassRun({
        target: { kind: "pr", label: "missing", repo: "malamutemayhem/unclick", number: 999999 },
      }),
    ).resolves.toMatchObject({
      error: "GitHub PR diff fetch failed (HTTP 404)",
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("returns API errors without losing response details", async () => {
    process.env.UNCLICK_API_KEY = "uc_test";
    process.env.UNCLICK_API_URL = "https://example.test";
    globalThis.fetch = vi.fn(async () =>
      new Response(JSON.stringify({ error: "bad diff" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }),
    ) as unknown as typeof fetch;

    await expect(
      sloppassRun({
        target: { kind: "diff", label: "bad" },
        diff: "not a useful diff",
      }),
    ).resolves.toMatchObject({
      error: "sloppass API failed (HTTP 400)",
      body: { error: "bad diff" },
    });
  });
});
