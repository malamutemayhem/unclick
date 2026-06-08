import { describe, it, expect } from "vitest";
import { parseCsv, parseCsvObjects, toCsv } from "../csv-parser.js";

describe("csv-parser", () => {
  it("parses simple CSV", () => {
    const rows = parseCsv("a,b,c\n1,2,3");
    expect(rows).toEqual([["a", "b", "c"], ["1", "2", "3"]]);
  });

  it("handles quoted fields with commas", () => {
    const rows = parseCsv('name,desc\nAlice,"hello, world"');
    expect(rows[1][1]).toBe("hello, world");
  });

  it("handles escaped quotes", () => {
    const rows = parseCsv('a\n"say ""hi"""');
    expect(rows[1][0]).toBe('say "hi"');
  });

  it("handles CRLF line endings", () => {
    const rows = parseCsv("a,b\r\n1,2\r\n3,4");
    expect(rows.length).toBe(3);
    expect(rows[2]).toEqual(["3", "4"]);
  });

  it("parseCsvObjects returns array of objects", () => {
    const objs = parseCsvObjects("name,age\nAlice,30\nBob,25");
    expect(objs).toEqual([
      { name: "Alice", age: "30" },
      { name: "Bob", age: "25" },
    ]);
  });

  it("parseCsvObjects with empty input", () => {
    expect(parseCsvObjects("")).toEqual([]);
  });

  it("toCsv formats rows", () => {
    const csv = toCsv([["a", "b"], [1, 2]]);
    expect(csv).toBe("a,b\n1,2");
  });

  it("toCsv quotes fields with delimiters", () => {
    const csv = toCsv([["hello, world", "ok"]]);
    expect(csv).toBe('"hello, world",ok');
  });

  it("custom delimiter", () => {
    const rows = parseCsv("a\tb\t c", { delimiter: "\t" });
    expect(rows[0]).toEqual(["a", "b", " c"]);
  });
});
