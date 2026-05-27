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
});
