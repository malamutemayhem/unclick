import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.balldontlie.io/v1";
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

export async function nbaPlayers(args: Record<string, unknown>) {
  const params: string[] = [];
  if (args.search) params.push(`search=${encodeURIComponent(String(args.search))}`);
  params.push(`per_page=${Number(args.limit) || 25}`);
  const qs = params.join("&");
  const data = await fetchJson(`${BASE}/players?${qs}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "balldontlie.io", fetched_at: new Date().toISOString(), next_steps: ["Use nba_teams to see all NBA teams.", "Use nba_games to see game scores."] });
}

export async function nbaTeams(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/teams`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "balldontlie.io", fetched_at: new Date().toISOString(), next_steps: ["Use nba_players to search for players.", "Use nba_games to see game scores."] });
}

export async function nbaGames(args: Record<string, unknown>) {
  const params: string[] = [];
  if (args.season) params.push(`seasons[]=${args.season}`);
  if (args.team_id) params.push(`team_ids[]=${args.team_id}`);
  params.push(`per_page=${Number(args.limit) || 10}`);
  const qs = params.join("&");
  const data = await fetchJson(`${BASE}/games?${qs}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "balldontlie.io", fetched_at: new Date().toISOString(), next_steps: ["Use nba_teams to get team IDs.", "Use nba_players to look up player stats."] });
}
