/**
 * AutoPilot Runner v1: the opt-in local daemon that gives UnClick
 * proactivity without breaking the passive-MCP default.
 *
 * One pass = poll memory.list_due_schedules, execute each due schedule's
 * action, record the outcome (which advances next_due_at), and deliver the
 * result to the schedule's targets. The MCP server itself never initiates
 * work; only a user-started runner process does.
 *
 * Dependencies are injected so the orchestration is fully testable without
 * network or storage; defaultRunnerDeps() wires the real memory handlers,
 * endpoint executor, and delivery lanes.
 */

import { MEMORY_HANDLERS } from "../memory/handlers.js";
import { executeEndpoint, type ExecutionResult } from "./executor.js";
import type { ScheduleDoc } from "../memory/schedules.js";

const RUNNER_AGENT_ID = "unclick-autopilot-runner";
const SUMMARY_MAX = 400;

export interface DeliveryResult {
  target: string;
  delivered: boolean;
  note?: string;
}

export interface ScheduleRunReport {
  slug: string;
  name: string;
  outcome: "success" | "failure";
  summary: string;
  deliveries: DeliveryResult[];
}

export interface RunnerPassReport {
  as_of: string;
  due_count: number;
  reports: ScheduleRunReport[];
}

export interface RunnerDeps {
  listDue(now?: string): Promise<{ due: Array<{ slug: string; schedule: ScheduleDoc }> }>;
  execute(endpointId: string, params: Record<string, unknown>): Promise<ExecutionResult>;
  getPlaybook(slug: string): Promise<unknown>;
  recordRun(slug: string, outcome: "success" | "failure", summary: string): Promise<unknown>;
  deliver(target: string, message: string): Promise<DeliveryResult>;
}

