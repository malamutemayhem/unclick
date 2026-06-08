import { describe, it, expect } from "vitest";
import { RuntimeTypeChecker } from "../type-check-runtime.js";

const t = RuntimeTypeChecker.t;

describe("RuntimeTypeChecker", () => {
  it("validates primitives", () => {
    expect(RuntimeTypeChecker.isValid("hello", t.string())).toBe(true);
    expect(RuntimeTypeChecker.isValid(42, t.number())).toBe(true);
    expect(RuntimeTypeChecker.isValid(true, t.boolean())).toBe(true);
    expect(RuntimeTypeChecker.isValid("hello", t.number())).toBe(false);
  });

  it("validates null and undefined", () => {
    expect(RuntimeTypeChecker.isValid(null, t.null())).toBe(true);
    expect(RuntimeTypeChecker.isValid(undefined, t.undefined())).toBe(true);
  });

  it("validates arrays", () => {
    expect(RuntimeTypeChecker.isValid([1, 2, 3], t.array(t.number()))).toBe(true);
    expect(RuntimeTypeChecker.isValid([1, "two"], t.array(t.number()))).toBe(false);
  });

  it("validates objects", () => {
    const schema = t.object({ name: t.string(), age: t.number() });
    expect(RuntimeTypeChecker.isValid({ name: "Alice", age: 30 }, schema)).toBe(true);
    expect(RuntimeTypeChecker.isValid({ name: "Alice" }, schema)).toBe(false);
  });

  it("validates unions", () => {
    const schema = t.union(t.string(), t.number());
    expect(RuntimeTypeChecker.isValid("hello", schema)).toBe(true);
    expect(RuntimeTypeChecker.isValid(42, schema)).toBe(true);
    expect(RuntimeTypeChecker.isValid(true, schema)).toBe(false);
  });

  it("validates literals", () => {
    expect(RuntimeTypeChecker.isValid("red", t.literal("red"))).toBe(true);
    expect(RuntimeTypeChecker.isValid("blue", t.literal("red"))).toBe(false);
  });

  it("returns detailed errors", () => {
    const schema = t.object({ name: t.string(), age: t.number() });
    const errors = RuntimeTypeChecker.check({ name: 123, age: "old" }, schema);
    expect(errors.length).toBe(2);
    expect(errors[0].path).toBe("$.name");
    expect(errors[1].path).toBe("$.age");
  });

  it("validates nested structures", () => {
    const schema = t.object({
      user: t.object({ name: t.string() }),
      scores: t.array(t.number()),
    });
    expect(RuntimeTypeChecker.isValid({ user: { name: "A" }, scores: [1, 2] }, schema)).toBe(true);
  });

  it("any accepts everything", () => {
    expect(RuntimeTypeChecker.isValid("anything", t.any())).toBe(true);
    expect(RuntimeTypeChecker.isValid(null, t.any())).toBe(true);
  });
});
