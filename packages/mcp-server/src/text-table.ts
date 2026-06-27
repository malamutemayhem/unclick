export interface TextTableOptions {
  columnSeparator?: string;
  headerSeparator?: string;
  alignRight?: number[];
  maxWidth?: number;
}

export function textTable(
  headers: string[],
  rows: string[][],
  options: TextTableOptions = {}
): string {
  const {
    columnSeparator = "  ",
    headerSeparator = "-",
    alignRight = [],
    maxWidth,
  } = options;

  const rightSet = new Set(alignRight);
  const colWidths = headers.map((h, ci) => {
    let max = h.length;
    for (const row of rows) {
      const cell = row[ci] ?? "";
      const len = maxWidth ? Math.min(cell.length, maxWidth) : cell.length;
      if (len > max) max = len;
    }
    return max;
  });

  function formatCell(value: string, ci: number): string {
    const w = colWidths[ci];
    const truncated = maxWidth && value.length > maxWidth ? value.slice(0, maxWidth - 1) + "~" : value;
    return rightSet.has(ci) ? truncated.padStart(w) : truncated.padEnd(w);
  }

  const lines: string[] = [];
  lines.push(headers.map((h, ci) => formatCell(h, ci)).join(columnSeparator));
  lines.push(colWidths.map((w) => headerSeparator.repeat(w)).join(columnSeparator));
  for (const row of rows) {
    lines.push(headers.map((_, ci) => formatCell(row[ci] ?? "", ci)).join(columnSeparator));
  }
  return lines.join("\n");
}

export function markdownTable(headers: string[], rows: string[][]): string {
  const colWidths = headers.map((h, ci) => {
    let max = h.length;
    for (const row of rows) {
      const len = (row[ci] ?? "").length;
      if (len > max) max = len;
    }
    return Math.max(max, 3);
  });

  const headerLine = "| " + headers.map((h, ci) => h.padEnd(colWidths[ci])).join(" | ") + " |";
  const sepLine = "| " + colWidths.map((w) => "-".repeat(w)).join(" | ") + " |";
  const dataLines = rows.map(
    (row) => "| " + headers.map((_, ci) => (row[ci] ?? "").padEnd(colWidths[ci])).join(" | ") + " |"
  );

  return [headerLine, sepLine, ...dataLines].join("\n");
}
