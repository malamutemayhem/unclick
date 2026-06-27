export interface CharMetrics {
  width: number;
  height: number;
  advance: number;
}

export class FontMetrics {
  private charWidths: Map<string, number> = new Map();
  lineHeight: number;
  ascent: number;
  descent: number;
  defaultWidth: number;

  constructor(lineHeight = 16, ascent = 12, descent = 4, defaultWidth = 8) {
    this.lineHeight = lineHeight;
    this.ascent = ascent;
    this.descent = descent;
    this.defaultWidth = defaultWidth;
  }

  setCharWidth(char: string, width: number): void {
    this.charWidths.set(char, width);
  }

  charWidth(char: string): number {
    return this.charWidths.get(char) ?? this.defaultWidth;
  }

  measureText(text: string): { width: number; height: number } {
    const lines = text.split("\n");
    let maxWidth = 0;
    for (const line of lines) {
      let w = 0;
      for (const ch of line) w += this.charWidth(ch);
      maxWidth = Math.max(maxWidth, w);
    }
    return {
      width: maxWidth,
      height: lines.length * this.lineHeight,
    };
  }

  wrapText(text: string, maxWidth: number): string[] {
    const words = text.split(/\s+/);
    const lines: string[] = [];
    let currentLine = "";
    let currentWidth = 0;

    for (const word of words) {
      let wordWidth = 0;
      for (const ch of word) wordWidth += this.charWidth(ch);

      if (currentLine && currentWidth + this.defaultWidth + wordWidth > maxWidth) {
        lines.push(currentLine);
        currentLine = word;
        currentWidth = wordWidth;
      } else {
        if (currentLine) {
          currentLine += " " + word;
          currentWidth += this.defaultWidth + wordWidth;
        } else {
          currentLine = word;
          currentWidth = wordWidth;
        }
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  truncate(text: string, maxWidth: number, ellipsis = "..."): string {
    let width = 0;
    let ellipsisWidth = 0;
    for (const ch of ellipsis) ellipsisWidth += this.charWidth(ch);

    if (this.measureText(text).width <= maxWidth) return text;

    let result = "";
    for (const ch of text) {
      const cw = this.charWidth(ch);
      if (width + cw + ellipsisWidth > maxWidth) {
        return result + ellipsis;
      }
      result += ch;
      width += cw;
    }
    return result;
  }

  lineCount(text: string, maxWidth?: number): number {
    if (maxWidth) return this.wrapText(text, maxWidth).length;
    return text.split("\n").length;
  }

  characterIndex(text: string, x: number): number {
    let pos = 0;
    for (let i = 0; i < text.length; i++) {
      const w = this.charWidth(text[i]);
      if (pos + w / 2 > x) return i;
      pos += w;
    }
    return text.length;
  }

  caretPosition(text: string, index: number): number {
    let pos = 0;
    for (let i = 0; i < Math.min(index, text.length); i++) {
      pos += this.charWidth(text[i]);
    }
    return pos;
  }
}
