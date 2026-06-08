import { describe, it, expect } from "vitest";
import { parseCSV, stringifyCSV } from "../csv-parser.js";

describe("parseCSV", () => {
  it("parses simple CSV", () => {
    const result = parseCSV("a,b,c\n1,2,3");
    expect(result).toEqual([["a", "b", "c"], ["1", "2", "3"]]);
  });

  it("parses with headers", () => {
    const result = parseCSV("name,age\nAlice,30\nBob,25", { header: true });
    expect(result).toEqual([
      { name: "Alice", age: "30" },
      { name: "Bob", age: "25" },
    ]);
  });

  it("handles quoted fields", () => {
    const result = parseCSV('"hello, world",test');
    expect(result).toEqual([["hello, world", "test"]]);
  });

  it("handles escaped quotes", () => {
    const result = parseCSV('"say ""hi""",ok');
    expect(result).toEqual([['say "hi"', "ok"]]);
  });

  it("handles custom delimiter", () => {
    const result = parseCSV("a;b;c", { delimiter: ";" });
    expect(result).toEqual([["a", "b", "c"]]);
  });

  it("handles empty input", () => {
    expect(parseCSV("")).toEqual([]);
  });

  it("handles CRLF line endings", () => {
    const result = parseCSV("a,b\r\nc,d");
    expect(result).toEqual([["a", "b"], ["c", "d"]]);
  });
});

describe("stringifyCSV", () => {
  it("converts arrays to CSV", () => {
    expect(stringifyCSV([["a", "b"], ["1", "2"]])).toBe("a,b\n1,2");
  });

  it("converts objects with headers", () => {
    const result = stringifyCSV([{ name: "Alice", age: "30" }]);
    expect(result).toContain("name,age");
    expect(result).toContain("Alice,30");
  });

  it("quotes fields with delimiters", () => {
    expect(stringifyCSV([["hello, world"]])).toBe('"hello, world"');
  });

  it("escapes quotes in fields", () => {
    expect(stringifyCSV([['say "hi"']])).toBe('"say ""hi"""');
  });

  it("returns empty for empty data", () => {
    expect(stringifyCSV([])).toBe("");
  });

  it("roundtrips simple data", () => {
    const data = [["name", "age"], ["Alice", "30"]];
    const csv = stringifyCSV(data);
    expect(parseCSV(csv)).toEqual(data);
  });
});
