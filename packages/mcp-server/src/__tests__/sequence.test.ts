import { describe, it, expect } from "vitest";
import { range, repeat, cycle, zip, enumerate, take, skip, collect } from "../sequence.js";

describe("sequence", () => {
  it("range generates numbers", () => {
    expect(collect(range(0, 5))).toEqual([0, 1, 2, 3, 4]);
    expect(collect(range(2, 8, 2))).toEqual([2, 4, 6]);
  });

  it("range with negative step counts down", () => {
    expect(collect(range(5, 0, -1))).toEqual([5, 4, 3, 2, 1]);
  });

  it("repeat yields value N times", () => {
    expect(collect(repeat("x", 3))).toEqual(["x", "x", "x"]);
  });

  it("cycle repeats items", () => {
    expect(collect(cycle([1, 2], 5))).toEqual([1, 2, 1, 2, 1]);
  });

  it("zip pairs two iterables", () => {
    expect(collect(zip([1, 2, 3], ["a", "b"]))).toEqual([[1, "a"], [2, "b"]]);
  });

  it("enumerate adds indices", () => {
    expect(collect(enumerate(["a", "b", "c"]))).toEqual([[0, "a"], [1, "b"], [2, "c"]]);
    expect(collect(enumerate(["a"], 5))).toEqual([[5, "a"]]);
  });

  it("take limits output", () => {
    expect(collect(take(range(0, 100), 3))).toEqual([0, 1, 2]);
  });

  it("skip drops first N items", () => {
    expect(collect(skip([1, 2, 3, 4, 5], 2))).toEqual([3, 4, 5]);
  });

  it("compose take and skip", () => {
    expect(collect(take(skip(range(0, 100), 5), 3))).toEqual([5, 6, 7]);
  });
});
