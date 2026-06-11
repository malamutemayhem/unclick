import { describe, it, expect } from "vitest";
import {
  holdStrength, pageCapacity, bindSpeed, decorativeValue,
  stitchCost, exposed, forThick, stitchPattern,
  bestUse, pamphletStitchs,
} from "../pamphlet-stitch-calc.js";

describe("holdStrength", () => {
  it("japanese stab pattern strongest hold", () => {
    expect(holdStrength("japanese_stab_pattern")).toBeGreaterThan(holdStrength("three_hole_basic"));
  });
});

describe("pageCapacity", () => {
  it("long stitch exposed highest page capacity", () => {
    expect(pageCapacity("long_stitch_exposed")).toBeGreaterThan(pageCapacity("three_hole_basic"));
  });
});

describe("bindSpeed", () => {
  it("three hole basic fastest bind", () => {
    expect(bindSpeed("three_hole_basic")).toBeGreaterThan(bindSpeed("japanese_stab_pattern"));
  });
});

describe("decorativeValue", () => {
  it("japanese stab pattern most decorative", () => {
    expect(decorativeValue("japanese_stab_pattern")).toBeGreaterThan(decorativeValue("three_hole_basic"));
  });
});

describe("stitchCost", () => {
  it("japanese stab pattern most expensive", () => {
    expect(stitchCost("japanese_stab_pattern")).toBeGreaterThan(stitchCost("three_hole_basic"));
  });
});

describe("exposed", () => {
  it("long stitch exposed is exposed", () => {
    expect(exposed("long_stitch_exposed")).toBe(true);
  });
  it("three hole basic not exposed", () => {
    expect(exposed("three_hole_basic")).toBe(false);
  });
});

describe("forThick", () => {
  it("japanese stab pattern is for thick", () => {
    expect(forThick("japanese_stab_pattern")).toBe(true);
  });
  it("three hole basic not for thick", () => {
    expect(forThick("three_hole_basic")).toBe(false);
  });
});

describe("stitchPattern", () => {
  it("seven hole decorative uses decorative seven point", () => {
    expect(stitchPattern("seven_hole_decorative")).toBe("decorative_seven_point");
  });
});

describe("bestUse", () => {
  it("five hole standard best for general pamphlet bind", () => {
    expect(bestUse("five_hole_standard")).toBe("general_pamphlet_bind");
  });
});

describe("pamphletStitchs", () => {
  it("returns 5 types", () => {
    expect(pamphletStitchs()).toHaveLength(5);
  });
});