function compact(value: unknown, max = SUMMARY_MAX): string {
  const text = typeof value === "string" ? value : JSON.stringify(value);
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max)}...` : text;
}

function buildMessage(name: string, outcome: string, summary: string): string {
  return `AutoPilot Runner | ${name} | ${outcome.toUpperCase()}\n${summary}`;
}

async function executeAction(
  schedule: ScheduleDoc,
  deps: RunnerDeps,
): Promise<{ outcome: "success" | "failure"; summary: string }> {
  const action = schedule.action;
  if (action.kind === "endpoint") {
    const result = await deps.execute(action.endpoint_id, action.params);
    if (result.ok) {
      return { outcome: "success", summary: `${action.endpoint_id}: ${compact(result.result)}` };
    }
    return { outcome: "failure", summary: `${action.endpoint_id} failed: ${result.error ?? "unknown error"}` };
  }
  if (action.kind === "playbook") {
    const playbook = (await deps.getPlaybook(action.playbook_slug)) as {
      found?: boolean;
      playbook?: { goal?: string; steps?: unknown[]; status?: string };
      error?: string;
    };
    if (!playbook?.found) {
      return { outcome: "failure", summary: `Playbook ${action.playbook_slug} unavailable: ${playbook?.error ?? "not found"}` };
    }
    // Playbook steps are agent recipes, not exact params; the runner delivers
    // a wake packet instead of blind-executing tools.
    const steps = Array.isArray(playbook.playbook?.steps) ? playbook.playbook.steps.length : 0;
    return {
      outcome: "success",
      summary:
        `Wake packet: playbook "${action.playbook_slug}" is due ` +
        `(status ${playbook.playbook?.status ?? "draft"}, ${steps} steps). ` +
        `Goal: ${playbook.playbook?.goal ?? "unknown"}. ` +
        `An agent should run memory.get_playbook and execute it, then memory.record_playbook_run.`,
    };
  }
  return { outcome: "success", summary: action.message };
}

export async function runDuePass(deps: RunnerDeps, now?: string): Promise<RunnerPassReport> {
  const asOf = now ?? new Date().toISOString();
  const { due } = await deps.listDue(now);
  const reports: ScheduleRunReport[] = [];

  for (const { slug, schedule } of due) {
    let outcome: "success" | "failure";
    let summary: string;
    try {
      ({ outcome, summary } = await executeAction(schedule, deps));
    } catch (err) {
      outcome = "failure";
      summary = `runner error: ${err instanceof Error ? err.message : String(err)}`;
    }

    // Record first so next_due_at always advances; a crashed delivery must
    // not make the same schedule fire again on the next pass.
    await deps.recordRun(slug, outcome, summary);

    const targets = schedule.deliver_to.length > 0 ? schedule.deliver_to : ["boardroom"];
    const message = buildMessage(schedule.name, outcome, summary);
    const deliveries: DeliveryResult[] = [];
    for (const target of targets) {
      try {
        deliveries.push(await deps.deliver(target, message));
      } catch (err) {
        deliveries.push({
          target,
          delivered: false,
          note: err instanceof Error ? err.message : String(err),
        });
      }
    }

    reports.push({ slug, name: schedule.name, outcome, summary, deliveries });
  }

  return { as_of: asOf, due_count: due.length, reports };
}

async function deliverToBoardroom(message: string): Promise<DeliveryResult> {
  const apiKey = process.env.UNCLICK_API_KEY;
  if (!apiKey) {
    return { target: "boardroom", delivered: false, note: "UNCLICK_API_KEY not configured" };
  }
  const base =
    process.env.UNCLICK_MEMORY_BASE_URL ||
    process.env.UNCLICK_SITE_URL ||
    "https://unclick.world";
  const resp = await fetch(`${base}/api/memory-admin?action=fishbowl_post`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      agent_id: RUNNER_AGENT_ID,
      recipients: ["all"],
      tags: ["fyi"],
      text: message,
      user_agent_hint: "unclick-runner",
    }),
  });
  return {
    target: "boardroom",
    delivered: resp.ok,
    note: resp.ok ? undefined : `boardroom post failed with HTTP ${resp.status}`,
  };
}

async function defaultDeliver(target: string, message: string): Promise<DeliveryResult> {
  if (target === "boardroom") return deliverToBoardroom(message);
  if (target.startsWith("telegram:")) {
    const chatId = target.slice("telegram:".length).trim();
    const result = await executeEndpoint("telegram_send", { chat_id: chatId, text: message });
    return { target, delivered: result.ok, note: result.ok ? undefined : result.error };
  }
  return { target, delivered: false, note: `Unsupported delivery target "${target}" (v1 supports boardroom and telegram:<chat_id>).` };
}

export function defaultRunnerDeps(): RunnerDeps {
  return {
    async listDue(now) {
      const result = (await MEMORY_HANDLERS.list_due_schedules(now ? { now } : {})) as {
        due: Array<{ slug: string; schedule: ScheduleDoc }>;
      };
      return { due: Array.isArray(result.due) ? result.due : [] };
    },
    execute: executeEndpoint,
    async getPlaybook(slug) {
      return MEMORY_HANDLERS.get_playbook({ slug });
    },
    async recordRun(slug, outcome, summary) {
      return MEMORY_HANDLERS.record_schedule_run({ slug, outcome, summary });
    },
    deliver: defaultDeliver,
  };
}

export interface RunnerLoopOptions {
  intervalSeconds?: number;
  once?: boolean;
  now?: string;
  log?: (line: string) => void;
}

export async function runRunner(options: RunnerLoopOptions = {}): Promise<RunnerPassReport | undefined> {
  const log = options.log ?? ((line: string) => console.log(line));
  const deps = defaultRunnerDeps();
  const intervalMs = Math.max(30, options.intervalSeconds ?? 60) * 1000;

  if (options.once) {
    const report = await runDuePass(deps, options.now);
    log(`runner pass complete: ${report.due_count} due, as of ${report.as_of}`);
    return report;
  }

  log(`AutoPilot Runner started (interval ${intervalMs / 1000}s). Ctrl+C to stop.`);
  let stopped = false;
  process.on("SIGINT", () => {
    stopped = true;
    log("runner stopping after current pass");
  });
  while (!stopped) {
    try {
      const report = await runDuePass(deps);
      if (report.due_count > 0) {
        log(`executed ${report.due_count} due schedule(s) at ${report.as_of}`);
      }
    } catch (err) {
      log(`runner pass failed: ${err instanceof Error ? err.message : String(err)}`);
    }
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
  return undefined;
}
