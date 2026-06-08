import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://ghibliapi.vercel.app";
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

export async function ghibliFilms(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/films`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ films: data }, { source: "ghibliapi.vercel.app", fetched_at: new Date().toISOString(), next_steps: ["Use ghibli_people to browse characters."] });
}

export async function ghibliPeople(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/people`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ people: data }, { source: "ghibliapi.vercel.app", fetched_at: new Date().toISOString(), next_steps: ["Use ghibli_films to browse films."] });
}
