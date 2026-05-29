import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  crewBegin,
  crewGetNextHat,
  crewRecordHatResponse,
  crewRecordSynthesis,
  crewStatus,
  crewCapabilityProbe,
} from "../crews-engine.js";
import type { ConversationalCard } from "../cards/card.js";

type FetchCall = { url: string; init?: RequestInit };

function makeFakeFetch(handler: (call: FetchCall) => { status: number; body: unknown }): typeof fetch {
  const fakeFetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : (input as Request).url;
    const { status, body } = handler({ url, init });
    const text = JSON.stringify(body);
    return new Response(text, {
      status,
      headers: { "content-type": "application/json" },
    });
  }) as unknown as typeof fetch;
  return fakeFetch;
}

const RUN_ID = "11111111-1111-4111-9111-111111111111";

beforeEach(() => {
  process.env.UNCLICK_API_KEY = "test_key";
  process.env.UNCLICK_API_URL = "https://api.test.local";
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("crewBegin", () => {
  it("returns a missing-arg card when crew_id is absent", async () => {
    vi.stubGlobal("fetch", makeFakeFetch(() => ({ status: 200, body: {} })));
    const card = (await crewBegin({})) as ConversationalCard;
    expect(card.headline).toMatch(/crew_id/);
    expect(card.keyFacts.join("\n")).toMatch(/missing: crew_id/);
  });

  it("returns a missing-arg card when user_goal is absent", async () => {
    vi.stubGlobal("fetch", makeFakeFetch(() => ({ status: 200, body: {} })));
    const card = (await crewBegin({ crew_id: "abc" })) as ConversationalCard;
    expect(card.headline).toMatch(/user_goal/);
  });

  it("forwards crew_id, user_goal, context, and task_id to the admin API", async () => {
    const calls: FetchCall[] = [];
    const cardFromApi: ConversationalCard = {
      headline: "Crews run started -- hat 1/3",
      summary: "You are wearing the Contrarian hat...",
      keyFacts: [`run_id: ${RUN_ID}`, "hat_index: 0"],
      nextActions: ["Compose JSON, then call crew_record_hat_response"],
      quality_note: "Crews quality depends on the model...",
    };
    vi.stubGlobal(
      "fetch",
      makeFakeFetch((c) => {
        calls.push(c);
        return {
          status: 200,
          body: { run_id: RUN_ID, total_hats: 3, state: "in_progress", card: cardFromApi },
        };
      }),
    );
    const card = (await crewBegin({
      crew_id: "crew-abc",
      user_goal: "Decide whether to ship Friday",
      context: "Q3 launch window",
      task_id: "00000000-0000-5000-8000-000000000001",
    })) as ConversationalCard;
    expect(card.headline).toBe(cardFromApi.headline);
    expect(card.quality_note).toBeDefined();
    expect(calls).toHaveLength(1);
    const body = JSON.parse(calls[0].init?.body as string);
    expect(body.crew_id).toBe("crew-abc");
    expect(body.user_goal).toBe("Decide whether to ship Friday");
    expect(body.context).toBe("Q3 launch window");
    expect(body.task_id).toBe("00000000-0000-5000-8000-000000000001");
    expect(calls[0].url).toContain("action=crew_begin");
  });
});

describe("crewRecordHatResponse", () => {
  it("returns a retry card when local validation fails (without consulting the server's own card)", async () => {
    const calls: FetchCall[] = [];
    vi.stubGlobal(
      "fetch",
      makeFakeFetch((c) => {
        calls.push(c);
        // Server may also reject; mimic an absent card so the local fallback fires.
        return { status: 400, body: { parse_error: "key_points: required" } };
      }),
    );
    const card = (await crewRecordHatResponse({
      run_id: RUN_ID,
      hat_index: 0,
      response_json: { hat_id: "h1", hat_name: "X", confidence: "low", risks: [], dissent: null },
      // missing key_points -> local parse fails
    })) as ConversationalCard;
    expect(card.headline).toMatch(/failed validation/i);
    // Should still have called the server (so it can track the retry counter authoritatively)
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toContain("action=crew_record_hat_response");
  });

  it("forwards the validated HatTurnV1 to the server on success", async () => {
    const calls: FetchCall[] = [];
    const goodCard: ConversationalCard = {
      headline: "Hat 2/3: Pragmatist",
      summary: "You are wearing the Pragmatist hat...",
      keyFacts: [`run_id: ${RUN_ID}`, "hat_index: 1"],
      nextActions: ["Compose JSON, then call crew_record_hat_response"],
    };
    vi.stubGlobal(
      "fetch",
      makeFakeFetch((c) => {
        calls.push(c);
        return {
          status: 200,
          body: { run_id: RUN_ID, state: "in_progress", hat_index: 1, total_hats: 3, card: goodCard },
        };
      }),
    );
    const validTurn = {
      hat_id: "h1",
      hat_name: "Contrarian",
      key_points: ["a"],
      confidence: "medium",
      risks: [],
      dissent: null,
    };
    const card = (await crewRecordHatResponse({
      run_id: RUN_ID,
      hat_index: 0,
      response_json: validTurn,
    })) as ConversationalCard;
    expect(card.headline).toBe(goodCard.headline);
    expect(calls).toHaveLength(1);
    const body = JSON.parse(calls[0].init?.body as string);
    expect(body.run_id).toBe(RUN_ID);
    expect(body.hat_index).toBe(0);
    expect(body.response_json).toMatchObject({ hat_name: "Contrarian", confidence: "medium" });
  });

  it("returns a missing-arg card when response_json is absent", async () => {
    vi.stubGlobal("fetch", makeFakeFetch(() => ({ status: 200, body: {} })));
    const card = (await crewRecordHatResponse({
      run_id: RUN_ID,
      hat_index: 0,
    })) as ConversationalCard;
    expect(card.keyFacts.join("\n")).toMatch(/response_json/);
  });
});

describe("crewRecordSynthesis", () => {
  it("returns a retry card when local SynthesisV1 validation fails", async () => {
    vi.stubGlobal("fetch", makeFakeFetch(() => ({ status: 400, body: {} })));
    const card = (await crewRecordSynthesis({
      run_id: RUN_ID,
      verdict_json: {
        verdict: "v",
        key_decision: "k",
        strongest_agreement: "s",
        sharpest_disagreement: "d",
        risks: [],
        unknowns: [],
        // missing recommendation
        hats_consulted: ["A"],
      },
    })) as ConversationalCard;
    expect(card.headline).toMatch(/failed validation/i);
  });

  it("forwards a valid SynthesisV1 to the server", async () => {
    const calls: FetchCall[] = [];
    const completeCard: ConversationalCard = {
      headline: "Crews deliberation complete",
      summary: "All hats recorded; verdict persisted.",
      keyFacts: [`run_id: ${RUN_ID}`, "state: complete"],
      nextActions: ["Open the admin run page"],
    };
    vi.stubGlobal(
      "fetch",
      makeFakeFetch((c) => {
        calls.push(c);
        return { status: 200, body: { run_id: RUN_ID, state: "complete", card: completeCard } };
      }),
    );
    const card = (await crewRecordSynthesis({
      run_id: RUN_ID,
      verdict_json: {
        verdict: "Ship Friday",
        key_decision: "Ship",
        strongest_agreement: "All hats agree on the goal.",
        sharpest_disagreement: "Pace -- ship now vs hold one week.",
        risks: ["pre-launch surprise"],
        unknowns: ["press response"],
        recommendation: "Ship Friday with a rollback plan.",
        hats_consulted: ["Contrarian", "Pragmatist", "Realist"],
      },
    })) as ConversationalCard;
    expect(card.headline).toBe(completeCard.headline);
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toContain("action=crew_record_synthesis");
  });
});

describe("crewGetNextHat / crewStatus", () => {
  it("crew_get_next_hat issues a GET with the run_id in the query string", async () => {
    const calls: FetchCall[] = [];
    const apiCard: ConversationalCard = {
      headline: "Hat 2/3: Pragmatist",
      summary: "...",
      keyFacts: [`run_id: ${RUN_ID}`],
      nextActions: ["..."],
    };
    vi.stubGlobal(
      "fetch",
      makeFakeFetch((c) => {
        calls.push(c);
        return { status: 200, body: { run_id: RUN_ID, card: apiCard } };
      }),
    );
    const card = (await crewGetNextHat({ run_id: RUN_ID })) as ConversationalCard;
    expect(card.headline).toBe(apiCard.headline);
    expect(calls[0].init?.method).toBe("GET");
    expect(calls[0].url).toContain("action=crew_get_next_hat");
    expect(calls[0].url).toContain(`run_id=${RUN_ID}`);
  });

  it("crew_status surfaces the API's status card", async () => {
    const apiCard: ConversationalCard = {
      headline: "Crews run state: awaiting_synthesis",
      summary: "Decide whether to ship Friday",
      keyFacts: ["state: awaiting_synthesis", "hats_done: 3"],
      nextActions: ["Call crew_get_synthesis_brief"],
    };
    vi.stubGlobal(
      "fetch",
      makeFakeFetch(() => ({ status: 200, body: { run_id: RUN_ID, card: apiCard } })),
    );
    const card = (await crewStatus({ run_id: RUN_ID })) as ConversationalCard;
    expect(card.headline).toBe(apiCard.headline);
  });
});

describe("crewCapabilityProbe", () => {
  it("forwards client_capabilities and agent_id when both are provided", async () => {
    const calls: FetchCall[] = [];
    vi.stubGlobal(
      "fetch",
      makeFakeFetch((c) => {
        calls.push(c);
        return {
          status: 200,
          body: {
            server_capabilities: { crews_v1_inline_loop: true },
            client_capabilities: { sampling: false },
            card: {
              headline: "Capability probe",
              summary: "...",
              keyFacts: [],
              nextActions: [],
            },
          },
        };
      }),
    );
    const card = (await crewCapabilityProbe({
      agent_id: "agent-1",
      client_capabilities: { sampling: false, model_family: "claude-sonnet-4-6" },
    })) as ConversationalCard;
    expect(card.headline).toBe("Capability probe");
    const body = JSON.parse(calls[0].init?.body as string);
    expect(body.agent_id).toBe("agent-1");
    expect(body.client_capabilities).toMatchObject({ sampling: false });
  });

  it("works with no args (server returns its capabilities only)", async () => {
    vi.stubGlobal(
      "fetch",
      makeFakeFetch(() => ({
        status: 200,
        body: {
          server_capabilities: { crews_v1_inline_loop: true },
          client_capabilities: null,
          card: { headline: "Capability probe", summary: "", keyFacts: [], nextActions: [] },
        },
      })),
    );
    const card = (await crewCapabilityProbe({})) as ConversationalCard;
    expect(card.headline).toBe("Capability probe");
  });
});
