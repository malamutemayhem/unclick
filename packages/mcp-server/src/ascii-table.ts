export interface TableOptions {
  padding?: number;
  header?: boolean;
  border?: boolean;
}

export function table(headers: string[], rows: string[][], options: TableOptions = {}): string {
  const { padding = 1, header = true, border = true } = options;
  const allRows = header ? [headers, ...rows] : rows;
  const colWidths = headers.map((_: string, i: number) => {
    return Math.max(...allRows.map((row: string[]) => (row[i] ?? "").length));
  });

  const pad = " ".repeat(padding);
  const formatRow = (row: string[]): string => {
    const cells = row.map((cell: string, i: number) => `${pad}${cell.padEnd(colWidths[i])}${pad}`);
    return border ? `|${cells.join("|")}|` : cells.join(" ");
  };

  const separator = border
    ? `+${colWidths.map((w: number) => "-".repeat(w + padding * 2)).join("+")}+`
    : colWidths.map((w: number) => "-".repeat(w + padding * 2)).join(" ");

  const lines: string[] = [];
  if (border) lines.push(separator);
  if (header) {
    lines.push(formatRow(headers));
    lines.push(separator);
  }
  for (const row of rows) {
    lines.push(formatRow(row));
  }
  if (border) lines.push(separator);
  return lines.join("\n");
}

export function alignRight(value: string, width: number): string {
  return value.padStart(width);
}

export function alignCenter(value: string, width: number): string {
  const totalPad = width - value.length;
  const left = Math.floor(totalPad / 2);
  return " ".repeat(left) + value + " ".repeat(totalPad - left);
}
