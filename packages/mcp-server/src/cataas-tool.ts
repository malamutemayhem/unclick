import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const TIMEOUT_MS = 8_000;

async function fetchJson(url: string): Promise<Record<string, unknown>> {
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
    return (await res.json()) as Record<string, unknown>;
  } catch (e: unknown) {
    clearTimeout(timer);
    if (e instanceof Error && e.name === "AbortError") return { error: "Request timed out." };
    return { error: String(e) };
  }
}

export async function cataasRandomCat(args: Record<string, unknown>) {
  const tag = String(args.tag ?? "").trim();
  const text = String(args.text ?? "").trim();
  let url = "https://cataas.com/cat";
  if (tag) url += `/${encodeURIComponent(tag)}`;
  if (text) url += `/says/${encodeURIComponent(text)}`;
  url += "?json=true";
  const data = await fetchJson(url);
  if (data.error) return data;
  const id = data._id ?? data.id ?? "";
  return stampMeta(
    { ...data, image_url: `https://cataas.com/cat/${id}` },
    { source: "cataas.com", fetched_at: new Date().toISOString(), next_steps: ["Use cataas_list_tags to find available tags."] },
  );
}

export async function cataasListTags(_args: Record<string, unknown>) {
  const data = await fetchJson("https://cataas.com/api/tags");
  if (data && "error" in data) return data;
  return stampMeta({ tags: data }, { source: "cataas.com", fetched_at: new Date().toISOString(), next_steps: ["Use cataas_random_cat with a tag filter."] });
}
