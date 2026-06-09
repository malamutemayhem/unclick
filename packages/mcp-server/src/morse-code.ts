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
  "$": "...-..-", "@": ".--.-.",
};

const MORSE_TO_CHAR: Record<string, string> = {};
for (const [ch, code] of Object.entries(CHAR_TO_MORSE)) {
  MORSE_TO_CHAR[code] = ch;
}

export function textToMorse(text: string): string {
  return text
    .toUpperCase()
    .split("")
    .map(ch => {
      if (ch === " ") return "/";
      return CHAR_TO_MORSE[ch] ?? "";
    })
    .filter(Boolean)
    .join(" ");
}

export function morseToText(morse: string): string {
  return morse
    .split(" / ")
    .map(word =>
      word
        .split(" ")
        .map(code => MORSE_TO_CHAR[code] ?? "")
        .join("")
    )
    .join(" ");
}

export function isValidMorse(morse: string): boolean {
  const parts = morse.split(" ");
  for (const part of parts) {
    if (part === "/") continue;
    if (part === "") continue;
    if (!MORSE_TO_CHAR[part]) return false;
  }
  return true;
}

export function morseToTiming(morse: string, unitMs = 100): { signal: boolean; duration: number }[] {
  const timing: { signal: boolean; duration: number }[] = [];
  const chars = morse.split(" ");

  for (let i = 0; i < chars.length; i++) {
    const token = chars[i];
    if (token === "/") {
      timing.push({ signal: false, duration: unitMs * 7 });
      continue;
    }

    for (let j = 0; j < token.length; j++) {
      if (token[j] === ".") {
        timing.push({ signal: true, duration: unitMs });
      } else if (token[j] === "-") {
        timing.push({ signal: true, duration: unitMs * 3 });
      }
      if (j < token.length - 1) {
        timing.push({ signal: false, duration: unitMs });
      }
    }

    if (i < chars.length - 1 && chars[i + 1] !== "/") {
      timing.push({ signal: false, duration: unitMs * 3 });
    }
  }
  return timing;
}

export function countDitsAndDahs(morse: string): { dits: number; dahs: number } {
  let dits = 0;
  let dahs = 0;
  for (const ch of morse) {
    if (ch === ".") dits++;
    if (ch === "-") dahs++;
  }
  return { dits, dahs };
}

export function morseTreeDecode(morse: string): string {
  return morseToText(morse);
}

export function getCharMorse(ch: string): string | null {
  return CHAR_TO_MORSE[ch.toUpperCase()] ?? null;
}

export function getMorseChar(code: string): string | null {
  return MORSE_TO_CHAR[code] ?? null;
}

export { CHAR_TO_MORSE, MORSE_TO_CHAR };
