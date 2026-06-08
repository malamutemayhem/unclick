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

export async function shibeRandomImage(args: Record<string, unknown>) {
  const count = Math.min(Number(args.count) || 1, 10);
  const type = String(args.type ?? "shibes");
  const valid = ["shibes", "cats", "birds"];
  if (!valid.includes(type)) return { error: `type must be one of: ${valid.join(", ")}` };
  const data = await fetchJson(`https://shibe.online/api/${type}?count=${count}&urls=true&httpsUrls=true`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ urls: data }, { source: "shibe.online", fetched_at: new Date().toISOString(), next_steps: ["Try type=cats or type=birds for other animals."] });
}
