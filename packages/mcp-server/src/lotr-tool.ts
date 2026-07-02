import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://the-one-api.dev/v2";
const TIMEOUT_MS = 10_000;

async function fetchJson(url: string, token?: string): Promise<unknown> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const headers: Record<string, string> = { "User-Agent": UA };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(url, { headers, signal: ac.signal });
    clearTimeout(timer);
    if (res.status === 429) return { error: "Rate limit exceeded. Try again in a minute." };
    if (res.status === 401) return { error: "API key required. Set LOTR_API_KEY (free at the-one-api.dev)." };
    if (!res.ok) return { error: `HTTP ${res.status}: ${await res.text()}` };
    return await res.json();
  } catch (e: unknown) {
    clearTimeout(timer);
    if (e instanceof Error && e.name === "AbortError") return { error: "Request timed out." };
    return { error: String(e) };
  }
}

function getKey(): string | undefined {
  return typeof process !== "undefined" ? process.env.LOTR_API_KEY : undefined;
}

export async function lotrBooks(_args: Record<string, unknown>) {
  const key = getKey();
  const data = await fetchJson(`${BASE}/book`, key);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "the-one-api.dev", fetched_at: new Date().toISOString(), next_steps: ["Use lotr_characters to browse characters.", "Use lotr_quotes for movie quotes."] });
}

export async function lotrCharacters(args: Record<string, unknown>) {
  const key = getKey();
  const params: string[] = [];
  if (args.name) params.push(`name=/${encodeURIComponent(String(args.name))}/i`);
  params.push(`limit=${Number(args.limit) || 10}`);
  const qs = params.join("&");
  const data = await fetchJson(`${BASE}/character?${qs}`, key);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "the-one-api.dev", fetched_at: new Date().toISOString(), next_steps: ["Use lotr_books to browse the book series.", "Use lotr_quotes for movie quotes."] });
}

export async function lotrQuotes(args: Record<string, unknown>) {
  const key = getKey();
  const limit = Number(args.limit) || 10;
  const data = await fetchJson(`${BASE}/quote?limit=${limit}`, key);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "the-one-api.dev", fetched_at: new Date().toISOString(), next_steps: ["Use lotr_characters to find who said the quote.", "Use lotr_books to browse the book series."] });
}
