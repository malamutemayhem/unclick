// Jira (Atlassian Cloud) integration for the UnClick MCP server.
// Uses the Jira Cloud REST API v3 via fetch - no external dependencies.
// Auth: Basic auth with your Atlassian account email + an API token from
// https://id.atlassian.com/manage-profile/security/api-tokens, plus the site
// (e.g. "mycompany" or "mycompany.atlassian.net").

import { notConnectedFor } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const JIRA_SOURCE = "Jira Cloud REST API v3";

interface JiraCreds {
  baseUrl: string;
  authHeader: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function requireCreds(args: Record<string, unknown>): JiraCreds | NotConnectedResult {
  const rawSite = String(args.site ?? process.env.JIRA_SITE ?? "").trim();
  const email = String(args.email ?? process.env.JIRA_EMAIL ?? "").trim();
  const token = String(args.api_token ?? process.env.JIRA_API_TOKEN ?? "").trim();
  if (!rawSite || !email || !token) return notConnectedFor("jira");
  // Accept "mycompany", "mycompany.atlassian.net", or a full URL.
  const host = rawSite
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "")
    .replace(/\.atlassian\.net$/, "");
  const baseUrl = `https://${host}.atlassian.net`;
  const authHeader = `Basic ${Buffer.from(`${email}:${token}`).toString("base64")}`;
  return { baseUrl, authHeader };
}

async function jiraFetch<T>(
  creds: JiraCreds,
  method: string,
  path: string,
  opts?: { params?: Record<string, string>; body?: unknown },
): Promise<T> {
  const url = new URL(`${creds.baseUrl}${path}`);
  if (opts?.params) Object.entries(opts.params).forEach(([k, v]) => url.searchParams.set(k, v));
  const JIRA_TIMEOUT_MS = Number(process.env.JIRA_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), JIRA_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), {
      method,
      headers: {
        Authorization: creds.authHeader,
        Accept: "application/json",
        ...(opts?.body ? { "Content-Type": "application/json" } : {}),
      },
      body: opts?.body ? JSON.stringify(opts.body) : undefined,
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Jira request timed out after ${JIRA_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Jira network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("Jira rate limit reached (HTTP 429). Please wait and retry.");
  const data = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok) {
    const errors = data.errorMessages as string[] | undefined;
    const msg = errors?.join(", ") || JSON.stringify(data.errors ?? {}) || `status ${res.status}`;
    throw new Error(`Jira error (${res.status}): ${msg}`);
  }
  return data as T;
}

function stamp(result: unknown, nextSteps: string[], defaultsUsed: string[] = []): Record<string, unknown> {
  return stampMeta(result, {
    source: JIRA_SOURCE,
    fetched_at: new Date().toISOString(),
    defaults_used: defaultsUsed,
    next_steps: nextSteps,
  });
}

function collectDefaults(args: Record<string, unknown>): string[] {
  return Array.isArray(args.__unclick_memory_defaults)
    ? args.__unclick_memory_defaults.filter((v): v is string => typeof v === "string")
    : [];
}

// Minimal Atlassian Document Format wrapper for a plain-text body.
function adf(text: string): Record<string, unknown> {
  return {
    type: "doc",
    version: 1,
    content: [{ type: "paragraph", content: [{ type: "text", text }] }],
  };
}

// ─── Operations ───────────────────────────────────────────────────────────────

export async function jiraSearchIssues(args: Record<string, unknown>): Promise<unknown> {
  const creds = requireCreds(args);
  if ("not_connected" in creds) return creds;
  const jql = String(args.jql ?? "").trim() || "order by updated DESC";
  const params: Record<string, string> = {
    jql,
    maxResults: String(Math.min(100, Number(args.max_results) || 25)),
    fields: String(args.fields ?? "summary,status,assignee,priority,updated,issuetype"),
  };
  const data = await jiraFetch(creds, "GET", "/rest/api/3/search", { params });
  return stamp(data, ["Use jira_get_issue with a returned key for the full issue, including the description and comments."]);
}

export async function jiraGetIssue(args: Record<string, unknown>): Promise<unknown> {
  const creds = requireCreds(args);
  if ("not_connected" in creds) return creds;
  const key = String(args.issue_key ?? "").trim();
  if (!key) return { error: "issue_key is required (e.g. PROJ-123)." };
  const data = await jiraFetch(creds, "GET", `/rest/api/3/issue/${encodeURIComponent(key)}`);
  return stamp(data, ["Use jira_add_comment to respond, or jira_search_issues to find related issues."]);
}

export async function jiraListProjects(args: Record<string, unknown>): Promise<unknown> {
  const creds = requireCreds(args);
  if ("not_connected" in creds) return creds;
  const params: Record<string, string> = {
    maxResults: String(Math.min(100, Number(args.max_results) || 50)),
  };
  if (args.query) params.query = String(args.query);
  const data = await jiraFetch(creds, "GET", "/rest/api/3/project/search", { params });
  return stamp(data, ["Use a project key as project_key in jira_create_issue, or filter jira_search_issues with jql like 'project = KEY'."]);
}

export async function jiraCreateIssue(args: Record<string, unknown>): Promise<unknown> {
  const creds = requireCreds(args);
  if ("not_connected" in creds) return creds;
  const projectKey = String(args.project_key ?? "").trim();
  const summary = String(args.summary ?? "").trim();
  if (!projectKey) return { error: "project_key is required (set a default with save_fact so you can omit it)." };
  if (!summary) return { error: "summary is required." };
  const fields: Record<string, unknown> = {
    project: { key: projectKey },
    summary,
    issuetype: { name: String(args.issue_type ?? "Task") },
  };
  const description = String(args.description ?? "").trim();
  if (description) fields.description = adf(description);
  const data = await jiraFetch(creds, "POST", "/rest/api/3/issue", { body: { fields } });
  return stamp(
    data,
    ["Use jira_get_issue with the returned key to confirm, or jira_add_comment to add detail."],
    collectDefaults(args),
  );
}

export async function jiraAddComment(args: Record<string, unknown>): Promise<unknown> {
  const creds = requireCreds(args);
  if ("not_connected" in creds) return creds;
  const key = String(args.issue_key ?? "").trim();
  const text = String(args.body ?? "").trim();
  if (!key) return { error: "issue_key is required (e.g. PROJ-123)." };
  if (!text) return { error: "body is required." };
  const data = await jiraFetch(creds, "POST", `/rest/api/3/issue/${encodeURIComponent(key)}/comment`, {
    body: { body: adf(text) },
  });
  return stamp(data, ["Use jira_get_issue to see the comment in context."]);
}
