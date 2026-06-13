// Age of Empires II API - game reference data.
// No API key required - completely free and open.
// Base URL: https://age-of-empires-2-api.herokuapp.com/api/v1/

import { stampMeta } from "./connector-meta.js";

const BASE = "https://age-of-empires-2-api.herokuapp.com/api/v1";
const TIMEOUT_MS = Number(process.env.AOE2_TIMEOUT_MS) || 15000;

async function aoe2Fetch<T>(path: string): Promise<T> {
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
      throw new Error(`AoE2 API request timed out after ${TIMEOUT_MS}ms.`);
    }
    throw new Error(`AoE2 API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`AoE2 API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`AoE2 API HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

const META = { source: "age-of-empires-2-api" };

export async function aoe2Civilizations(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await aoe2Fetch("/civilizations");
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use aoe2_civilization with an ID for details.", "Use aoe2_units to browse units."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function aoe2Civilization(args: Record<string, unknown>): Promise<unknown> {
  const id = Number(args.id ?? 0);
  if (!id) return { error: "id is required (civilization ID number)." };
  try {
    const data = await aoe2Fetch(`/civilization/${id}`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use aoe2_civilizations to list all civilizations."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function aoe2Units(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await aoe2Fetch("/units");
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use aoe2_unit with an ID for details.", "Use aoe2_technologies to browse technologies."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function aoe2Unit(args: Record<string, unknown>): Promise<unknown> {
  const id = Number(args.id ?? 0);
  if (!id) return { error: "id is required (unit ID number)." };
  try {
    const data = await aoe2Fetch(`/unit/${id}`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use aoe2_units to list all units."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function aoe2Technologies(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await aoe2Fetch("/technologies");
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use aoe2_civilizations to see which civilizations have which technologies."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
