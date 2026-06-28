import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.memegen.link";
const TIMEOUT_MS = 8_000;

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

export async function memegenTemplates(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/templates`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ templates: data }, { source: "memegen.link", fetched_at: new Date().toISOString(), next_steps: ["Each template has id, name, and example URL.", "Use the template id with memegen_create to generate a custom meme."] });
}

export async function memegenCreate(args: Record<string, unknown>) {
  const template = String(args.template || "fry");
  const top = String(args.top_text || " ").replace(/ /g, "_").replace(/\?/g, "~q");
  const bottom = String(args.bottom_text || " ").replace(/ /g, "_").replace(/\?/g, "~q");
  const url = `${BASE}/images/${encodeURIComponent(template)}/${encodeURIComponent(top)}/${encodeURIComponent(bottom)}.png`;
  return stampMeta(
    { image_url: url, template, top_text: args.top_text, bottom_text: args.bottom_text },
    { source: "memegen.link", fetched_at: new Date().toISOString(), next_steps: ["Use memegen_templates to see available template ids.", "Replace spaces with underscores and ? with ~q in text."] },
  );
}
