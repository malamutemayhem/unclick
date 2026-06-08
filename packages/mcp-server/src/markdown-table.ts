export type Alignment = "left" | "center" | "right";

export class MarkdownTable {
  private headers: string[] = [];
  private alignments: Alignment[] = [];
  private rows: string[][] = [];

  setHeaders(headers: string[], alignments?: Alignment[]): this {
    this.headers = [...headers];
    this.alignments = alignments || headers.map(() => "left");
    return this;
  }

  addRow(row: string[]): this {
    this.rows.push([...row]);
    return this;
  }

  addRows(rows: string[][]): this {
    for (const row of rows) {
      this.rows.push([...row]);
    }
    return this;
  }

  build(): string {
    const colCount = this.headers.length;
    const widths = this.calculateWidths(colCount);
    const lines: string[] = [];

    lines.push(this.formatRow(this.headers, widths));
    lines.push(this.formatSeparator(widths));

    for (const row of this.rows) {
      lines.push(this.formatRow(row, widths));
    }

    return lines.join("\n");
  }

  private calculateWidths(colCount: number): number[] {
    const widths: number[] = [];
    for (let i = 0; i < colCount; i++) {
      let max = this.headers[i]?.length || 3;
      for (const row of this.rows) {
        const cellLen = (row[i] || "").length;
        if (cellLen > max) max = cellLen;
      }
      widths.push(Math.max(max, 3));
    }
    return widths;
  }

  private formatRow(cells: string[], widths: number[]): string {
    const formatted = widths.map((w, i) => {
      const cell = cells[i] || "";
      const alignment = this.alignments[i] || "left";
      return MarkdownTable.padCell(cell, w, alignment);
    });
    return `| ${formatted.join(" | ")} |`;
  }

  private formatSeparator(widths: number[]): string {
    const seps = widths.map((w, i) => {
      const alignment = this.alignments[i] || "left";
      const dashes = "-".repeat(w);
      if (alignment === "center") return `:${dashes.slice(1, -1)}:`;
      if (alignment === "right") return `${dashes.slice(0, -1)}:`;
      return dashes;
    });
    return `| ${seps.join(" | ")} |`;
  }

  private static padCell(text: string, width: number, alignment: Alignment): string {
    const padding = width - text.length;
    if (padding <= 0) return text;
    if (alignment === "right") return " ".repeat(padding) + text;
    if (alignment === "center") {
      const left = Math.floor(padding / 2);
      const right = padding - left;
      return " ".repeat(left) + text + " ".repeat(right);
    }
    return text + " ".repeat(padding);
  }

  rowCount(): number {
    return this.rows.length;
  }

  columnCount(): number {
    return this.headers.length;
  }

  getHeaders(): string[] {
    return [...this.headers];
  }

  sortBy(columnIndex: number, direction: "asc" | "desc" = "asc"): this {
    this.rows.sort((a, b) => {
      const va = a[columnIndex] || "";
      const vb = b[columnIndex] || "";
      const cmp = va.localeCompare(vb);
      return direction === "desc" ? -cmp : cmp;
    });
    return this;
  }

  static fromObjects(objects: Array<Record<string, string | number>>): MarkdownTable {
    const table = new MarkdownTable();
    if (objects.length === 0) return table;
    const keys = Object.keys(objects[0]);
    table.setHeaders(keys);
    for (const obj of objects) {
      table.addRow(keys.map((k) => String(obj[k] ?? "")));
    }
    return table;
  }
}
