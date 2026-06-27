import { describe, it, expect } from "vitest";
import { some, none, isSome, isNone, unwrapOption, unwrapOptionOr, mapOption, flatMapOption, filterOption, fromNullable, toNullable } from "../option-type.js";

describe("some / none", () => {
  it("some creates value", () => {
    const o = some(42);
    expect(o.some).toBe(true);
    if (o.some) expect(o.value).toBe(42);
  });
  it("none creates empty", () => {
    expect(none().some).toBe(false);
  });
});

describe("isSome / isNone", () => {
  it("type guards", () => {
    expect(isSome(some(1))).toBe(true);
    expect(isNone(none())).toBe(true);
    expect(isSome(none())).toBe(false);
  });
});

describe("unwrapOption", () => {
  it("returns value for some", () => {
    expect(unwrapOption(some(5))).toBe(5);
  });
  it("throws for none", () => {
    expect(() => unwrapOption(none())).toThrow("None");
  });
});

describe("unwrapOptionOr", () => {
  it("returns value for some", () => {
    expect(unwrapOptionOr(some(1), 0)).toBe(1);
  });
  it("returns fallback for none", () => {
    expect(unwrapOptionOr(none(), 99)).toBe(99);
  });
});

describe("mapOption", () => {
  it("transforms some", () => {
    const r = mapOption(some(3), (v) => v * 2);
    expect(unwrapOption(r)).toBe(6);
  });
  it("passes through none", () => {
    expect(isNone(mapOption(none<number>(), (v) => v * 2))).toBe(true);
  });
});

describe("flatMapOption", () => {
  it("chains some", () => {
    const r = flatMapOption(some(5), (v) => v > 0 ? some(v) : none());
    expect(unwrapOption(r)).toBe(5);
  });
  it("returns none on none", () => {
    expect(isNone(flatMapOption(none<number>(), () => some(1)))).toBe(true);
  });
});

describe("filterOption", () => {
  it("keeps matching some", () => {
    expect(isSome(filterOption(some(5), (v) => v > 3))).toBe(true);
  });
  it("filters non-matching to none", () => {
    expect(isNone(filterOption(some(1), (v) => v > 3))).toBe(true);
  });
});

describe("fromNullable / toNullable", () => {
  it("non-null becomes some", () => {
    expect(isSome(fromNullable(42))).toBe(true);
  });
  it("null becomes none", () => {
    expect(isNone(fromNullable(null))).toBe(true);
  });
  it("undefined becomes none", () => {
    expect(isNone(fromNullable(undefined))).toBe(true);
  });
  it("toNullable reverses some", () => {
    expect(toNullable(some(42))).toBe(42);
  });
  it("toNullable reverses none", () => {
    expect(toNullable(none())).toBeNull();
  });
});
