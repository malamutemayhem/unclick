// Shared admin-API client used by every Crews-related MCP tool handler.
// All Crews actions live behind /api/memory-admin?action=<name> on the
// UnClick API. The client is a thin wrapper around fetch that injects
// the tenant API key as a Bearer token and parses the response as JSON.

import type { ConversationalCard } from "../cards/card.js";

const API_BASE = (process.env.UNCLICK_API_URL ?? "https://unclick.world").replace(/\/$/, "");

export function getApiKey(): string {
  const key = process.env.UNCLICK_API_KEY?.trim();
  if (!key) {
    throw new Error(
      "UNCLICK_API_KEY env var is not set. Get your install config at https://unclick.world",
    );
  }
  return key;
}

export type AdminResponse = {
  ok: boolean;
  status: number;
  json: unknown;
};

export type AdminCard = {
  card?: ConversationalCard;
  error?: string;
  message?: string;
  run_id?: string;
  was_duplicate?: boolean;
  state?: string;
  parse_error?: string;
  total_hats?: number;
  hat_index?: number;
  hats_done?: number;
  synthesis_verdict?: Record<string, unknown> | null;
  hats_consulted?: string[];
  server_capabilities?: Record<string, unknown>;
  client_capabilities?: Record<string, unknown> | null;
};

export async function adminCall(
  action: string,
  body: Record<string, unknown> | null,
  method: "GET" | "POST",
  query?: Record<string, string>,
): Promise<AdminResponse> {
  const apiKey = getApiKey();
  const qs = new URLSearchParams({ action, ...(query ?? {}) }).toString();
  const url = `${API_BASE}/api/memory-admin?${qs}`;
  const init: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };
  if (method === "POST" && body) init.body = JSON.stringify(body);
  const res = await fetch(url, init);
  const text = await res.text();
  let json: unknown = text;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    /* keep raw text */
  }
  return { ok: res.ok, status: res.status, json };
}
