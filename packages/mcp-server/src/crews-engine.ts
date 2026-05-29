/**
 * crews-engine - MCP tool handlers for the Crews v1 inline-loop engine.
 *
 * The user's chat model handles all cognition. UnClick orchestrates the run,
 * persists structured turns, and serves the next prompt or the synthesis brief.
 * Each handler is a thin wrapper around an admin API action; the API returns
 * a ConversationalCard that the caller relays to the chat model verbatim.
 *
 * This is the unlock for every Pass product (TestPass, UXPass, FlowPass, etc).
 */

import { buildCard, type ConversationalCard } from "./cards/card.js";
import { adminCall, type AdminCard } from "./crews/api-client.js";
import {
  parseHatTurn,
  parseSynthesis,
} from "./crews/schemas.js";

function failureCard(toolName: string, status: number, payload: AdminCard): ConversationalCard {
  return buildCard({
    headline: `${toolName} failed (HTTP ${status})`,
    summary: payload.message ?? "The admin API rejected the request.",
    keyFacts: [
      `http_status: ${status}`,
      ...(payload.error ? [`error: ${payload.error}`] : []),
      ...(payload.parse_error ? [`parse_error: ${payload.parse_error}`] : []),
    ],
    nextActions: ["Check Vercel logs", "Confirm your UNCLICK_API_KEY is valid"],
  });
}

export async function crewBegin(args: Record<string, unknown>): Promise<ConversationalCard> {
  const crewId = String(args.crew_id ?? "").trim();
  const userGoal = String(args.user_goal ?? args.task_prompt ?? "").trim();
  const context =
    typeof args.context === "string" && args.context.trim() ? args.context.trim() : undefined;
  const taskId = typeof args.task_id === "string" && args.task_id ? args.task_id : undefined;
  const tokenBudget = typeof args.token_budget === "number" ? args.token_budget : undefined;
  if (!crewId) {
    return buildCard({
      headline: "crew_begin needs a crew_id",
      summary: "Provide the UUID of the Crew to run.",
      keyFacts: ["missing: crew_id"],
      nextActions: ["Call list_runs or browse /admin/crews to find a crew_id"],
    });
  }
  if (!userGoal) {
    return buildCard({
      headline: "crew_begin needs a user_goal",
      summary: "Describe what you want the Council to deliberate on (one sentence is fine).",
      keyFacts: ["missing: user_goal"],
      nextActions: ["Retry with a non-empty user_goal"],
    });
  }
  const body: Record<string, unknown> = { crew_id: crewId, user_goal: userGoal };
  if (context) body.context = context;
  if (taskId) body.task_id = taskId;
  if (tokenBudget !== undefined) body.token_budget = tokenBudget;
  const { ok, status, json } = await adminCall("crew_begin", body, "POST");
  const payload = (json ?? {}) as AdminCard;
  if (payload.card) return payload.card;
  if (!ok) return failureCard("crew_begin", status, payload);
  return buildCard({
    headline: "Crews run accepted",
    summary: "Use crew_get_next_hat to fetch the next hat persona prompt.",
    keyFacts: payload.run_id ? [`run_id: ${payload.run_id}`] : [],
    nextActions: ["Call crew_get_next_hat with the run_id"],
    deepLink: payload.run_id ? `/admin/crews/runs/${payload.run_id}` : undefined,
  });
}

export async function crewGetNextHat(
  args: Record<string, unknown>,
): Promise<ConversationalCard> {
  const runId = String(args.run_id ?? "").trim();
  if (!runId) {
    return buildCard({
      headline: "crew_get_next_hat needs a run_id",
      summary: "Provide the run_id returned by crew_begin.",
      keyFacts: ["missing: run_id"],
      nextActions: ["Call crew_begin first"],
    });
  }
  const { ok, status, json } = await adminCall(
    "crew_get_next_hat",
    null,
    "GET",
    { run_id: runId },
  );
  const payload = (json ?? {}) as AdminCard;
  if (payload.card) return payload.card;
  if (!ok) return failureCard("crew_get_next_hat", status, payload);
  return buildCard({
    headline: "crew_get_next_hat returned no card",
    summary: "The admin API succeeded but did not return a card.",
    keyFacts: [`run_id: ${runId}`, `http_status: ${status}`],
    nextActions: ["Call crew_status to inspect the run"],
  });
}

