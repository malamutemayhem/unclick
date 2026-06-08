import { describe, it, expect } from "vitest";
import { parse, parseWithHeader, stringify, stringifyWithHeader } from "../csv.js";

describe("csv", () => {
  it("parses simple csv", () => {
    expect(parse("a,b,c\n1,2,3")).toEqual([["a", "b", "c"], ["1", "2", "3"]]);
  });

  it("handles quoted fields", () => {
    expect(parse('a,"b,c",d')).toEqual([["a", "b,c", "d"]]);
  });

  it("handles escaped quotes", () => {
    expect(parse('a,"b""c",d')).toEqual([["a", 'b"c', "d"]]);
  });

  it("handles CRLF", () => {
    expect(parse("a,b\r\n1,2")).toEqual([["a", "b"], ["1", "2"]]);
  });

  it("handles empty fields", () => {
    expect(parse("a,,c")).toEqual([["a", "", "c"]]);
  });

  it("custom delimiter", () => {
    expect(parse("a\tb\tc", { delimiter: "\t" })).toEqual([["a", "b", "c"]]);
  });

  it("parseWithHeader returns objects", () => {
    const result = parseWithHeader("name,age\nAlice,30\nBob,25");
    expect(result).toEqual([
      { name: "Alice", age: "30" },
      { name: "Bob", age: "25" },
    ]);
  });

  it("parseWithHeader empty input", () => {
    expect(parseWithHeader("")).toEqual([]);
  });

  it("stringify produces csv", () => {
    expect(stringify([["a", "b"], ["1", "2"]])).toBe("a,b\n1,2");
  });

  it("stringify quotes fields with delimiter", () => {
    expect(stringify([["a", "b,c"]])).toBe('a,"b,c"');
  });

  it("stringify quotes fields with quotes", () => {
    expect(stringify([['a"b']])).toBe('"a""b"');
  });

  it("stringify custom delimiter", () => {
    expect(stringify([["a", "b"]], { delimiter: "\t" })).toBe("a\tb");
  });

  it("stringifyWithHeader", () => {
    const result = stringifyWithHeader([{ name: "Alice", age: "30" }]);
    expect(result).toBe("name,age\nAlice,30");
  });

  it("stringifyWithHeader empty array", () => {
    expect(stringifyWithHeader([])).toBe("");
  });
});
