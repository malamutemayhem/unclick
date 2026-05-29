/**
 * crews-tool - MCP handlers for the Crews Council Orchestrator Wizard.
 *
 * Returns ConversationalCards so the calling agent can surface state in plain
 * prose without parsing raw run JSON. As of Crews v1, the inline-loop engine
 * replaces the broken MCP-sampling path: the user's chat model handles all
 * cognition (hats + synthesis), and UnClick orchestrates and persists.
 *
 * crewsStartRun is preserved as a thin shim around the API's start_crew_run
 * action, which now forwards to the same internal logic as crew_begin.
 */

import { buildCard, type ConversationalCard } from "./cards/card.js";
import { adminCall, type AdminCard } from "./crews/api-client.js";

export async function crewsStartRun(args: Record<string, unknown>): Promise<ConversationalCard> {
  const crewId = String(args.crew_id ?? "").trim();
  const taskPrompt = String(args.task_prompt ?? args.user_goal ?? "").trim();
  const tokenBudget = typeof args.token_budget === "number" ? args.token_budget : undefined;
  const taskId = typeof args.task_id === "string" && args.task_id ? args.task_id : undefined;
  const context = typeof args.context === "string" && args.context.trim() ? args.context : undefined;
  if (!crewId) {
    return buildCard({
      headline: "start_crew_run needs a crew_id",
      summary: "Provide the UUID of the Crew to run.",
      keyFacts: ["missing: crew_id"],
      nextActions: ["Call list_runs or browse /admin/crews to find a crew_id"],
    });
  }
  if (!taskPrompt) {
    return buildCard({
      headline: "start_crew_run needs a task_prompt",
      summary: "Describe what you want the Council to deliberate on.",
      keyFacts: ["missing: task_prompt"],
      nextActions: ["Retry with a task_prompt of at least one sentence"],
    });
  }
  const body: Record<string, unknown> = { crew_id: crewId, task_prompt: taskPrompt };
  if (tokenBudget) body.token_budget = tokenBudget;
  if (taskId) body.task_id = taskId;
  if (context) body.context = context;
  const { ok, status, json } = await adminCall("start_crew_run", body, "POST");
  const payload = (json ?? {}) as AdminCard;
  if (payload.card) return payload.card;
  if (!ok) {
    return buildCard({
      headline: `start_crew_run failed (HTTP ${status})`,
      summary: payload.message ?? "The admin API rejected the request.",
      keyFacts: [
        `http_status: ${status}`,
        ...(payload.error ? [`error: ${payload.error}`] : []),
      ],
      nextActions: ["Check Vercel logs", "Confirm your UNCLICK_API_KEY is valid"],
    });
  }
  // The API returns a card on the success path; this branch is a safety net
  // for the unlikely shape where ok=true but card is absent.
  return buildCard({
    headline: payload.was_duplicate ? "Crews run already exists" : "Crews run accepted",
    summary: payload.was_duplicate
      ? "A run with this task_id already exists for your tenant. Returning the original run_id; no new row was created."
      : "The run row was created. Use crew_get_next_hat to fetch the next hat persona prompt.",
    keyFacts: [
      ...(payload.run_id ? [`run_id: ${payload.run_id}`] : []),
      ...(payload.was_duplicate ? ["was_duplicate: true"] : []),
    ],
    nextActions: [
      `Call crew_get_next_hat with the run_id to fetch the next hat`,
    ],
    deepLink: payload.run_id ? `/admin/crews/runs/${payload.run_id}` : undefined,
  });
}

export async function crewsGetRun(args: Record<string, unknown>): Promise<ConversationalCard> {
  const runId = String(args.run_id ?? "").trim();
  if (!runId) {
    return buildCard({
      headline: "get_run needs a run_id",
      summary: "Provide the run_id returned by start_crew_run.",
      keyFacts: ["missing: run_id"],
      nextActions: ["Call list_runs to find recent run ids"],
    });
  }
  const { ok, status, json } = await adminCall("get_run", null, "GET", { run_id: runId });
  const payload = (json ?? {}) as AdminCard;
  if (payload.card) return payload.card;
  return buildCard({
    headline: `get_run failed (HTTP ${status})`,
    summary: payload.message ?? (ok ? "No card returned." : "Admin API rejected the request."),
    keyFacts: [`http_status: ${status}`, `run_id: ${runId}`],
    nextActions: ["Verify the run_id belongs to your API key", "Check Vercel logs"],
  });
}

export async function crewsListRuns(args: Record<string, unknown>): Promise<ConversationalCard> {
  const crewId = args.crew_id ? String(args.crew_id).trim() : undefined;
  const limit = typeof args.limit === "number" ? String(args.limit) : undefined;
  const query: Record<string, string> = {};
  if (crewId) query.crew_id = crewId;
  if (limit) query.limit = limit;
  const { ok, status, json } = await adminCall("list_runs", null, "GET", query);
  const payload = (json ?? {}) as AdminCard;
  if (payload.card) return payload.card;
  return buildCard({
    headline: `list_runs failed (HTTP ${status})`,
    summary: payload.message ?? (ok ? "No card returned." : "Admin API rejected the request."),
    keyFacts: [`http_status: ${status}`],
    nextActions: ["Check Vercel logs", "Confirm your UNCLICK_API_KEY is valid"],
  });
}