export async function crewRecordHatResponse(
  args: Record<string, unknown>,
): Promise<ConversationalCard> {
  const runId = String(args.run_id ?? "").trim();
  if (!runId) {
    return buildCard({
      headline: "crew_record_hat_response needs a run_id",
      summary: "Provide the run_id returned by crew_begin.",
      keyFacts: ["missing: run_id"],
      nextActions: ["Call crew_begin first"],
    });
  }
  const hatIndex = Number(args.hat_index);
  if (!Number.isInteger(hatIndex) || hatIndex < 0) {
    return buildCard({
      headline: "crew_record_hat_response needs a hat_index",
      summary: "Provide the hat_index from the most recent hat prompt card.",
      keyFacts: ["missing: hat_index"],
      nextActions: ["Call crew_get_next_hat to fetch the current hat_index"],
    });
  }
  if (args.response_json === undefined) {
    return buildCard({
      headline: "crew_record_hat_response needs response_json",
      summary:
        "Provide the HatTurnV1 JSON object as response_json. The hat prompt card showed the schema in its summary.",
      keyFacts: ["missing: response_json"],
      nextActions: ["Read the hat prompt card and reply with HatTurnV1 JSON"],
    });
  }
  // Pre-validate locally so we can short-circuit a round trip when the chat
  // model produces clearly malformed JSON. The server validates again as
  // defense-in-depth and tracks the retry state authoritatively.
  const local = parseHatTurn(args.response_json);
  if (!local.ok) {
    // Still send to the server so it can track the retry counter.
    const body = {
      run_id: runId,
      hat_index: hatIndex,
      response_json: args.response_json,
    };
    const { json } = await adminCall("crew_record_hat_response", body, "POST");
    const payload = (json ?? {}) as AdminCard;
    if (payload.card) return payload.card;
    return buildCard({
      headline: "Hat response failed validation",
      summary: `Validator: ${local.error}`,
      keyFacts: [
        `run_id: ${runId}`,
        `hat_index: ${hatIndex}`,
        `parse_error: ${local.error}`,
      ],
      nextActions: ["Fix the JSON and call crew_record_hat_response again"],
    });
  }
  const body = {
    run_id: runId,
    hat_index: hatIndex,
    response_json: local.value,
  };
  const { ok, status, json } = await adminCall("crew_record_hat_response", body, "POST");
  const payload = (json ?? {}) as AdminCard;
  if (payload.card) return payload.card;
  if (!ok) return failureCard("crew_record_hat_response", status, payload);
  return buildCard({
    headline: "Hat response recorded",
    summary: "Call crew_get_next_hat to fetch the next hat prompt or the synthesis brief.",
    keyFacts: [`run_id: ${runId}`, `hat_index: ${hatIndex}`],
    nextActions: ["Call crew_get_next_hat with the run_id"],
    deepLink: `/admin/crews/runs/${runId}`,
  });
}

export async function crewGetSynthesisBrief(
  args: Record<string, unknown>,
): Promise<ConversationalCard> {
  const runId = String(args.run_id ?? "").trim();
  if (!runId) {
    return buildCard({
      headline: "crew_get_synthesis_brief needs a run_id",
      summary: "Provide the run_id returned by crew_begin.",
      keyFacts: ["missing: run_id"],
      nextActions: ["Call crew_begin first"],
    });
  }
  const { ok, status, json } = await adminCall(
    "crew_get_synthesis_brief",
    null,
    "GET",
    { run_id: runId },
  );
  const payload = (json ?? {}) as AdminCard;
  if (payload.card) return payload.card;
  if (!ok) return failureCard("crew_get_synthesis_brief", status, payload);
  return buildCard({
    headline: "crew_get_synthesis_brief returned no card",
    summary: "The admin API succeeded but did not return a card.",
    keyFacts: [`run_id: ${runId}`, `http_status: ${status}`],
    nextActions: ["Call crew_status to inspect the run"],
  });
}

