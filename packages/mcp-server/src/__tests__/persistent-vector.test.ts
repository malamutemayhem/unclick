import { describe, it, expect } from "vitest";
import { PersistentVector } from "../persistent-vector.js";

describe("PersistentVector", () => {
  it("creates empty vector", () => {
    const v = PersistentVector.empty<number>();
    expect(v.size).toBe(0);
  });

  it("pushes and gets elements", () => {
    let v = PersistentVector.empty<number>();
    v = v.push(1).push(2).push(3);
    expect(v.size).toBe(3);
    expect(v.get(0)).toBe(1);
    expect(v.get(1)).toBe(2);
    expect(v.get(2)).toBe(3);
  });

  it("is immutable on push", () => {
    const v1 = PersistentVector.of(1, 2, 3);
    const v2 = v1.push(4);
    expect(v1.size).toBe(3);
    expect(v2.size).toBe(4);
  });

  it("sets elements immutably", () => {
    const v1 = PersistentVector.of(1, 2, 3);
    const v2 = v1.set(1, 20);
    expect(v1.get(1)).toBe(2);
    expect(v2.get(1)).toBe(20);
  });

  it("pops elements immutably", () => {
    const v1 = PersistentVector.of(1, 2, 3);
    const v2 = v1.pop();
    expect(v1.size).toBe(3);
    expect(v2.size).toBe(2);
    expect(v2.get(0)).toBe(1);
    expect(v2.get(1)).toBe(2);
  });

  it("throws on out of bounds", () => {
    const v = PersistentVector.of(1);
    expect(() => v.get(-1)).toThrow("out of bounds");
    expect(() => v.get(5)).toThrow("out of bounds");
  });

  it("converts to array", () => {
    const v = PersistentVector.of(1, 2, 3);
    expect(v.toArray()).toEqual([1, 2, 3]);
  });

  it("maps values", () => {
    const v = PersistentVector.of(1, 2, 3).map((x) => x * 2);
    expect(v.toArray()).toEqual([2, 4, 6]);
  });

  it("filters values", () => {
    const v = PersistentVector.of(1, 2, 3, 4).filter((x) => x % 2 === 0);
    expect(v.toArray()).toEqual([2, 4]);
  });

  it("reduces values", () => {
    const sum = PersistentVector.of(1, 2, 3).reduce((a, b) => a + b, 0);
    expect(sum).toBe(6);
  });

  it("slices vector", () => {
    const v = PersistentVector.of(1, 2, 3, 4, 5).slice(1, 4);
    expect(v.toArray()).toEqual([2, 3, 4]);
  });

  it("concatenates vectors", () => {
    const a = PersistentVector.of(1, 2);
    const b = PersistentVector.of(3, 4);
    expect(a.concat(b).toArray()).toEqual([1, 2, 3, 4]);
  });

  it("finds element", () => {
    const v = PersistentVector.of(1, 2, 3);
    expect(v.find((x) => x > 1)).toBe(2);
    expect(v.find((x) => x > 10)).toBeUndefined();
  });

  it("indexOf", () => {
    const v = PersistentVector.of(10, 20, 30);
    expect(v.indexOf(20)).toBe(1);
    expect(v.indexOf(99)).toBe(-1);
  });

  it("handles many elements past tail", () => {
    let v = PersistentVector.empty<number>();
    for (let i = 0; i < 100; i++) v = v.push(i);
    expect(v.size).toBe(100);
    for (let i = 0; i < 100; i++) expect(v.get(i)).toBe(i);
  });

  it("from iterable", () => {
    const v = PersistentVector.from([1, 2, 3]);
    expect(v.toArray()).toEqual([1, 2, 3]);
  });
});
