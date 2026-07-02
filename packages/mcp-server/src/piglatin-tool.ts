import { stampMeta } from "./connector-meta.js";

function toPigLatin(word: string): string {
  const lower = word.toLowerCase();
  const vowels = "aeiou";
  if (vowels.includes(lower[0])) return word + "yay";
  let consonantCluster = "";
  let i = 0;
  while (i < lower.length && !vowels.includes(lower[i])) {
    consonantCluster += word[i];
    i++;
  }
  const rest = word.slice(i);
  const first = rest[0];
  const isUpper = word[0] === word[0].toUpperCase() && word[0] !== word[0].toLowerCase();
  if (isUpper && rest.length > 0) {
    return first.toUpperCase() + rest.slice(1) + consonantCluster.toLowerCase() + "ay";
  }
  return rest + consonantCluster + "ay";
}

function fromPigLatin(word: string): string {
  if (word.endsWith("yay")) {
    return word.slice(0, -3);
  }
  if (word.endsWith("ay")) {
    const base = word.slice(0, -2);
    const vowels = "aeiouAEIOU";
    for (let i = base.length - 1; i >= 0; i--) {
      if (vowels.includes(base[i])) {
        const consonants = base.slice(i + 1);
        const rest = base.slice(0, i + 1);
        return consonants + rest;
      }
    }
  }
  return word;
}

export async function pigLatinConvert(args: Record<string, unknown>) {
  const text = String(args.text ?? "").trim();
  if (!text) return { error: "text is required" };
  const decode = args.decode === true;
  const words = text.split(/(\s+)/);
  const converted = words.map(w => {
    if (/^\s+$/.test(w)) return w;
    const punct = w.match(/^([^a-zA-Z]*)([a-zA-Z]+)([^a-zA-Z]*)$/);
    if (!punct) return w;
    const [, pre, core, post] = punct;
    return pre + (decode ? fromPigLatin(core) : toPigLatin(core)) + post;
  }).join("");
  return stampMeta({
    input: text, output: converted,
    direction: decode ? "piglatin_to_english" : "english_to_piglatin",
    word_count: words.filter(w => /[a-zA-Z]/.test(w)).length,
  }, {
    source: "local Pig Latin converter",
    fetched_at: new Date().toISOString(),
    next_steps: ["set decode: true to convert Pig Latin back to English", "preserves punctuation and capitalization"],
  });
}
