import { describe, it, expect } from "vitest";
import {
  timePerKgMinutes, waterTempCelsius, weightLossPercent,
  greasRemoval, vmRemoval, feltingRisk,
  spaceRequired, orderInProcess, costPerKg, fleeceSteps,
} from "../fleece-prep-calc.js";

describe("timePerKgMinutes", () => {
  it("drying takes longest", () => {
    expect(timePerKgMinutes("drying")).toBeGreaterThan(
      timePerKgMinutes("storing")
    );
  });
});

describe("waterTempCelsius", () => {
  it("only washing uses hot water", () => {
    expect(waterTempCelsius("washing")).toBe(60);
    expect(waterTempCelsius("skirting")).toBe(0);
  });
});

describe("weightLossPercent", () => {
  it("washing loses most weight", () => {
    expect(weightLossPercent("washing")).toBeGreaterThan(
      weightLossPercent("storing")
    );
  });
});

describe("greasRemoval", () => {
  it("only washing removes grease", () => {
    expect(greasRemoval("washing")).toBe(10);
    expect(greasRemoval("picking")).toBe(0);
  });
});

describe("vmRemoval", () => {
  it("skirting removes most VM", () => {
    expect(vmRemoval("skirting")).toBeGreaterThan(
      vmRemoval("drying")
    );
  });
});

describe("feltingRisk", () => {
  it("washing has highest felting risk", () => {
    expect(feltingRisk("washing")).toBeGreaterThan(
      feltingRisk("skirting")
    );
  });
});

describe("spaceRequired", () => {
  it("drying needs most space", () => {
    expect(spaceRequired("drying")).toBeGreaterThan(
      spaceRequired("washing")
    );
  });
});

describe("orderInProcess", () => {
  it("skirting comes first", () => {
    expect(orderInProcess("skirting")).toBe(1);
  });
  it("storing comes last", () => {
    expect(orderInProcess("storing")).toBe(5);
  });
});

describe("costPerKg", () => {
  it("washing is most expensive step", () => {
    expect(costPerKg("washing")).toBeGreaterThan(
      costPerKg("skirting")
    );
  });
});

describe("fleeceSteps", () => {
  it("returns 5 steps", () => {
    expect(fleeceSteps()).toHaveLength(5);
  });
});
