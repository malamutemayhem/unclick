import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://www.thecolorapi.com";
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

export async function theColorApiId(args: Record<string, unknown>) {
  const hex = String(args.hex || "").replace(/^#/, "");
  if (!hex) return { error: "hex is required (e.g. FF5733 or #FF5733)." };
  const data = await fetchJson(`${BASE}/id?hex=${encodeURIComponent(hex)}&format=json`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "thecolorapi.com", fetched_at: new Date().toISOString(), next_steps: ["Returns color name, hex, RGB, HSL, HSV, CMYK values, and contrast info.", "Use thecolorapi_scheme to generate a color scheme."] });
}

export async function theColorApiScheme(args: Record<string, unknown>) {
  const hex = String(args.hex || "").replace(/^#/, "");
  if (!hex) return { error: "hex is required (e.g. FF5733 or #FF5733)." };
  const mode = String(args.mode || "analogic");
  const count = Math.min(Number(args.count) || 5, 10);
  const data = await fetchJson(`${BASE}/scheme?hex=${encodeURIComponent(hex)}&mode=${encodeURIComponent(mode)}&count=${count}&format=json`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "thecolorapi.com", fetched_at: new Date().toISOString(), next_steps: ["Returns a color scheme with mode, seed color, and color list.", "Modes: monochrome, monochrome-dark, monochrome-light, analogic, complement, analogic-complement, triad, quad."] });
}
