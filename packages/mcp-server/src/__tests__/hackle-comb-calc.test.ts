import { describe, it, expect } from "vitest";
import {
  fiberAlign, wasteLow, speedComb, lengthRange,
  hackleCost, doubleRow, forLong, tineSpacing,
  bestUse, hackleCombs,
} from "../hackle-comb-calc.js";

describe("fiberAlign", () => {
  it("single row fine best fiber alignment", () => {
    expect(fiberAlign("single_row_fine")).toBeGreaterThan(fiberAlign("mini_comb_hand"));
  });
});

describe("wasteLow", () => {
  it("mini comb hand lowest waste", () => {
    expect(wasteLow("mini_comb_hand")).toBeGreaterThan(wasteLow("single_row_fine"));
  });
});

describe("speedComb", () => {
  it("mini comb hand fastest comb", () => {
    expect(speedComb("mini_comb_hand")).toBeGreaterThan(speedComb("dutch_comb_long"));
  });
});

describe("lengthRange", () => {
  it("dutch comb long widest length range", () => {
    expect(lengthRange("dutch_comb_long")).toBeGreaterThan(lengthRange("mini_comb_hand"));
  });
});

describe("hackleCost", () => {
  it("dutch comb long most expensive", () => {
    expect(hackleCost("dutch_comb_long")).toBeGreaterThan(hackleCost("mini_comb_hand"));
  });
});

describe("doubleRow", () => {
  it("double row medium is double row", () => {
    expect(doubleRow("double_row_medium")).toBe(true);
  });
  it("single row fine not double row", () => {
    expect(doubleRow("single_row_fine")).toBe(false);
  });
});

describe("forLong", () => {
  it("dutch comb long is for long", () => {
    expect(forLong("dutch_comb_long")).toBe(true);
  });
  it("mini comb hand not for long", () => {
    expect(forLong("mini_comb_hand")).toBe(false);
  });
});

describe("tineSpacing", () => {
  it("viking comb wide uses wide viking spread", () => {
    expect(tineSpacing("viking_comb_wide")).toBe("wide_viking_spread");
  });
});

describe("bestUse", () => {
  it("dutch comb long best for long staple prep", () => {
    expect(bestUse("dutch_comb_long")).toBe("long_staple_prep");
  });
});

describe("hackleCombs", () => {
  it("returns 5 types", () => {
    expect(hackleCombs()).toHaveLength(5);
  });
});
