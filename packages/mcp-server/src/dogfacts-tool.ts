import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const TIMEOUT_MS = 8_000;

async function fetchJson(url: string): Promise<unknown> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA },
      signal: ac.signal,
    });
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

export async function dogFactRandom(_args: Record<string, unknown>) {
  const data = await fetchJson("https://dogapi.dog/api/v2/facts?limit=1");
  if (data && typeof data === "object" && "error" in data) return data;
  const result = data as Record<string, unknown>;
  const factsData = result.data as Array<Record<string, unknown>> | undefined;
  const fact = factsData?.[0]?.attributes as Record<string, unknown> | undefined;
  return stampMeta(
    { fact: fact?.body ?? "No fact available." },
    { source: "dogapi.dog", fetched_at: new Date().toISOString(), next_steps: ["Call again for another random dog fact."] },
  );
}
