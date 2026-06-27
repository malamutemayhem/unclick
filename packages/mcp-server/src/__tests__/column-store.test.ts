import { describe, it, expect } from "vitest";
import { ColumnStore } from "../column-store.js";

describe("ColumnStore", () => {
  it("adds columns and inserts rows", () => {
    const store = new ColumnStore();
    store.addColumn("id", "int");
    store.addColumn("name", "string");
    store.insertRow({ id: 1, name: "Alice" });
    expect(store.rows()).toBe(1);
  });

  it("retrieves rows by id", () => {
    const store = new ColumnStore();
    store.addColumn("id", "int");
    store.addColumn("name", "string");
    store.insertRow({ id: 1, name: "Alice" });
    const row = store.getRow(0);
    expect(row).toEqual({ id: 1, name: "Alice" });
  });

  it("gets column data", () => {
    const store = new ColumnStore();
    store.addColumn("score", "int");
    store.insertRow({ score: 10 });
    store.insertRow({ score: 20 });
    expect(store.getColumn("score")).toEqual([10, 20]);
  });

  it("scans with filter", () => {
    const store = new ColumnStore();
    store.addColumn("age", "int");
    store.insertRow({ age: 25 });
    store.insertRow({ age: 15 });
    store.insertRow({ age: 30 });
    const results = store.scan((row) => (row.age as number) >= 18);
    expect(results).toEqual([0, 2]);
  });

  it("aggregates sum", () => {
    const store = new ColumnStore();
    store.addColumn("amount", "float");
    store.insertRow({ amount: 10 });
    store.insertRow({ amount: 20 });
    store.insertRow({ amount: 30 });
    expect(store.aggregate("amount", "sum")).toBe(60);
  });

  it("aggregates avg", () => {
    const store = new ColumnStore();
    store.addColumn("val", "float");
    store.insertRow({ val: 10 });
    store.insertRow({ val: 20 });
    expect(store.aggregate("val", "avg")).toBe(15);
  });

  it("aggregates min and max", () => {
    const store = new ColumnStore();
    store.addColumn("x", "int");
    store.insertRow({ x: 5 });
    store.insertRow({ x: 1 });
    store.insertRow({ x: 9 });
    expect(store.aggregate("x", "min")).toBe(1);
    expect(store.aggregate("x", "max")).toBe(9);
  });

  it("projects specific columns", () => {
    const store = new ColumnStore();
    store.addColumn("a", "int");
    store.addColumn("b", "int");
    store.addColumn("c", "int");
    store.insertRow({ a: 1, b: 2, c: 3 });
    const projected = store.project(["a", "c"]);
    expect(projected).toEqual([{ a: 1, c: 3 }]);
  });

  it("groups by column", () => {
    const store = new ColumnStore();
    store.addColumn("dept", "string");
    store.addColumn("salary", "int");
    store.insertRow({ dept: "eng", salary: 100 });
    store.insertRow({ dept: "eng", salary: 150 });
    store.insertRow({ dept: "sales", salary: 80 });
    const groups = store.groupBy("dept", "salary", "sum");
    expect(groups.get("eng")).toBe(250);
    expect(groups.get("sales")).toBe(80);
  });

  it("returns column names", () => {
    const store = new ColumnStore();
    store.addColumn("x", "int");
    store.addColumn("y", "string");
    expect(store.columnNames()).toEqual(["x", "y"]);
    expect(store.columnCount()).toBe(2);
  });

  it("returns null for invalid row", () => {
    const store = new ColumnStore();
    store.addColumn("x", "int");
    expect(store.getRow(99)).toBeNull();
  });
});
