import { describe, it, expect } from "vitest";
import { table, fromObjects } from "../ascii-table.js";

describe("ascii-table", () => {
  it("formats a basic table", () => {
    const result = table(["Name", "Age"], [["Alice", 30], ["Bob", 25]]);
    expect(result).toContain("Alice");
    expect(result).toContain("Bob");
    expect(result).toContain("|");
    expect(result).toContain("---");
  });

  it("aligns columns right", () => {
    const result = table(
      ["Item", "Price"],
      [["Widget", 9.99], ["Gadget", 42]],
      { align: { Price: "right" } }
    );
    expect(result).toContain("Price");
  });

  it("no border mode", () => {
    const result = table(["A", "B"], [["1", "2"]], { border: false });
    expect(result).not.toContain("|");
  });

  it("fromObjects builds from array of objects", () => {
    const result = fromObjects([
      { name: "x", val: 1 },
      { name: "y", val: 2 },
    ]);
    expect(result).toContain("name");
    expect(result).toContain("val");
    expect(result).toContain("x");
  });

  it("fromObjects returns empty for empty array", () => {
    expect(fromObjects([])).toBe("");
  });

  it("handles missing values gracefully", () => {
    const result = table(["A", "B"], [["only-a"]]);
    expect(result).toContain("only-a");
  });
});
