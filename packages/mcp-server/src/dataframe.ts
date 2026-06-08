export type CellValue = string | number | boolean | null;
export type Row = Record<string, CellValue>;

export class DataFrame {
  private columns: string[];
  private data: CellValue[][];

  constructor(rows: Row[]) {
    if (rows.length === 0) {
      this.columns = [];
      this.data = [];
      return;
    }
    this.columns = Object.keys(rows[0]);
    this.data = rows.map((row) => this.columns.map((col) => row[col] ?? null));
  }

  static fromColumns(cols: Record<string, CellValue[]>): DataFrame {
    const keys = Object.keys(cols);
    if (keys.length === 0) return new DataFrame([]);
    const len = cols[keys[0]].length;
    const rows: Row[] = [];
    for (let i = 0; i < len; i++) {
      const row: Row = {};
      for (const k of keys) row[k] = cols[k][i] ?? null;
      rows.push(row);
    }
    return new DataFrame(rows);
  }

  static fromCSV(csv: string): DataFrame {
    const lines = csv.trim().split("\n");
    if (lines.length < 2) return new DataFrame([]);
    const headers = lines[0].split(",").map((h) => h.trim());
    const rows: Row[] = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map((v) => v.trim());
      const row: Row = {};
      for (let j = 0; j < headers.length; j++) {
        const val = values[j] ?? "";
        const num = Number(val);
        row[headers[j]] = val === "" ? null : !isNaN(num) && val !== "" ? num : val;
      }
      rows.push(row);
    }
    return new DataFrame(rows);
  }

  get shape(): [number, number] {
    return [this.data.length, this.columns.length];
  }

  get cols(): string[] {
    return [...this.columns];
  }

  get rowCount(): number {
    return this.data.length;
  }

  head(n = 5): DataFrame {
    return this.fromInternal(this.data.slice(0, n));
  }

  tail(n = 5): DataFrame {
    return this.fromInternal(this.data.slice(-n));
  }

  select(...cols: string[]): DataFrame {
    const indices = cols.map((c) => this.colIndex(c));
    const newData = this.data.map((row) => indices.map((i) => row[i]));
    const df = new DataFrame([]);
    df.columns = cols;
    df.data = newData;
    return df;
  }

  drop(...cols: string[]): DataFrame {
    const dropSet = new Set(cols);
    const remaining = this.columns.filter((c) => !dropSet.has(c));
    return this.select(...remaining);
  }

  filter(fn: (row: Row) => boolean): DataFrame {
    const rows = this.toRows().filter(fn);
    return new DataFrame(rows);
  }

  where(col: string, pred: (value: CellValue) => boolean): DataFrame {
    const idx = this.colIndex(col);
    const newData = this.data.filter((row) => pred(row[idx]));
    return this.fromInternal(newData);
  }

  sort(col: string, ascending = true): DataFrame {
    const idx = this.colIndex(col);
    const sorted = [...this.data].sort((a, b) => {
      const va = a[idx];
      const vb = b[idx];
      if (va === null && vb === null) return 0;
      if (va === null) return 1;
      if (vb === null) return -1;
      if (typeof va === "number" && typeof vb === "number") return ascending ? va - vb : vb - va;
      const sa = String(va);
      const sb = String(vb);
      return ascending ? sa.localeCompare(sb) : sb.localeCompare(sa);
    });
    return this.fromInternal(sorted);
  }

  addColumn(name: string, fn: (row: Row) => CellValue): DataFrame {
    const rows = this.toRows().map((row) => ({ ...row, [name]: fn(row) }));
    return new DataFrame(rows);
  }

  rename(mapping: Record<string, string>): DataFrame {
    const df = new DataFrame([]);
    df.columns = this.columns.map((c) => mapping[c] || c);
    df.data = this.data.map((r) => [...r]);
    return df;
  }

  groupBy(col: string): Map<CellValue, DataFrame> {
    const idx = this.colIndex(col);
    const groups = new Map<CellValue, CellValue[][]>();
    for (const row of this.data) {
      const key = row[idx];
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(row);
    }
    const result = new Map<CellValue, DataFrame>();
    for (const [key, rows] of groups) {
      result.set(key, this.fromInternal(rows));
    }
    return result;
  }

  agg(col: string, fn: "sum" | "mean" | "min" | "max" | "count"): CellValue {
    const idx = this.colIndex(col);
    const values = this.data.map((r) => r[idx]).filter((v): v is number => typeof v === "number");
    switch (fn) {
      case "count": return values.length;
      case "sum": return values.reduce((a, b) => a + b, 0);
      case "mean": return values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : null;
      case "min": return values.length > 0 ? Math.min(...values) : null;
      case "max": return values.length > 0 ? Math.max(...values) : null;
    }
  }

  unique(col: string): CellValue[] {
    const idx = this.colIndex(col);
    return [...new Set(this.data.map((r) => r[idx]))];
  }

  toRows(): Row[] {
    return this.data.map((row) => {
      const obj: Row = {};
      for (let i = 0; i < this.columns.length; i++) obj[this.columns[i]] = row[i];
      return obj;
    });
  }

  toCSV(): string {
    const header = this.columns.join(",");
    const rows = this.data.map((row) => row.map((v) => v === null ? "" : String(v)).join(","));
    return [header, ...rows].join("\n");
  }

  describe(): Record<string, Record<string, CellValue>> {
    const result: Record<string, Record<string, CellValue>> = {};
    for (const col of this.columns) {
      result[col] = {
        count: this.agg(col, "count"),
        sum: this.agg(col, "sum"),
        mean: this.agg(col, "mean"),
        min: this.agg(col, "min"),
        max: this.agg(col, "max"),
      };
    }
    return result;
  }

  private colIndex(col: string): number {
    const idx = this.columns.indexOf(col);
    if (idx === -1) throw new Error(`Column "${col}" not found`);
    return idx;
  }

  private fromInternal(data: CellValue[][]): DataFrame {
    const df = new DataFrame([]);
    df.columns = [...this.columns];
    df.data = data.map((r) => [...r]);
    return df;
  }
}
