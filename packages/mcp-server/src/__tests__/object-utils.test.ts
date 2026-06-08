import { describe, it, expect } from "vitest";
import { pick, omit, mapValues, mapKeys, filterEntries, groupBy, keyBy, invert, flattenObject, unflattenObject } from "../object-utils.js";

describe("object-utils", () => {
  it("pick selects keys", () => {
    expect(pick({ a: 1, b: 2, c: 3 }, ["a", "c"])).toEqual({ a: 1, c: 3 });
  });

  it("omit excludes keys", () => {
    expect(omit({ a: 1, b: 2, c: 3 }, ["b"])).toEqual({ a: 1, c: 3 });
  });

  it("mapValues transforms values", () => {
    expect(mapValues({ a: 1, b: 2 }, (v) => v * 2)).toEqual({ a: 2, b: 4 });
  });

  it("mapKeys transforms keys", () => {
    expect(mapKeys({ a: 1 }, (k) => k.toUpperCase())).toEqual({ A: 1 });
  });

  it("filterEntries filters", () => {
    expect(filterEntries({ a: 1, b: 2, c: 3 }, (v) => v > 1)).toEqual({ b: 2, c: 3 });
  });

  it("groupBy groups items", () => {
    const items = [{ type: "a", v: 1 }, { type: "b", v: 2 }, { type: "a", v: 3 }];
    const grouped = groupBy(items, (i) => i.type);
    expect(grouped.a).toHaveLength(2);
    expect(grouped.b).toHaveLength(1);
  });

  it("keyBy indexes items", () => {
    const items = [{ id: "x", v: 1 }, { id: "y", v: 2 }];
    expect(keyBy(items, (i) => i.id)).toEqual({ x: items[0], y: items[1] });
  });

  it("invert swaps keys and values", () => {
    expect(invert({ a: "1", b: "2" })).toEqual({ "1": "a", "2": "b" });
  });

  it("flattenObject flattens nested", () => {
    expect(flattenObject({ a: { b: { c: 1 } }, d: 2 })).toEqual({ "a.b.c": 1, d: 2 });
  });

  it("unflattenObject unflattens", () => {
    expect(unflattenObject({ "a.b.c": 1, d: 2 })).toEqual({ a: { b: { c: 1 } }, d: 2 });
  });

  it("roundtrip flatten/unflatten", () => {
    const original = { a: { b: 1, c: { d: 2 } }, e: 3 };
    expect(unflattenObject(flattenObject(original))).toEqual(original);
  });
});
