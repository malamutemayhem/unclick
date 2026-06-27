import { describe, it, expect } from "vitest";
import { box, banner, tree, progressBar, sparkline, horizontalBar } from "../ascii-art.js";

describe("box", () => {
  it("draws a box around text", () => {
    const result = box("Hello");
    expect(result).toContain("+");
    expect(result).toContain("Hello");
    expect(result.split("\n").length).toBe(3);
  });

  it("handles multiline", () => {
    const result = box("line1\nline2");
    expect(result).toContain("line1");
    expect(result).toContain("line2");
  });

  it("double border", () => {
    const result = box("X", { border: "double" });
    expect(result).toContain("#");
    expect(result).toContain("=");
  });
});

describe("banner", () => {
  it("creates a banner", () => {
    const result = banner("TEST");
    expect(result.split("\n").length).toBe(3);
    expect(result).toContain("TEST");
  });

  it("custom char", () => {
    const result = banner("Hi", "#");
    expect(result).toContain("#");
  });
});

describe("tree", () => {
  it("renders tree structure", () => {
    const data = [
      { label: "root", children: [
        { label: "child1" },
        { label: "child2" },
      ]},
    ];
    const result = tree(data);
    expect(result).toContain("root");
    expect(result).toContain("child1");
    expect(result).toContain("child2");
  });
});

describe("progressBar", () => {
  it("renders progress", () => {
    expect(progressBar(50, 100)).toContain("50%");
    expect(progressBar(100, 100)).toContain("100%");
    expect(progressBar(0, 100)).toContain("0%");
  });
});

describe("sparkline", () => {
  it("renders spark values", () => {
    const result = sparkline([1, 5, 3, 8, 2]);
    expect(result.length).toBe(5);
  });

  it("empty array returns empty", () => {
    expect(sparkline([])).toBe("");
  });
});

describe("horizontalBar", () => {
  it("renders bar with label", () => {
    const result = horizontalBar("Sales", 75, 100);
    expect(result).toContain("Sales");
    expect(result).toContain("75");
  });
});
