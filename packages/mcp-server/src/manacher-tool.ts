import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function manacherPalindrome(args: Record<string, unknown>) {
  const text = String(args.text ?? "");
  if (text.length === 0) throw new Error("text must be non-empty");
  if (text.length > 100_000) throw new Error("text must be <= 100,000 characters");

  const t = "#" + text.split("").join("#") + "#";
  const n = t.length;
  const p = new Array(n).fill(0);
  let c = 0;
  let r = 0;

  for (let i = 0; i < n; i++) {
    const mirror = 2 * c - i;
    if (i < r) p[i] = Math.min(r - i, p[mirror]);
    while (i + p[i] + 1 < n && i - p[i] - 1 >= 0 && t[i + p[i] + 1] === t[i - p[i] - 1]) {
      p[i]++;
    }
    if (i + p[i] > r) {
      c = i;
      r = i + p[i];
    }
  }

  let maxLen = 0;
  let maxCenter = 0;
  for (let i = 0; i < n; i++) {
    if (p[i] > maxLen) {
      maxLen = p[i];
      maxCenter = i;
    }
  }

  const start = (maxCenter - maxLen) / 2;
  const longest = text.slice(start, start + maxLen);

  const allPalindromes: { start: number; length: number; text: string }[] = [];
  if (args.all) {
    for (let i = 0; i < n; i++) {
      if (p[i] > 0) {
        const s = (i - p[i]) / 2;
        const len = p[i];
        if (len >= 2) {
          allPalindromes.push({ start: s, length: len, text: text.slice(s, s + len) });
        }
      }
    }
    allPalindromes.sort((a, b) => b.length - a.length || a.start - b.start);
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use Manacher's algorithm for palindrome detection tasks"],
  };

  const result: Record<string, unknown> = {
    text_length: text.length,
    longest_palindrome: longest,
    longest_start: start,
    longest_length: maxLen,
  };
  if (args.all) {
    result.palindromes = allPalindromes.slice(0, 100);
  }

  return stampMeta(result, meta);
}
