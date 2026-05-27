/**
 * crews-tool - MCP handlers for the Crews Council Orchestrator Wizard.
 *
 * The HTTP admin API prepares and persists run rows. User-facing LLM turns run
 * through MCP sampling so the connected client remains the model boundary.
 */

import { buildCard, type ConversationalCard } from "./cards/card.js";

const API_BASE = (process.env.UNCLICK_API_URL ?? "https://unclick.world").replace(/\/$/, "");
const MAX_PER_CALL = 2048;
const LABELS = "ABCDEFGHIJKLMNOP".split("");

type CrewAgent = {
  id: string;
  slug?: string;
  name: string;
  category?: string;
  seed_prompt?: string | null;
};

type CrewMessage = {
  agent_id: string | null;
  role: string;
  stage: string;
  content: string;
  tokens_in: number;
  tokens_out: number;
};

type SampleRequest = {
  system: string;
  user: string;
  maxTokens: number;
};

type SampleResult = {
  content: string;
  tokensIn?: number;
  tokensOut?: number;
};

export type CrewSampler = (request: SampleRequest) => Promise<SampleResult | string>;

export type CrewsStartRunOptions = {
  supportsSampling?: boolean;
  sample?: CrewSampler;
};

type AdminCard = {
  card?: ConversationalCard;
  error?: string;
  message?: string;
  run_id?: string;
  was_duplicate?: boolean;
  agents?: CrewAgent[];
  relevant_facts?: string[];
};

type StageResult = {
  agent: CrewAgent;
  label: string;
  content: string;
  tokensIn: number;
  tokensOut: number;
};

function getApiKey(): string {
  const key = process.env.UNCLICK_API_KEY?.trim();
  if (!key) {
    throw new Error("UNCLICK_API_KEY env var is not set. Get your install config at https://unclick.world");
  }
  return key;
}

async function adminCall(
  action: string,
  body: Record<string, unknown> | null,
  method: "GET" | "POST",
  query?: Record<string, string>,
): Promise<{ ok: boolean; status: number; json: unknown }> {
  const apiKey = getApiKey();
  const qs = new URLSearchParams({ action, ...(query ?? {}) }).toString();
  const url = `${API_BASE}/api/memory-admin?${qs}`;
  const init: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };
  if (method === "POST" && body) init.body = JSON.stringify(body);
  const res = await fetch(url, init);
  const text = await res.text();
  let json: unknown = text;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    // Keep the raw text for error cards.
  }
  return { ok: res.ok, status: res.status, json };
}

function estimateTokens(text: string): number {
  return Math.max(1, Math.ceil(text.length / 4));
}

async function runSample(
  sampler: CrewSampler,
  request: SampleRequest,
): Promise<{ content: string; tokensIn: number; tokensOut: number }> {
  const result = await sampler(request);
  const content = typeof result === "string" ? result : result.content;
  if (!content || !content.trim()) {
    throw new Error("sampling_response_empty");
  }
  return {
    content: content.trim(),
    tokensIn: typeof result === "string" || result.tokensIn === undefined
      ? estimateTokens(`${request.system}\n${request.user}`)
      : result.tokensIn,
    tokensOut: typeof result === "string" || result.tokensOut === undefined
      ? estimateTokens(content)
      : result.tokensOut,
  };
}

