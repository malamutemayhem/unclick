import { afterEach, describe, expect, it, vi } from "vitest";

import { crewsGetRun, crewsListRuns, crewsStartRun } from "./crews-tool.js";
import type { ConversationalCard } from "./cards/card.js";

describe("crews connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  function stubApiKey() {
    vi.stubEnv("UNCLICK_API_KEY", "test-key-123");
  }

  function stubFetch(response: { ok: boolean; status: number; text: () => Promise<string> }) {
    vi.stubGlobal("fetch", vi.fn(async () => response));
  }

  function stubJsonFetch(ok: boolean, status: number, json: unknown) {
    stubFetch({ ok, status, text: async () => JSON.stringify(json) });
  }

  // ── missing API key ────────────────────────────────────────────────────────

  it("returns a not-connected card when UNCLICK_API_KEY is missing", async () => {
    vi.stubEnv("UNCLICK_API_KEY", "");
    const r = await crewsStartRun({ crew_id: "abc", task_prompt: "test" }) as ConversationalCard;
    expect(r.headline).toMatch(/not configured/i);
  });

  // ── crewsStartRun validation ──────────────────────────────────────────────

  it("returns a card error when crew_id is missing", async () => {
    stubApiKey();
    const r = await crewsStartRun({}) as ConversationalCard;
    expect(r.headline).toMatch(/crew_id/);
    expect(r.keyFacts).toContain("missing: crew_id");
  });

  it("returns a card error when task_prompt is missing", async () => {
    stubApiKey();
    const r = await crewsStartRun({ crew_id: "abc" }) as ConversationalCard;
    expect(r.headline).toMatch(/task_prompt/);
    expect(r.keyFacts).toContain("missing: task_prompt");
  });

  it("surfaces an HTTP error from start_crew_run (no sampling)", async () => {
    stubApiKey();
    stubJsonFetch(false, 500, { error: "internal" });
    const r = await crewsStartRun({ crew_id: "abc", task_prompt: "test" }) as ConversationalCard;
    expect(r.headline).toMatch(/start_crew_run failed.*HTTP 500/);
  });

  it("returns the card from a successful start_crew_run response", async () => {
    stubApiKey();
    const card: ConversationalCard = {
      headline: "Run started",
      summary: "Council is deliberating.",
      keyFacts: ["run_id: run-xyz"],
      nextActions: ["Call get_run to check progress"],
    };
    stubJsonFetch(true, 200, { card });
    const r = await crewsStartRun({ crew_id: "abc", task_prompt: "test" }) as ConversationalCard;
    expect(r.headline).toBe("Run started");
    expect(r.keyFacts).toContain("run_id: run-xyz");
  });

  // ── crewsGetRun ───────────────────────────────────────────────────────────

  it("returns a card error when run_id is missing from get_run", async () => {
    stubApiKey();
    const r = await crewsGetRun({}) as ConversationalCard;
    expect(r.headline).toMatch(/run_id/);
    expect(r.keyFacts).toContain("missing: run_id");
  });

  it("surfaces an HTTP error from get_run", async () => {
    stubApiKey();
    stubJsonFetch(false, 404, { message: "not found" });
    const r = await crewsGetRun({ run_id: "run-123" }) as ConversationalCard;
    expect(r.headline).toMatch(/get_run failed.*HTTP 404/);
  });

  it("returns the card from a successful get_run response", async () => {
    stubApiKey();
    const card: ConversationalCard = {
      headline: "Run complete",
      summary: "Council reached consensus.",
      keyFacts: ["run_id: run-123", "status: complete"],
      nextActions: [],
    };
    stubJsonFetch(true, 200, { card });
    const r = await crewsGetRun({ run_id: "run-123" }) as ConversationalCard;
    expect(r.headline).toBe("Run complete");
  });

  // ── crewsListRuns ─────────────────────────────────────────────────────────

  it("surfaces an HTTP error from list_runs", async () => {
    stubApiKey();
    stubJsonFetch(false, 429, { error: "rate limited" });
    const r = await crewsListRuns({}) as ConversationalCard;
    expect(r.headline).toMatch(/list_runs failed.*HTTP 429/);
  });

  it("returns the card from a successful list_runs response", async () => {
    stubApiKey();
    const card: ConversationalCard = {
      headline: "Recent runs",
      summary: "3 runs found.",
      keyFacts: ["total: 3"],
      nextActions: ["Call get_run for details"],
    };
    stubJsonFetch(true, 200, { card });
    const r = await crewsListRuns({}) as ConversationalCard;
    expect(r.headline).toBe("Recent runs");
  });

  it("passes crew_id and limit as query params", async () => {
    stubApiKey();
    let capturedUrl = "";
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      capturedUrl = url;
      return {
        ok: true,
        status: 200,
        text: async () => JSON.stringify({
          card: { headline: "ok", summary: "ok", keyFacts: [], nextActions: [] },
        }),
      };
    }));
    await crewsListRuns({ crew_id: "crew-xyz", limit: 5 });
    expect(capturedUrl).toContain("crew_id=crew-xyz");
    expect(capturedUrl).toContain("limit=5");
  });

  // ── abort handling ────────────────────────────────────────────────────────

  it("surfaces fetch abort error", async () => {
    stubApiKey();
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(crewsGetRun({ run_id: "run-123" })).rejects.toThrow("aborted");
  });
});
