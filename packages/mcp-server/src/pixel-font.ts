const FONT_3X5: Record<string, string[]> = {
  A: ["010", "101", "111", "101", "101"],
  B: ["110", "101", "110", "101", "110"],
  C: ["011", "100", "100", "100", "011"],
  D: ["110", "101", "101", "101", "110"],
  E: ["111", "100", "110", "100", "111"],
  F: ["111", "100", "110", "100", "100"],
  G: ["011", "100", "101", "101", "011"],
  H: ["101", "101", "111", "101", "101"],
  I: ["111", "010", "010", "010", "111"],
  J: ["001", "001", "001", "101", "010"],
  K: ["101", "110", "100", "110", "101"],
  L: ["100", "100", "100", "100", "111"],
  M: ["101", "111", "111", "101", "101"],
  N: ["101", "111", "111", "111", "101"],
  O: ["010", "101", "101", "101", "010"],
  P: ["110", "101", "110", "100", "100"],
  Q: ["010", "101", "101", "111", "011"],
  R: ["110", "101", "110", "101", "101"],
  S: ["011", "100", "010", "001", "110"],
  T: ["111", "010", "010", "010", "010"],
  U: ["101", "101", "101", "101", "010"],
  V: ["101", "101", "101", "010", "010"],
  W: ["101", "101", "111", "111", "101"],
  X: ["101", "101", "010", "101", "101"],
  Y: ["101", "101", "010", "010", "010"],
  Z: ["111", "001", "010", "100", "111"],
  "0": ["010", "101", "101", "101", "010"],
  "1": ["010", "110", "010", "010", "111"],
  "2": ["110", "001", "010", "100", "111"],
  "3": ["110", "001", "010", "001", "110"],
  "4": ["101", "101", "111", "001", "001"],
  "5": ["111", "100", "110", "001", "110"],
  "6": ["011", "100", "110", "101", "010"],
  "7": ["111", "001", "010", "010", "010"],
  "8": ["010", "101", "010", "101", "010"],
  "9": ["010", "101", "011", "001", "110"],
  " ": ["000", "000", "000", "000", "000"],
  ".": ["000", "000", "000", "000", "010"],
  "!": ["010", "010", "010", "000", "010"],
  "?": ["110", "001", "010", "000", "010"],
  "-": ["000", "000", "111", "000", "000"],
};

export class PixelFont {
  static render(text: string, fillChar = "#", emptyChar = " ", spacing = 1): string {
    const upper = text.toUpperCase();
    const charGrids: string[][] = [];

    for (const ch of upper) {
      const glyph = FONT_3X5[ch];
      if (glyph) charGrids.push(glyph);
    }

    if (charGrids.length === 0) return "";

    const lines: string[] = [];
    const spacer = emptyChar.repeat(spacing);

    for (let row = 0; row < 5; row++) {
      const rowParts = charGrids.map((g) =>
        g[row].split("").map((b) => (b === "1" ? fillChar : emptyChar)).join(""),
      );
      lines.push(rowParts.join(spacer));
    }

    return lines.join("\n");
  }

  static getGlyph(char: string): string[] | null {
    return FONT_3X5[char.toUpperCase()] ?? null;
  }

  static availableChars(): string[] {
    return Object.keys(FONT_3X5);
  }

  static glyphWidth(): number {
    return 3;
  }

  static glyphHeight(): number {
    return 5;
  }

  static textWidth(text: string, spacing = 1): number {
    const chars = text.toUpperCase().split("").filter((ch) => ch in FONT_3X5).length;
    if (chars === 0) return 0;
    return chars * 3 + (chars - 1) * spacing;
  }

  static toBitmap(text: string): boolean[][] {
    const upper = text.toUpperCase();
    const charGrids: string[][] = [];

    for (const ch of upper) {
      const glyph = FONT_3X5[ch];
      if (glyph) charGrids.push(glyph);
    }

    if (charGrids.length === 0) return [];

    const result: boolean[][] = [];
    for (let row = 0; row < 5; row++) {
      const rowBits: boolean[] = [];
      for (let g = 0; g < charGrids.length; g++) {
        if (g > 0) rowBits.push(false);
        for (const bit of charGrids[g][row]) {
          rowBits.push(bit === "1");
        }
      }
      result.push(rowBits);
    }
    return result;
  }
}
