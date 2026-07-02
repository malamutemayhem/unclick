import { stampMeta } from "./connector-meta.js";

const BRAILLE_MAP: Record<string, string> = {
  a: "⠁", b: "⠃", c: "⠉", d: "⠙", e: "⠑",
  f: "⠋", g: "⠛", h: "⠓", i: "⠊", j: "⠚",
  k: "⠅", l: "⠇", m: "⠍", n: "⠝", o: "⠕",
  p: "⠏", q: "⠟", r: "⠗", s: "⠎", t: "⠞",
  u: "⠥", v: "⠧", w: "⠺", x: "⠭", y: "⠽",
  z: "⠵",
  "1": "⠁", "2": "⠃", "3": "⠉", "4": "⠙", "5": "⠑",
  "6": "⠋", "7": "⠛", "8": "⠓", "9": "⠊", "0": "⠚",
  " ": " ", ".": "⠲", ",": "⠂", "!": "⠖", "?": "⠦",
  "-": "⠤", "'": "⠄",
};

const REVERSE_BRAILLE: Record<string, string> = {};
for (const [ch, braille] of Object.entries(BRAILLE_MAP)) {
  if (ch.match(/[a-z]/) && !REVERSE_BRAILLE[braille]) {
    REVERSE_BRAILLE[braille] = ch;
  }
}
REVERSE_BRAILLE[" "] = " ";
REVERSE_BRAILLE["⠲"] = ".";
REVERSE_BRAILLE["⠂"] = ",";
REVERSE_BRAILLE["⠖"] = "!";
REVERSE_BRAILLE["⠦"] = "?";
REVERSE_BRAILLE["⠤"] = "-";

export async function brailleConvert(args: Record<string, unknown>) {
  const text = String(args.text ?? "").trim();
  if (!text) return { error: "text is required" };
  const isBraille = /[⠀-⣿]/.test(text);
  if (isBraille) {
    const decoded = Array.from(text).map(ch => REVERSE_BRAILLE[ch] || "?").join("");
    return stampMeta({ input: text, output: decoded, direction: "braille_to_text" }, {
      source: "local Braille converter",
      fetched_at: new Date().toISOString(),
      next_steps: ["? marks unrecognized Braille characters", "pass plain text to encode"],
    });
  }
  const lower = text.toLowerCase();
  const encoded = Array.from(lower).map(ch => BRAILLE_MAP[ch] || "⠀").join("");
  return stampMeta({ input: text, output: encoded, direction: "text_to_braille", character_count: text.length }, {
    source: "local Braille converter",
    fetched_at: new Date().toISOString(),
    next_steps: ["supports letters, digits, and basic punctuation", "pass Braille characters back to decode"],
  });
}
