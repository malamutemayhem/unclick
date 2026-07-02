import { stampMeta } from "./connector-meta.js";

const CHAR_TO_MORSE: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.",
  G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..",
  M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.",
  S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.",
  "!": "-.-.--", "/": "-..-.", "(": "-.--.", ")": "-.--.-",
  "&": ".-...", ":": "---...", ";": "-.-.-.", "=": "-...-",
  "+": ".-.-.", "-": "-....-", "_": "..--.-", '"': ".-..-.",
  "@": ".--.-.",
};

const MORSE_TO_CHAR: Record<string, string> = {};
for (const [ch, morse] of Object.entries(CHAR_TO_MORSE)) {
  MORSE_TO_CHAR[morse] = ch;
}

export async function morseConvert(args: Record<string, unknown>) {
  const text = String(args.text ?? "").trim();
  if (!text) return { error: "text is required" };
  const isMorse = /^[.\- /|]+$/.test(text);
  if (isMorse) {
    const words = text.split(/\s{3,}|\s*[/|]\s*/);
    const decoded = words.map(w =>
      w.split(/\s+/).map(code => MORSE_TO_CHAR[code] || "?").join("")
    ).join(" ");
    const unknowns = (decoded.match(/\?/g) || []).length;
    return stampMeta({
      input: text, output: decoded, direction: "morse_to_text",
      unknown_symbols: unknowns,
    }, {
      source: "local Morse code converter",
      fetched_at: new Date().toISOString(),
      next_steps: ["? marks unrecognized Morse sequences", "words separated by / or triple spaces"],
    });
  }
  const words = text.toUpperCase().split(/\s+/);
  const encoded = words.map(w =>
    Array.from(w).map(ch => CHAR_TO_MORSE[ch] || "?").join(" ")
  ).join(" / ");
  const unknowns = (encoded.match(/\?/g) || []).length;
  return stampMeta({
    input: text, output: encoded, direction: "text_to_morse",
    unknown_characters: unknowns,
  }, {
    source: "local Morse code converter",
    fetched_at: new Date().toISOString(),
    next_steps: ["? marks characters with no Morse equivalent", "words separated by /"],
  });
}
