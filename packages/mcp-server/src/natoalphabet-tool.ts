import { stampMeta } from "./connector-meta.js";

const NATO: Record<string, string> = {
  A: "Alfa", B: "Bravo", C: "Charlie", D: "Delta", E: "Echo",
  F: "Foxtrot", G: "Golf", H: "Hotel", I: "India", J: "Juliet",
  K: "Kilo", L: "Lima", M: "Mike", N: "November", O: "Oscar",
  P: "Papa", Q: "Quebec", R: "Romeo", S: "Sierra", T: "Tango",
  U: "Uniform", V: "Victor", W: "Whiskey", X: "X-ray", Y: "Yankee",
  Z: "Zulu",
  "0": "Zero", "1": "One", "2": "Two", "3": "Three", "4": "Four",
  "5": "Five", "6": "Six", "7": "Seven", "8": "Eight", "9": "Niner",
};

const REVERSE_NATO: Record<string, string> = {};
for (const [ch, word] of Object.entries(NATO)) {
  REVERSE_NATO[word.toUpperCase()] = ch;
}

export async function natoConvert(args: Record<string, unknown>) {
  const text = String(args.text ?? "").trim();
  if (!text) return { error: "text is required" };
  const words = text.split(/\s+/);
  const isNato = words.every(w => REVERSE_NATO[w.toUpperCase()] !== undefined);
  if (isNato && words.length > 1) {
    const decoded = words.map(w => REVERSE_NATO[w.toUpperCase()] || "?").join("");
    return stampMeta({ input: text, output: decoded, direction: "nato_to_text" }, {
      source: "local NATO phonetic alphabet",
      fetched_at: new Date().toISOString(),
      next_steps: ["pass plain text to encode to NATO", "pass NATO words to decode"],
    });
  }
  const upper = text.toUpperCase();
  const encoded: string[] = [];
  for (const ch of upper) {
    if (NATO[ch]) encoded.push(NATO[ch]);
    else if (ch === " ") encoded.push("[space]");
    else encoded.push(ch);
  }
  return stampMeta({
    input: text, output: encoded.join(" "), direction: "text_to_nato",
    characters: encoded,
  }, {
    source: "local NATO phonetic alphabet",
    fetched_at: new Date().toISOString(),
    next_steps: ["useful for spelling over phone/radio", "pass NATO words back to decode"],
  });
}
