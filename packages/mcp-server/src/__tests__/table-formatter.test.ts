import { describe, it, expect } from "vitest";
import { formatTable, formatKeyValue, csvToTable } from "../table-formatter.js";

describe("formatTable", () => {
  it("simple table", () => {
    const result = formatTable(["Name", "Age"], [["Alice", "30"], ["Bob", "25"]]);
    expect(result).toContain("Alice");
    expect(result).toContain("Bob");
    expect(result).toContain("Name");
  });

  it("respects right alignment", () => {
    const result = formatTable(["Item", "Price"], [["Pen", "5"]], { align: ["left", "right"] });
    expect(result).toContain("Price");
    expect(result).toContain("5");
  });

  it("no border mode", () => {
    const result = formatTable(["A", "B"], [["1", "2"]], { border: "none" });
    expect(result).not.toContain("|");
    expect(result).not.toContain("+");
  });

  it("rounded border mode", () => {
    const result = formatTable(["A", "B"], [["1", "2"]], { border: "rounded" });
    expect(result).toContain("╭");
    expect(result).toContain("╯");
  });

  it("center alignment", () => {
    const result = formatTable(["X"], [["ab"]], { align: ["center"] });
    expect(result).toContain("ab");
  });

  it("handles empty headers", () => {
    expect(formatTable([], [])).toBe("");
  });

  it("handles missing cells", () => {
    const result = formatTable(["A", "B", "C"], [["1"]]);
    expect(result).toContain("1");
  });

  it("maxWidth truncates cells", () => {
    const result = formatTable(["Name"], [["VeryLongName"]], { maxWidth: 5 });
    expect(result).toContain("VeryL");
    expect(result).not.toContain("VeryLongName");
  });

  it("header false hides header row", () => {
    const result = formatTable(["Name"], [["Alice"]], { header: false });
    expect(result).not.toContain("Name");
    expect(result).toContain("Alice");
  });
});

describe("formatKeyValue", () => {
  it("aligns keys", () => {
    const result = formatKeyValue([["Name", "Alice"], ["Age", "30"]]);
    const lines = result.split("\n");
    expect(lines[0]).toContain("Name");
    expect(lines[1]).toContain("Age");
  });

  it("custom separator", () => {
    const result = formatKeyValue([["k", "v"]], " = ");
    expect(result).toBe("k = v");
  });
});

describe("csvToTable", () => {
  it("parses simple csv", () => {
    const { headers, rows } = csvToTable("a,b\n1,2\n3,4");
    expect(headers).toEqual(["a", "b"]);
    expect(rows).toEqual([["1", "2"], ["3", "4"]]);
  });

  it("handles quoted fields", () => {
    const { rows } = csvToTable('a,b\n"hello, world",2');
    expect(rows[0][0]).toBe("hello, world");
  });

  it("handles empty input", () => {
    const { headers } = csvToTable("");
    expect(headers).toEqual([""]);
  });
});
