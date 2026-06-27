const FONT_3X5: Record<string, number[]> = {
  A: [0b010, 0b101, 0b111, 0b101, 0b101],
  B: [0b110, 0b101, 0b110, 0b101, 0b110],
  C: [0b011, 0b100, 0b100, 0b100, 0b011],
  D: [0b110, 0b101, 0b101, 0b101, 0b110],
  E: [0b111, 0b100, 0b110, 0b100, 0b111],
  F: [0b111, 0b100, 0b110, 0b100, 0b100],
  G: [0b011, 0b100, 0b101, 0b101, 0b011],
  H: [0b101, 0b101, 0b111, 0b101, 0b101],
  I: [0b111, 0b010, 0b010, 0b010, 0b111],
  J: [0b001, 0b001, 0b001, 0b101, 0b010],
  K: [0b101, 0b110, 0b100, 0b110, 0b101],
  L: [0b100, 0b100, 0b100, 0b100, 0b111],
  M: [0b101, 0b111, 0b111, 0b101, 0b101],
  N: [0b101, 0b111, 0b111, 0b111, 0b101],
  O: [0b010, 0b101, 0b101, 0b101, 0b010],
  P: [0b110, 0b101, 0b110, 0b100, 0b100],
  Q: [0b010, 0b101, 0b101, 0b110, 0b011],
  R: [0b110, 0b101, 0b110, 0b101, 0b101],
  S: [0b011, 0b100, 0b010, 0b001, 0b110],
  T: [0b111, 0b010, 0b010, 0b010, 0b010],
  U: [0b101, 0b101, 0b101, 0b101, 0b010],
  V: [0b101, 0b101, 0b101, 0b010, 0b010],
  W: [0b101, 0b101, 0b111, 0b111, 0b101],
  X: [0b101, 0b101, 0b010, 0b101, 0b101],
  Y: [0b101, 0b101, 0b010, 0b010, 0b010],
  Z: [0b111, 0b001, 0b010, 0b100, 0b111],
  "0": [0b111, 0b101, 0b101, 0b101, 0b111],
  "1": [0b010, 0b110, 0b010, 0b010, 0b111],
  "2": [0b110, 0b001, 0b010, 0b100, 0b111],
  "3": [0b110, 0b001, 0b010, 0b001, 0b110],
  "4": [0b101, 0b101, 0b111, 0b001, 0b001],
  "5": [0b111, 0b100, 0b110, 0b001, 0b110],
  "6": [0b011, 0b100, 0b111, 0b101, 0b111],
  "7": [0b111, 0b001, 0b010, 0b010, 0b010],
  "8": [0b111, 0b101, 0b111, 0b101, 0b111],
  "9": [0b111, 0b101, 0b111, 0b001, 0b110],
  " ": [0b000, 0b000, 0b000, 0b000, 0b000],
  ".": [0b000, 0b000, 0b000, 0b000, 0b010],
  "!": [0b010, 0b010, 0b010, 0b000, 0b010],
  "?": [0b110, 0b001, 0b010, 0b000, 0b010],
};

export interface BitmapGrid {
  width: number;
  height: number;
  pixels: boolean[][];
}

export function renderText(text: string, charWidth = 3, charHeight = 5, spacing = 1): BitmapGrid {
  const upper = text.toUpperCase();
  const totalWidth = upper.length * (charWidth + spacing) - spacing;
  const pixels: boolean[][] = Array.from({ length: charHeight }, () => new Array(totalWidth).fill(false));

  for (let ci = 0; ci < upper.length; ci++) {
    const ch = upper[ci];
    const glyph = FONT_3X5[ch];
    if (!glyph) continue;
    const xOffset = ci * (charWidth + spacing);

    for (let row = 0; row < charHeight; row++) {
      for (let col = 0; col < charWidth; col++) {
        const bit = (glyph[row] >> (charWidth - 1 - col)) & 1;
        if (bit) pixels[row][xOffset + col] = true;
      }
    }
  }

  return { width: totalWidth, height: charHeight, pixels };
}

export function gridToString(grid: BitmapGrid, on = "#", off = "."): string {
  return grid.pixels.map(row => row.map(p => p ? on : off).join("")).join("\n");
}

export function gridToAsciiBlock(grid: BitmapGrid): string {
  return grid.pixels.map(row => row.map(p => p ? "█" : " ").join("")).join("\n");
}

export function scaleGrid(grid: BitmapGrid, factor: number): BitmapGrid {
  const newWidth = grid.width * factor;
  const newHeight = grid.height * factor;
  const pixels: boolean[][] = Array.from({ length: newHeight }, () => new Array(newWidth).fill(false));

  for (let y = 0; y < grid.height; y++) {
    for (let x = 0; x < grid.width; x++) {
      if (grid.pixels[y][x]) {
        for (let dy = 0; dy < factor; dy++) {
          for (let dx = 0; dx < factor; dx++) {
            pixels[y * factor + dy][x * factor + dx] = true;
          }
        }
      }
    }
  }

  return { width: newWidth, height: newHeight, pixels };
}

export function invertGrid(grid: BitmapGrid): BitmapGrid {
  const pixels = grid.pixels.map(row => row.map(p => !p));
  return { width: grid.width, height: grid.height, pixels };
}

export function countPixels(grid: BitmapGrid): number {
  let count = 0;
  for (const row of grid.pixels) {
    for (const p of row) {
      if (p) count++;
    }
  }
  return count;
}

export function hasGlyph(ch: string): boolean {
  return FONT_3X5[ch.toUpperCase()] !== undefined;
}

export function listGlyphs(): string[] {
  return Object.keys(FONT_3X5);
}
