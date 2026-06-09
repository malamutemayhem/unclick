import { describe, it, expect } from "vitest";
import {
  createGrid, canPlace, placeWord, autoPlace,
  gridToString, getIntersections, filledCells,
} from "../crossword-gen.js";

describe("createGrid", () => {
  it("creates empty grid", () => {
    const g = createGrid(10, 10);
    expect(g.width).toBe(10);
    expect(g.height).toBe(10);
    expect(g.placements.length).toBe(0);
  });
});

describe("canPlace", () => {
  it("allows first word anywhere", () => {
    const g = createGrid(10, 10);
    expect(canPlace(g, "HELLO", 0, 0, "across")).toBe(true);
  });

  it("rejects word out of bounds", () => {
    const g = createGrid(5, 5);
    expect(canPlace(g, "TOOLONG", 0, 0, "across")).toBe(false);
  });

  it("requires intersection for second word", () => {
    const g = createGrid(10, 10);
    placeWord(g, "HELLO", 5, 0, "across");
    expect(canPlace(g, "WORLD", 0, 0, "across")).toBe(false);
  });

  it("allows crossing words", () => {
    const g = createGrid(10, 10);
    placeWord(g, "HELLO", 5, 0, "across");
    expect(canPlace(g, "HELD", 5, 0, "down")).toBe(true);
  });
});

describe("placeWord", () => {
  it("places first word", () => {
    const g = createGrid(10, 10);
    expect(placeWord(g, "CAT", 0, 0, "across")).toBe(true);
    expect(g.cells[0][0]).toBe("C");
    expect(g.cells[0][1]).toBe("A");
    expect(g.cells[0][2]).toBe("T");
  });

  it("places word down", () => {
    const g = createGrid(10, 10);
    placeWord(g, "CAT", 0, 0, "down");
    expect(g.cells[0][0]).toBe("C");
    expect(g.cells[1][0]).toBe("A");
    expect(g.cells[2][0]).toBe("T");
  });

  it("rejects conflicting placement", () => {
    const g = createGrid(10, 10);
    placeWord(g, "CAT", 0, 0, "across");
    expect(placeWord(g, "DOG", 0, 0, "across")).toBe(false);
  });
});

describe("autoPlace", () => {
  it("places multiple words", () => {
    const g = createGrid(15, 15);
    const placed = autoPlace(g, ["HELLO", "HELP", "LOOP"]);
    expect(placed).toBeGreaterThan(0);
    expect(g.placements.length).toBe(placed);
  });
});

describe("gridToString", () => {
  it("renders grid", () => {
    const g = createGrid(5, 5);
    placeWord(g, "HI", 0, 0, "across");
    const str = gridToString(g);
    expect(str).toContain("H");
    expect(str).toContain("I");
    expect(str).toContain(".");
  });
});

describe("getIntersections", () => {
  it("counts crossing points", () => {
    const g = createGrid(10, 10);
    placeWord(g, "HELLO", 5, 0, "across");
    placeWord(g, "HELD", 5, 0, "down");
    expect(getIntersections(g)).toBe(1);
  });
});

describe("filledCells", () => {
  it("counts non-null cells", () => {
    const g = createGrid(10, 10);
    placeWord(g, "HELLO", 0, 0, "across");
    expect(filledCells(g)).toBe(5);
  });
});
