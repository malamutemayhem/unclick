// Zendesk Support integration for the UnClick MCP server.
// Uses the Zendesk REST API v2 via fetch - no external dependencies.
// Auth: Basic auth with "{email}/token:{api_token}", plus your subdomain.
// Create an API token at https://{subdomain}.zendesk.com/admin/apps-integrations/apis/zendesk-api/settings/tokens.

import { notConnectedFor } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";
import { emitConnectorSignal } from "./signals/emit.js";

const ZENDESK_SOURCE = "Zendesk API v2";

interface ZdCreds {
  baseUrl: string;
  authHeader: string;
}

function requireCreds(args: Record<string, unknown>): ZdCreds | NotConnectedResult {
  const sub = String(args.subdomain ?? process.env.ZENDESK_SUBDOMAIN ?? "").trim()
    .replace(/^https?:\/\//, "")
    .replace(/\.zendesk\.com.*$/, "")
    .replace(/\/.*$/, "");
  const email = String(args.email ?? process.env.ZENDESK_EMAIL ?? "").trim();
  const token = String(args.api_token ?? process.env.ZENDESK_API_TOKEN ?? "").trim();
  if (!sub || !email || !token) return notConnectedFor("zendesk");
  return {
    baseUrl: `https://${sub}.zendesk.com/api/v2`,
    authHeader: `Basic ${Buffer.from(`${email}/token:${token}`).toString("base64")}`,
  };
}

async function zdFetch<T>(
  creds: ZdCreds,
  method: string,
  path: string,
  opts?: { params?: Record<string, string>; body?: unknown },
): Promise<T> {
  const url = new URL(`${creds.baseUrl}${path}`);
  if (opts?.params) Object.entries(opts.params).forEach(([k, v]) => url.searchParams.set(k, v));
  const ZENDESK_TIMEOUT_MS = Number(process.env.ZENDESK_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ZENDESK_TIMEOUT_MS);
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
      throw new Error(`Zendesk request timed out after ${ZENDESK_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Zendesk network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("Zendesk rate limit reached (HTTP 429). Please wait and retry.");
  const data = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok) {
    const msg = (data.error as string) ?? (data.description as string) ?? `status ${res.status}`;
    throw new Error(`Zendesk error (${res.status}): ${msg}`);
  }
  return data as T;
}

function stamp(result: unknown, nextSteps: string[]): Record<string, unknown> {
  return stampMeta(result, { source: ZENDESK_SOURCE, fetched_at: new Date().toISOString(), next_steps: nextSteps });
}

// ─── Operations ───────────────────────────────────────────────────────────────

export async function zendeskSearch(args: Record<string, unknown>): Promise<unknown> {
  const creds = requireCreds(args);
  if ("not_connected" in creds) return creds;
  const query = String(args.query ?? "").trim();
  if (!query) return { error: "query is required (e.g. 'type:ticket status:open priority:urgent')." };
  const data = await zdFetch(creds, "GET", "/search.json", { params: { query } });
  return stamp(data, ["Use zendesk_get_ticket with a returned id for the full conversation."]);
}

export async function zendeskListTickets(args: Record<string, unknown>): Promise<unknown> {
  const creds = requireCreds(args);
  if ("not_connected" in creds) return creds;
  const params: Record<string, string> = { per_page: String(Math.min(100, Number(args.limit) || 25)) };
  if (args.sort_by) params.sort_by = String(args.sort_by);
  const data = await zdFetch<{ tickets?: Array<{ status?: string }> }>(creds, "GET", "/tickets.json", { params });

  // L4 proactive: brand-new tickets are user-actionable, so signal the caller's
  // own inbox when any of the returned tickets are still in the "new" state.
  const newCount = (data.tickets ?? []).filter((t) => t?.status === "new").length;
  if (newCount > 0) {
    void emitConnectorSignal({
      tool: "zendesk_list_tickets",
      action: "tickets_new",
      severity: "action_needed",
      summary: `${newCount} new Zendesk ticket${newCount === 1 ? "" : "s"} awaiting triage.`,
      deepLink: "/tools/zendesk",
      payload: { new_count: newCount },
    });
  }

  return stamp(data, ["Use zendesk_search with 'status:open' to narrow, or zendesk_get_ticket for one ticket."]);
}

export async function zendeskGetTicket(args: Record<string, unknown>): Promise<unknown> {
  const creds = requireCreds(args);
  if ("not_connected" in creds) return creds;
  const id = String(args.ticket_id ?? "").trim();
  if (!id) return { error: "ticket_id is required." };
  const data = await zdFetch(creds, "GET", `/tickets/${encodeURIComponent(id)}.json`);
  return stamp(data, ["Use zendesk_add_comment to reply on this ticket."]);
}

export async function zendeskAddComment(args: Record<string, unknown>): Promise<unknown> {
  const creds = requireCreds(args);
  if ("not_connected" in creds) return creds;
  const id = String(args.ticket_id ?? "").trim();
  const body = String(args.body ?? "").trim();
  if (!id) return { error: "ticket_id is required." };
  if (!body) return { error: "body is required." };
  const isPublic = args.public === undefined ? true : Boolean(args.public);
  const payload = { ticket: { comment: { body, public: isPublic } } };
  const data = await zdFetch(creds, "PUT", `/tickets/${encodeURIComponent(id)}.json`, { body: payload });
  return stamp(data, ["Use zendesk_get_ticket to confirm the comment landed."]);
}
