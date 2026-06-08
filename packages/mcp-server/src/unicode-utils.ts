export class UnicodeUtils {
  static codePoints(str: string): number[] {
    const result: number[] = [];
    for (const ch of str) {
      const cp = ch.codePointAt(0);
      if (cp !== undefined) result.push(cp);
    }
    return result;
  }

  static fromCodePoints(points: number[]): string {
    return String.fromCodePoint(...points);
  }

  static toEscaped(str: string): string {
    return [...str]
      .map((ch) => {
        const cp = ch.codePointAt(0)!;
        if (cp <= 0x7f) return ch;
        if (cp <= 0xffff) return `\\u${cp.toString(16).padStart(4, "0")}`;
        return `\\u{${cp.toString(16)}}`;
      })
      .join("");
  }

  static charLength(str: string): number {
    return [...str].length;
  }

  static isAscii(str: string): boolean {
    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 127) return false;
    }
    return true;
  }

  static category(ch: string): string {
    const cp = ch.codePointAt(0);
    if (cp === undefined) return "unknown";
    if (cp <= 0x1f || cp === 0x7f) return "control";
    if (cp >= 0x30 && cp <= 0x39) return "digit";
    if ((cp >= 0x41 && cp <= 0x5a) || (cp >= 0x61 && cp <= 0x7a)) return "letter";
    if (cp >= 0x20 && cp <= 0x7e) return "punctuation";
    if (cp >= 0x80 && cp <= 0xff) return "latin-extended";
    if (cp >= 0x0400 && cp <= 0x04ff) return "cyrillic";
    if (cp >= 0x4e00 && cp <= 0x9fff) return "cjk";
    if (cp >= 0x0600 && cp <= 0x06ff) return "arabic";
    if (cp >= 0x3040 && cp <= 0x309f) return "hiragana";
    if (cp >= 0x30a0 && cp <= 0x30ff) return "katakana";
    if (cp >= 0x1f600 && cp <= 0x1f64f) return "emoticon";
    if (cp >= 0x1f300 && cp <= 0x1f9ff) return "symbol";
    return "other";
  }

  static reverse(str: string): string {
    return [...str].reverse().join("");
  }

  static truncate(str: string, maxChars: number, suffix: string = "..."): string {
    const chars = [...str];
    if (chars.length <= maxChars) return str;
    return chars.slice(0, maxChars - [...suffix].length).join("") + suffix;
  }

  static pad(str: string, length: number, char: string = " ", direction: "left" | "right" | "center" = "right"): string {
    const currentLen = UnicodeUtils.charLength(str);
    if (currentLen >= length) return str;
    const padding = char.repeat(length - currentLen);
    if (direction === "left") return padding + str;
    if (direction === "right") return str + padding;
    const leftPad = char.repeat(Math.floor((length - currentLen) / 2));
    const rightPad = char.repeat(Math.ceil((length - currentLen) / 2));
    return leftPad + str + rightPad;
  }

  static countByCategory(str: string): Record<string, number> {
    const counts: Record<string, number> = {};
    for (const ch of str) {
      const cat = UnicodeUtils.category(ch);
      counts[cat] = (counts[cat] || 0) + 1;
    }
    return counts;
  }
}
