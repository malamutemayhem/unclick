import { afterEach, describe, expect, it, vi } from "vitest";

import { crewsStartRun, type CrewSampler } from "../crews-tool.js";

const runId = "11111111-1111-4111-8111-111111111111";
const crewId = "22222222-2222-4222-8222-222222222222";

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("Crews MCP tool", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("keeps the explicit sampling gate when the client cannot sample", async () => {
    vi.stubEnv("UNCLICK_API_KEY", "test-key");
    const fetchMock = vi.fn(async (_input: unknown, _init?: RequestInit) => jsonResponse({
      error: "SAMPLING_NOT_SUPPORTED",
      run_id: runId,
      card: {
        headline: "Crews Council run needs MCP sampling",
        summary: "Sampling is unavailable.",
        keyFacts: [`run_id: ${runId}`, "status: failed (SAMPLING_NOT_SUPPORTED)"],
        nextActions: ["Use a sampling-capable client"],
        deepLink: `/admin/crews/runs/${runId}`,
      },
    }, 409));
    vi.stubGlobal("fetch", fetchMock);

    const card = await crewsStartRun({
      crew_id: crewId,
      task_prompt: "Should XPass use a Council pass?",
    }, { supportsSampling: false });

    expect(card.headline).toBe("Crews Council run needs MCP sampling");
    const firstInit = fetchMock.mock.calls[0]?.[1] as RequestInit | undefined;
    const body = JSON.parse(String(firstInit?.body ?? "{}"));
    expect(body).not.toHaveProperty("execution_mode");
  });

  it("runs advisor opinions, peer review, and synthesis through MCP sampling", async () => {
    vi.stubEnv("UNCLICK_API_KEY", "test-key");
    let finishBody: Record<string, unknown> | null = null;
    const fetchMock = vi.fn(async (input: unknown, init?: RequestInit) => {
      const url = new URL(String(input));
      const action = url.searchParams.get("action");
      if (action === "start_crew_run") {
        const body = JSON.parse(String(init?.body ?? "{}"));
        expect(body.execution_mode).toBe("mcp_sampling");
        return jsonResponse({
          run_id: runId,
          agents: [
            { id: "agent-a", slug: "pragmatist", name: "Pragmatist", category: "strategy", seed_prompt: "You are pragmatic." },
            { id: "agent-b", slug: "contrarian", name: "Contrarian", category: "strategy", seed_prompt: "You challenge weak proof." },
            { id: "agent-c", slug: "chairman", name: "Chairman", category: "meta", seed_prompt: "You synthesize." },
          ],
          relevant_facts: ["XPass products require proof-led verdicts."],
          card: {
            headline: "Crews Council run prepared",
            summary: "Ready.",
            keyFacts: [`run_id: ${runId}`],
            nextActions: ["Run council"],
          },
        }, 202);
      }
      if (action === "finish_crew_run") {
        finishBody = JSON.parse(String(init?.body ?? "{}"));
        return jsonResponse({
          run_id: runId,
          card: {
            headline: "Crews run complete",
            summary: "Persisted.",
            keyFacts: [`run_id: ${runId}`, "status: complete"],
            nextActions: ["Open the admin run page"],
          },
        });
      }
      return jsonResponse({ error: "unexpected action" }, 500);
    });
    vi.stubGlobal("fetch", fetchMock);

    const sampler: CrewSampler = vi.fn(async ({ system, user }) => ({
      content: `sampled:${system.slice(0, 16)}:${user.slice(0, 24)}`,
      tokensIn: 2,
      tokensOut: 3,
    }));

    const card = await crewsStartRun({
      crew_id: crewId,
      task_prompt: "Should Crews become the XPass council layer?",
    }, { supportsSampling: true, sample: sampler });

    expect(card.headline).toBe("Crews run complete");
    expect(sampler).toHaveBeenCalledTimes(5);
    expect(finishBody).toMatchObject({
      run_id: runId,
      status: "complete",
      tokens_used: 25,
    });
    const savedFinish = finishBody as unknown as Record<string, unknown>;
    const messages = savedFinish.messages as Array<{ stage: string; role: string }> | undefined;
    expect(messages?.map((message) => message.stage)).toEqual([
      "opinion",
      "opinion",
      "peer_review",
      "peer_review",
      "synthesis",
    ]);
    expect(messages?.at(-1)).toMatchObject({ role: "chairman" });
  });

  it("persists a failed run when sampling throws after preparation", async () => {
    vi.stubEnv("UNCLICK_API_KEY", "test-key");
    let finishBody: Record<string, unknown> | null = null;
    vi.stubGlobal("fetch", vi.fn(async (input: unknown, init?: RequestInit) => {
      const url = new URL(String(input));
      const action = url.searchParams.get("action");
      if (action === "start_crew_run") {
        return jsonResponse({
          run_id: runId,
          agents: [
            { id: "agent-a", slug: "pragmatist", name: "Pragmatist", category: "strategy", seed_prompt: "You are pragmatic." },
            { id: "agent-c", slug: "chairman", name: "Chairman", category: "meta", seed_prompt: "You synthesize." },
          ],
        }, 202);
      }
      if (action === "finish_crew_run") {
        finishBody = JSON.parse(String(init?.body ?? "{}"));
        return jsonResponse({
          run_id: runId,
          card: {
            headline: "Crews run failed",
            summary: "Saved partial output.",
            keyFacts: [`run_id: ${runId}`, "status: failed"],
            nextActions: ["Inspect result_artifact"],
          },
        });
      }
      return jsonResponse({ error: "unexpected action" }, 500);
    }));

    const card = await crewsStartRun({
      crew_id: crewId,
      task_prompt: "Run this Council.",
    }, {
      supportsSampling: true,
      sample: async () => {
        throw new Error("sample_denied");
      },
    });

    expect(card.headline).toBe("Crews run failed");
    expect(finishBody).toMatchObject({
      run_id: runId,
      status: "failed",
      tokens_used: 0,
    });
    const savedFailure = finishBody as unknown as Record<string, unknown>;
    expect(savedFailure.result_artifact).toMatchObject({
      error: "sample_denied",
      mode: "mcp_sampling",
    });
  });
});
