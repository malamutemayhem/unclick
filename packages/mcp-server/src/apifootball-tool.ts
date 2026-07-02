// API-Football (free tier) - Football/soccer data.
// Uses free public endpoint at api-football-v1.p.rapidapi.com but we use
// the open v3.football.api-sports.io which needs API_FOOTBALL_KEY.
// Actually, let's use the free thesportsdb.com instead - no key needed.
// Base URL: https://www.thesportsdb.com/api/v1/json/3/

import { stampMeta } from "./connector-meta.js";

const BASE = "https://www.thesportsdb.com/api/v1/json/3";
const TIMEOUT_MS = Number(process.env.SPORTSDB_TIMEOUT_MS) || 10000;

async function sdbFetch<T>(path: string): Promise<T> {
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
      throw new Error(`TheSportsDB request timed out after ${TIMEOUT_MS}ms.`);
    }
    throw new Error(`TheSportsDB network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`TheSportsDB rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`TheSportsDB HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

const META = { source: "thesportsdb.com" };

export async function sportsdbSearchTeam(args: Record<string, unknown>): Promise<unknown> {
  const team = String(args.team ?? args.query ?? "");
  if (!team) return { error: "team name is required." };
  try {
    const data = await sdbFetch(`/searchteams.php?t=${encodeURIComponent(team)}`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use sportsdb_team_events for upcoming games.", "Use sportsdb_search_player to find players."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function sportsdbSearchPlayer(args: Record<string, unknown>): Promise<unknown> {
  const player = String(args.player ?? args.query ?? "");
  if (!player) return { error: "player name is required." };
  try {
    const data = await sdbFetch(`/searchplayers.php?p=${encodeURIComponent(player)}`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use sportsdb_search_team to find their team."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function sportsdbTeamEvents(args: Record<string, unknown>): Promise<unknown> {
  const id = String(args.id ?? "");
  if (!id) return { error: "team id is required (get it from sportsdb_search_team)." };
  try {
    const data = await sdbFetch(`/eventsnext.php?id=${encodeURIComponent(id)}`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use sportsdb_search_team to look up another team."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function sportsdbLeagues(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await sdbFetch("/all_leagues.php");
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use sportsdb_search_team to find a specific team."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
