import { describe, it, expect } from "vitest";
import { parseCSV, parseCSVToObjects, toCSV, objectsToCSV, filterRows, sortRows, selectColumns, aggregateColumn } from "../csv-processor.js";

describe("parseCSV", () => {
  it("parses simple CSV", () => {
    const result = parseCSV("a,b,c\n1,2,3");
    expect(result).toEqual([["a", "b", "c"], ["1", "2", "3"]]);
  });

  it("handles quoted fields", () => {
    const result = parseCSV('"hello, world",b\nc,d');
    expect(result[0][0]).toBe("hello, world");
  });

  it("handles escaped quotes", () => {
    const result = parseCSV('"say ""hi""",b');
    expect(result[0][0]).toBe('say "hi"');
  });

  it("handles CRLF line endings", () => {
    const result = parseCSV("a,b\r\nc,d");
    expect(result).toHaveLength(2);
  });

  it("custom delimiter", () => {
    const result = parseCSV("a;b;c", { delimiter: ";" });
    expect(result[0]).toEqual(["a", "b", "c"]);
  });

  it("empty input", () => {
    expect(parseCSV("")).toEqual([]);
  });
});

describe("parseCSVToObjects", () => {
  it("converts to objects with headers", () => {
    const result = parseCSVToObjects("name,age\nAlice,30\nBob,25");
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("Alice");
    expect(result[1].age).toBe("25");
  });
});

describe("toCSV", () => {
  it("generates CSV string", () => {
    const result = toCSV([["a", "b"], ["1", "2"]]);
    expect(result).toBe("a,b\n1,2");
  });

  it("quotes fields with special characters", () => {
    const result = toCSV([["hello, world", "normal"]]);
    expect(result).toBe('"hello, world",normal');
  });
});

describe("objectsToCSV", () => {
  it("converts objects to CSV with headers", () => {
    const result = objectsToCSV([{ name: "Alice", age: "30" }]);
    expect(result).toContain("name,age");
    expect(result).toContain("Alice,30");
  });

  it("returns empty for empty array", () => {
    expect(objectsToCSV([])).toBe("");
  });
});

describe("filterRows", () => {
  it("filters by column value", () => {
    const data = [["a", "1"], ["b", "2"], ["c", "1"]];
    const result = filterRows(data, 1, v => v === "1");
    expect(result).toHaveLength(2);
  });
});

describe("sortRows", () => {
  it("sorts alphabetically", () => {
    const data = [["c"], ["a"], ["b"]];
    const result = sortRows(data, 0);
    expect(result.map(r => r[0])).toEqual(["a", "b", "c"]);
  });

  it("sorts numerically", () => {
    const data = [["10"], ["2"], ["1"]];
    const result = sortRows(data, 0, true);
    expect(result.map(r => r[0])).toEqual(["1", "2", "10"]);
  });

  it("sorts descending", () => {
    const data = [["a"], ["c"], ["b"]];
    const result = sortRows(data, 0, false, false);
    expect(result.map(r => r[0])).toEqual(["c", "b", "a"]);
  });
});

describe("selectColumns", () => {
  it("selects specified columns", () => {
    const data = [["a", "b", "c"], ["1", "2", "3"]];
    const result = selectColumns(data, [0, 2]);
    expect(result).toEqual([["a", "c"], ["1", "3"]]);
  });
});

describe("aggregateColumn", () => {
  it("computes aggregates", () => {
    const data = [["10"], ["20"], ["30"]];
    const agg = aggregateColumn(data, 0);
    expect(agg.count).toBe(3);
    expect(agg.sum).toBe(60);
    expect(agg.avg).toBe(20);
    expect(agg.min).toBe(10);
    expect(agg.max).toBe(30);
  });

  it("handles empty data", () => {
    const agg = aggregateColumn([], 0);
    expect(agg.count).toBe(0);
  });
});
