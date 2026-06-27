export interface TableOptions {
  border?: "simple" | "none" | "rounded";
  align?: ("left" | "right" | "center")[];
  maxWidth?: number;
  header?: boolean;
}

export function formatTable(headers: string[], rows: string[][], options: TableOptions = {}): string {
  const { border = "simple", align = [], maxWidth, header: showHeader = true } = options;

  if (headers.length === 0) return "";

  const allRows = showHeader ? [headers, ...rows] : rows;
  const colWidths = headers.map((_, ci) => {
    let max = showHeader ? headers[ci].length : 0;
    for (const row of rows) {
      const cell = row[ci] ?? "";
      const truncated = maxWidth ? cell.slice(0, maxWidth) : cell;
      if (truncated.length > max) max = truncated.length;
    }
    return max;
  });

  const chars = border === "rounded"
    ? { tl: "╭", tr: "╮", bl: "╰", br: "╯", h: "─", v: "│", cross: "┼", lt: "├", rt: "┤", tt: "┬", bt: "┴" }
    : border === "none"
      ? { tl: "", tr: "", bl: "", br: "", h: "", v: " ", cross: "", lt: "", rt: "", tt: "", bt: "" }
      : { tl: "+", tr: "+", bl: "+", br: "+", h: "-", v: "|", cross: "+", lt: "+", rt: "+", tt: "+", bt: "+" };

  function padCell(text: string, width: number, alignment: "left" | "right" | "center"): string {
    const truncated = maxWidth ? text.slice(0, maxWidth) : text;
    const diff = width - truncated.length;
    if (diff <= 0) return truncated;
    if (alignment === "right") return " ".repeat(diff) + truncated;
    if (alignment === "center") {
      const left = Math.floor(diff / 2);
      return " ".repeat(left) + truncated + " ".repeat(diff - left);
    }
    return truncated + " ".repeat(diff);
  }

  function formatRow(row: string[]): string {
    const cells = headers.map((_, ci) => {
      const cell = row[ci] ?? "";
      return padCell(cell, colWidths[ci], align[ci] ?? "left");
    });
    if (border === "none") return cells.join("  ");
    return chars.v + " " + cells.join(" " + chars.v + " ") + " " + chars.v;
  }

  function separator(left: string, mid: string, right: string): string {
    if (border === "none") return "";
    const line = colWidths.map((w) => chars.h.repeat(w + 2)).join(mid);
    return left + line + right;
  }

  const lines: string[] = [];

  if (border !== "none") {
    lines.push(separator(chars.tl, chars.tt, chars.tr));
  }

  if (showHeader) {
    lines.push(formatRow(allRows[0]));
    if (border !== "none") {
      lines.push(separator(chars.lt, chars.cross, chars.rt));
    }
    for (let i = 1; i < allRows.length; i++) {
      lines.push(formatRow(allRows[i]));
    }
  } else {
    for (const row of allRows) {
      lines.push(formatRow(row));
    }
  }

  if (border !== "none") {
    lines.push(separator(chars.bl, chars.bt, chars.br));
  }

  return lines.filter((l) => l !== "").join("\n");
}

export function formatKeyValue(pairs: [string, string][], separator = ": "): string {
  const maxKeyLen = pairs.reduce((max, [k]) => Math.max(max, k.length), 0);
  return pairs.map(([k, v]) => k.padEnd(maxKeyLen) + separator + v).join("\n");
}

export function csvToTable(csv: string, delimiter = ","): { headers: string[]; rows: string[][] } {
  const lines = csv.trim().split("\n");
  if (lines.length === 0) return { headers: [], rows: [] };
  const headers = parseCsvLine(lines[0], delimiter);
  const rows = lines.slice(1).map((line) => parseCsvLine(line, delimiter));
  return { headers, rows };
}

function parseCsvLine(line: string, delimiter: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    if (inQuotes) {
      if (line[i] === '"' && line[i + 1] === '"') {
        current += '"';
        i++;
      } else if (line[i] === '"') {
        inQuotes = false;
      } else {
        current += line[i];
      }
    } else if (line[i] === '"') {
      inQuotes = true;
    } else if (line[i] === delimiter) {
      result.push(current);
      current = "";
    } else {
      current += line[i];
    }
  }
  result.push(current);
  return result;
}
