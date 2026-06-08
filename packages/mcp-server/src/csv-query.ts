export type Row = Record<string, string>;

export class CsvQuery {
  static parse(csv: string, delimiter = ","): Row[] {
    const lines = csv.trim().split("\n");
    if (lines.length < 2) return [];
    const headers = lines[0].split(delimiter).map(h => h.trim());
    return lines.slice(1).map(line => {
      const values = line.split(delimiter).map(v => v.trim());
      const row: Row = {};
      headers.forEach((h, i) => { row[h] = values[i] ?? ""; });
      return row;
    });
  }

  static select(rows: Row[], columns: string[]): Row[] {
    return rows.map(row => {
      const result: Row = {};
      for (const col of columns) {
        if (col in row) result[col] = row[col];
      }
      return result;
    });
  }

  static where(rows: Row[], predicate: (row: Row) => boolean): Row[] {
    return rows.filter(predicate);
  }

  static orderBy(rows: Row[], column: string, direction: "asc" | "desc" = "asc"): Row[] {
    return [...rows].sort((a, b) => {
      const va = a[column] ?? "";
      const vb = b[column] ?? "";
      const na = parseFloat(va);
      const nb = parseFloat(vb);
      const cmp = (!isNaN(na) && !isNaN(nb)) ? na - nb : va.localeCompare(vb);
      return direction === "desc" ? -cmp : cmp;
    });
  }

  static limit(rows: Row[], count: number, offset = 0): Row[] {
    return rows.slice(offset, offset + count);
  }

  static distinct(rows: Row[], column: string): string[] {
    return [...new Set(rows.map(r => r[column] ?? ""))];
  }

  static groupBy(rows: Row[], column: string): Record<string, Row[]> {
    const groups: Record<string, Row[]> = {};
    for (const row of rows) {
      const key = row[column] ?? "";
      if (!groups[key]) groups[key] = [];
      groups[key].push(row);
    }
    return groups;
  }

  static count(rows: Row[]): number {
    return rows.length;
  }

  static sum(rows: Row[], column: string): number {
    return rows.reduce((s, r) => s + (parseFloat(r[column]) || 0), 0);
  }

  static avg(rows: Row[], column: string): number {
    if (rows.length === 0) return 0;
    return Math.round((CsvQuery.sum(rows, column) / rows.length) * 10000) / 10000;
  }

  static min(rows: Row[], column: string): string {
    if (rows.length === 0) return "";
    return rows.reduce((m, r) => (r[column] ?? "") < m ? (r[column] ?? "") : m, rows[0][column] ?? "");
  }

  static max(rows: Row[], column: string): string {
    if (rows.length === 0) return "";
    return rows.reduce((m, r) => (r[column] ?? "") > m ? (r[column] ?? "") : m, rows[0][column] ?? "");
  }

  static toCsv(rows: Row[], delimiter = ","): string {
    if (rows.length === 0) return "";
    const headers = Object.keys(rows[0]);
    const lines = [headers.join(delimiter)];
    for (const row of rows) {
      lines.push(headers.map(h => row[h] ?? "").join(delimiter));
    }
    return lines.join("\n");
  }
}
