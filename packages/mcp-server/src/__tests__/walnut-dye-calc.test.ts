import { describe, it, expect } from "vitest";
import {
  hullWeightGPerLiter, soakTimeHours, simmerTimeMinutes, colorDepth,
  mordantRequired, lightFastnessRating, washFastnessRating, stainingWarning,
  costPerLiter, hullStates,
} from "../walnut-dye-calc.js";

describe("hullWeightGPerLiter", () => {
  it("fresh brown is heaviest", () => {
    expect(hullWeightGPerLiter("fresh_brown")).toBeGreaterThan(
      hullWeightGPerLiter("extract")
    );
  });
});

describe("soakTimeHours", () => {
  it("fresh green soaks longest", () => {
    expect(soakTimeHours("fresh_green")).toBeGreaterThan(
      soakTimeHours("extract")
    );
  });
});

describe("simmerTimeMinutes", () => {
  it("fresh green simmers longest", () => {
    expect(simmerTimeMinutes("fresh_green")).toBeGreaterThan(
      simmerTimeMinutes("extract")
    );
  });
});

describe("colorDepth", () => {
  it("fresh brown has deepest color", () => {
    expect(colorDepth("fresh_brown")).toBeGreaterThan(
      colorDepth("fresh_green")
    );
  });
});

describe("mordantRequired", () => {
  it("returns false", () => {
    expect(mordantRequired()).toBe(false);
  });
});

describe("lightFastnessRating", () => {
  it("returns 4", () => {
    expect(lightFastnessRating()).toBe(4);
  });
});

describe("washFastnessRating", () => {
  it("returns 3", () => {
    expect(washFastnessRating()).toBe(3);
  });
});

describe("stainingWarning", () => {
  it("returns true", () => {
    expect(stainingWarning()).toBe(true);
  });
});

describe("costPerLiter", () => {
  it("extract is most expensive", () => {
    expect(costPerLiter("extract")).toBeGreaterThan(
      costPerLiter("fresh_green")
    );
  });
});

describe("hullStates", () => {
  it("returns 5 states", () => {
    expect(hullStates()).toHaveLength(5);
  });
});
