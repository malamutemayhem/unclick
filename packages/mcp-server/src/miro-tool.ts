// Miro integration for the UnClick MCP server.
// Uses the Miro REST API v2 via fetch - no external dependencies.
// Auth: an access token (Authorization: Bearer) from a Miro app
// (https://developers.miro.com/).

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const MIRO_BASE = "https://api.miro.com/v2";
const MIRO_SOURCE = "Miro REST API v2";

function requireToken(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("miro", args);
}

async function miroFetch<T>(token: string, path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${MIRO_BASE}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const MIRO_TIMEOUT_MS = Number(process.env.MIRO_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), MIRO_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }, signal: controller.signal });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") throw new Error(`Miro request timed out after ${MIRO_TIMEOUT_MS}ms.`);
    throw new Error(`Miro network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("Miro rate limit reached (HTTP 429). Please wait and retry.");
  const data = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok) throw new Error(`Miro error (${res.status}): ${(data.message as string) ?? `status ${res.status}`}`);
  return data as T;
}

function stamp(result: unknown, nextSteps: string[]): Record<string, unknown> {
  return stampMeta(result, { source: MIRO_SOURCE, fetched_at: new Date().toISOString(), next_steps: nextSteps });
}

export async function miroListBoards(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const params: Record<string, string> = { limit: String(Math.min(50, Number(args.limit) || 25)) };
  if (args.query) params.query = String(args.query);
  const data = await miroFetch(token, "/boards", params);
  return stamp(data, ["Use miro_get_board with a returned id, or miro_list_items to read what is on a board."]);
}

export async function miroGetBoard(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const id = String(args.board_id ?? "").trim();
  if (!id) return { error: "board_id is required." };
  const data = await miroFetch(token, `/boards/${encodeURIComponent(id)}`);
  return stamp(data, ["Use miro_list_items to read the sticky notes, shapes, and text on this board."]);
}

export async function miroListItems(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const id = String(args.board_id ?? "").trim();
  if (!id) return { error: "board_id is required." };
  const params: Record<string, string> = { limit: String(Math.min(50, Number(args.limit) || 25)) };
  if (args.type) params.type = String(args.type);
  const data = await miroFetch(token, `/boards/${encodeURIComponent(id)}/items`, params);
  return stamp(data, ["Use miro_get_board for the board's metadata and sharing policy."]);
}
