import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { uxpassRun, uxpassStatus } from "./uxpass-tool.js";

type ApiHandler = (url: string, init: { body?: unknown }) => Record<string, unknown>;

function installUxPassApi(handler: ApiHandler): Array<{ url: string; body: Record<string, unknown> }> {
  const calls: Array<{ url: string; body: Record<string, unknown> }> = [];
  vi.stubGlobal("fetch", vi.fn(async (input: unknown, init?: { body?: unknown }) => {
    const url = String(input);
    const body = typeof init?.body === "string"
      ? JSON.parse(init.body) as Record<string, unknown>
      : {};
    calls.push({ url, body });
    return new Response(JSON.stringify(handler(url, { body })), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }));
  return calls;
}

describe("uxpass-tool", () => {
  beforeEach(() => {
    vi.stubEnv("UNCLICK_API_KEY", "uc_test_key");
    vi.stubEnv("UNCLICK_API_URL", "https://unclick.world");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("adds an explicit warning receipt when browser visual evidence is missing", async () => {
    const calls = installUxPassApi(() => ({
      run_id: "uxpass-run-1",
      status: "complete",
      ux_score: 92,
      target_url: "https://unclick.world/",
      stats: { total: 25, pass: 18, fail: 0, na: 7, pass_rate: 1 },
      was_duplicate: false,
    }));

    const result = await uxpassRun({
      url: "https://unclick.world/",
      target_sha: "abc123",
    }) as Record<string, unknown>;

    const receipt = result.uxpass_receipt_v1 as Record<string, unknown>;
    expect(result.target_sha).toBe("abc123");
    expect(receipt).toMatchObject({
      kind: "uxpass_receipt_v1",
      status: "WARN",
      run_id: "uxpass-run-1",
      target_url: "https://unclick.world/",
      target_sha: "abc123",
      checked: { total: 25, pass: 18, fail: 0, na: 7, finding_count: null },
      visual_evidence: {
        browser_snapshot: "missing",
        screenshot_proof: "unknown",
        mobile_desktop_coverage: "unknown",
      },
    });
    expect(receipt.action_needed).toEqual(expect.arrayContaining([
      expect.stringMatching(/browser-backed visual snapshots/i),
      expect.stringMatching(/mobile and desktop evidence/i),
      expect.stringMatching(/screenshot proof/i),
    ]));
    expect(calls[0].body).toMatchObject({
      target_url: "https://unclick.world/",
      pack_slug: "uxpass-core",
    });
    expect(calls[0].body).not.toHaveProperty("target_sha");
  });

  it("retains target SHA and blocks when status exposes findings", async () => {
    installUxPassApi((url) => {
      if (url.includes("action=status")) {
        return {
          run_id: "uxpass-run-2",
          status: "complete",
          ux_score: 74,
          target_url: "https://unclick.world/admin",
          finding_count: 2,
          breakdown: {
            by_hat: {
              frontend: { pass: 4, fail: 0, na: 0 },
              "visual-designer": { pass: 2, fail: 2, na: 0 },
            },
          },
        };
      }
      return {
        run_id: "uxpass-run-2",
        status: "complete",
        ux_score: 74,
        target_url: "https://unclick.world/admin",
        stats: { total: 8, pass: 6, fail: 2, na: 0, pass_rate: 0.75 },
      };
    });

    await uxpassRun({
      url: "https://unclick.world/admin",
      target_sha: "head-sha",
    });
    const status = await uxpassStatus({ run_id: "uxpass-run-2" }) as Record<string, unknown>;
    const receipt = status.uxpass_receipt_v1 as Record<string, unknown>;

    expect(status.target_sha).toBe("head-sha");
    expect(receipt).toMatchObject({
      kind: "uxpass_receipt_v1",
      status: "BLOCKER",
      run_id: "uxpass-run-2",
      target_sha: "head-sha",
      checked: { total: 8, pass: 6, fail: 2, na: 0, finding_count: 2 },
    });
    expect(receipt.action_needed).toEqual(expect.arrayContaining([
      expect.stringMatching(/Fix failing UXPass findings/i),
    ]));
  });

  it("rejects blank target SHA before calling the API", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const result = await uxpassRun({
      url: "https://unclick.world/",
      target_sha: "   ",
    }) as { error?: string };

    expect(result.error).toMatch(/target_sha must be a non-empty string/);
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
