import { describe, it, expect } from "vitest";
import { parseCSV, parseCSVWithHeaders, toCSV, objectsToCSV } from "../csv-parser.js";

describe("parseCSV", () => {
  it("parses simple CSV", () => {
    expect(parseCSV("a,b,c\n1,2,3")).toEqual([["a", "b", "c"], ["1", "2", "3"]]);
  });

  it("handles quoted fields", () => {
    const result = parseCSV('a,"hello, world",c');
    expect(result[0][1]).toBe("hello, world");
  });

  it("handles escaped quotes", () => {
    const result = parseCSV('a,"say ""hi""",c');
    expect(result[0][1]).toBe('say "hi"');
  });

  it("handles CRLF", () => {
    const result = parseCSV("a,b\r\nc,d");
    expect(result.length).toBe(2);
  });

  it("custom delimiter", () => {
    const result = parseCSV("a;b;c", { delimiter: ";" });
    expect(result[0]).toEqual(["a", "b", "c"]);
  });

  it("empty input", () => {
    expect(parseCSV("")).toEqual([]);
  });
});

describe("parseCSVWithHeaders", () => {
  it("returns objects", () => {
    const result = parseCSVWithHeaders("name,age\nAlice,30\nBob,25");
    expect(result).toEqual([
      { name: "Alice", age: "30" },
      { name: "Bob", age: "25" },
    ]);
  });

  it("empty returns empty array", () => {
    expect(parseCSVWithHeaders("")).toEqual([]);
  });
});

describe("toCSV", () => {
  it("converts arrays to CSV", () => {
    expect(toCSV([["a", "b"], ["1", "2"]])).toBe("a,b\n1,2");
  });

  it("quotes fields with commas", () => {
    const result = toCSV([["hello, world"]]);
    expect(result).toBe('"hello, world"');
  });
});

describe("objectsToCSV", () => {
  it("converts objects", () => {
    const result = objectsToCSV([{ a: 1, b: 2 }, { a: 3, b: 4 }]);
    expect(result).toBe("a,b\n1,2\n3,4");
  });

  it("custom keys", () => {
    const result = objectsToCSV([{ a: 1, b: 2, c: 3 }], ["a", "c"]);
    expect(result).toBe("a,c\n1,3");
  });

  it("empty returns empty", () => {
    expect(objectsToCSV([])).toBe("");
  });
});
