// Typeform integration for the UnClick MCP server.
// Uses the Typeform REST API via fetch - no external dependencies.
// Auth: a personal access token (Authorization: Bearer) from
// https://admin.typeform.com/account#/section/tokens.

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const TYPEFORM_BASE = "https://api.typeform.com";
const TYPEFORM_SOURCE = "Typeform API";

function requireToken(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("typeform", args);
}

async function tfFetch<T>(token: string, path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${TYPEFORM_BASE}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const TYPEFORM_TIMEOUT_MS = Number(process.env.TYPEFORM_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TYPEFORM_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Typeform request timed out after ${TYPEFORM_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Typeform network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("Typeform rate limit reached (HTTP 429). Please wait and retry.");
  const data = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok) {
    const msg = (data.description as string) ?? (data.message as string) ?? `status ${res.status}`;
    throw new Error(`Typeform error (${res.status}): ${msg}`);
  }
  return data as T;
}

function stamp(result: unknown, nextSteps: string[]): Record<string, unknown> {
  return stampMeta(result, { source: TYPEFORM_SOURCE, fetched_at: new Date().toISOString(), next_steps: nextSteps });
}

// ─── Operations ───────────────────────────────────────────────────────────────

export async function typeformListForms(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const params: Record<string, string> = { page_size: String(Math.min(200, Number(args.limit) || 25)) };
  if (args.search) params.search = String(args.search);
  const data = await tfFetch(token, "/forms", params);
  return stamp(data, ["Use typeform_get_responses with a returned form id to read submissions."]);
}

export async function typeformGetForm(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const id = String(args.form_id ?? "").trim();
  if (!id) return { error: "form_id is required." };
  const data = await tfFetch(token, `/forms/${encodeURIComponent(id)}`);
  return stamp(data, ["Use typeform_get_responses to read this form's submissions."]);
}

export async function typeformGetResponses(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const id = String(args.form_id ?? "").trim();
  if (!id) return { error: "form_id is required." };
  const params: Record<string, string> = { page_size: String(Math.min(1000, Number(args.limit) || 25)) };
  if (args.since) params.since = String(args.since);
  const data = await tfFetch(token, `/forms/${encodeURIComponent(id)}/responses`, params);
  return stamp(data, ["Use typeform_get_form to map answer field ids to question titles."]);
}