export async function crewRecordSynthesis(
  args: Record<string, unknown>,
): Promise<ConversationalCard> {
  const runId = String(args.run_id ?? "").trim();
  if (!runId) {
    return buildCard({
      headline: "crew_record_synthesis needs a run_id",
      summary: "Provide the run_id returned by crew_begin.",
      keyFacts: ["missing: run_id"],
      nextActions: ["Call crew_begin first"],
    });
  }
  if (args.verdict_json === undefined) {
    return buildCard({
      headline: "crew_record_synthesis needs verdict_json",
      summary:
        "Provide the SynthesisV1 JSON object as verdict_json. The synthesis brief card showed the schema in its summary.",
      keyFacts: ["missing: verdict_json"],
      nextActions: ["Read the synthesis brief card and reply with SynthesisV1 JSON"],
    });
  }
  const local = parseSynthesis(args.verdict_json);
  if (!local.ok) {
    const body = { run_id: runId, verdict_json: args.verdict_json };
    const { json } = await adminCall("crew_record_synthesis", body, "POST");
    const payload = (json ?? {}) as AdminCard;
    if (payload.card) return payload.card;
    return buildCard({
      headline: "Synthesis verdict failed validation",
      summary: `Validator: ${local.error}`,
      keyFacts: [`run_id: ${runId}`, `parse_error: ${local.error}`],
      nextActions: ["Fix the JSON and call crew_record_synthesis again"],
    });
  }
  const body = { run_id: runId, verdict_json: local.value };
  const { ok, status, json } = await adminCall("crew_record_synthesis", body, "POST");
  const payload = (json ?? {}) as AdminCard;
  if (payload.card) return payload.card;
  if (!ok) return failureCard("crew_record_synthesis", status, payload);
  return buildCard({
    headline: "Synthesis recorded — run complete",
    summary: "The verdict has been persisted. Call crew_status to fetch the audit trail.",
    keyFacts: [`run_id: ${runId}`],
    nextActions: ["Call crew_status to fetch the verdict programmatically"],
    deepLink: `/admin/crews/runs/${runId}`,
  });
}

export async function crewStatus(args: Record<string, unknown>): Promise<ConversationalCard> {
  const runId = String(args.run_id ?? "").trim();
  if (!runId) {
    return buildCard({
      headline: "crew_status needs a run_id",
      summary: "Provide the run_id returned by crew_begin.",
      keyFacts: ["missing: run_id"],
      nextActions: ["Call crew_begin first"],
    });
  }
  const { ok, status, json } = await adminCall("crew_status", null, "GET", { run_id: runId });
  const payload = (json ?? {}) as AdminCard;
  if (payload.card) return payload.card;
  if (!ok) return failureCard("crew_status", status, payload);
  return buildCard({
    headline: "crew_status returned no card",
    summary: "The admin API succeeded but did not return a card.",
    keyFacts: [`run_id: ${runId}`, `http_status: ${status}`],
    nextActions: ["Inspect the run on /admin/crews/runs/" + runId],
  });
}

export async function crewCapabilityProbe(
  args: Record<string, unknown>,
): Promise<ConversationalCard> {
  const body: Record<string, unknown> = {};
  if (typeof args.agent_id === "string" && args.agent_id.trim()) {
    body.agent_id = args.agent_id.trim();
  }
  if (
    args.client_capabilities &&
    typeof args.client_capabilities === "object" &&
    !Array.isArray(args.client_capabilities)
  ) {
    body.client_capabilities = args.client_capabilities;
  }
  const { ok, status, json } = await adminCall("crew_capability_probe", body, "POST");
  const payload = (json ?? {}) as AdminCard;
  if (payload.card) return payload.card;
  if (!ok) return failureCard("crew_capability_probe", status, payload);
  return buildCard({
    headline: "Capability probe",
    summary:
      "Server advertises Crews v1 inline-loop support. The chat agent (your model) does all cognition; UnClick orchestrates and persists.",
    keyFacts: ["crews_v1_inline_loop: true", "sampling_fallback: false"],
    nextActions: ["Begin a Crews run with crew_begin"],
  });
}
