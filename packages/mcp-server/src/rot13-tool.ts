import { stampMeta } from "./connector-meta.js";

function rot(text: string, shift: number): string {
  return Array.from(text).map(ch => {
    const code = ch.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCharCode(((code - 65 + shift) % 26) + 65);
    if (code >= 97 && code <= 122) return String.fromCharCode(((code - 97 + shift) % 26) + 97);
    return ch;
  }).join("");
}

export async function rot13Convert(args: Record<string, unknown>) {
  const text = String(args.text ?? "").trim();
  if (!text) return { error: "text is required" };
  const shift = Number(args.shift) || 13;
  const normalizedShift = ((shift % 26) + 26) % 26;
  const encoded = rot(text, normalizedShift);
  return stampMeta({
    input: text, output: encoded, shift: normalizedShift,
    is_rot13: normalizedShift === 13,
    decode_shift: (26 - normalizedShift) % 26,
  }, {
    source: "local ROT cipher",
    fetched_at: new Date().toISOString(),
    next_steps: ["ROT13 is its own inverse (apply twice to get original)", "set shift for ROT-N with any offset 1-25"],
  });
}
