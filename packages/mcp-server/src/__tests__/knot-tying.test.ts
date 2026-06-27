import { describe, it, expect } from "vitest";
import {
  knotStrength, breakingLoad, ropeDiameter, knotVolume,
  cordNeeded, difficulty, tyingTime, ropeStrength,
  spliceStrength, whippingLength, fuseMelting, knotCategories,
} from "../knot-tying.js";

describe("knotStrength", () => {
  it("loop strongest", () => {
    expect(knotStrength("loop")).toBeGreaterThan(knotStrength("decorative"));
  });
});

describe("breakingLoad", () => {
  it("less than rope strength", () => {
    expect(breakingLoad(1000, 70)).toBeLessThan(1000);
  });
});

describe("ropeDiameter", () => {
  it("positive mm", () => {
    expect(ropeDiameter(100)).toBeGreaterThan(0);
  });
});

describe("knotVolume", () => {
  it("decorative largest", () => {
    expect(knotVolume(10, "decorative")).toBeGreaterThan(knotVolume(10, "stopper"));
  });
});

describe("cordNeeded", () => {
  it("positive cm", () => {
    expect(cordNeeded(5, 8, "loop")).toBeGreaterThan(0);
  });
});

describe("difficulty", () => {
  it("decorative hardest", () => {
    expect(difficulty("decorative")).toBeGreaterThan(difficulty("stopper"));
  });
});

describe("tyingTime", () => {
  it("harder = more time", () => {
    expect(tyingTime(5)).toBeGreaterThan(tyingTime(1));
  });
});

describe("ropeStrength", () => {
  it("dyneema strongest", () => {
    expect(ropeStrength("dyneema", 10)).toBeGreaterThan(ropeStrength("hemp", 10));
  });
});

describe("spliceStrength", () => {
  it("90% of rope", () => {
    expect(spliceStrength(1000)).toBe(900);
  });
});

describe("whippingLength", () => {
  it("1.5x diameter", () => {
    expect(whippingLength(10)).toBe(15);
  });
});

describe("fuseMelting", () => {
  it("nylon can fuse", () => {
    expect(fuseMelting("nylon")).toBe(true);
  });
  it("hemp cannot fuse", () => {
    expect(fuseMelting("hemp")).toBe(false);
  });
});

describe("knotCategories", () => {
  it("returns 6 categories", () => {
    expect(knotCategories()).toHaveLength(6);
  });
});
