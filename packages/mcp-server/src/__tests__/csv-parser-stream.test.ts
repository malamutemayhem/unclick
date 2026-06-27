import { describe, it, expect } from "vitest";
import { CsvParser } from "../csv-parser-stream.js";

describe("CsvParser", () => {
  it("parses with headers", () => {
    const parser = new CsvParser();
    const result = parser.parse("name,age\nAlice,30\nBob,25") as Record<string, string>[];
    expect(result.length).toBe(2);
    expect(result[0].name).toBe("Alice");
    expect(result[0].age).toBe("30");
  });

  it("parses without headers", () => {
    const parser = new CsvParser({ header: false });
    const result = parser.parse("a,b\nc,d") as string[][];
    expect(result).toEqual([["a", "b"], ["c", "d"]]);
  });

  it("handles quoted fields", () => {
    const parser = new CsvParser();
    const result = parser.parse('name,bio\nAlice,"likes, commas"') as Record<string, string>[];
    expect(result[0].bio).toBe("likes, commas");
  });

  it("handles escaped quotes", () => {
    const parser = new CsvParser();
    const result = parser.parse('val\n"say ""hi"""') as Record<string, string>[];
    expect(result[0].val).toBe('say "hi"');
  });

  it("custom delimiter", () => {
    const parser = new CsvParser({ delimiter: "\t", header: false });
    const result = parser.parse("a\tb\nc\td") as string[][];
    expect(result).toEqual([["a", "b"], ["c", "d"]]);
  });

  it("trims fields", () => {
    const parser = new CsvParser({ header: false, trim: true });
    const result = parser.parse(" a , b \n c , d ") as string[][];
    expect(result).toEqual([["a", "b"], ["c", "d"]]);
  });

  it("stringify with objects", () => {
    const parser = new CsvParser();
    const csv = parser.stringify([
      { name: "Alice", age: "30" },
      { name: "Bob", age: "25" },
    ]);
    expect(csv).toBe("name,age\nAlice,30\nBob,25");
  });

  it("columnCount counts columns", () => {
    expect(CsvParser.columnCount("a,b,c\n1,2,3")).toBe(3);
  });

  it("rowCount counts rows", () => {
    expect(CsvParser.rowCount("a,b\n1,2\n3,4")).toBe(3);
  });
});
