import { describe, it, expect } from "vitest";
import { DataTable } from "../data-table.js";

describe("DataTable", () => {
  const sampleData = [
    { name: "Alice", age: 30, dept: "Engineering" },
    { name: "Bob", age: 25, dept: "Marketing" },
    { name: "Charlie", age: 35, dept: "Engineering" },
    { name: "Diana", age: 28, dept: "Marketing" },
  ];

  it("creates from array and returns rows", () => {
    const dt = new DataTable(sampleData);
    expect(dt.count()).toBe(4);
    expect(dt.getRows()).toEqual(sampleData);
  });

  it("addRow adds a row", () => {
    const dt = new DataTable<Record<string, unknown>>();
    dt.addRow({ name: "Eve", age: 22 });
    expect(dt.count()).toBe(1);
    expect(dt.getRows()[0]).toEqual({ name: "Eve", age: 22 });
  });

  it("columns returns keys from first row", () => {
    const dt = new DataTable(sampleData);
    expect(dt.columns()).toEqual(["name", "age", "dept"]);
  });

  it("select picks specific columns", () => {
    const dt = new DataTable(sampleData);
    const selected = dt.select("name", "age");
    expect(selected.getRows()[0]).toEqual({ name: "Alice", age: 30 });
    expect(selected.columns()).toEqual(["name", "age"]);
  });

  it("where filters rows", () => {
    const dt = new DataTable(sampleData);
    const filtered = dt.where((r) => r.dept === "Engineering");
    expect(filtered.count()).toBe(2);
    expect(filtered.getRows().map((r) => r.name)).toEqual(["Alice", "Charlie"]);
  });

  it("sortBy sorts ascending and descending", () => {
    const dt = new DataTable(sampleData);
    const asc = dt.sortBy("age");
    expect(asc.getRows().map((r) => r.name)).toEqual(["Bob", "Diana", "Alice", "Charlie"]);
    const desc = dt.sortBy("age", true);
    expect(desc.getRows().map((r) => r.name)).toEqual(["Charlie", "Alice", "Diana", "Bob"]);
  });

  it("limit and offset work", () => {
    const dt = new DataTable(sampleData);
    expect(dt.limit(2).count()).toBe(2);
    expect(dt.offset(2).count()).toBe(2);
    expect(dt.offset(1).limit(2).count()).toBe(2);
  });

  it("distinct returns unique values", () => {
    const dt = new DataTable(sampleData);
    const depts = dt.distinct("dept");
    expect(depts).toEqual(["Engineering", "Marketing"]);
  });

  it("groupBy groups rows by column", () => {
    const dt = new DataTable(sampleData);
    const groups = dt.groupBy("dept");
    expect(groups.size).toBe(2);
    expect(groups.get("Engineering")!.length).toBe(2);
    expect(groups.get("Marketing")!.length).toBe(2);
  });

  it("aggregate functions work", () => {
    const dt = new DataTable(sampleData);
    expect(dt.sum("age")).toBe(118);
    expect(dt.avg("age")).toBe(29.5);
    expect(dt.min("age")).toBe(25);
    expect(dt.max("age")).toBe(35);
  });

  it("pluck extracts column values", () => {
    const dt = new DataTable(sampleData);
    expect(dt.pluck("name")).toEqual(["Alice", "Bob", "Charlie", "Diana"]);
  });

  it("toCSV generates valid CSV", () => {
    const dt = new DataTable([{ a: 1, b: 2 }, { a: 3, b: 4 }]);
    const csv = dt.toCSV();
    expect(csv).toBe("a,b\n1,2\n3,4");
  });

  it("toJSON generates valid JSON", () => {
    const dt = new DataTable([{ x: 1 }]);
    const json = dt.toJSON();
    expect(JSON.parse(json)).toEqual([{ x: 1 }]);
  });
});
