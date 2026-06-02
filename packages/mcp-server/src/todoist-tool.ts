// Todoist integration for the UnClick MCP server.
// Uses the Todoist REST API v2 via fetch - no external dependencies.
// Auth: an API token (Authorization: Bearer) from Todoist Settings > Integrations.

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const TODOIST_BASE = "https://api.todoist.com/rest/v2";
const TODOIST_SOURCE = "Todoist REST API v2";

function requireToken(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("todoist", args);
}

async function tdFetch<T>(token: string, method: string, path: string, opts?: { params?: Record<string, string>; body?: unknown }): Promise<T> {
  const url = new URL(`${TODOIST_BASE}${path}`);
  if (opts?.params) Object.entries(opts.params).forEach(([k, v]) => url.searchParams.set(k, v));
  const TODOIST_TIMEOUT_MS = Number(process.env.TODOIST_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TODOIST_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), {
      method,
      headers: { Authorization: `Bearer ${token}`, ...(opts?.body ? { "Content-Type": "application/json" } : {}) },
      body: opts?.body ? JSON.stringify(opts.body) : undefined,
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") throw new Error(`Todoist request timed out after ${TODOIST_TIMEOUT_MS}ms.`);
    throw new Error(`Todoist network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("Todoist rate limit reached (HTTP 429). Please wait and retry.");
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) throw new Error(`Todoist error (${res.status}): ${(data as { error?: string }).error ?? text.slice(0, 200) ?? `status ${res.status}`}`);
  return data as T;
}

function stamp(result: unknown, nextSteps: string[]): Record<string, unknown> {
  return stampMeta(result, { source: TODOIST_SOURCE, fetched_at: new Date().toISOString(), next_steps: nextSteps });
}

export async function todoistListProjects(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const data = await tdFetch(token, "GET", "/projects");
  return stamp({ projects: data }, ["Use todoist_list_tasks with a project_id to see its tasks."]);
}

export async function todoistListTasks(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const params: Record<string, string> = {};
  if (args.project_id) params.project_id = String(args.project_id);
  if (args.filter) params.filter = String(args.filter);
  const data = await tdFetch(token, "GET", "/tasks", { params });
  return stamp({ tasks: data }, ["Use todoist_create_task to add one, or todoist_complete_task to close one."]);
}

export async function todoistCreateTask(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const content = String(args.content ?? "").trim();
  if (!content) return { error: "content is required (the task text)." };
  const body: Record<string, unknown> = { content };
  if (args.project_id) body.project_id = String(args.project_id);
  if (args.due_string) body.due_string = String(args.due_string);
  if (args.priority) body.priority = Number(args.priority);
  const data = await tdFetch(token, "POST", "/tasks", { body });
  return stamp(data, ["Use todoist_list_tasks to confirm, or todoist_complete_task to close it."]);
}

export async function todoistCompleteTask(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const id = String(args.task_id ?? "").trim();
  if (!id) return { error: "task_id is required." };
  await tdFetch(token, "POST", `/tasks/${encodeURIComponent(id)}/close`);
  return stamp({ closed: true, task_id: id }, ["Use todoist_list_tasks to see what is left."]);
}
