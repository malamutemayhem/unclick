// D&D 5e SRD API.
// No API key required - completely free and open.
// Base URL: https://www.dnd5eapi.co/api/

import { stampMeta } from "./connector-meta.js";

const BASE = "https://www.dnd5eapi.co/api";
const TIMEOUT_MS = Number(process.env.DND5E_TIMEOUT_MS) || 10000;

async function dndFetch<T>(path: string): Promise<T> {
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
      throw new Error(`D&D 5e API request timed out after ${TIMEOUT_MS}ms.`);
    }
    throw new Error(`D&D 5e API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`D&D 5e API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`D&D 5e API HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

const META = { source: "dnd5eapi.co" };

export async function dndGetClass(args: Record<string, unknown>): Promise<unknown> {
  const index = String(args.class ?? args.index ?? "").toLowerCase();
  if (!index) return { error: "class is required (e.g. 'wizard', 'fighter')." };
  try {
    const data = await dndFetch(`/classes/${encodeURIComponent(index)}`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use dnd_list_classes to see all classes.", "Use dnd_get_spell to look up a spell."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function dndListClasses(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await dndFetch("/classes");
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use dnd_get_class with an index for details."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function dndGetSpell(args: Record<string, unknown>): Promise<unknown> {
  const index = String(args.spell ?? args.index ?? "").toLowerCase().replace(/\s+/g, "-");
  if (!index) return { error: "spell is required (e.g. 'fireball', 'magic-missile')." };
  try {
    const data = await dndFetch(`/spells/${encodeURIComponent(index)}`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use dnd_list_spells to browse all spells.", "Use dnd_get_monster to look up a creature."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function dndListSpells(args: Record<string, unknown>): Promise<unknown> {
  const school = args.school ? String(args.school).toLowerCase() : "";
  const level = args.level !== undefined ? Number(args.level) : undefined;
  try {
    let path = "/spells";
    const params: string[] = [];
    if (school) params.push(`school=${encodeURIComponent(school)}`);
    if (level !== undefined && !isNaN(level)) params.push(`level=${level}`);
    if (params.length) path += `?${params.join("&")}`;
    const data = await dndFetch(path);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use dnd_get_spell with an index for full details."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function dndGetMonster(args: Record<string, unknown>): Promise<unknown> {
  const index = String(args.monster ?? args.index ?? "").toLowerCase().replace(/\s+/g, "-");
  if (!index) return { error: "monster is required (e.g. 'goblin', 'adult-red-dragon')." };
  try {
    const data = await dndFetch(`/monsters/${encodeURIComponent(index)}`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use dnd_list_monsters to browse all monsters."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function dndListMonsters(args: Record<string, unknown>): Promise<unknown> {
  const cr = args.challenge_rating !== undefined ? String(args.challenge_rating) : "";
  try {
    let path = "/monsters";
    if (cr) path += `?challenge_rating=${encodeURIComponent(cr)}`;
    const data = await dndFetch(path);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use dnd_get_monster with an index for full stat block."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
