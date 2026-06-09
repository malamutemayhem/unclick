import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function rabinKarpSearch(args: Record<string, unknown>) {
  const text = String(args.text ?? "");
  if (!text) throw new Error("text is required.");
  if (text.length > 1000000) throw new Error("text must be 1000000 characters or fewer.");

  const pattern = String(args.pattern ?? "");
  if (!pattern) throw new Error("pattern is required.");
  if (pattern.length > text.length) {
    const meta: ConnectorMeta = {
      source: "local-computation",
      fetched_at: new Date().toISOString(),
      next_steps: ["Pattern is longer than text - no match possible"],
    };
    return stampMeta({
      text_length: text.length,
      pattern_length: pattern.length,
      matches: [],
      match_count: 0,
    }, meta);
  }

  const base = 256;
  const mod = 1000000007;
  const m = pattern.length;

  let patHash = 0;
  let textHash = 0;
  let h = 1;

  for (let i = 0; i < m - 1; i++) h = (h * base) % mod;

  for (let i = 0; i < m; i++) {
    patHash = (patHash * base + pattern.charCodeAt(i)) % mod;
    textHash = (textHash * base + text.charCodeAt(i)) % mod;
  }

  const matches: number[] = [];
  let hashCollisions = 0;

  for (let i = 0; i <= text.length - m; i++) {
    if (patHash === textHash) {
      let match = true;
      for (let j = 0; j < m; j++) {
        if (text[i + j] !== pattern[j]) { match = false; break; }
      }
      if (match) matches.push(i);
      else hashCollisions++;
    }

    if (i < text.length - m) {
      textHash = ((textHash - text.charCodeAt(i) * h) * base + text.charCodeAt(i + m)) % mod;
      if (textHash < 0) textHash += mod;
    }
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Rabin-Karp uses rolling hash for average O(n+m) string matching",
      "Hash collisions are spurious matches verified by character comparison",
    ],
  };
  return stampMeta({
    text_length: text.length,
    pattern_length: m,
    match_count: matches.length,
    matches: matches.length <= 1000 ? matches : matches.slice(0, 1000),
    hash_collisions: hashCollisions,
  }, meta);
}
