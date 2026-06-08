import { stampMeta } from "./connector-meta.js";

const BASE = "https://api.stackexchange.com/2.3";
const TIMEOUT = 10_000;

export async function stackexchangeSearch(args: Record<string, unknown>) {
  const query = String(args.query ?? "").trim();
  if (!query) return { error: "query is required" };
  const site = String(args.site ?? "stackoverflow");
  const page = Number(args.page) || 1;
  const url = `${BASE}/search/advanced?order=desc&sort=relevance&q=${encodeURIComponent(query)}&site=${encodeURIComponent(site)}&page=${page}&pagesize=10&filter=withbody`;
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) });
  if (!res.ok) throw new Error(`StackExchange search ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: `api.stackexchange.com search "${query}"`,
    fetched_at: new Date().toISOString(),
    next_steps: ["read individual question details", "check accepted answers"],
  });
}

export async function stackexchangeQuestion(args: Record<string, unknown>) {
  const id = String(args.id ?? "").trim();
  if (!id) return { error: "id is required" };
  const site = String(args.site ?? "stackoverflow");
  const url = `${BASE}/questions/${encodeURIComponent(id)}?order=desc&sort=activity&site=${encodeURIComponent(site)}&filter=withbody`;
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) });
  if (!res.ok) throw new Error(`StackExchange question ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: `api.stackexchange.com question/${id}`,
    fetched_at: new Date().toISOString(),
    next_steps: ["fetch answers for this question", "check related questions"],
  });
}
