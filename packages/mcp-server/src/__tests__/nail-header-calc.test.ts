import { describe, it, expect } from "vitest";
import {
  headForm, speedMake, consistShape, sizeRange,
  headerCost, decorative, forFine, headStyle,
  bestUse, nailHeaders,
} from "../nail-header-calc.js";

describe("headForm", () => {
  it("decorative head fancy best head form", () => {
    expect(headForm("decorative_head_fancy")).toBeGreaterThan(headForm("flat_head_common"));
  });
});

describe("speedMake", () => {
  it("flat head common fastest make", () => {
    expect(speedMake("flat_head_common")).toBeGreaterThan(speedMake("decorative_head_fancy"));
  });
});

describe("consistShape", () => {
  it("decorative head fancy most consistent shape", () => {
    expect(consistShape("decorative_head_fancy")).toBeGreaterThan(consistShape("flat_head_common"));
  });
});

describe("sizeRange", () => {
  it("flat head common widest size range", () => {
    expect(sizeRange("flat_head_common")).toBeGreaterThan(sizeRange("brad_head_small"));
  });
});

describe("headerCost", () => {
  it("decorative head fancy most expensive", () => {
    expect(headerCost("decorative_head_fancy")).toBeGreaterThan(headerCost("flat_head_common"));
  });
});

describe("decorative", () => {
  it("decorative head fancy is decorative", () => {
    expect(decorative("decorative_head_fancy")).toBe(true);
  });
  it("rose head standard not decorative", () => {
    expect(decorative("rose_head_standard")).toBe(false);
  });
});

describe("forFine", () => {
  it("brad head small is for fine", () => {
    expect(forFine("brad_head_small")).toBe(true);
  });
  it("rose head standard not for fine", () => {
    expect(forFine("rose_head_standard")).toBe(false);
  });
});

describe("headStyle", () => {
  it("clout head wide uses wide flat disc", () => {
    expect(headStyle("clout_head_wide")).toBe("wide_flat_disc");
  });
});

describe("bestUse", () => {
  it("rose head standard best for general rose head nail", () => {
    expect(bestUse("rose_head_standard")).toBe("general_rose_head_nail");
  });
});

describe("nailHeaders", () => {
  it("returns 5 types", () => {
    expect(nailHeaders()).toHaveLength(5);
  });
});
