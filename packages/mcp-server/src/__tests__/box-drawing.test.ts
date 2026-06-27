import { describe, it, expect } from "vitest";
import { BoxDrawing } from "../box-drawing.js";

describe("BoxDrawing", () => {
  it("draws a box around content", () => {
    const result = BoxDrawing.box("Hello");
    expect(result).toContain("┌");
    expect(result).toContain("┐");
    expect(result).toContain("└");
    expect(result).toContain("┘");
    expect(result).toContain("Hello");
  });

  it("handles multiline content", () => {
    const result = BoxDrawing.box("Line 1\nLine 2");
    const lines = result.split("\n");
    expect(lines.length).toBe(4);
  });

  it("supports double style", () => {
    const result = BoxDrawing.box("Hello", BoxDrawing.DOUBLE);
    expect(result).toContain("╔");
    expect(result).toContain("╗");
  });

  it("supports rounded style", () => {
    const result = BoxDrawing.box("Hi", BoxDrawing.ROUNDED);
    expect(result).toContain("╭");
    expect(result).toContain("╯");
  });

  it("supports ASCII style", () => {
    const result = BoxDrawing.box("Hi", BoxDrawing.ASCII);
    expect(result).toContain("+");
    expect(result).toContain("-");
    expect(result).toContain("|");
  });

  it("creates title bar", () => {
    const title = BoxDrawing.title("Test", 20);
    expect(title).toContain("Test");
    expect(title.length).toBe(20);
  });

  it("creates horizontal line", () => {
    const line = BoxDrawing.horizontalLine(10);
    expect(line).toBe("──────────");
  });

  it("creates a table", () => {
    const table = BoxDrawing.table(["Name", "Age"], [["Alice", "30"], ["Bob", "25"]]);
    expect(table).toContain("Name");
    expect(table).toContain("Alice");
    expect(table).toContain("┼");
    const lines = table.split("\n");
    expect(lines.length).toBe(6);
  });

  it("creates a grid", () => {
    const grid = BoxDrawing.grid(4, 1, 3, 2);
    expect(grid).toContain("┌");
    expect(grid).toContain("┬");
    expect(grid).toContain("┤");
    expect(grid).toContain("┘");
  });

  it("has correct style properties", () => {
    expect(BoxDrawing.SINGLE.horizontal).toBe("─");
    expect(BoxDrawing.DOUBLE.horizontal).toBe("═");
    expect(BoxDrawing.ASCII.horizontal).toBe("-");
  });
});
