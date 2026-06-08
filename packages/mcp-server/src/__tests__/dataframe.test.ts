import { describe, it, expect } from "vitest";
import { DataFrame } from "../dataframe.js";

describe("DataFrame", () => {
  const data = [
    { name: "Alice", age: 30, score: 90 },
    { name: "Bob", age: 25, score: 85 },
    { name: "Carol", age: 35, score: 95 },
    { name: "Dave", age: 25, score: 70 },
  ];

  it("creates from rows", () => {
    const df = new DataFrame(data);
    expect(df.shape).toEqual([4, 3]);
    expect(df.cols).toEqual(["name", "age", "score"]);
  });

  it("creates from columns", () => {
    const df = DataFrame.fromColumns({ x: [1, 2], y: [3, 4] });
    expect(df.shape).toEqual([2, 2]);
  });

  it("creates from CSV", () => {
    const csv = "name,age\nAlice,30\nBob,25";
    const df = DataFrame.fromCSV(csv);
    expect(df.shape).toEqual([2, 2]);
    expect(df.toRows()[0].name).toBe("Alice");
    expect(df.toRows()[0].age).toBe(30);
  });

  it("head returns first n rows", () => {
    const df = new DataFrame(data);
    expect(df.head(2).rowCount).toBe(2);
  });

  it("tail returns last n rows", () => {
    const df = new DataFrame(data);
    const t = df.tail(2);
    expect(t.rowCount).toBe(2);
    expect(t.toRows()[0].name).toBe("Carol");
  });

  it("selects columns", () => {
    const df = new DataFrame(data).select("name", "score");
    expect(df.cols).toEqual(["name", "score"]);
    expect(df.shape[1]).toBe(2);
  });

  it("drops columns", () => {
    const df = new DataFrame(data).drop("age");
    expect(df.cols).not.toContain("age");
  });

  it("filters rows", () => {
    const df = new DataFrame(data).filter((r) => (r.age as number) > 28);
    expect(df.rowCount).toBe(2);
  });

  it("where with predicate", () => {
    const df = new DataFrame(data).where("age", (v) => v === 25);
    expect(df.rowCount).toBe(2);
  });

  it("sorts by column", () => {
    const df = new DataFrame(data).sort("score");
    const rows = df.toRows();
    expect(rows[0].name).toBe("Dave");
    expect(rows[3].name).toBe("Carol");
  });

  it("sorts descending", () => {
    const df = new DataFrame(data).sort("score", false);
    expect(df.toRows()[0].name).toBe("Carol");
  });

  it("adds column", () => {
    const df = new DataFrame(data).addColumn("doubled", (r) => (r.score as number) * 2);
    expect(df.cols).toContain("doubled");
    expect(df.toRows()[0].doubled).toBe(180);
  });

  it("renames columns", () => {
    const df = new DataFrame(data).rename({ name: "fullName" });
    expect(df.cols).toContain("fullName");
    expect(df.cols).not.toContain("name");
  });

  it("aggregates sum", () => {
    const df = new DataFrame(data);
    expect(df.agg("age", "sum")).toBe(115);
  });

  it("aggregates mean", () => {
    const df = new DataFrame(data);
    expect(df.agg("age", "mean")).toBeCloseTo(28.75);
  });

  it("aggregates count", () => {
    const df = new DataFrame(data);
    expect(df.agg("age", "count")).toBe(4);
  });

  it("aggregates min/max", () => {
    const df = new DataFrame(data);
    expect(df.agg("score", "min")).toBe(70);
    expect(df.agg("score", "max")).toBe(95);
  });

  it("unique values", () => {
    const df = new DataFrame(data);
    expect(df.unique("age").sort()).toEqual([25, 30, 35]);
  });

  it("groupBy", () => {
    const df = new DataFrame(data);
    const groups = df.groupBy("age");
    expect(groups.size).toBe(3);
    expect(groups.get(25)!.rowCount).toBe(2);
  });

  it("toCSV round trips", () => {
    const df = new DataFrame(data);
    const csv = df.toCSV();
    const df2 = DataFrame.fromCSV(csv);
    expect(df2.shape).toEqual(df.shape);
  });

  it("describe gives summary stats", () => {
    const df = new DataFrame(data);
    const desc = df.describe();
    expect(desc.age.mean).toBeCloseTo(28.75);
  });
});
