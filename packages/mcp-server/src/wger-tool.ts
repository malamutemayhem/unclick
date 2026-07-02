import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://wger.de/api/v2";
const TIMEOUT_MS = 10_000;

async function fetchJson(url: string): Promise<unknown> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" }, signal: ac.signal });
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

export async function wgerExercises(args: Record<string, unknown>) {
  const params: string[] = ["format=json", "language=2", `limit=${Number(args.limit) || 20}`];
  if (args.category) params.push(`category=${args.category}`);
  if (args.search) params.push(`name=${encodeURIComponent(String(args.search))}`);
  const data = await fetchJson(`${BASE}/exercise/?${params.join("&")}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "wger.de", fetched_at: new Date().toISOString(), next_steps: ["Use wger_categories to see exercise category IDs.", "Use wger_muscles to see muscle group IDs."] });
}

export async function wgerCategories(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/exercisecategory/?format=json`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "wger.de", fetched_at: new Date().toISOString(), next_steps: ["Use wger_exercises with a category ID to filter exercises."] });
}

export async function wgerMuscles(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/muscle/?format=json`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "wger.de", fetched_at: new Date().toISOString(), next_steps: ["Use wger_exercises to find exercises targeting specific muscles."] });
}
