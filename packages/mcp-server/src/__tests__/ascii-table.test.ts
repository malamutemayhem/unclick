import { describe, it, expect } from "vitest";
import { table, alignRight, alignCenter } from "../ascii-table.js";

describe("table", () => {
  it("renders a simple table", () => {
    const result = table(["Name", "Age"], [["Alice", "30"], ["Bob", "25"]]);
    expect(result).toContain("Alice");
    expect(result).toContain("Bob");
    expect(result).toContain("Name");
  });

  it("renders with border", () => {
    const result = table(["A", "B"], [["1", "2"]], { border: true });
    expect(result).toContain("|");
    expect(result).toContain("+");
  });

  it("renders without border", () => {
    const result = table(["A", "B"], [["1", "2"]], { border: false });
    expect(result).not.toContain("|");
  });

  it("renders without header", () => {
    const result = table(["A", "B"], [["1", "2"]], { header: false });
    expect(result).not.toContain("A");
  });
});

describe("alignRight", () => {
  it("right-aligns text", () => {
    expect(alignRight("42", 6)).toBe("    42");
  });
});

describe("alignCenter", () => {
  it("centers text", () => {
    const result = alignCenter("hi", 6);
    expect(result.length).toBe(6);
    expect(result.trim()).toBe("hi");
  });
});
