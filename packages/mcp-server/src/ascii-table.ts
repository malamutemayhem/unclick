export interface TableOptions {
  headers?: string[];
  align?: ("left" | "right" | "center")[];
  border?: boolean;
}

export function table(rows: string[][], options?: TableOptions): string {
  const headers = options?.headers;
  const border = options?.border ?? true;
  const allRows = headers ? [headers, ...rows] : rows;
  if (allRows.length === 0) return "";

  const colCount = Math.max(...allRows.map((r) => r.length));
  const colWidths: number[] = Array(colCount).fill(0);

  for (const row of allRows) {
    for (let i = 0; i < colCount; i++) {
      colWidths[i] = Math.max(colWidths[i], (row[i] || "").length);
    }
  }

  const alignArr = options?.align || Array(colCount).fill("left");

  function pad(val: string, width: number, align: string): string {
    const diff = width - val.length;
    if (align === "right") return " ".repeat(diff) + val;
    if (align === "center") {
      const left = Math.floor(diff / 2);
      return " ".repeat(left) + val + " ".repeat(diff - left);
    }
    return val + " ".repeat(diff);
  }

  function formatRow(row: string[]): string {
    const cells = colWidths.map((w, i) => pad(row[i] || "", w, alignArr[i] || "left"));
    return border ? `| ${cells.join(" | ")} |` : cells.join("  ");
  }

  function separator(): string {
    return border ? `+-${colWidths.map((w) => "-".repeat(w)).join("-+-")}-+` : "";
  }

  const lines: string[] = [];
  if (border) lines.push(separator());
  if (headers) {
    lines.push(formatRow(headers));
    if (border) lines.push(separator());
  }
  for (const row of rows) {
    lines.push(formatRow(row));
  }
  if (border) lines.push(separator());

  return lines.join("\n");
}

export function markdownTable(rows: string[][], headers: string[], align?: ("left" | "right" | "center")[]): string {
  const colCount = headers.length;
  const colWidths: number[] = headers.map((h) => h.length);

  for (const row of rows) {
    for (let i = 0; i < colCount; i++) {
      colWidths[i] = Math.max(colWidths[i], (row[i] || "").length);
    }
  }

  function pad(val: string, width: number): string {
    return val + " ".repeat(width - val.length);
  }

  const headerLine = `| ${headers.map((h, i) => pad(h, colWidths[i])).join(" | ")} |`;
  const sepLine = `| ${colWidths.map((w, i) => {
    const a = align?.[i] || "left";
    if (a === "center") return `:${"-".repeat(Math.max(1, w - 2))}:`;
    if (a === "right") return `${"-".repeat(Math.max(1, w - 1))}:`;
    return "-".repeat(w);
  }).join(" | ")} |`;
  const dataLines = rows.map((row) => `| ${colWidths.map((w, i) => pad(row[i] || "", w)).join(" | ")} |`);

  return [headerLine, sepLine, ...dataLines].join("\n");
}
