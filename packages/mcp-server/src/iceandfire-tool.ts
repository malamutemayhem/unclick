import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://anapioficeandfire.com/api";
const TIMEOUT_MS = 10_000;

async function fetchJson(url: string): Promise<unknown> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA }, signal: ac.signal });
    clearTimeout(timer);
    if (res.status === 429) return { error: "Rate limit exceeded. Try again in a minute." };
    if (!res.ok) return { error: `HTTP ${res.status}: ${await res.text()}` };
    return await res.json();
  } catch (e: unknown) {
    clearTimeout(timer);
    if (e instanceof Error && e.name === "AbortError") return { error: "Request timed out." };
    return { error: String(e) };
  }
}

export async function iceandfireCharacters(args: Record<string, unknown>) {
  const params: string[] = [];
  if (args.name) params.push(`name=${encodeURIComponent(String(args.name))}`);
  params.push(`pageSize=${Number(args.limit) || 10}`);
  params.push("page=1");
  const qs = params.join("&");
  const data = await fetchJson(`${BASE}/characters?${qs}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ characters: data }, { source: "anapioficeandfire.com", fetched_at: new Date().toISOString(), next_steps: ["Use iceandfire_books to browse the book series.", "Use iceandfire_houses to see noble houses."] });
}

export async function iceandfireBooks(args: Record<string, unknown>) {
  const params: string[] = [];
  if (args.name) params.push(`name=${encodeURIComponent(String(args.name))}`);
  const qs = params.length ? `?${params.join("&")}` : "";
  const data = await fetchJson(`${BASE}/books${qs}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ books: data }, { source: "anapioficeandfire.com", fetched_at: new Date().toISOString(), next_steps: ["Use iceandfire_characters to search characters.", "Use iceandfire_houses to browse noble houses."] });
}

export async function iceandfireHouses(args: Record<string, unknown>) {
  const params: string[] = [];
  if (args.name) params.push(`name=${encodeURIComponent(String(args.name))}`);
  params.push(`pageSize=${Number(args.limit) || 10}`);
  params.push("page=1");
  const qs = params.join("&");
  const data = await fetchJson(`${BASE}/houses?${qs}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ houses: data }, { source: "anapioficeandfire.com", fetched_at: new Date().toISOString(), next_steps: ["Use iceandfire_characters to find characters from this house.", "Use iceandfire_books to browse the book series."] });
}
