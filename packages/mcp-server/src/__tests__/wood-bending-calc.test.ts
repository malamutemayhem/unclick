import { describe, it, expect } from "vitest";
import {
  minRadiusMm, prepTimeMinutes, bendTimeMinutes, dryingTimeHours,
  springbackPercent, strengthRetention, formRequired, failureRiskPercent,
  costRating, bendMethods,
} from "../wood-bending-calc.js";

describe("minRadiusMm", () => {
  it("kerf allows tightest radius", () => {
    expect(minRadiusMm(10, "kerf")).toBeLessThan(minRadiusMm(10, "steam"));
  });
});

describe("prepTimeMinutes", () => {
  it("steam takes longest prep", () => {
    expect(prepTimeMinutes("steam")).toBeGreaterThan(prepTimeMinutes("kerf"));
  });
});

describe("bendTimeMinutes", () => {
  it("thicker stock takes longer", () => {
    expect(bendTimeMinutes(20, "steam")).toBeGreaterThan(
      bendTimeMinutes(10, "steam")
    );
  });
});

describe("dryingTimeHours", () => {
  it("boiling takes longest to dry", () => {
    expect(dryingTimeHours("boiling")).toBeGreaterThan(
      dryingTimeHours("kerf")
    );
  });
});

describe("springbackPercent", () => {
  it("boiling has most springback", () => {
    expect(springbackPercent("boiling")).toBeGreaterThan(
      springbackPercent("kerf")
    );
  });
});

describe("strengthRetention", () => {
  it("steam retains most strength", () => {
    expect(strengthRetention("steam")).toBeGreaterThan(
      strengthRetention("kerf")
    );
  });
});

describe("formRequired", () => {
  it("kerf does not need form", () => {
    expect(formRequired("kerf")).toBe(false);
  });
  it("steam needs form", () => {
    expect(formRequired("steam")).toBe(true);
  });
});

describe("failureRiskPercent", () => {
  it("boiling has highest failure risk", () => {
    expect(failureRiskPercent("boiling")).toBeGreaterThan(
      failureRiskPercent("kerf")
    );
  });
});

describe("costRating", () => {
  it("lamination is most expensive", () => {
    expect(costRating("lamination")).toBeGreaterThan(costRating("boiling"));
  });
});

describe("bendMethods", () => {
  it("returns 5 methods", () => {
    expect(bendMethods()).toHaveLength(5);
  });
});
