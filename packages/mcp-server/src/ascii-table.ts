export interface TableOptions {
  border?: boolean;
  padding?: number;
  align?: Record<string, "left" | "right" | "center">;
}

export function table(
  headers: string[],
  rows: unknown[][],
  options: TableOptions = {}
): string {
  const { border = true, padding = 1, align = {} } = options;

  const allRows = [headers, ...rows.map((r) => r.map(String))];
  const colWidths = headers.map((_, ci) =>
    Math.max(...allRows.map((row) => String(row[ci] ?? "").length))
  );

  const pad = " ".repeat(padding);

  function formatCell(value: string, ci: number): string {
    const width = colWidths[ci];
    const alignment = align[headers[ci]] ?? "left";
    if (alignment === "right") return value.padStart(width);
    if (alignment === "center") {
      const total = width - value.length;
      const left = Math.floor(total / 2);
      return " ".repeat(left) + value + " ".repeat(total - left);
    }
    return value.padEnd(width);
  }

  function formatRow(row: unknown[]): string {
    const cells = headers.map((_, ci) => `${pad}${formatCell(String(row[ci] ?? ""), ci)}${pad}`);
    return border ? `|${cells.join("|")}|` : cells.join(" ");
  }

  function separator(): string {
    const cells = colWidths.map((w) => "-".repeat(w + padding * 2));
    return border ? `|${cells.join("|")}|` : cells.join(" ");
  }

  const lines: string[] = [];
  lines.push(formatRow(headers));
  lines.push(separator());
  for (const row of rows) {
    lines.push(formatRow(row.map(String)));
  }
  return lines.join("\n");
}

export function fromObjects(
  data: Record<string, unknown>[],
  options?: TableOptions
): string {
  if (data.length === 0) return "";
  const headers = [...new Set(data.flatMap(Object.keys))];
  const rows = data.map((obj) => headers.map((h) => obj[h] ?? ""));
  return table(headers, rows, options);
}
