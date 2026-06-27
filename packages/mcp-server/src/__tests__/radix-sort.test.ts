import { describe, it, expect } from "vitest";
import { radixSortLSD, radixSortMSD, countingSort, bucketSort } from "../radix-sort.js";

describe("radixSortLSD", () => {
  it("sorts positive integers", () => {
    expect(radixSortLSD([170, 45, 75, 90, 802, 24, 2, 66])).toEqual([2, 24, 45, 66, 75, 90, 170, 802]);
  });

  it("sorts with negative numbers", () => {
    expect(radixSortLSD([-5, 3, -1, 7, 0, -3])).toEqual([-5, -3, -1, 0, 3, 7]);
  });

  it("handles empty and single element", () => {
    expect(radixSortLSD([])).toEqual([]);
    expect(radixSortLSD([42])).toEqual([42]);
  });

  it("handles duplicates", () => {
    expect(radixSortLSD([3, 1, 3, 1, 2])).toEqual([1, 1, 2, 3, 3]);
  });
});

describe("radixSortMSD", () => {
  it("sorts strings", () => {
    expect(radixSortMSD(["banana", "apple", "cherry", "date"])).toEqual(["apple", "banana", "cherry", "date"]);
  });

  it("sorts strings with common prefixes", () => {
    expect(radixSortMSD(["abc", "ab", "a", "abcd"])).toEqual(["a", "ab", "abc", "abcd"]);
  });

  it("handles empty and single element", () => {
    expect(radixSortMSD([])).toEqual([]);
    expect(radixSortMSD(["hello"])).toEqual(["hello"]);
  });
});

describe("countingSort", () => {
  it("sorts integers", () => {
    expect(countingSort([4, 2, 7, 1, 3])).toEqual([1, 2, 3, 4, 7]);
  });

  it("handles negative numbers", () => {
    expect(countingSort([-3, -1, -5, 0, 2])).toEqual([-5, -3, -1, 0, 2]);
  });

  it("handles empty and single", () => {
    expect(countingSort([])).toEqual([]);
    expect(countingSort([1])).toEqual([1]);
  });
});

describe("bucketSort", () => {
  it("sorts floating point numbers", () => {
    const result = bucketSort([0.42, 0.32, 0.23, 0.52, 0.25, 0.47, 0.51]);
    expect(result).toEqual([0.23, 0.25, 0.32, 0.42, 0.47, 0.51, 0.52]);
  });

  it("handles all same values", () => {
    expect(bucketSort([5, 5, 5])).toEqual([5, 5, 5]);
  });

  it("handles empty array", () => {
    expect(bucketSort([])).toEqual([]);
  });
});