function stageSummary(messages: CrewMessage[]): string {
  const counts = messages.reduce<Record<string, number>>((acc, message) => {
    acc[message.stage] = (acc[message.stage] ?? 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts)
    .map(([stage, count]) => `${stage}: ${count}`)
    .join(", ") || "none";
}

async function finishRun(
  runId: string,
  status: "complete" | "failed",
  messages: CrewMessage[],
  tokensUsed: number,
  resultArtifact: Record<string, unknown> | null,
): Promise<ConversationalCard> {
  const { ok, status: httpStatus, json } = await adminCall(
    "finish_crew_run",
    {
      run_id: runId,
      status,
      messages,
      tokens_used: tokensUsed,
      result_artifact: resultArtifact,
    },
    "POST",
  );
  const payload = (json ?? {}) as AdminCard;
  if (payload.card) return payload.card;
  return buildCard({
    headline: `finish_crew_run failed (HTTP ${httpStatus})`,
    summary: payload.message ?? (ok ? "No card returned." : "The admin API rejected the persisted Council output."),
    keyFacts: [
      `run_id: ${runId}`,
      `http_status: ${httpStatus}`,
      ...(payload.error ? [`error: ${payload.error}`] : []),
    ],
    nextActions: ["Call get_run to inspect any saved partial output", "Check Vercel logs"],
    deepLink: `/admin/crews/runs/${runId}`,
  });
}

function unsupportedStartBody(
  crewId: string,
  taskPrompt: string,
  tokenBudget?: number,
  taskId?: string,
): Record<string, unknown> {
  const body: Record<string, unknown> = { crew_id: crewId, task_prompt: taskPrompt };
  if (tokenBudget) body.token_budget = tokenBudget;
  if (taskId) body.task_id = taskId;
  return body;
}

export async function crewsStartRun(
  args: Record<string, unknown>,
  options: CrewsStartRunOptions = { supportsSampling: false },
): Promise<ConversationalCard> {
  const crewId = String(args.crew_id ?? "").trim();
  const taskPrompt = String(args.task_prompt ?? "").trim();
  const tokenBudget = typeof args.token_budget === "number" ? args.token_budget : undefined;
  const taskId = typeof args.task_id === "string" && args.task_id ? args.task_id : undefined;
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

  if (!options.supportsSampling || !options.sample) {
    const { ok, status, json } = await adminCall(
      "start_crew_run",
      unsupportedStartBody(crewId, taskPrompt, tokenBudget, taskId),
      "POST",
    );
    const payload = (json ?? {}) as AdminCard;
    if (payload.card) return payload.card;
    return buildCard({
      headline: `start_crew_run failed (HTTP ${status})`,
      summary: payload.message ?? (ok ? "No card returned." : "The admin API rejected the request."),
      keyFacts: [
        `http_status: ${status}`,
        ...(payload.error ? [`error: ${payload.error}`] : []),
      ],
      nextActions: ["Check Vercel logs", "Confirm your UNCLICK_API_KEY is valid"],
    });
  }

  const body: Record<string, unknown> = {
    crew_id: crewId,
    task_prompt: taskPrompt,
    execution_mode: "mcp_sampling",
  };
  if (tokenBudget) body.token_budget = tokenBudget;
  if (taskId) body.task_id = taskId;

  const { ok, status, json } = await adminCall("start_crew_run", body, "POST");
  const payload = (json ?? {}) as AdminCard;
  if (payload.was_duplicate && payload.card) return payload.card;
  if (!ok || !payload.run_id) {
    if (payload.card) return payload.card;
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

  const agents = Array.isArray(payload.agents) ? payload.agents : [];
  const advisors = agents.filter((agent) => agent.category !== "meta");
  const chairman = agents.find((agent) => agent.slug === "chairman");
  const memCtx = Array.isArray(payload.relevant_facts) && payload.relevant_facts.length > 0
    ? `Relevant context from UnClick Memory:\n${payload.relevant_facts.map((fact) => `- ${fact}`).join("\n")}\n\n`
    : "";
  const messages: CrewMessage[] = [];
  let tokensUsed = 0;

  try {
    if (advisors.length === 0) throw new Error("crew_has_no_advisors");
    if (!chairman) throw new Error("crew_has_no_chairman");

    const opinions: StageResult[] = await Promise.all(advisors.map(async (agent, index) => {
      const system = `${agent.seed_prompt ?? `You are ${agent.name}.`}\n\nProvide your honest, specific opinion on the task. 150 to 250 words. Be direct and substantive.`;
      const user = `${memCtx}Task: ${taskPrompt}`;
      const sampled = await runSample(options.sample!, { system, user, maxTokens: MAX_PER_CALL });
      return {
        agent,
        label: `Opinion ${LABELS[index] ?? String(index + 1)}`,
        content: sampled.content,
        tokensIn: sampled.tokensIn,
        tokensOut: sampled.tokensOut,
      };
    }));
    for (const opinion of opinions) {
      tokensUsed += opinion.tokensIn + opinion.tokensOut;
      messages.push({
        agent_id: opinion.agent.id,
        role: "advisor",
        stage: "opinion",
        content: opinion.content,
        tokens_in: opinion.tokensIn,
        tokens_out: opinion.tokensOut,
      });
    }

    const peerReviews = await Promise.all(opinions.map(async (reviewer) => {
      const others = opinions.filter((opinion) => opinion.agent.id !== reviewer.agent.id);
      const othersText = others.map((opinion) => `${opinion.label}:\n${opinion.content}`).join("\n\n---\n\n");
      const system = `${reviewer.agent.seed_prompt ?? `You are ${reviewer.agent.name}.`}\n\nRank each opinion below from 1 (most compelling) to ${others.length} (least). One-line rationale per ranking. Be honest and concise.`;
      const user = `Task: ${taskPrompt}\n\nOpinions to rank:\n\n${othersText}`;
      const sampled = await runSample(options.sample!, { system, user, maxTokens: MAX_PER_CALL });
      return {
        agent_id: reviewer.agent.id,
        role: "advisor",
        stage: "peer_review",
        content: sampled.content,
        tokens_in: sampled.tokensIn,
        tokens_out: sampled.tokensOut,
      };
    }));
    for (const peerReview of peerReviews) {
      tokensUsed += peerReview.tokens_in + peerReview.tokens_out;
      messages.push(peerReview);
    }

    const opinionsText = opinions
      .map((opinion) => `${opinion.label} (${opinion.agent.name}):\n${opinion.content}`)
      .join("\n\n---\n\n");
    const system = `You are the Chairman. Synthesise all advisor opinions into one clear, final answer.\n\nFormat your response exactly as:\n\nFINAL ANSWER:\n[Your conclusion, 200 to 350 words]\n\nWHAT DIDN'T MAKE THE CONSENSUS:\n[Minority views not incorporated, 1 to 3 bullet points starting with -. If full consensus, write: No significant dissents.]`;
    const user = `Task: ${taskPrompt}\n\nAdvisor opinions:\n\n${opinionsText}`;
    const synthesis = await runSample(options.sample, { system, user, maxTokens: MAX_PER_CALL });
    tokensUsed += synthesis.tokensIn + synthesis.tokensOut;
    messages.push({
      agent_id: chairman.id,
      role: "chairman",
      stage: "synthesis",
      content: synthesis.content,
      tokens_in: synthesis.tokensIn,
      tokens_out: synthesis.tokensOut,
    });

    return finishRun(payload.run_id, "complete", messages, tokensUsed, {
      status: "complete",
      mode: "mcp_sampling",
      advisor_count: advisors.length,
      message_count: messages.length,
      stages: stageSummary(messages),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "crew_run_failed";
    return finishRun(payload.run_id, "failed", messages, tokensUsed, {
      error: message,
      mode: "mcp_sampling",
      advisor_count: advisors.length,
      message_count: messages.length,
      stages: stageSummary(messages),
    });
  }
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
  const { ok, status, json } = await adminCall(
    "get_run",
    null,
    "GET",
    { run_id: runId },
  );
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
