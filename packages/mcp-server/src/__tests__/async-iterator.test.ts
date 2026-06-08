import { describe, it, expect } from "vitest";
import { map, filter, take, skip, chunk, flatten, collect, reduce, first, fromArray, concat, enumerate } from "../async-iterator.js";

describe("async-iterator", () => {
  it("map transforms items", async () => {
    const result = await collect(map(fromArray([1, 2, 3]), (x) => x * 2));
    expect(result).toEqual([2, 4, 6]);
  });

  it("filter keeps matching", async () => {
    const result = await collect(filter(fromArray([1, 2, 3, 4]), (x) => x % 2 === 0));
    expect(result).toEqual([2, 4]);
  });

  it("take limits output", async () => {
    const result = await collect(take(fromArray([1, 2, 3, 4, 5]), 3));
    expect(result).toEqual([1, 2, 3]);
  });

  it("skip skips items", async () => {
    const result = await collect(skip(fromArray([1, 2, 3, 4, 5]), 2));
    expect(result).toEqual([3, 4, 5]);
  });

  it("chunk batches items", async () => {
    const result = await collect(chunk(fromArray([1, 2, 3, 4, 5]), 2));
    expect(result).toEqual([[1, 2], [3, 4], [5]]);
  });

  it("flatten unrolls arrays", async () => {
    const result = await collect(flatten(fromArray([[1, 2], [3], [4, 5]])));
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it("reduce accumulates", async () => {
    const sum = await reduce(fromArray([1, 2, 3]), (acc, x) => acc + x, 0);
    expect(sum).toBe(6);
  });

  it("first returns first item", async () => {
    expect(await first(fromArray([10, 20]))).toBe(10);
  });

  it("first returns undefined for empty", async () => {
    expect(await first(fromArray([]))).toBeUndefined();
  });

  it("concat joins iterables", async () => {
    const result = await collect(concat(fromArray([1, 2]), fromArray([3, 4])));
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it("enumerate adds indices", async () => {
    const result = await collect(enumerate(fromArray(["a", "b"])));
    expect(result).toEqual([[0, "a"], [1, "b"]]);
  });

  it("composes multiple ops", async () => {
    const source = fromArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const result = await collect(
      take(filter(map(source, (x) => x * 2), (x) => x > 6), 3)
    );
    expect(result).toEqual([8, 10, 12]);
  });
});
