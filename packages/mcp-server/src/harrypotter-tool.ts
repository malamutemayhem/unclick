import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://hp-api.onrender.com/api";
const TIMEOUT_MS = 12_000;

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

export async function hpAllCharacters(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/characters`);
  if (data && typeof data === "object" && "error" in data) return data;
  const chars = Array.isArray(data) ? data.slice(0, 30) : [];
  return stampMeta({ characters: chars, total: Array.isArray(data) ? data.length : 0 }, { source: "hp-api.onrender.com", fetched_at: new Date().toISOString(), next_steps: ["Use hp_students for Hogwarts students only.", "Use hp_staff for Hogwarts staff only."] });
}

export async function hpStudents(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/characters/students`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ students: data }, { source: "hp-api.onrender.com", fetched_at: new Date().toISOString(), next_steps: ["Use hp_staff for Hogwarts staff.", "Use hp_by_house to filter by house."] });
}

export async function hpStaff(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/characters/staff`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ staff: data }, { source: "hp-api.onrender.com", fetched_at: new Date().toISOString(), next_steps: ["Use hp_students for students.", "Use hp_by_house to filter by house."] });
}

export async function hpByHouse(args: Record<string, unknown>) {
  const house = String(args.house ?? "").trim().toLowerCase();
  const valid = ["gryffindor", "slytherin", "hufflepuff", "ravenclaw"];
  if (!valid.includes(house)) return { error: `house must be one of: ${valid.join(", ")}` };
  const data = await fetchJson(`${BASE}/characters/house/${house}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ house, characters: data }, { source: "hp-api.onrender.com", fetched_at: new Date().toISOString(), next_steps: ["Try a different house: gryffindor, slytherin, hufflepuff, ravenclaw."] });
}
