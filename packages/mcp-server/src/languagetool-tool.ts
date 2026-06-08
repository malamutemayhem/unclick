import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.languagetool.org/v2";
const TIMEOUT_MS = 10_000;

export async function languagetoolCheck(args: Record<string, unknown>) {
  const text = String(args.text || "");
  if (!text) return { error: "text is required." };
  const language = String(args.language || "auto");
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const body = new URLSearchParams({ text, language });
    const res = await fetch(`${BASE}/check`, {
      method: "POST",
      headers: { "User-Agent": UA, "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      signal: ac.signal,
    });
    clearTimeout(timer);
    if (res.status === 429) return { error: "Rate limit exceeded. Try again in a minute." };
    if (!res.ok) return { error: `HTTP ${res.status}: ${await res.text()}` };
    const data = await res.json();
    return stampMeta(data as Record<string, unknown>, { source: "languagetool.org", fetched_at: new Date().toISOString(), next_steps: ["Returns grammar, spelling, and style issues with suggestions.", "Supports many languages. Set language to auto for detection."] });
  } catch (e: unknown) {
    clearTimeout(timer);
    if (e instanceof Error && e.name === "AbortError") return { error: "Request timed out." };
    return { error: String(e) };
  }
}

export async function languagetoolLanguages(_args: Record<string, unknown>) {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${BASE}/languages`, {
      headers: { "User-Agent": UA },
      signal: ac.signal,
    });
    clearTimeout(timer);
    if (res.status === 429) return { error: "Rate limit exceeded. Try again in a minute." };
    if (!res.ok) return { error: `HTTP ${res.status}: ${await res.text()}` };
    const data = await res.json();
    return stampMeta({ languages: data }, { source: "languagetool.org", fetched_at: new Date().toISOString(), next_steps: ["Returns all supported language codes and names.", "Use the language code with languagetool_check."] });
  } catch (e: unknown) {
    clearTimeout(timer);
    if (e instanceof Error && e.name === "AbortError") return { error: "Request timed out." };
    return { error: String(e) };
  }
}
