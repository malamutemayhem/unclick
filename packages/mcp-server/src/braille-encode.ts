const BRAILLE_MAP: Record<string, number> = {
  a: 0x01, b: 0x03, c: 0x09, d: 0x19, e: 0x11, f: 0x0B, g: 0x1B, h: 0x13,
  i: 0x0A, j: 0x1A, k: 0x05, l: 0x07, m: 0x0D, n: 0x1D, o: 0x15, p: 0x0F,
  q: 0x1F, r: 0x17, s: 0x0E, t: 0x1E, u: 0x25, v: 0x27, w: 0x3A, x: 0x2D,
  y: 0x3D, z: 0x35,
  "1": 0x01, "2": 0x03, "3": 0x09, "4": 0x19, "5": 0x11,
  "6": 0x0B, "7": 0x1B, "8": 0x13, "9": 0x0A, "0": 0x1A,
};

const BRAILLE_UNICODE_BASE = 0x2800;
const NUMBER_INDICATOR = 0x3C;
const CAPITAL_INDICATOR = 0x20;

export function charToDots(ch: string): number[] {
  const lower = ch.toLowerCase();
  const val = BRAILLE_MAP[lower];
  if (val === undefined) return [];
  const dots: number[] = [];
  for (let i = 0; i < 6; i++) {
    if (val & (1 << i)) dots.push(i + 1);
  }
  return dots;
}

export function dotsToUnicode(dots: number[]): string {
  let offset = 0;
  for (const d of dots) {
    if (d >= 1 && d <= 8) offset |= (1 << (d - 1));
  }
  return String.fromCodePoint(BRAILLE_UNICODE_BASE + offset);
}

export function charToBraille(ch: string): string {
  const lower = ch.toLowerCase();
  const val = BRAILLE_MAP[lower];
  if (val === undefined) {
    if (ch === " ") return String.fromCodePoint(BRAILLE_UNICODE_BASE);
    return "";
  }
  return String.fromCodePoint(BRAILLE_UNICODE_BASE + val);
}

export function textToBraille(text: string): string {
  let result = "";
  let inNumber = false;
  for (const ch of text) {
    if (/[0-9]/.test(ch)) {
      if (!inNumber) {
        result += String.fromCodePoint(BRAILLE_UNICODE_BASE + NUMBER_INDICATOR);
        inNumber = true;
      }
      result += charToBraille(ch);
    } else if (/[A-Z]/.test(ch)) {
      inNumber = false;
      result += String.fromCodePoint(BRAILLE_UNICODE_BASE + CAPITAL_INDICATOR);
      result += charToBraille(ch);
    } else {
      inNumber = false;
      if (ch === " ") {
        result += String.fromCodePoint(BRAILLE_UNICODE_BASE);
      } else {
        result += charToBraille(ch);
      }
    }
  }
  return result;
}

export function brailleToText(braille: string): string {
  const reverse: Record<number, string> = {};
  for (const [k, v] of Object.entries(BRAILLE_MAP)) {
    if (/[a-z]/.test(k)) reverse[v] = k;
  }

  const numReverse: Record<number, string> = {};
  for (const [k, v] of Object.entries(BRAILLE_MAP)) {
    if (/[0-9]/.test(k)) numReverse[v] = k;
  }

  let result = "";
  let nextCap = false;
  let inNumber = false;

  for (const ch of braille) {
    const code = ch.codePointAt(0)! - BRAILLE_UNICODE_BASE;
    if (code === 0) {
      result += " ";
      inNumber = false;
      nextCap = false;
      continue;
    }
    if (code === CAPITAL_INDICATOR) {
      nextCap = true;
      continue;
    }
    if (code === NUMBER_INDICATOR) {
      inNumber = true;
      continue;
    }
    if (inNumber && numReverse[code] !== undefined) {
      result += numReverse[code];
    } else if (reverse[code] !== undefined) {
      inNumber = false;
      result += nextCap ? reverse[code].toUpperCase() : reverse[code];
      nextCap = false;
    }
  }
  return result;
}

export function dotPattern(ch: string): string {
  const dots = charToDots(ch);
  if (dots.length === 0) return "";
  return dots.join("");
}

export function countDots(text: string): number {
  let count = 0;
  for (const ch of text.toLowerCase()) {
    count += charToDots(ch).length;
  }
  return count;
}

export function brailleLength(text: string): number {
  return [...textToBraille(text)].length;
}

export function isGrade1(text: string): boolean {
  return /^[a-zA-Z0-9 ]+$/.test(text);
}

export function cellDimensions(dotDiameterMm: number = 1.5, dotSpacingMm: number = 2.3): {
  cellWidthMm: number;
  cellHeightMm: number;
} {
  return {
    cellWidthMm: parseFloat((dotDiameterMm + dotSpacingMm).toFixed(1)),
    cellHeightMm: parseFloat((dotDiameterMm * 3 + dotSpacingMm * 2).toFixed(1)),
  };
}

export function lineLength(pageWidthMm: number, marginMm: number = 20): number {
  const available = pageWidthMm - 2 * marginMm;
  const cellWidth = 6.2;
  return Math.floor(available / cellWidth);
}

export function pageCapacity(
  pageWidthMm: number = 280,
  pageHeightMm: number = 280,
  marginMm: number = 20,
): { charsPerLine: number; linesPerPage: number; charsPerPage: number } {
  const charsPerLine = lineLength(pageWidthMm, marginMm);
  const available = pageHeightMm - 2 * marginMm;
  const lineHeight = 10;
  const linesPerPage = Math.floor(available / lineHeight);
  return { charsPerLine, linesPerPage, charsPerPage: charsPerLine * linesPerPage };
}
