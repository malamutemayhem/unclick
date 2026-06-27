import { describe, it, expect } from "vitest";
import { NaturalSort } from "../natural-sort.js";

describe("NaturalSort", () => {
  it("sorts strings with numbers naturally", () => {
    expect(NaturalSort.sort(["file10", "file2", "file1"])).toEqual(["file1", "file2", "file10"]);
  });

  it("sorts pure strings alphabetically", () => {
    expect(NaturalSort.sort(["banana", "apple", "cherry"])).toEqual(["apple", "banana", "cherry"]);
  });

  it("handles mixed content", () => {
    const sorted = NaturalSort.sort(["v2.0", "v10.0", "v1.0"]);
    expect(sorted).toEqual(["v1.0", "v2.0", "v10.0"]);
  });

  it("compares two strings", () => {
    expect(NaturalSort.compare("item2", "item10")).toBeLessThan(0);
    expect(NaturalSort.compare("item10", "item2")).toBeGreaterThan(0);
    expect(NaturalSort.compare("abc", "abc")).toBe(0);
  });

  it("sorts by key function", () => {
    const items = [{ name: "file10" }, { name: "file2" }];
    const sorted = NaturalSort.sortBy(items, (i) => i.name);
    expect(sorted[0].name).toBe("file2");
  });

  it("sorts descending", () => {
    const sorted = NaturalSort.sortDescending(["a1", "a3", "a2"]);
    expect(sorted).toEqual(["a3", "a2", "a1"]);
  });

  it("groups by prefix", () => {
    const groups = NaturalSort.groupByPrefix(["a-1", "a-2", "b-1"]);
    expect(groups["a"]).toEqual(["a-1", "a-2"]);
    expect(groups["b"]).toEqual(["b-1"]);
  });

  it("checks natural order", () => {
    expect(NaturalSort.isNaturalOrder(["a1", "a2", "a10"])).toBe(true);
    expect(NaturalSort.isNaturalOrder(["a10", "a2"])).toBe(false);
  });

  it("finds min and max", () => {
    const items = ["file10", "file2", "file1"];
    expect(NaturalSort.min(items)).toBe("file1");
    expect(NaturalSort.max(items)).toBe("file10");
  });
});
