import { describe, it, expect } from "vitest";
import { map, filter, take, skip, chunk, flatten, collect, reduce, merge, fromArray } from "../stream-utils.js";

describe("stream-utils", () => {
  describe("map", () => {
    it("transforms items", async () => {
      const result = await collect(map(fromArray([1, 2, 3]), (x) => x * 2));
      expect(result).toEqual([2, 4, 6]);
    });
  });

  describe("filter", () => {
    it("keeps matching items", async () => {
      const result = await collect(filter(fromArray([1, 2, 3, 4]), (x) => x % 2 === 0));
      expect(result).toEqual([2, 4]);
    });
  });

  describe("take", () => {
    it("limits count", async () => {
      const result = await collect(take(fromArray([1, 2, 3, 4, 5]), 3));
      expect(result).toEqual([1, 2, 3]);
    });

    it("handles source shorter than n", async () => {
      const result = await collect(take(fromArray([1]), 5));
      expect(result).toEqual([1]);
    });
  });

  describe("skip", () => {
    it("skips first n", async () => {
      const result = await collect(skip(fromArray([1, 2, 3, 4]), 2));
      expect(result).toEqual([3, 4]);
    });
  });

  describe("chunk", () => {
    it("groups into chunks", async () => {
      const result = await collect(chunk(fromArray([1, 2, 3, 4, 5]), 2));
      expect(result).toEqual([[1, 2], [3, 4], [5]]);
    });
  });

  describe("flatten", () => {
    it("flattens nested arrays", async () => {
      const result = await collect(flatten(fromArray([[1, 2], [3], [4, 5]])));
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe("collect", () => {
    it("collects all items", async () => {
      expect(await collect(fromArray([1, 2, 3]))).toEqual([1, 2, 3]);
    });

    it("handles empty", async () => {
      expect(await collect(fromArray([]))).toEqual([]);
    });
  });

  describe("reduce", () => {
    it("reduces to single value", async () => {
      const sum = await reduce(fromArray([1, 2, 3, 4]), (acc, x) => acc + x, 0);
      expect(sum).toBe(10);
    });
  });

  describe("merge", () => {
    it("interleaves sources", async () => {
      const a = fromArray([1, 2]);
      const b = fromArray([10, 20]);
      const result = await collect(merge(a, b));
      expect(result.sort((x, y) => x - y)).toEqual([1, 2, 10, 20]);
    });

    it("handles empty sources", async () => {
      const result = await collect(merge(fromArray([]), fromArray([1])));
      expect(result).toEqual([1]);
    });
  });

  describe("fromArray", () => {
    it("creates async iterable from array", async () => {
      const result = await collect(fromArray(["a", "b"]));
      expect(result).toEqual(["a", "b"]);
    });
  });
});
