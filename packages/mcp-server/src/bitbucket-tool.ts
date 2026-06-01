// Bitbucket integration for the UnClick MCP server.
// Uses the Bitbucket Cloud REST API 2.0 via fetch - no external dependencies.
// Auth: Basic auth with your username + an App password
// (https://bitbucket.org/account/settings/app-passwords/). Pass workspace to
// scope repo listings.

import { notConnectedFor } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const BITBUCKET_BASE = "https://api.bitbucket.org/2.0";
const BITBUCKET_SOURCE = "Bitbucket Cloud REST API 2.0";

function requireAuth(args: Record<string, unknown>): string | NotConnectedResult {
  const username = String(args.username ?? process.env.BITBUCKET_USERNAME ?? "").trim();
  const appPassword = String(args.app_password ?? process.env.BITBUCKET_APP_PASSWORD ?? "").trim();
  if (!username || !appPassword) return notConnectedFor("bitbucket");
  return `Basic ${Buffer.from(`${username}:${appPassword}`).toString("base64")}`;
}

async function bbFetch<T>(authHeader: string, path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${BITBUCKET_BASE}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const BITBUCKET_TIMEOUT_MS = Number(process.env.BITBUCKET_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), BITBUCKET_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), { headers: { Authorization: authHeader, Accept: "application/json" }, signal: controller.signal });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") throw new Error(`Bitbucket request timed out after ${BITBUCKET_TIMEOUT_MS}ms.`);
    throw new Error(`Bitbucket network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("Bitbucket rate limit reached (HTTP 429). Please wait and retry.");
  const data = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok) throw new Error(`Bitbucket error (${res.status}): ${(data.error as { message?: string })?.message ?? `status ${res.status}`}`);
  return data as T;
}

function stamp(result: unknown, nextSteps: string[]): Record<string, unknown> {
  return stampMeta(result, { source: BITBUCKET_SOURCE, fetched_at: new Date().toISOString(), next_steps: nextSteps });
}

export async function bitbucketListRepos(args: Record<string, unknown>): Promise<unknown> {
  const auth = requireAuth(args);
  if (typeof auth !== "string") return auth;
  const workspace = String(args.workspace ?? "").trim();
  if (!workspace) return { error: "workspace is required (your Bitbucket workspace id)." };
  const data = await bbFetch(auth, `/repositories/${encodeURIComponent(workspace)}`, { pagelen: String(Math.min(100, Number(args.limit) || 25)) });
  return stamp(data, ["Use bitbucket_list_pull_requests with a returned repo slug to see open PRs."]);
}

export async function bitbucketGetRepo(args: Record<string, unknown>): Promise<unknown> {
  const auth = requireAuth(args);
  if (typeof auth !== "string") return auth;
  const workspace = String(args.workspace ?? "").trim();
  const repo = String(args.repo ?? "").trim();
  if (!workspace || !repo) return { error: "workspace and repo are both required." };
  const data = await bbFetch(auth, `/repositories/${encodeURIComponent(workspace)}/${encodeURIComponent(repo)}`);
  return stamp(data, ["Use bitbucket_list_pull_requests for this repo's open pull requests."]);
}

export async function bitbucketListPullRequests(args: Record<string, unknown>): Promise<unknown> {
  const auth = requireAuth(args);
  if (typeof auth !== "string") return auth;
  const workspace = String(args.workspace ?? "").trim();
  const repo = String(args.repo ?? "").trim();
  if (!workspace || !repo) return { error: "workspace and repo are both required." };
  const params: Record<string, string> = { pagelen: String(Math.min(50, Number(args.limit) || 25)) };
  if (args.state) params.state = String(args.state).toUpperCase();
  const data = await bbFetch(auth, `/repositories/${encodeURIComponent(workspace)}/${encodeURIComponent(repo)}/pullrequests`, params);
  return stamp(data, ["Use bitbucket_get_repo for the repo's metadata and default branch."]);
}
