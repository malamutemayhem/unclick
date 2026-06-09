import { describe, it, expect } from "vitest";
import {
  values, count, infinite, map, filter, take, skip,
  scan, collect, reduce, forEach, pipe, concat,
} from "../pull-stream.js";

describe("pull-stream sources", () => {
  it("values emits array items", () => {
    expect(collect(values([1, 2, 3]))).toEqual([1, 2, 3]);
  });

  it("count emits range", () => {
    expect(collect(count(0, 5))).toEqual([0, 1, 2, 3, 4]);
  });

  it("infinite with take", () => {
    const source = pipe(infinite((i) => i * 2), take(4));
    expect(collect(source)).toEqual([0, 2, 4, 6]);
  });
});

describe("pull-stream transforms", () => {
  it("map transforms values", () => {
    const source = pipe(values([1, 2, 3]), map((x: number) => x * 10));
    expect(collect(source)).toEqual([10, 20, 30]);
  });

  it("filter selects values", () => {
    const source = pipe(values([1, 2, 3, 4, 5]), filter((x: number) => x % 2 === 0));
    expect(collect(source)).toEqual([2, 4]);
  });

  it("take limits output", () => {
    const source = pipe(values([1, 2, 3, 4, 5]), take(3));
    expect(collect(source)).toEqual([1, 2, 3]);
  });

  it("skip bypasses items", () => {
    const source = pipe(values([1, 2, 3, 4, 5]), skip(2));
    expect(collect(source)).toEqual([3, 4, 5]);
  });

  it("scan accumulates", () => {
    const source = pipe(values([1, 2, 3]), scan((acc: number, x: number) => acc + x, 0));
    expect(collect(source)).toEqual([1, 3, 6]);
  });
});

describe("pull-stream sinks", () => {
  it("collect gathers all", () => {
    expect(collect(values(["a", "b"]))).toEqual(["a", "b"]);
  });

  it("reduce folds", () => {
    expect(reduce(values([1, 2, 3, 4]), (a, b: number) => a + b, 0)).toBe(10);
  });

  it("forEach iterates", () => {
    const items: number[] = [];
    forEach(values([1, 2, 3]), (x) => items.push(x));
    expect(items).toEqual([1, 2, 3]);
  });
});

describe("pipe and concat", () => {
  it("pipe chains transforms", () => {
    const source = pipe(
      values([1, 2, 3, 4, 5]),
      filter((x: number) => x > 2),
      map((x: number) => x * 10)
    );
    expect(collect(source)).toEqual([30, 40, 50]);
  });

  it("concat joins sources", () => {
    const source = concat(values([1, 2]), values([3, 4]));
    expect(collect(source)).toEqual([1, 2, 3, 4]);
  });

  it("empty values returns empty", () => {
    expect(collect(values([]))).toEqual([]);
  });

  it("abort stops stream", () => {
    const source = values([1, 2, 3]);
    const result = source(true);
    expect(result.done).toBe(true);
  });
});
