export type Alignment = "left" | "center" | "right";

export class MarkdownTableGen {
  static generate(
    headers: string[],
    rows: string[][],
    alignments?: Alignment[],
  ): string {
    const cols = headers.length;
    const widths = headers.map(h => h.length);
    for (const row of rows) {
      for (let i = 0; i < cols; i++) {
        widths[i] = Math.max(widths[i], (row[i] ?? "").length);
      }
    }
    widths.forEach((w, i) => { widths[i] = Math.max(w, 3); });

    const pad = (s: string, w: number, align: Alignment = "left"): string => {
      const diff = w - s.length;
      if (align === "right") return " ".repeat(diff) + s;
      if (align === "center") {
        const left = Math.floor(diff / 2);
        return " ".repeat(left) + s + " ".repeat(diff - left);
      }
      return s + " ".repeat(diff);
    };

    const aligns = alignments ?? headers.map(() => "left" as Alignment);

    const headerLine = "| " + headers.map((h, i) => pad(h, widths[i], aligns[i])).join(" | ") + " |";

    const sepLine = "| " + widths.map((w, i) => {
      const a = aligns[i];
      if (a === "center") return ":" + "-".repeat(w - 2) + ":";
      if (a === "right") return "-".repeat(w - 1) + ":";
      return "-".repeat(w);
    }).join(" | ") + " |";

    const bodyLines = rows.map(
      row => "| " + headers.map((_, i) => pad(row[i] ?? "", widths[i], aligns[i])).join(" | ") + " |"
    );

    return [headerLine, sepLine, ...bodyLines].join("\n");
  }

  static fromObjects(data: Record<string, string | number>[], alignments?: Alignment[]): string {
    if (data.length === 0) return "";
    const headers = Object.keys(data[0]);
    const rows = data.map(obj => headers.map(h => String(obj[h] ?? "")));
    return MarkdownTableGen.generate(headers, rows, alignments);
  }

  static fromCsv(csv: string, delimiter = ","): string {
    const lines = csv.trim().split("\n");
    if (lines.length < 1) return "";
    const headers = lines[0].split(delimiter).map(s => s.trim());
    const rows = lines.slice(1).map(line => line.split(delimiter).map(s => s.trim()));
    return MarkdownTableGen.generate(headers, rows);
  }

  static columnCount(table: string): number {
    const first = table.split("\n")[0];
    return (first.match(/\|/g) || []).length - 1;
  }

  static rowCount(table: string): number {
    return Math.max(0, table.split("\n").length - 2);
  }
}
