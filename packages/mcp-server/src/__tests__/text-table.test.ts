import { describe, it, expect } from "vitest";
import { textTable, markdownTable } from "../text-table.js";

describe("text-table", () => {
  it("formats basic table", () => {
    const result = textTable(["Name", "Age"], [["Alice", "30"], ["Bob", "25"]]);
    expect(result).toContain("Alice");
    expect(result).toContain("Name");
    expect(result).toContain("---");
  });

  it("right-aligns specified columns", () => {
    const result = textTable(
      ["Item", "Price"],
      [["Widget", "9.99"], ["Gadget", "42.00"]],
      { alignRight: [1] }
    );
    expect(result).toContain("Price");
  });

  it("custom separators", () => {
    const result = textTable(
      ["A", "B"],
      [["1", "2"]],
      { columnSeparator: " | ", headerSeparator: "=" }
    );
    expect(result).toContain(" | ");
    expect(result).toContain("=");
  });

  it("handles missing cells", () => {
    const result = textTable(["A", "B", "C"], [["1"]]);
    expect(result).toContain("1");
  });

  it("truncates with maxWidth", () => {
    const result = textTable(
      ["Name"],
      [["verylongname"]],
      { maxWidth: 6 }
    );
    expect(result).toContain("~");
  });

  it("markdownTable formats with pipes", () => {
    const result = markdownTable(["X", "Y"], [["1", "2"]]);
    expect(result).toContain("| X");
    expect(result).toContain("| ---");
    expect(result).toContain("| 1");
  });

  it("markdownTable handles empty rows", () => {
    const result = markdownTable(["A"], []);
    expect(result).toContain("| A");
    expect(result).toContain("| ---");
  });
});
