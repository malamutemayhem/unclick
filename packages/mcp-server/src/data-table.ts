export class DataTable<T extends Record<string, unknown> = Record<string, unknown>> {
  private rows: T[] = [];

  constructor(rows?: T[]) {
    if (rows) this.rows = [...rows];
  }

  addRow(row: T): this {
    this.rows.push(row);
    return this;
  }

  getRows(): T[] {
    return [...this.rows];
  }

  count(): number {
    return this.rows.length;
  }

  columns(): string[] {
    if (this.rows.length === 0) return [];
    return Object.keys(this.rows[0]);
  }

  select(...cols: string[]): DataTable {
    const picked = this.rows.map((row) => {
      const r: Record<string, unknown> = {};
      for (const c of cols) r[c] = row[c];
      return r;
    });
    return new DataTable(picked);
  }

  where(predicate: (row: T) => boolean): DataTable<T> {
    return new DataTable(this.rows.filter(predicate));
  }

  sortBy(column: string, descending: boolean = false): DataTable<T> {
    const sorted = [...this.rows].sort((a, b) => {
      const va = a[column];
      const vb = b[column];
      if (typeof va === "number" && typeof vb === "number") return descending ? vb - va : va - vb;
      const sa = String(va);
      const sb = String(vb);
      return descending ? sb.localeCompare(sa) : sa.localeCompare(sb);
    });
    return new DataTable(sorted);
  }

  limit(n: number): DataTable<T> {
    return new DataTable(this.rows.slice(0, n));
  }

  offset(n: number): DataTable<T> {
    return new DataTable(this.rows.slice(n));
  }

  distinct(column: string): unknown[] {
    return [...new Set(this.rows.map((r) => r[column]))];
  }

  groupBy(column: string): Map<unknown, T[]> {
    const groups = new Map<unknown, T[]>();
    for (const row of this.rows) {
      const key = row[column];
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(row);
    }
    return groups;
  }

  sum(column: string): number {
    return this.rows.reduce((s, r) => s + (Number(r[column]) || 0), 0);
  }

  avg(column: string): number {
    if (this.rows.length === 0) return 0;
    return this.sum(column) / this.rows.length;
  }

  min(column: string): number {
    return Math.min(...this.rows.map((r) => Number(r[column]) || 0));
  }

  max(column: string): number {
    return Math.max(...this.rows.map((r) => Number(r[column]) || 0));
  }

  pluck(column: string): unknown[] {
    return this.rows.map((r) => r[column]);
  }

  toCSV(): string {
    const cols = this.columns();
    const header = cols.join(",");
    const rows = this.rows.map((r) => cols.map((c) => String(r[c] ?? "")).join(","));
    return [header, ...rows].join("\n");
  }

  toJSON(): string {
    return JSON.stringify(this.rows, null, 2);
  }
}
