import { describe, it, expect } from "vitest";
import {
  chunk, unique, groupBy, zip, flatten,
  partition, rotate, intersection, difference,
} from "../array-utils.js";

describe("chunk", () => {
  it("splits array into chunks", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it("handles exact divisible length", () => {
    expect(chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
  });

  it("handles chunk size larger than array", () => {
    expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
  });

  it("handles empty array", () => {
    expect(chunk([], 3)).toEqual([]);
  });

  it("throws for size < 1", () => {
    expect(() => chunk([1], 0)).toThrow();
  });
});

describe("unique", () => {
  it("removes duplicates", () => {
    expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
  });

  it("uses keyFn for custom uniqueness", () => {
    const items = [{ id: 1, name: "a" }, { id: 2, name: "b" }, { id: 1, name: "c" }];
    const result = unique(items, (item: { id: number; name: string }) => item.id);
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("a");
  });

  it("handles empty array", () => {
    expect(unique([])).toEqual([]);
  });
});

describe("groupBy", () => {
  it("groups items by key function", () => {
    const result = groupBy([1, 2, 3, 4, 5], (n: number) => (n % 2 === 0 ? "even" : "odd"));
    expect(result).toEqual({ even: [2, 4], odd: [1, 3, 5] });
  });

  it("handles empty array", () => {
    expect(groupBy([], (x: number) => x)).toEqual({});
  });
});

describe("zip", () => {
  it("zips two arrays", () => {
    expect(zip([1, 2, 3], ["a", "b", "c"])).toEqual([[1, "a"], [2, "b"], [3, "c"]]);
  });

  it("stops at shorter array", () => {
    expect(zip([1, 2], ["a"])).toEqual([[1, "a"]]);
  });

  it("handles empty arrays", () => {
    expect(zip([], [])).toEqual([]);
  });
});

describe("flatten", () => {
  it("flattens one level", () => {
    expect(flatten([[1, 2], [3], [4, 5]])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles empty arrays", () => {
    expect(flatten([])).toEqual([]);
    expect(flatten([[], []])).toEqual([]);
  });
});

describe("partition", () => {
  it("splits by predicate", () => {
    const [evens, odds] = partition([1, 2, 3, 4, 5], (n: number) => n % 2 === 0);
    expect(evens).toEqual([2, 4]);
    expect(odds).toEqual([1, 3, 5]);
  });

  it("handles all pass", () => {
    const [pass, fail] = partition([2, 4], (n: number) => n % 2 === 0);
    expect(pass).toEqual([2, 4]);
    expect(fail).toEqual([]);
  });

  it("handles empty array", () => {
    const [pass, fail] = partition([], (n: number) => n > 0);
    expect(pass).toEqual([]);
    expect(fail).toEqual([]);
  });
});

describe("rotate", () => {
  it("rotates left by n", () => {
    expect(rotate([1, 2, 3, 4, 5], 2)).toEqual([3, 4, 5, 1, 2]);
  });

  it("rotates right with negative n", () => {
    expect(rotate([1, 2, 3, 4, 5], -1)).toEqual([5, 1, 2, 3, 4]);
  });

  it("handles zero rotation", () => {
    expect(rotate([1, 2, 3], 0)).toEqual([1, 2, 3]);
  });

  it("handles empty array", () => {
    expect(rotate([], 5)).toEqual([]);
  });

  it("handles rotation larger than length", () => {
    expect(rotate([1, 2, 3], 5)).toEqual([3, 1, 2]);
  });
});

describe("intersection", () => {
  it("returns common elements", () => {
    expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
  });

  it("returns empty when no overlap", () => {
    expect(intersection([1, 2], [3, 4])).toEqual([]);
  });

  it("handles empty arrays", () => {
    expect(intersection([], [1, 2])).toEqual([]);
  });
});

describe("difference", () => {
  it("returns elements only in first array", () => {
    expect(difference([1, 2, 3], [2, 3, 4])).toEqual([1]);
  });

  it("returns all if no overlap", () => {
    expect(difference([1, 2], [3, 4])).toEqual([1, 2]);
  });

  it("handles empty arrays", () => {
    expect(difference([], [1, 2])).toEqual([]);
    expect(difference([1, 2], [])).toEqual([1, 2]);
  });
});
