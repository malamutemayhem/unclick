import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { crewsStartRun, crewsSubmitRun, crewsListCrews, type GuidedCrewCard } from "./crews-tool.js";

// Crews agent_guided mode contract: without MCP sampling, start_crew_run must
// return a usable Council protocol (never a dead SAMPLING_NOT_SUPPORTED run),
// and submit_crew_run must persist the agent-generated output through
// finish_crew_run exactly like sampling mode does.

type FetchCall = { url: string; body: Record<string, unknown> };

function stubAdminFetch(responses: Array<{ status?: number; json: unknown }>): FetchCall[] {
  const calls: FetchCall[] = [];
  let index = 0;
  vi.stubGlobal("fetch", vi.fn(async (url: string, init?: RequestInit) => {
    calls.push({ url: String(url), body: init?.body ? JSON.parse(String(init.body)) : {} });
    const response = responses[Math.min(index, responses.length - 1)];
    index += 1;
    return {
      ok: (response.status ?? 200) < 400,
      status: response.status ?? 200,
      text: async () => JSON.stringify(response.json),
    };
  }));
  return calls;
}

const ADVISOR = { id: "agent-1", slug: "pragmatist", name: "Pragmatist", category: "advisor", seed_prompt: "You are the Pragmatist." };
const CHAIRMAN = { id: "agent-9", slug: "chairman", name: "Chairman", category: "meta", seed_prompt: null };

describe("crews agent_guided mode", () => {
  beforeEach(() => {
    vi.stubEnv("UNCLICK_API_KEY", "uc_test_key");
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("starts an agent_guided run and returns the Council protocol instead of a dead run", async () => {
    const calls = stubAdminFetch([
      {
        status: 202,
        json: {
          run_id: "run-1",
          was_duplicate: false,
          agents: [ADVISOR, CHAIRMAN],
          relevant_facts: ["Chris prefers receipts over assertions"],
        },
      },
    ]);

    const card = (await crewsStartRun(
      { crew_id: "11111111-1111-4111-8111-111111111111", task_prompt: "Decide the launch lead" },
      { supportsSampling: false },
    )) as GuidedCrewCard;

    expect(calls[0].body.execution_mode).toBe("agent_guided");
    expect(card.headline).toMatch(/you are the Council/i);
    expect(card.guided_run?.run_id).toBe("run-1");
    expect(card.guided_run?.advisors).toHaveLength(1);
    expect(card.guided_run?.advisors[0].system_prompt).toMatch(/Pragmatist/);
    expect(card.guided_run?.chairman?.name).toBe("Chairman");
    expect(card.guided_run?.memory_context).toContain("Chris prefers receipts over assertions");
    expect(card.nextActions.join(" ")).toMatch(/submit_crew_run/);
  });

  it("persists submitted Council output through finish_crew_run with honest token accounting", async () => {
    const calls = stubAdminFetch([
      { json: { card: { headline: "done", summary: "", keyFacts: [], nextActions: [] } } },
    ]);

    await crewsSubmitRun({
      run_id: "run-1",
      opinions: [{ agent_id: "agent-1", content: "Ship the proof story first." }],
      peer_reviews: [{ agent_id: "agent-1", content: "1. Opinion B - strongest evidence." }],
      synthesis: "FINAL ANSWER:\nLead with proof.\n\nWHAT DIDN'T MAKE THE CONSENSUS:\nNo significant dissents.",
      chairman_agent_id: "agent-9",
    });

    expect(calls[0].url).toMatch(/action=finish_crew_run/);
    const body = calls[0].body as {
      status: string;
      messages: Array<{ stage: string; role: string; tokens_in: number; tokens_out: number }>;
      result_artifact: { mode: string };
    };
    expect(body.status).toBe("complete");
    expect(body.result_artifact.mode).toBe("agent_guided");
    expect(body.messages.map((m) => m.stage)).toEqual(["opinion", "peer_review", "synthesis"]);
    expect(body.messages.every((m) => m.tokens_in === 0)).toBe(true);
    expect(body.messages.every((m) => m.tokens_out > 0)).toBe(true);
  });

  it("refuses to complete a run without opinions or synthesis", async () => {
    const calls = stubAdminFetch([{ json: {} }]);
    const card = await crewsSubmitRun({ run_id: "run-1", opinions: [], synthesis: "" });
    expect(card.headline).toMatch(/needs opinions and a synthesis/i);
    expect(calls).toHaveLength(0);
  });

  it("bakes the premise-challenge rule into every guided advisor prompt", async () => {
    stubAdminFetch([
      {
        status: 202,
        json: { run_id: "run-1", was_duplicate: false, agents: [ADVISOR, CHAIRMAN], relevant_facts: [] },
      },
    ]);
    const card = (await crewsStartRun(
      { crew_id: "11111111-1111-4111-8111-111111111111", task_prompt: "Pick a launch date" },
      { supportsSampling: false },
    )) as GuidedCrewCard;
    expect(card.guided_run?.advisors[0].system_prompt).toMatch(/strongest objection|clarifying question/i);
    expect(card.guided_run?.advisors[0].system_prompt).toMatch(/never agree just to agree/i);
    expect(card.guided_run?.stage_instructions.opinion).toMatch(/OPEN with the strongest objection/);
  });

  it("lists crews with their ids so an agent can convene the right bench", async () => {
    stubAdminFetch([
      {
        json: {
          data: [
            { id: "crew-1", name: "Business Council", template: "council", agent_ids: ["a", "b", "c", "d", "e"] },
            { id: "crew-2", name: "Decision Desk", template: "council", agent_ids: ["f", "g", "h", "i", "j"] },
          ],
        },
      },
    ]);
    const card = await crewsListCrews({});
    expect(card.headline).toMatch(/Found 2 crews/);
    expect(card.keyFacts.join("\n")).toMatch(/Business Council \(5 members, council\): crew-1/);
    expect(card.nextActions.join(" ")).toMatch(/start_crew_run/);
  });

  it("fails the run honestly when the agent aborts", async () => {
    const calls = stubAdminFetch([
      { json: { card: { headline: "failed", summary: "", keyFacts: [], nextActions: [] } } },
    ]);
    await crewsSubmitRun({ run_id: "run-1", abort_reason: "Crew has no advisors I can play" });
    const body = calls[0].body as { status: string; result_artifact: { error: string } };
    expect(body.status).toBe("failed");
    expect(body.result_artifact.error).toBe("AGENT_GUIDED_ABORTED");
  });
});
