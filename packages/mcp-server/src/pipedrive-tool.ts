// Pipedrive CRM integration for the UnClick MCP server.
// Uses the Pipedrive REST API v1 via fetch - no external dependencies.
// Auth: an API token passed as the api_token query parameter (Settings >
// Personal preferences > API in Pipedrive).

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const PIPEDRIVE_BASE = "https://api.pipedrive.com/v1";
const PIPEDRIVE_SOURCE = "Pipedrive API v1";

function requireToken(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("pipedrive", args);
}

async function pdFetch<T>(token: string, path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${PIPEDRIVE_BASE}${path}`);
  url.searchParams.set("api_token", token);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const PIPEDRIVE_TIMEOUT_MS = Number(process.env.PIPEDRIVE_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), PIPEDRIVE_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), { headers: { Accept: "application/json" }, signal: controller.signal });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") throw new Error(`Pipedrive request timed out after ${PIPEDRIVE_TIMEOUT_MS}ms.`);
    throw new Error(`Pipedrive network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("Pipedrive rate limit reached (HTTP 429). Please wait and retry.");
  const data = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok) throw new Error(`Pipedrive error (${res.status}): ${(data.error as string) ?? `status ${res.status}`}`);
  return data as T;
}

function stamp(result: unknown, nextSteps: string[]): Record<string, unknown> {
  return stampMeta(result, { source: PIPEDRIVE_SOURCE, fetched_at: new Date().toISOString(), next_steps: nextSteps });
}

export async function pipedriveListDeals(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const params: Record<string, string> = { limit: String(Math.min(100, Number(args.limit) || 25)) };
  if (args.status) params.status = String(args.status);
  const data = await pdFetch(token, "/deals", params);
  return stamp(data, ["Use pipedrive_list_persons to see the contacts on these deals."]);
}

export async function pipedriveListPersons(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const params: Record<string, string> = { limit: String(Math.min(100, Number(args.limit) || 25)) };
  const data = await pdFetch(token, "/persons", params);
  return stamp(data, ["Use pipedrive_list_organizations for the companies, or pipedrive_search_deals to find a deal."]);
}

export async function pipedriveListOrganizations(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const params: Record<string, string> = { limit: String(Math.min(100, Number(args.limit) || 25)) };
  const data = await pdFetch(token, "/organizations", params);
  return stamp(data, ["Use pipedrive_list_deals to see open deals for these organizations."]);
}

export async function pipedriveSearchDeals(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const term = String(args.term ?? "").trim();
  if (!term) return { error: "term is required (the deal title or keyword to search)." };
  const data = await pdFetch(token, "/deals/search", { term, limit: String(Math.min(100, Number(args.limit) || 25)) });
  return stamp(data, ["Use pipedrive_list_persons to see who is on a matched deal."]);
}
