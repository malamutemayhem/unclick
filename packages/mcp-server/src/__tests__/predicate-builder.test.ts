import { describe, it, expect } from "vitest";
import { and, or, not, always, never, where, whereIn, matches, pipe } from "../predicate-builder.js";

describe("predicate-builder", () => {
  it("and combines with logical AND", () => {
    const isPositive = (n: number) => n > 0;
    const isEven = (n: number) => n % 2 === 0;
    const pred = and(isPositive, isEven);
    expect(pred(4)).toBe(true);
    expect(pred(-2)).toBe(false);
    expect(pred(3)).toBe(false);
  });

  it("or combines with logical OR", () => {
    const isZero = (n: number) => n === 0;
    const isOne = (n: number) => n === 1;
    const pred = or(isZero, isOne);
    expect(pred(0)).toBe(true);
    expect(pred(1)).toBe(true);
    expect(pred(2)).toBe(false);
  });

  it("not inverts", () => {
    const isPositive = (n: number) => n > 0;
    expect(not(isPositive)(-1)).toBe(true);
    expect(not(isPositive)(1)).toBe(false);
  });

  it("always and never", () => {
    expect(always()(42)).toBe(true);
    expect(never()(42)).toBe(false);
  });

  it("where matches object key", () => {
    type Item = { status: string };
    const isActive = where<Item, "status">("status", "active");
    expect(isActive({ status: "active" })).toBe(true);
    expect(isActive({ status: "inactive" })).toBe(false);
  });

  it("whereIn matches set of values", () => {
    type Item = { role: string };
    const isAdmin = whereIn<Item, "role">("role", ["admin", "superadmin"]);
    expect(isAdmin({ role: "admin" })).toBe(true);
    expect(isAdmin({ role: "user" })).toBe(false);
  });

  it("matches checks partial object", () => {
    type Item = { a: number; b: string };
    const pred = matches<Item>({ a: 1 });
    expect(pred({ a: 1, b: "x" })).toBe(true);
    expect(pred({ a: 2, b: "x" })).toBe(false);
  });

  it("pipe filters array with combined predicates", () => {
    const filter = pipe<number>(
      (n) => n > 0,
      (n) => n < 10
    );
    expect(filter([-1, 0, 5, 10, 15])).toEqual([5]);
  });
});
