import { describe, it, expect } from "vitest";
import { MarkdownTableGen } from "../markdown-table-gen.js";

describe("MarkdownTableGen", () => {
  it("generate creates valid markdown table", () => {
    const table = MarkdownTableGen.generate(
      ["Name", "Age"],
      [["Alice", "30"], ["Bob", "25"]],
    );
    const lines = table.split("\n");
    expect(lines.length).toBe(4);
    expect(lines[0]).toContain("Name");
    expect(lines[1]).toContain("---");
  });

  it("right alignment uses colon on right", () => {
    const table = MarkdownTableGen.generate(
      ["Value"],
      [["123"]],
      ["right"],
    );
    expect(table).toContain("--:");
  });

  it("center alignment uses colons on both sides", () => {
    const table = MarkdownTableGen.generate(
      ["Title"],
      [["test"]],
      ["center"],
    );
    expect(table).toContain(":---:");
  });

  it("fromObjects creates table from array of objects", () => {
    const table = MarkdownTableGen.fromObjects([
      { name: "Alice", score: 95 },
      { name: "Bob", score: 87 },
    ]);
    expect(table).toContain("name");
    expect(table).toContain("Alice");
  });

  it("fromCsv parses CSV into table", () => {
    const csv = "Name,Age\nAlice,30\nBob,25";
    const table = MarkdownTableGen.fromCsv(csv);
    expect(table).toContain("Name");
    expect(table).toContain("Alice");
  });

  it("columnCount returns correct count", () => {
    const table = MarkdownTableGen.generate(
      ["A", "B", "C"],
      [["1", "2", "3"]],
    );
    expect(MarkdownTableGen.columnCount(table)).toBe(3);
  });

  it("rowCount returns correct count", () => {
    const table = MarkdownTableGen.generate(
      ["A"],
      [["1"], ["2"], ["3"]],
    );
    expect(MarkdownTableGen.rowCount(table)).toBe(3);
  });

  it("handles empty rows", () => {
    const table = MarkdownTableGen.generate(["A", "B"], []);
    const lines = table.split("\n");
    expect(lines.length).toBe(2);
  });
});
