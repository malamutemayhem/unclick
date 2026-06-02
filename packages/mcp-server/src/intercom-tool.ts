// Intercom integration for the UnClick MCP server.
// Uses the Intercom REST API via fetch - no external dependencies.
// Auth: an access token (Authorization: Bearer) from your Intercom app's
// Developer Hub (https://developers.intercom.com/).

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const INTERCOM_BASE = "https://api.intercom.io";
const INTERCOM_SOURCE = "Intercom API";

function requireToken(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("intercom", args);
}

async function icFetch<T>(
  token: string,
  method: string,
  path: string,
  opts?: { params?: Record<string, string>; body?: unknown },
): Promise<T> {
  const url = new URL(`${INTERCOM_BASE}${path}`);
  if (opts?.params) Object.entries(opts.params).forEach(([k, v]) => url.searchParams.set(k, v));
  const INTERCOM_TIMEOUT_MS = Number(process.env.INTERCOM_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), INTERCOM_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Intercom-Version": "2.11",
        ...(opts?.body ? { "Content-Type": "application/json" } : {}),
      },
      body: opts?.body ? JSON.stringify(opts.body) : undefined,
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Intercom request timed out after ${INTERCOM_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Intercom network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("Intercom rate limit reached (HTTP 429). Please wait and retry.");
  const data = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok) {
    const errors = data.errors as Array<{ message?: string }> | undefined;
    const msg = errors?.map((e) => e.message).join(", ") ?? `status ${res.status}`;
    throw new Error(`Intercom error (${res.status}): ${msg}`);
  }
  return data as T;
}

function stamp(result: unknown, nextSteps: string[]): Record<string, unknown> {
  return stampMeta(result, { source: INTERCOM_SOURCE, fetched_at: new Date().toISOString(), next_steps: nextSteps });
}

// ─── Operations ───────────────────────────────────────────────────────────────

export async function intercomListConversations(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const params: Record<string, string> = { per_page: String(Math.min(150, Number(args.limit) || 20)) };
  if (args.starting_after) params.starting_after = String(args.starting_after);
  const data = await icFetch(token, "GET", "/conversations", { params });
  return stamp(data, ["Use intercom_get_conversation with a returned id for the full thread."]);
}

export async function intercomGetConversation(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const id = String(args.conversation_id ?? "").trim();
  if (!id) return { error: "conversation_id is required." };
  const data = await icFetch(token, "GET", `/conversations/${encodeURIComponent(id)}`);
  return stamp(data, ["Use intercom_search_contacts to look up the customer on this conversation."]);
}

export async function intercomListContacts(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const params: Record<string, string> = { per_page: String(Math.min(150, Number(args.limit) || 25)) };
  if (args.starting_after) params.starting_after = String(args.starting_after);
  const data = await icFetch(token, "GET", "/contacts", { params });
  return stamp(data, ["Use intercom_search_contacts to find one by email, or intercom_list_conversations for their threads."]);
}

export async function intercomSearchContacts(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const query = String(args.query ?? "").trim();
  if (!query) return { error: "query is required (matched against contact email)." };
  const body = { query: { field: "email", operator: "~", value: query } };
  const data = await icFetch(token, "POST", "/contacts/search", { body });
  return stamp(data, ["Use intercom_get_conversation to read a matched contact's conversations."]);
}
