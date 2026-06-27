export class MarkdownTable {
  private headers: string[] = [];
  private rows: string[][] = [];
  private alignments: ("left" | "right" | "center")[] = [];

  setHeaders(...headers: string[]): this {
    this.headers = headers;
    return this;
  }

  setAlignments(...alignments: ("left" | "right" | "center")[]): this {
    this.alignments = alignments;
    return this;
  }

  addRow(...cells: (string | number | boolean)[]): this {
    this.rows.push(cells.map(String));
    return this;
  }

  addRows(rows: (string | number | boolean)[][]): this {
    for (const row of rows) {
      this.addRow(...row);
    }
    return this;
  }

  build(): string {
    if (this.headers.length === 0) return "";

    const colCount = this.headers.length;
    const widths = this.headers.map((h, i) => {
      let max = h.length;
      for (const row of this.rows) {
        const cell = row[i] ?? "";
        if (cell.length > max) max = cell.length;
      }
      return Math.max(max, 3);
    });

    const padCell = (text: string, width: number, align: "left" | "right" | "center"): string => {
      const diff = width - text.length;
      if (diff <= 0) return text;
      if (align === "right") return " ".repeat(diff) + text;
      if (align === "center") {
        const left = Math.floor(diff / 2);
        return " ".repeat(left) + text + " ".repeat(diff - left);
      }
      return text + " ".repeat(diff);
    };

    const headerLine = "| " + this.headers.map((h, i) =>
      padCell(h, widths[i], this.alignments[i] ?? "left")
    ).join(" | ") + " |";

    const separatorLine = "| " + widths.map((w, i) => {
      const align = this.alignments[i] ?? "left";
      const dashes = "-".repeat(w);
      if (align === "center") return ":" + dashes.slice(1, -1) + ":";
      if (align === "right") return dashes.slice(0, -1) + ":";
      return dashes;
    }).join(" | ") + " |";

    const dataLines = this.rows.map((row) =>
      "| " + Array.from({ length: colCount }, (_, i) =>
        padCell(row[i] ?? "", widths[i], this.alignments[i] ?? "left")
      ).join(" | ") + " |"
    );

    return [headerLine, separatorLine, ...dataLines].join("\n");
  }

  toCSV(delimiter = ","): string {
    const escape = (s: string) => s.includes(delimiter) || s.includes('"') || s.includes("\n")
      ? '"' + s.replace(/"/g, '""') + '"'
      : s;
    const lines = [
      this.headers.map(escape).join(delimiter),
      ...this.rows.map((row) => row.map(escape).join(delimiter)),
    ];
    return lines.join("\n");
  }

  clear(): this {
    this.headers = [];
    this.rows = [];
    this.alignments = [];
    return this;
  }

  get rowCount(): number {
    return this.rows.length;
  }

  get columnCount(): number {
    return this.headers.length;
  }
}

export function objectsToTable<T extends Record<string, unknown>>(objects: T[], keys?: string[]): string {
  if (objects.length === 0) return "";
  const headers = keys ?? Object.keys(objects[0]);
  const table = new MarkdownTable().setHeaders(...headers);
  for (const obj of objects) {
    table.addRow(...headers.map((k) => String(obj[k] ?? "")));
  }
  return table.build();
}
