import { describe, it, expect } from "vitest";
import { MarkdownTable, objectsToTable } from "../markdown-table-builder.js";

describe("MarkdownTable", () => {
  it("builds simple table", () => {
    const table = new MarkdownTable()
      .setHeaders("Name", "Age")
      .addRow("Alice", 30)
      .addRow("Bob", 25);
    const result = table.build();
    expect(result).toContain("| Name");
    expect(result).toContain("| Alice");
    expect(result).toContain("| Bob");
    expect(result.split("\n").length).toBe(4);
  });

  it("right alignment", () => {
    const table = new MarkdownTable()
      .setHeaders("Item", "Price")
      .setAlignments("left", "right")
      .addRow("Pen", "5");
    const result = table.build();
    expect(result).toContain("---:");
  });

  it("center alignment", () => {
    const table = new MarkdownTable()
      .setHeaders("X")
      .setAlignments("center")
      .addRow("y");
    const result = table.build();
    expect(result).toMatch(/:-+:/)
  });

  it("toCSV outputs csv", () => {
    const table = new MarkdownTable()
      .setHeaders("A", "B")
      .addRow("1", "2");
    const csv = table.toCSV();
    expect(csv).toBe("A,B\n1,2");
  });

  it("toCSV escapes commas", () => {
    const table = new MarkdownTable()
      .setHeaders("A")
      .addRow("hello, world");
    const csv = table.toCSV();
    expect(csv).toContain('"hello, world"');
  });

  it("addRows adds multiple", () => {
    const table = new MarkdownTable()
      .setHeaders("X")
      .addRows([["1"], ["2"], ["3"]]);
    expect(table.rowCount).toBe(3);
  });

  it("clear resets", () => {
    const table = new MarkdownTable()
      .setHeaders("X")
      .addRow("1")
      .clear();
    expect(table.rowCount).toBe(0);
    expect(table.columnCount).toBe(0);
  });

  it("empty headers returns empty string", () => {
    expect(new MarkdownTable().build()).toBe("");
  });
});

describe("objectsToTable", () => {
  it("converts objects to markdown table", () => {
    const result = objectsToTable([
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
    ]);
    expect(result).toContain("| name");
    expect(result).toContain("| Alice");
  });

  it("uses custom keys", () => {
    const result = objectsToTable([{ a: 1, b: 2, c: 3 }], ["a", "c"]);
    expect(result).toContain("| a");
    expect(result).toContain("| c");
    expect(result).not.toContain("| b");
  });

  it("returns empty for empty array", () => {
    expect(objectsToTable([])).toBe("");
  });
});
