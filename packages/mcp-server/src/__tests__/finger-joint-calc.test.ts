import { describe, it, expect } from "vitest";
import {
  fingersPerCm, glueAreaMultiplier, strengthRating, visibleEndGrain,
  routerBitRequired, setupTimeMinutes, difficultyRating,
  decorativeValue, wastePercent, fingerJointTypes,
} from "../finger-joint-calc.js";

describe("fingersPerCm", () => {
  it("decorative has most fingers", () => {
    expect(fingersPerCm("decorative")).toBeGreaterThan(
      fingersPerCm("mitered")
    );
  });
});

describe("glueAreaMultiplier", () => {
  it("double has most glue area", () => {
    expect(glueAreaMultiplier("double")).toBeGreaterThan(
      glueAreaMultiplier("end_grain")
    );
  });
});

describe("strengthRating", () => {
  it("double is strongest", () => {
    expect(strengthRating("double")).toBeGreaterThan(
      strengthRating("end_grain")
    );
  });
});

describe("visibleEndGrain", () => {
  it("through shows end grain", () => {
    expect(visibleEndGrain("through")).toBe(true);
  });
  it("mitered hides end grain", () => {
    expect(visibleEndGrain("mitered")).toBe(false);
  });
});

describe("routerBitRequired", () => {
  it("always required", () => {
    expect(routerBitRequired("through")).toBe(true);
  });
});

describe("setupTimeMinutes", () => {
  it("mitered takes longest to set up", () => {
    expect(setupTimeMinutes("mitered")).toBeGreaterThan(
      setupTimeMinutes("end_grain")
    );
  });
});

describe("difficultyRating", () => {
  it("mitered is hardest", () => {
    expect(difficultyRating("mitered")).toBeGreaterThan(
      difficultyRating("end_grain")
    );
  });
});

describe("decorativeValue", () => {
  it("decorative looks best", () => {
    expect(decorativeValue("decorative")).toBeGreaterThan(
      decorativeValue("end_grain")
    );
  });
});

describe("wastePercent", () => {
  it("decorative wastes most", () => {
    expect(wastePercent("decorative")).toBeGreaterThan(
      wastePercent("end_grain")
    );
  });
});

describe("fingerJointTypes", () => {
  it("returns 5 types", () => {
    expect(fingerJointTypes()).toHaveLength(5);
  });
});
