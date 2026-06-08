export interface TableOptions {
  headers?: string[];
  align?: ("left" | "right" | "center")[];
  border?: boolean;
}

export function table(rows: string[][], options?: TableOptions): string {
  if (rows.length === 0 && !options?.headers) return "";
  const allRows = options?.headers ? [options.headers, ...rows] : rows;
  const colCount = Math.max(...allRows.map((r) => r.length));
  const widths: number[] = new Array(colCount).fill(0);
  for (const row of allRows) {
    for (let i = 0; i < colCount; i++) {
      const cell = row[i] ?? "";
      widths[i] = Math.max(widths[i], cell.length);
    }
  }
  const border = options?.border !== false;
  const aligns = options?.align ?? new Array(colCount).fill("left");
  const lines: string[] = [];
  const sep = border ? "+-" + widths.map((w) => "-".repeat(w)).join("-+-") + "-+" : "";

  if (border) lines.push(sep);
  for (let r = 0; r < allRows.length; r++) {
    const row = allRows[r];
    const cells = widths.map((w, i) => {
      const cell = row[i] ?? "";
      const align = aligns[i] ?? "left";
      return padCell(cell, w, align);
    });
    lines.push(border ? "| " + cells.join(" | ") + " |" : cells.join("  "));
    if (options?.headers && r === 0 && border) {
      lines.push(sep);
    }
  }
  if (border) lines.push(sep);
  return lines.join("\n");
}

function padCell(text: string, width: number, align: string): string {
  const diff = width - text.length;
  if (diff <= 0) return text;
  switch (align) {
    case "right": return " ".repeat(diff) + text;
    case "center": {
      const left = Math.floor(diff / 2);
      return " ".repeat(left) + text + " ".repeat(diff - left);
    }
    default: return text + " ".repeat(diff);
  }
}

export function toCSV(rows: string[][], headers?: string[]): string {
  const allRows = headers ? [headers, ...rows] : rows;
  return allRows.map((row) => row.map(escapeCSV).join(",")).join("\n");
}

function escapeCSV(cell: string): string {
  if (cell.includes(",") || cell.includes('"') || cell.includes("\n")) {
    return '"' + cell.replace(/"/g, '""') + '"';
  }
  return cell;
}

export function fromCSV(csv: string): string[][] {
  const rows: string[][] = [];
  let current: string[] = [];
  let cell = "";
  let inQuotes = false;
  for (let i = 0; i < csv.length; i++) {
    const ch = csv[i];
    if (inQuotes) {
      if (ch === '"' && csv[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cell += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        current.push(cell);
        cell = "";
      } else if (ch === "\n") {
        current.push(cell);
        rows.push(current);
        current = [];
        cell = "";
      } else {
        cell += ch;
      }
    }
  }
  current.push(cell);
  rows.push(current);
  return rows;
}
