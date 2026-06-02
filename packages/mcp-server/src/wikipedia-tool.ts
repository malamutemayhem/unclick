// Wikipedia integration for the UnClick MCP server.
// Uses the public MediaWiki + REST APIs via fetch - no key, no dependencies.
// Defaults to English; pass lang (e.g. "es", "de") to use another Wikipedia.

import { stampMeta } from "./connector-meta.js";

function wikiSource(lang: string): string {
  return `Wikipedia (${lang})`;
}

function langOf(args: Record<string, unknown>): string {
  const l = String(args.lang ?? "en").trim().toLowerCase();
  return /^[a-z]{2,3}(-[a-z]+)?$/.test(l) ? l : "en";
}

async function wikiFetch<T>(url: string): Promise<T> {
  const WIKIPEDIA_TIMEOUT_MS = Number(process.env.WIKIPEDIA_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), WIKIPEDIA_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url, { headers: { Accept: "application/json", "User-Agent": "UnClickMCP/1.0 (https://unclick.world)" }, signal: controller.signal });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") throw new Error(`Wikipedia request timed out after ${WIKIPEDIA_TIMEOUT_MS}ms.`);
    throw new Error(`Wikipedia network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("Wikipedia rate limit reached (HTTP 429). Please wait and retry.");
  const data = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok) throw new Error(`Wikipedia error (${res.status}): ${(data as { title?: string }).title ?? `status ${res.status}`}`);
  return data as T;
}

function stamp(result: unknown, lang: string, nextSteps: string[]): Record<string, unknown> {
  return stampMeta(result, { source: wikiSource(lang), fetched_at: new Date().toISOString(), next_steps: nextSteps });
}

export async function wikipediaSearch(args: Record<string, unknown>): Promise<unknown> {
  const query = String(args.query ?? "").trim();
  if (!query) return { error: "query is required (what to search for)." };
  const lang = langOf(args);
  const limit = Math.min(50, Number(args.limit) || 10);
  const url = `https://${lang}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=${limit}&format=json&origin=*`;
  const data = await wikiFetch<{ query?: { search?: unknown[] } }>(url);
  return stamp({ results: data.query?.search ?? [] }, lang, ["Use wikipedia_summary with a returned title for a short overview."]);
}

export async function wikipediaSummary(args: Record<string, unknown>): Promise<unknown> {
  const title = String(args.title ?? "").trim();
  if (!title) return { error: "title is required (the exact page title)." };
  const lang = langOf(args);
  const url = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g, "_"))}`;
  const data = await wikiFetch(url);
  return stamp(data, lang, ["Use wikipedia_page for the full plain-text article."]);
}

export async function wikipediaPage(args: Record<string, unknown>): Promise<unknown> {
  const title = String(args.title ?? "").trim();
  if (!title) return { error: "title is required (the exact page title)." };
  const lang = langOf(args);
  const url = `https://${lang}.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=1&titles=${encodeURIComponent(title)}&format=json&origin=*`;
  const data = await wikiFetch<{ query?: { pages?: Record<string, { title?: string; extract?: string }> } }>(url);
  const pages = data.query?.pages ?? {};
  const page = Object.values(pages)[0] ?? null;
  return stamp({ title: page?.title ?? title, extract: page?.extract ?? "" }, lang, ["Use wikipedia_search to find a different article."]);
}
