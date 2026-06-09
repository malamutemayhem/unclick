export interface WrapOptions {
  width?: number;
  indent?: string;
  hangingIndent?: string;
  preserveNewlines?: boolean;
  breakWords?: boolean;
}

export function wrap(text: string, options: WrapOptions = {}): string {
  const width = options.width ?? 80;
  const indent = options.indent ?? "";
  const hangingIndent = options.hangingIndent ?? indent;
  const preserveNewlines = options.preserveNewlines ?? true;
  const breakWords = options.breakWords ?? false;

  if (preserveNewlines) {
    return text.split("\n").map((line) => wrapLine(line, width, indent, hangingIndent, breakWords)).join("\n");
  }

  const normalized = text.replace(/\n/g, " ");
  return wrapLine(normalized, width, indent, hangingIndent, breakWords);
}

function wrapLine(text: string, width: number, indent: string, hangingIndent: string, breakWords: boolean): string {
  if (text.length === 0) return text;
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = indent;
  let isFirst = true;

  for (const word of words) {
    if (!word) continue;
    const prefix = isFirst ? indent : hangingIndent;
    const testLine = currentLine.length === prefix.length ? currentLine + word : currentLine + " " + word;

    if (testLine.length <= width) {
      currentLine = testLine;
    } else if (currentLine.length === prefix.length) {
      if (breakWords && word.length > width - prefix.length) {
        let remaining = word;
        while (remaining.length > 0) {
          const space = width - (lines.length === 0 && isFirst ? indent.length : hangingIndent.length);
          lines.push((lines.length === 0 && isFirst ? indent : hangingIndent) + remaining.slice(0, space));
          remaining = remaining.slice(space);
          isFirst = false;
        }
        currentLine = lines.pop()!;
      } else {
        currentLine = testLine;
      }
    } else {
      lines.push(currentLine);
      isFirst = false;
      currentLine = hangingIndent + word;
    }
  }

  if (currentLine.trim()) lines.push(currentLine);
  return lines.join("\n");
}

export function truncate(text: string, maxLen: number, suffix = "..."): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen - suffix.length) + suffix;
}

export function pad(text: string, width: number, align: "left" | "right" | "center" = "left", char = " "): string {
  if (text.length >= width) return text;
  const padding = width - text.length;
  switch (align) {
    case "left": return text + char.repeat(padding);
    case "right": return char.repeat(padding) + text;
    case "center": {
      const left = Math.floor(padding / 2);
      const right = padding - left;
      return char.repeat(left) + text + char.repeat(right);
    }
  }
}

export function columns(rows: string[][], widths?: number[], gap = 2): string {
  const colCount = Math.max(...rows.map((r) => r.length));
  const actualWidths = widths || Array.from({ length: colCount }, (_, i) =>
    Math.max(...rows.map((r) => (r[i] || "").length))
  );
  return rows
    .map((row) =>
      row.map((cell, i) => pad(cell || "", actualWidths[i] || 0)).join(" ".repeat(gap))
    )
    .join("\n");
}

export function indent(text: string, spaces = 2): string {
  const prefix = " ".repeat(spaces);
  return text.split("\n").map((line) => prefix + line).join("\n");
}

export function dedent(text: string): string {
  const lines = text.split("\n");
  const nonEmpty = lines.filter((l) => l.trim().length > 0);
  if (nonEmpty.length === 0) return text;
  const minIndent = Math.min(...nonEmpty.map((l) => l.match(/^(\s*)/)![0].length));
  return lines.map((l) => l.slice(minIndent)).join("\n");
}

export function box(text: string, padding = 1, borderChar = "*"): string {
  const lines = text.split("\n");
  const maxLen = Math.max(...lines.map((l) => l.length));
  const width = maxLen + padding * 2 + 2;
  const top = borderChar.repeat(width);
  const empty = borderChar + " ".repeat(width - 2) + borderChar;
  const padded = lines.map((l) =>
    borderChar + " ".repeat(padding) + pad(l, maxLen) + " ".repeat(padding) + borderChar
  );
  const result: string[] = [top];
  for (let i = 0; i < padding; i++) result.push(empty);
  result.push(...padded);
  for (let i = 0; i < padding; i++) result.push(empty);
  result.push(top);
  return result.join("\n");
}

export function stripAnsi(text: string): string {
  return text.replace(/\x1b\[[0-9;]*m/g, "");
}

export function center(text: string, width: number): string {
  return pad(text, width, "center");
}
