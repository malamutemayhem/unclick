import { describe, it, expect } from "vitest";
import { parseCSV, parseCSVWithHeader, stringifyCSV, stringifyCSVWithHeader } from "../csv-parser.js";

describe("csv-parser", () => {
  describe("parseCSV", () => {
    it("parses simple CSV", () => {
      expect(parseCSV("a,b,c\n1,2,3")).toEqual([["a", "b", "c"], ["1", "2", "3"]]);
    });

    it("handles quoted fields", () => {
      expect(parseCSV('"hello, world",b')).toEqual([["hello, world", "b"]]);
    });

    it("handles escaped quotes", () => {
      expect(parseCSV('"say ""hi""",b')).toEqual([['say "hi"', "b"]]);
    });

    it("handles CRLF", () => {
      expect(parseCSV("a,b\r\n1,2")).toEqual([["a", "b"], ["1", "2"]]);
    });

    it("custom delimiter", () => {
      expect(parseCSV("a;b;c", { delimiter: ";" })).toEqual([["a", "b", "c"]]);
    });

    it("empty input", () => {
      expect(parseCSV("")).toEqual([]);
    });
  });

  describe("parseCSVWithHeader", () => {
    it("returns objects with header keys", () => {
      expect(parseCSVWithHeader("name,age\nAlice,30\nBob,25")).toEqual([
        { name: "Alice", age: "30" },
        { name: "Bob", age: "25" },
      ]);
    });

    it("returns empty for header-only", () => {
      expect(parseCSVWithHeader("a,b")).toEqual([]);
    });
  });

  describe("stringifyCSV", () => {
    it("formats rows", () => {
      expect(stringifyCSV([["a", "b"], ["1", "2"]])).toBe("a,b\n1,2");
    });

    it("quotes fields with delimiter", () => {
      expect(stringifyCSV([["hello, world"]])).toBe('"hello, world"');
    });

    it("escapes quotes in fields", () => {
      expect(stringifyCSV([['say "hi"']])).toBe('"say ""hi"""');
    });
  });

  describe("stringifyCSVWithHeader", () => {
    it("formats with auto headers", () => {
      const result = stringifyCSVWithHeader([{ name: "Alice", age: "30" }]);
      expect(result).toBe("name,age\nAlice,30");
    });

    it("respects custom headers", () => {
      const result = stringifyCSVWithHeader([{ a: "1", b: "2" }], ["b", "a"]);
      expect(result).toBe("b,a\n2,1");
    });
  });
});
