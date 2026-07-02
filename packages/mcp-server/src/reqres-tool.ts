// Reqres - realistic fake REST API for frontend testing.
// No API key required - completely free and open.
// Base URL: https://reqres.in/api/

import { stampMeta } from "./connector-meta.js";

const BASE = "https://reqres.in/api";
const TIMEOUT_MS = Number(process.env.REQRES_TIMEOUT_MS) || 10000;

async function rqFetch<T>(path: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${BASE}${path}`, {
      headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Reqres request timed out after ${TIMEOUT_MS}ms.`);
    }
    throw new Error(`Reqres network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Reqres rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Reqres HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

const META = { source: "reqres.in" };

export async function reqresListUsers(args: Record<string, unknown>): Promise<unknown> {
  const page = Number(args.page ?? 1);
  try {
    const data = await rqFetch(`/users?page=${page}`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use reqres_get_user for a specific user.", "Increase page for more results."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function reqresGetUser(args: Record<string, unknown>): Promise<unknown> {
  const id = Number(args.id ?? 0);
  if (!id) return { error: "id is required (1-12)." };
  try {
    const data = await rqFetch(`/users/${id}`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use reqres_list_users for all users.", "Use reqres_list_resources for color resources."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function reqresListResources(args: Record<string, unknown>): Promise<unknown> {
  const page = Number(args.page ?? 1);
  try {
    const data = await rqFetch(`/unknown?page=${page}`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use reqres_list_users for user data."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
