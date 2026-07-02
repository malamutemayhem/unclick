import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const TIMEOUT_MS = 10_000;

async function fetchJson(url: string): Promise<Record<string, unknown>> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA }, signal: ac.signal });
    clearTimeout(timer);
    if (res.status === 429) return { error: "Rate limit exceeded. Try again in a minute." };
    if (!res.ok) return { error: `HTTP ${res.status}: ${await res.text()}` };
    return (await res.json()) as Record<string, unknown>;
  } catch (e: unknown) {
    clearTimeout(timer);
    if (e instanceof Error && e.name === "AbortError") return { error: "Request timed out." };
    return { error: String(e) };
  }
}

export async function quranVerse(args: Record<string, unknown>) {
  const surah = Number(args.surah) || 1;
  const ayah = args.ayah ? Number(args.ayah) : undefined;
  const ref = ayah ? `${surah}:${ayah}` : String(surah);
  const data = await fetchJson(`https://api.alquran.cloud/v1/ayah/${ref}/en.asad`);
  if (data.error) return data;
  return stampMeta(data, { source: "api.alquran.cloud", fetched_at: new Date().toISOString(), next_steps: ["Specify surah (1-114) and ayah number for a specific verse."] });
}

export async function quranSurah(args: Record<string, unknown>) {
  const number = Number(args.number) || 1;
  const data = await fetchJson(`https://api.alquran.cloud/v1/surah/${number}`);
  if (data.error) return data;
  return stampMeta(data, { source: "api.alquran.cloud", fetched_at: new Date().toISOString(), next_steps: ["Use quran_verse for a specific ayah."] });
}
