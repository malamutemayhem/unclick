import { describe, it, expect } from "vitest";
import { PivotTable } from "../pivot-table.js";

describe("PivotTable", () => {
  const salesData = [
    { region: "North", product: "A", revenue: 100 },
    { region: "North", product: "B", revenue: 200 },
    { region: "South", product: "A", revenue: 150 },
    { region: "South", product: "B", revenue: 250 },
    { region: "North", product: "A", revenue: 50 },
  ];

  it("pivot with sum aggregation", () => {
    const result = PivotTable.pivot(salesData, "region", "product", "revenue", "sum");
    expect(result.headers).toEqual(["region", "A", "B"]);
    expect(result.rows.length).toBe(2);
    const north = result.rows.find((r) => r.region === "North")!;
    expect(north.A).toBe(150);
    expect(north.B).toBe(200);
  });

  it("pivot with count aggregation", () => {
    const result = PivotTable.pivot(salesData, "region", "product", "revenue", "count");
    const north = result.rows.find((r) => r.region === "North")!;
    expect(north.A).toBe(2);
    expect(north.B).toBe(1);
  });

  it("pivot with avg aggregation", () => {
    const result = PivotTable.pivot(salesData, "region", "product", "revenue", "avg");
    const north = result.rows.find((r) => r.region === "North")!;
    expect(north.A).toBe(75);
    expect(north.B).toBe(200);
  });

  it("pivot with min aggregation", () => {
    const result = PivotTable.pivot(salesData, "region", "product", "revenue", "min");
    const north = result.rows.find((r) => r.region === "North")!;
    expect(north.A).toBe(50);
  });

  it("pivot with max aggregation", () => {
    const result = PivotTable.pivot(salesData, "region", "product", "revenue", "max");
    const north = result.rows.find((r) => r.region === "North")!;
    expect(north.A).toBe(100);
  });

  it("crossTab counts occurrences", () => {
    const result = PivotTable.crossTab(salesData, "region", "product");
    const north = result.rows.find((r) => r.region === "North")!;
    expect(north.A).toBe(2);
    expect(north.B).toBe(1);
  });

  it("rollup groups and aggregates", () => {
    const result = PivotTable.rollup(salesData, "region", "revenue", "sum");
    expect(result.North).toBe(350);
    expect(result.South).toBe(400);
  });

  it("percentOfTotal calculates percentages", () => {
    const result = PivotTable.percentOfTotal(salesData, "region", "revenue");
    expect(result.North + result.South).toBeCloseTo(100, 0);
    expect(result.South).toBeGreaterThan(result.North);
  });

  it("topN returns top entries", () => {
    const result = PivotTable.topN(salesData, "region", "revenue", 1, "sum");
    expect(result.length).toBe(1);
    expect(result[0].key).toBe("South");
    expect(result[0].value).toBe(400);
  });

  it("handles empty column values", () => {
    const result = PivotTable.pivot(
      [{ r: "X", c: "P", v: 10 }],
      "r", "c", "v", "sum",
    );
    expect(result.headers).toEqual(["r", "P"]);
    expect(result.rows[0].P).toBe(10);
  });
});
