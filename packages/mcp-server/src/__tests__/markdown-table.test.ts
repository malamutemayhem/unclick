import { describe, it, expect } from "vitest";
import { MarkdownTable } from "../markdown-table.js";

describe("MarkdownTable", () => {
  it("builds a basic table", () => {
    const table = new MarkdownTable()
      .setHeaders(["Name", "Age"])
      .addRow(["Alice", "30"])
      .addRow(["Bob", "25"])
      .build();
    expect(table).toContain("| Name");
    expect(table).toContain("| Alice");
    expect(table).toContain("---");
  });

  it("aligns columns", () => {
    const table = new MarkdownTable()
      .setHeaders(["Left", "Center", "Right"], ["left", "center", "right"])
      .addRow(["a", "b", "c"])
      .build();
    const lines = table.split("\n");
    const sep = lines[1];
    expect(sep).toContain(":");
  });

  it("pads cells to equal width", () => {
    const table = new MarkdownTable()
      .setHeaders(["X", "LongHeader"])
      .addRow(["1", "2"])
      .build();
    const lines = table.split("\n");
    expect(lines[0].length).toBe(lines[2].length);
  });

  it("handles multiple rows at once", () => {
    const table = new MarkdownTable()
      .setHeaders(["a"])
      .addRows([["1"], ["2"], ["3"]]);
    expect(table.rowCount()).toBe(3);
  });

  it("sorts by column", () => {
    const table = new MarkdownTable()
      .setHeaders(["Name"])
      .addRow(["Charlie"])
      .addRow(["Alice"])
      .addRow(["Bob"])
      .sortBy(0);
    const result = table.build();
    const lines = result.split("\n").slice(2);
    expect(lines[0]).toContain("Alice");
    expect(lines[2]).toContain("Charlie");
  });

  it("sorts descending", () => {
    const table = new MarkdownTable()
      .setHeaders(["N"])
      .addRow(["A"])
      .addRow(["C"])
      .addRow(["B"])
      .sortBy(0, "desc");
    const result = table.build();
    const lines = result.split("\n").slice(2);
    expect(lines[0]).toContain("C");
  });

  it("creates from objects", () => {
    const table = MarkdownTable.fromObjects([
      { name: "Alice", score: 95 },
      { name: "Bob", score: 87 },
    ]);
    expect(table.columnCount()).toBe(2);
    expect(table.rowCount()).toBe(2);
    expect(table.getHeaders()).toEqual(["name", "score"]);
  });

  it("tracks counts", () => {
    const table = new MarkdownTable().setHeaders(["a", "b"]).addRow(["1", "2"]);
    expect(table.rowCount()).toBe(1);
    expect(table.columnCount()).toBe(2);
  });
});
