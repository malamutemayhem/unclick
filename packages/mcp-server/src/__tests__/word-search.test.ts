import { describe, it, expect } from "vitest";
import {
  createWordSearch, findWord, findAllWords,
  gridToString, highlightWord,
} from "../word-search.js";

describe("createWordSearch", () => {
  it("creates grid with correct dimensions", () => {
    const g = createWordSearch(10, 10, ["HELLO"]);
    expect(g.width).toBe(10);
    expect(g.height).toBe(10);
    expect(g.cells.length).toBe(10);
    expect(g.cells[0].length).toBe(10);
  });

  it("fills all cells", () => {
    const g = createWordSearch(8, 8, ["CAT"]);
    for (const row of g.cells) {
      for (const cell of row) {
        expect(cell).toMatch(/^[A-Z]$/);
      }
    }
  });

  it("places words", () => {
    const g = createWordSearch(15, 15, ["HELLO", "WORLD"]);
    expect(g.placements.length).toBeGreaterThan(0);
  });

  it("is deterministic with same seed", () => {
    const a = createWordSearch(10, 10, ["CAT"], 99);
    const b = createWordSearch(10, 10, ["CAT"], 99);
    expect(gridToString(a)).toBe(gridToString(b));
  });
});

describe("findWord", () => {
  it("finds placed word", () => {
    const g = createWordSearch(15, 15, ["HELLO"]);
    const found = findWord(g, "HELLO");
    expect(found).not.toBeNull();
    expect(found!.word).toBe("HELLO");
  });

  it("returns null for missing word", () => {
    const g = createWordSearch(5, 5, ["CAT"]);
    const found = findWord(g, "ELEPHANT");
    expect(found).toBeNull();
  });

  it("is case insensitive", () => {
    const g = createWordSearch(15, 15, ["HELLO"]);
    const found = findWord(g, "hello");
    expect(found).not.toBeNull();
  });
});

describe("findAllWords", () => {
  it("finds multiple words", () => {
    const words = ["CAT", "DOG"];
    const g = createWordSearch(15, 15, words);
    const found = findAllWords(g, words);
    expect(found.length).toBeGreaterThan(0);
  });
});

describe("gridToString", () => {
  it("renders grid as string", () => {
    const g = createWordSearch(5, 5, ["HI"]);
    const str = gridToString(g);
    const lines = str.split("\n");
    expect(lines.length).toBe(5);
  });
});

describe("highlightWord", () => {
  it("highlights found word", () => {
    const g = createWordSearch(15, 15, ["HELLO"]);
    const found = findWord(g, "HELLO");
    if (found) {
      const highlighted = highlightWord(g, found);
      expect(highlighted).toContain("[");
      expect(highlighted).toContain("]");
    }
  });
});
