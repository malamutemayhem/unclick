import { describe, it, expect } from "vitest";
import { deduplicateExact, deduplicateFuzzy, findDuplicateGroups, uniqueCount, duplicateRate } from "../deduplicator.js";

describe("deduplicateExact", () => {
  it("removes exact duplicates", () => {
    expect(deduplicateExact([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
  });

  it("uses custom key function", () => {
    const items = [{ id: 1, name: "a" }, { id: 2, name: "b" }, { id: 1, name: "c" }];
    const result = deduplicateExact(items, (i) => String(i.id));
    expect(result).toEqual([{ id: 1, name: "a" }, { id: 2, name: "b" }]);
  });

  it("handles empty array", () => {
    expect(deduplicateExact([])).toEqual([]);
  });

  it("preserves order of first occurrence", () => {
    expect(deduplicateExact(["b", "a", "b", "c", "a"])).toEqual(["b", "a", "c"]);
  });
});

describe("deduplicateFuzzy", () => {
  it("removes similar items above threshold", () => {
    const items = ["hello", "helo", "world"];
    const sim = (a: string, b: string) => {
      let match = 0;
      for (let i = 0; i < Math.min(a.length, b.length); i++) {
        if (a[i] === b[i]) match++;
      }
      return match / Math.max(a.length, b.length);
    };
    const result = deduplicateFuzzy(items, sim, 0.5);
    expect(result).toEqual(["hello", "world"]);
  });

  it("keeps all items below threshold", () => {
    const items = [1, 2, 3];
    const result = deduplicateFuzzy(items, () => 0, 0.5);
    expect(result).toEqual([1, 2, 3]);
  });

  it("handles empty array", () => {
    expect(deduplicateFuzzy([], () => 1)).toEqual([]);
  });
});

describe("findDuplicateGroups", () => {
  it("groups duplicates together", () => {
    const items = ["a", "b", "a", "c", "b"];
    const groups = findDuplicateGroups(items);
    expect(groups.get("a")).toEqual(["a", "a"]);
    expect(groups.get("b")).toEqual(["b", "b"]);
    expect(groups.has("c")).toBe(false);
  });

  it("returns empty map for all unique", () => {
    const groups = findDuplicateGroups([1, 2, 3]);
    expect(groups.size).toBe(0);
  });

  it("uses custom key", () => {
    const items = [{ type: "a", v: 1 }, { type: "a", v: 2 }];
    const groups = findDuplicateGroups(items, (i) => i.type);
    expect(groups.get("a")?.length).toBe(2);
  });
});

describe("uniqueCount", () => {
  it("counts unique items", () => {
    expect(uniqueCount([1, 2, 2, 3, 1])).toBe(3);
  });

  it("handles empty", () => {
    expect(uniqueCount([])).toBe(0);
  });
});

describe("duplicateRate", () => {
  it("returns 0 for all unique", () => {
    expect(duplicateRate([1, 2, 3])).toBe(0);
  });

  it("returns rate for duplicates", () => {
    expect(duplicateRate([1, 1, 2, 2])).toBe(0.5);
  });

  it("returns 0 for empty", () => {
    expect(duplicateRate([])).toBe(0);
  });
});
