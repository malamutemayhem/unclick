export class AnsiColor {
  private static code(n: number): string {
    return `\x1b[${n}m`;
  }

  static reset(text: string): string { return `${AnsiColor.code(0)}${text}${AnsiColor.code(0)}`; }
  static bold(text: string): string { return `${AnsiColor.code(1)}${text}${AnsiColor.code(22)}`; }
  static dim(text: string): string { return `${AnsiColor.code(2)}${text}${AnsiColor.code(22)}`; }
  static italic(text: string): string { return `${AnsiColor.code(3)}${text}${AnsiColor.code(23)}`; }
  static underline(text: string): string { return `${AnsiColor.code(4)}${text}${AnsiColor.code(24)}`; }
  static strikethrough(text: string): string { return `${AnsiColor.code(9)}${text}${AnsiColor.code(29)}`; }

  static black(text: string): string { return `${AnsiColor.code(30)}${text}${AnsiColor.code(39)}`; }
  static red(text: string): string { return `${AnsiColor.code(31)}${text}${AnsiColor.code(39)}`; }
  static green(text: string): string { return `${AnsiColor.code(32)}${text}${AnsiColor.code(39)}`; }
  static yellow(text: string): string { return `${AnsiColor.code(33)}${text}${AnsiColor.code(39)}`; }
  static blue(text: string): string { return `${AnsiColor.code(34)}${text}${AnsiColor.code(39)}`; }
  static magenta(text: string): string { return `${AnsiColor.code(35)}${text}${AnsiColor.code(39)}`; }
  static cyan(text: string): string { return `${AnsiColor.code(36)}${text}${AnsiColor.code(39)}`; }
  static white(text: string): string { return `${AnsiColor.code(37)}${text}${AnsiColor.code(39)}`; }

  static bgRed(text: string): string { return `${AnsiColor.code(41)}${text}${AnsiColor.code(49)}`; }
  static bgGreen(text: string): string { return `${AnsiColor.code(42)}${text}${AnsiColor.code(49)}`; }
  static bgYellow(text: string): string { return `${AnsiColor.code(43)}${text}${AnsiColor.code(49)}`; }
  static bgBlue(text: string): string { return `${AnsiColor.code(44)}${text}${AnsiColor.code(49)}`; }

  static rgb(text: string, r: number, g: number, b: number): string {
    return `\x1b[38;2;${r};${g};${b}m${text}\x1b[39m`;
  }

  static bgRgb(text: string, r: number, g: number, b: number): string {
    return `\x1b[48;2;${r};${g};${b}m${text}\x1b[49m`;
  }

  static color256(text: string, code: number): string {
    return `\x1b[38;5;${code}m${text}\x1b[39m`;
  }

  static strip(text: string): string {
    return text.replace(/\x1b\[[0-9;]*m/g, "");
  }

  static wrap(text: string, ...fns: Array<(t: string) => string>): string {
    let result = text;
    for (const fn of fns) {
      result = fn(result);
    }
    return result;
  }

  static gradient(text: string, from: [number, number, number], to: [number, number, number]): string {
    const chars = [...text];
    const len = chars.length;
    if (len === 0) return "";
    return chars
      .map((ch, i) => {
        const t = len === 1 ? 0 : i / (len - 1);
        const r = Math.round(from[0] + (to[0] - from[0]) * t);
        const g = Math.round(from[1] + (to[1] - from[1]) * t);
        const b = Math.round(from[2] + (to[2] - from[2]) * t);
        return AnsiColor.rgb(ch, r, g, b);
      })
      .join("");
  }

  static rainbow(text: string): string {
    const colors: Array<(t: string) => string> = [
      AnsiColor.red, AnsiColor.yellow, AnsiColor.green,
      AnsiColor.cyan, AnsiColor.blue, AnsiColor.magenta,
    ];
    return [...text].map((ch, i) => colors[i % colors.length](ch)).join("");
  }
}
