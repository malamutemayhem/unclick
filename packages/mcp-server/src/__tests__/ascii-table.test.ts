import { describe, it, expect } from "vitest";
import { table, toCSV, fromCSV } from "../ascii-table.js";

describe("table", () => {
  it("renders basic table with borders", () => {
    const result = table([["a", "bb"], ["ccc", "d"]], { headers: ["Col1", "Col2"] });
    expect(result).toContain("Col1");
    expect(result).toContain("Col2");
    expect(result).toContain("| a    | bb   |");
  });

  it("renders without borders", () => {
    const result = table([["a", "b"]], { border: false });
    expect(result).not.toContain("|");
  });

  it("handles right alignment", () => {
    const result = table([["1", "abc"]], { align: ["right", "left"] });
    expect(result).toContain("1");
  });

  it("handles empty input", () => {
    expect(table([])).toBe("");
  });
});

describe("toCSV", () => {
  it("converts rows to CSV", () => {
    expect(toCSV([["a", "b"], ["c", "d"]])).toBe("a,b\nc,d");
  });

  it("adds headers", () => {
    expect(toCSV([["1", "2"]], ["x", "y"])).toBe("x,y\n1,2");
  });

  it("escapes commas and quotes", () => {
    expect(toCSV([['hello, "world"', "ok"]])).toBe('"hello, ""world""",ok');
  });
});

describe("fromCSV", () => {
  it("parses simple CSV", () => {
    expect(fromCSV("a,b\nc,d")).toEqual([["a", "b"], ["c", "d"]]);
  });

  it("handles quoted fields", () => {
    expect(fromCSV('"hello, world",ok')).toEqual([["hello, world", "ok"]]);
  });

  it("handles escaped quotes", () => {
    expect(fromCSV('"say ""hi""",ok')).toEqual([['say "hi"', "ok"]]);
  });

  it("roundtrips CSV", () => {
    const data = [["a,b", "c"], ['"quote"', "d"]];
    expect(fromCSV(toCSV(data))).toEqual(data);
  });
});
