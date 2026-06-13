import { stampMeta } from "./connector-meta.js";

const BASE = "https://libretranslate.com";
const TIMEOUT = 12_000;

export async function libretranslateTranslate(args: Record<string, unknown>) {
  const q = String(args.text ?? "").trim();
  if (!q) return { error: "text is required" };
  const source = String(args.source ?? "auto");
  const target = String(args.target ?? "en");
  const res = await fetch(`${BASE}/translate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ q, source, target }),
    signal: AbortSignal.timeout(TIMEOUT),
  });
  if (!res.ok) throw new Error(`LibreTranslate ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: `libretranslate.com translate ${source}->${target}`,
    fetched_at: new Date().toISOString(),
    next_steps: ["check translatedText for the result", "use detect endpoint for language detection"],
  });
}

export async function libretranslateLanguages(args: Record<string, unknown>) {
  const res = await fetch(`${BASE}/languages`, {
    signal: AbortSignal.timeout(TIMEOUT),
  });
  if (!res.ok) throw new Error(`LibreTranslate languages ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: "libretranslate.com/languages",
    fetched_at: new Date().toISOString(),
    next_steps: ["use language codes as source/target in translate", "check targets array for supported pairs"],
  });
}

export async function libretranslateDetect(args: Record<string, unknown>) {
  const q = String(args.text ?? "").trim();
  if (!q) return { error: "text is required" };
  const res = await fetch(`${BASE}/detect`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ q }),
    signal: AbortSignal.timeout(TIMEOUT),
  });
  if (!res.ok) throw new Error(`LibreTranslate detect ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: "libretranslate.com/detect",
    fetched_at: new Date().toISOString(),
    next_steps: ["check detected language and confidence", "use detected language code for translation"],
  });
}
