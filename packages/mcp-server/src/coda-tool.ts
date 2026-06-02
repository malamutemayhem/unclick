// Coda integration for the UnClick MCP server.
// Uses the Coda REST API v1 via fetch - no external dependencies.
// Auth: an API token (Authorization: Bearer) from https://coda.io/account.

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const CODA_BASE = "https://coda.io/apis/v1";
const CODA_SOURCE = "Coda API v1";

function requireToken(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("coda", args);
}

async function codaFetch<T>(token: string, path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${CODA_BASE}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const CODA_TIMEOUT_MS = Number(process.env.CODA_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CODA_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }, signal: controller.signal });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") throw new Error(`Coda request timed out after ${CODA_TIMEOUT_MS}ms.`);
    throw new Error(`Coda network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("Coda rate limit reached (HTTP 429). Please wait and retry.");
  const data = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok) throw new Error(`Coda error (${res.status}): ${(data.message as string) ?? `status ${res.status}`}`);
  return data as T;
}

function stamp(result: unknown, nextSteps: string[]): Record<string, unknown> {
  return stampMeta(result, { source: CODA_SOURCE, fetched_at: new Date().toISOString(), next_steps: nextSteps });
}

export async function codaListDocs(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const params: Record<string, string> = { limit: String(Math.min(100, Number(args.limit) || 25)) };
  if (args.query) params.query = String(args.query);
  const data = await codaFetch(token, "/docs", params);
  return stamp(data, ["Use coda_list_tables with a returned doc id to see its tables."]);
}

export async function codaListTables(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const docId = String(args.doc_id ?? "").trim();
  if (!docId) return { error: "doc_id is required (from coda_list_docs)." };
  const data = await codaFetch(token, `/docs/${encodeURIComponent(docId)}/tables`);
  return stamp(data, ["Use coda_list_rows with a doc id and table id to read the data."]);
}

export async function codaListRows(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const docId = String(args.doc_id ?? "").trim();
  const tableId = String(args.table_id ?? "").trim();
  if (!docId || !tableId) return { error: "doc_id and table_id are both required." };
  const params: Record<string, string> = { limit: String(Math.min(200, Number(args.limit) || 25)), useColumnNames: "true" };
  const data = await codaFetch(token, `/docs/${encodeURIComponent(docId)}/tables/${encodeURIComponent(tableId)}/rows`, params);
  return stamp(data, ["Use coda_list_tables to find other tables in the same doc."]);
}
