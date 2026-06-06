// Brevo (formerly Sendinblue) integration for the UnClick MCP server.
// Uses the Brevo REST API v3 via fetch - no external dependencies.
// Auth: an API key sent in the "api-key" header from
// https://app.brevo.com/settings/keys/api.

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const BREVO_BASE = "https://api.brevo.com/v3";
const BREVO_SOURCE = "Brevo API v3";

function requireKey(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("brevo", args);
}

async function brevoFetch<T>(key: string, path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${BREVO_BASE}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const BREVO_TIMEOUT_MS = Number(process.env.BREVO_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), BREVO_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), { headers: { "api-key": key, Accept: "application/json" }, signal: controller.signal });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") throw new Error(`Brevo request timed out after ${BREVO_TIMEOUT_MS}ms.`);
    throw new Error(`Brevo network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("Brevo rate limit reached (HTTP 429). Please wait and retry.");
  const data = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok) throw new Error(`Brevo error (${res.status}): ${(data.message as string) ?? `status ${res.status}`}`);
  return data as T;
}

function stamp(result: unknown, nextSteps: string[]): Record<string, unknown> {
  return stampMeta(result, { source: BREVO_SOURCE, fetched_at: new Date().toISOString(), next_steps: nextSteps });
}

export async function brevoListContacts(args: Record<string, unknown>): Promise<unknown> {
  const key = requireKey(args);
  if (typeof key !== "string") return key;
  const params: Record<string, string> = { limit: String(Math.min(1000, Number(args.limit) || 50)) };
  if (args.offset) params.offset = String(args.offset);
  const data = await brevoFetch(key, "/contacts", params);
  return stamp(data, ["Use brevo_list_campaigns to see email campaigns, or brevo_get_account for plan details."]);
}

export async function brevoListCampaigns(args: Record<string, unknown>): Promise<unknown> {
  const key = requireKey(args);
  if (typeof key !== "string") return key;
  const params: Record<string, string> = { limit: String(Math.min(100, Number(args.limit) || 25)) };
  if (args.status) params.status = String(args.status);
  const data = await brevoFetch(key, "/emailCampaigns", params);
  return stamp(data, ["Use brevo_list_contacts to see who the campaigns target."]);
}

export async function brevoGetAccount(args: Record<string, unknown>): Promise<unknown> {
  const key = requireKey(args);
  if (typeof key !== "string") return key;
  const data = await brevoFetch(key, "/account");
  return stamp(data, ["Use brevo_list_campaigns or brevo_list_contacts to work with your audience."]);
}
