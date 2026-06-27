export type AggregateFunction = "sum" | "count" | "avg" | "min" | "max";

export class PivotTable {
  static pivot(
    data: Record<string, unknown>[],
    rowKey: string,
    colKey: string,
    valueKey: string,
    aggFn: AggregateFunction = "sum",
  ): { headers: string[]; rows: Record<string, unknown>[] } {
    const colValues = [...new Set(data.map((d) => String(d[colKey])))].sort();
    const groups = new Map<string, Map<string, number[]>>();

    for (const row of data) {
      const rk = String(row[rowKey]);
      const ck = String(row[colKey]);
      const val = Number(row[valueKey]) || 0;
      if (!groups.has(rk)) groups.set(rk, new Map());
      const colMap = groups.get(rk)!;
      if (!colMap.has(ck)) colMap.set(ck, []);
      colMap.get(ck)!.push(val);
    }

    const headers = [rowKey, ...colValues];
    const rows: Record<string, unknown>[] = [];

    for (const [rk, colMap] of groups) {
      const row: Record<string, unknown> = { [rowKey]: rk };
      for (const cv of colValues) {
        const values = colMap.get(cv) || [];
        row[cv] = PivotTable.aggregate(values, aggFn);
      }
      rows.push(row);
    }

    return { headers, rows };
  }

  static crossTab(
    data: Record<string, unknown>[],
    rowKey: string,
    colKey: string,
  ): { headers: string[]; rows: Record<string, unknown>[] } {
    return PivotTable.pivot(
      data.map((d) => ({ ...d, _count: 1 })),
      rowKey,
      colKey,
      "_count",
      "count",
    );
  }

  static rollup(
    data: Record<string, unknown>[],
    groupKey: string,
    valueKey: string,
    aggFn: AggregateFunction = "sum",
  ): Record<string, number> {
    const groups = new Map<string, number[]>();
    for (const row of data) {
      const key = String(row[groupKey]);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(Number(row[valueKey]) || 0);
    }

    const result: Record<string, number> = {};
    for (const [key, values] of groups) {
      result[key] = PivotTable.aggregate(values, aggFn);
    }
    return result;
  }

  static percentOfTotal(
    data: Record<string, unknown>[],
    groupKey: string,
    valueKey: string,
  ): Record<string, number> {
    const rollup = PivotTable.rollup(data, groupKey, valueKey, "sum");
    const total = Object.values(rollup).reduce((a, b) => a + b, 0);
    const result: Record<string, number> = {};
    for (const [key, value] of Object.entries(rollup)) {
      result[key] = total === 0 ? 0 : Math.round((value / total) * 1000) / 10;
    }
    return result;
  }

  static topN(
    data: Record<string, unknown>[],
    groupKey: string,
    valueKey: string,
    n: number,
    aggFn: AggregateFunction = "sum",
  ): Array<{ key: string; value: number }> {
    const rollup = PivotTable.rollup(data, groupKey, valueKey, aggFn);
    return Object.entries(rollup)
      .map(([key, value]) => ({ key, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, n);
  }

  private static aggregate(values: number[], fn: AggregateFunction): number {
    if (values.length === 0) return 0;
    switch (fn) {
      case "sum": return values.reduce((a, b) => a + b, 0);
      case "count": return values.length;
      case "avg": return Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 100) / 100;
      case "min": return Math.min(...values);
      case "max": return Math.max(...values);
    }
  }
}
