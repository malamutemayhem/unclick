import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://opentdb.com";
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

export async function triviaDbQuestions(args: Record<string, unknown>) {
  const params = [`amount=${Number(args.amount) || 5}`];
  if (args.category) params.push(`category=${Number(args.category)}`);
  if (args.difficulty) params.push(`difficulty=${encodeURIComponent(String(args.difficulty))}`);
  if (args.type) params.push(`type=${encodeURIComponent(String(args.type))}`);
  const data = await fetchJson(`${BASE}/api.php?${params.join("&")}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ trivia: data }, { source: "opentdb.com", fetched_at: new Date().toISOString(), next_steps: ["Categories: 9=General, 11=Film, 12=Music, 15=Video Games, 17=Science, 18=Computers, 21=Sports, 22=Geography, 23=History.", "Difficulty: easy, medium, hard. Type: multiple, boolean."] });
}

export async function triviaDbCategories(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/api_category.php`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ categories: data }, { source: "opentdb.com", fetched_at: new Date().toISOString(), next_steps: ["Use the category ID with triviadb_questions to get questions in that category."] });
}
