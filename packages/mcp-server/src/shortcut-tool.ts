// Shortcut (formerly Clubhouse) integration for the UnClick MCP server.
// Uses the Shortcut REST API v3 via fetch - no external dependencies.
// Auth: an API token sent in the "Shortcut-Token" header, from
// https://app.shortcut.com/settings/account/api-tokens.

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const SHORTCUT_BASE = "https://api.app.shortcut.com/api/v3";
const SHORTCUT_SOURCE = "Shortcut REST API v3";

function requireToken(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("shortcut", args);
}

async function scFetch<T>(token: string, path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${SHORTCUT_BASE}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const SHORTCUT_TIMEOUT_MS = Number(process.env.SHORTCUT_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SHORTCUT_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), { headers: { "Shortcut-Token": token, Accept: "application/json" }, signal: controller.signal });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") throw new Error(`Shortcut request timed out after ${SHORTCUT_TIMEOUT_MS}ms.`);
    throw new Error(`Shortcut network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("Shortcut rate limit reached (HTTP 429). Please wait and retry.");
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = (data as { message?: string })?.message ?? `status ${res.status}`;
    throw new Error(`Shortcut error (${res.status}): ${msg}`);
  }
  return data as T;
}

function stamp(result: unknown, nextSteps: string[]): Record<string, unknown> {
  return stampMeta(result, { source: SHORTCUT_SOURCE, fetched_at: new Date().toISOString(), next_steps: nextSteps });
}

export async function shortcutSearchStories(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const query = String(args.query ?? "").trim();
  if (!query) return { error: "query is required (Shortcut search syntax, e.g. 'state:\"In Progress\"')." };
  const data = await scFetch(token, "/search/stories", { query, page_size: String(Math.min(25, Number(args.limit) || 25)) });
  return stamp(data, ["Use shortcut_get_story with a returned id for the full story."]);
}

export async function shortcutGetStory(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const id = String(args.story_id ?? "").trim();
  if (!id) return { error: "story_id is required." };
  const data = await scFetch(token, `/stories/${encodeURIComponent(id)}`);
  return stamp(data, ["Use shortcut_search_stories to find related work."]);
}

export async function shortcutListProjects(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const data = await scFetch(token, "/projects");
  return stamp({ projects: data }, ["Use shortcut_list_epics for higher-level groupings, or shortcut_search_stories to filter work."]);
}

export async function shortcutListEpics(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const data = await scFetch(token, "/epics");
  return stamp({ epics: data }, ["Use shortcut_search_stories with 'epic:<id>' to see an epic's stories."]);
}
