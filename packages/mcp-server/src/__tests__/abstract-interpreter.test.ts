import { describe, it, expect } from "vitest";
import {
  TOP, BOTTOM, constant, range, sign, join, meet,
  abstractAdd, abstractMul, abstractNeg, contains,
  isSubset, abstractEquals, toString,
} from "../abstract-interpreter.js";

describe("join (least upper bound)", () => {
  it("join of bottom with x gives x", () => {
    expect(join(BOTTOM, constant(5))).toEqual(constant(5));
  });

  it("join of top with anything gives top", () => {
    expect(join(TOP, constant(5))).toBe(TOP);
  });

  it("join of two constants gives range", () => {
    const r = join(constant(3), constant(7));
    expect(r).toEqual(range(3, 7));
  });

  it("join of same constant gives that constant", () => {
    expect(join(constant(3), constant(3))).toEqual(constant(3));
  });

  it("join of ranges widens", () => {
    expect(join(range(1, 5), range(3, 10))).toEqual(range(1, 10));
  });

  it("join of signs", () => {
    expect(join(sign("pos"), sign("pos"))).toEqual(sign("pos"));
    expect(join(sign("pos"), sign("neg"))).toEqual(sign("any"));
  });
});

describe("meet (greatest lower bound)", () => {
  it("meet of top with x gives x", () => {
    expect(meet(TOP, constant(5))).toEqual(constant(5));
  });

  it("meet of non-overlapping ranges gives bottom", () => {
    expect(meet(range(1, 3), range(5, 7))).toBe(BOTTOM);
  });

  it("meet of overlapping ranges narrows", () => {
    expect(meet(range(1, 5), range(3, 10))).toEqual(range(3, 5));
  });
});

describe("abstract arithmetic", () => {
  it("adds constants", () => {
    expect(abstractAdd(constant(3), constant(4))).toEqual(constant(7));
  });

  it("adds ranges", () => {
    expect(abstractAdd(range(1, 3), range(2, 4))).toEqual(range(3, 7));
  });

  it("multiplies constants", () => {
    expect(abstractMul(constant(3), constant(4))).toEqual(constant(12));
  });

  it("multiplies ranges", () => {
    const r = abstractMul(range(-2, 3), range(1, 4));
    expect(r).toEqual(range(-8, 12));
  });

  it("negates", () => {
    expect(abstractNeg(constant(5))).toEqual(constant(-5));
    expect(abstractNeg(range(1, 3))).toEqual(range(-3, -1));
    expect(abstractNeg(sign("pos"))).toEqual(sign("neg"));
  });
});

describe("contains", () => {
  it("constant contains its value", () => {
    expect(contains(constant(5), 5)).toBe(true);
    expect(contains(constant(5), 6)).toBe(false);
  });

  it("range contains values in bounds", () => {
    expect(contains(range(1, 10), 5)).toBe(true);
    expect(contains(range(1, 10), 11)).toBe(false);
  });

  it("sign domain", () => {
    expect(contains(sign("pos"), 3)).toBe(true);
    expect(contains(sign("pos"), -1)).toBe(false);
  });
});

describe("isSubset", () => {
  it("bottom is subset of everything", () => {
    expect(isSubset(BOTTOM, constant(5))).toBe(true);
  });

  it("everything is subset of top", () => {
    expect(isSubset(constant(5), TOP)).toBe(true);
  });

  it("range subset", () => {
    expect(isSubset(range(2, 4), range(1, 5))).toBe(true);
    expect(isSubset(range(1, 5), range(2, 4))).toBe(false);
  });
});

describe("toString", () => {
  it("formats values", () => {
    expect(toString(TOP)).toBe("TOP");
    expect(toString(BOTTOM)).toBe("BOTTOM");
    expect(toString(constant(42))).toBe("42");
    expect(toString(range(1, 10))).toBe("[1, 10]");
    expect(toString(sign("pos"))).toBe("pos");
  });
});
