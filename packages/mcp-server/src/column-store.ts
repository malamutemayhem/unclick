export type ColumnType = "int" | "float" | "string" | "bool";

export interface ColumnDef {
  name: string;
  type: ColumnType;
}

export class ColumnStore {
  private columns = new Map<string, unknown[]>();
  private schema: ColumnDef[] = [];
  private rowCount = 0;

  addColumn(name: string, type: ColumnType): void {
    this.schema.push({ name, type });
    const data: unknown[] = [];
    for (let i = 0; i < this.rowCount; i++) data.push(null);
    this.columns.set(name, data);
  }

  insertRow(values: Record<string, unknown>): number {
    const rowId = this.rowCount++;
    for (const col of this.schema) {
      const data = this.columns.get(col.name)!;
      data.push(values[col.name] ?? null);
    }
    return rowId;
  }

  getColumn(name: string): unknown[] {
    return [...(this.columns.get(name) ?? [])];
  }

  getRow(rowId: number): Record<string, unknown> | null {
    if (rowId < 0 || rowId >= this.rowCount) return null;
    const row: Record<string, unknown> = {};
    for (const col of this.schema) {
      row[col.name] = this.columns.get(col.name)![rowId];
    }
    return row;
  }

  scan(filter: (row: Record<string, unknown>) => boolean): number[] {
    const result: number[] = [];
    for (let i = 0; i < this.rowCount; i++) {
      const row = this.getRow(i);
      if (row && filter(row)) result.push(i);
    }
    return result;
  }

  aggregate(column: string, op: "sum" | "avg" | "min" | "max" | "count"): number {
    const data = this.columns.get(column);
    if (!data) return 0;

    const nums = data.filter((v) => typeof v === "number") as number[];
    if (nums.length === 0) return op === "count" ? 0 : 0;

    switch (op) {
      case "sum": return nums.reduce((a, b) => a + b, 0);
      case "avg": return nums.reduce((a, b) => a + b, 0) / nums.length;
      case "min": return Math.min(...nums);
      case "max": return Math.max(...nums);
      case "count": return nums.length;
    }
  }

  project(columns: string[]): Array<Record<string, unknown>> {
    const result: Array<Record<string, unknown>> = [];
    for (let i = 0; i < this.rowCount; i++) {
      const row: Record<string, unknown> = {};
      for (const col of columns) {
        row[col] = this.columns.get(col)?.[i] ?? null;
      }
      result.push(row);
    }
    return result;
  }

  groupBy(keyColumn: string, valueColumn: string, op: "sum" | "count" | "avg"): Map<unknown, number> {
    const result = new Map<unknown, { sum: number; count: number }>();
    const keys = this.columns.get(keyColumn);
    const vals = this.columns.get(valueColumn);
    if (!keys || !vals) return new Map();

    for (let i = 0; i < this.rowCount; i++) {
      const key = keys[i];
      const val = typeof vals[i] === "number" ? (vals[i] as number) : 0;
      const existing = result.get(key) ?? { sum: 0, count: 0 };
      existing.sum += val;
      existing.count++;
      result.set(key, existing);
    }

    const output = new Map<unknown, number>();
    for (const [key, { sum, count }] of result) {
      switch (op) {
        case "sum": output.set(key, sum); break;
        case "count": output.set(key, count); break;
        case "avg": output.set(key, sum / count); break;
      }
    }
    return output;
  }

  rows(): number {
    return this.rowCount;
  }

  columnCount(): number {
    return this.schema.length;
  }

  columnNames(): string[] {
    return this.schema.map((s) => s.name);
  }
}
