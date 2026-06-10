import { describe, it, expect } from "vitest";
import {
  maxTempCelsius, heatRetentionHours, preheatTimeMinutes,
  wallThicknessCm, cookingCapacity, portability,
  buildTimedays, bestForFood, costEstimate, clayOvenTypes,
} from "../clay-oven-calc.js";

describe("maxTempCelsius", () => {
  it("brick oven is hottest", () => {
    expect(maxTempCelsius("brick_oven")).toBeGreaterThan(
      maxTempCelsius("taboon")
    );
  });
});

describe("heatRetentionHours", () => {
  it("brick oven retains heat longest", () => {
    expect(heatRetentionHours("brick_oven")).toBeGreaterThan(
      heatRetentionHours("taboon")
    );
  });
});

describe("preheatTimeMinutes", () => {
  it("brick oven preheats slowest", () => {
    expect(preheatTimeMinutes("brick_oven")).toBeGreaterThan(
      preheatTimeMinutes("taboon")
    );
  });
});

describe("wallThicknessCm", () => {
  it("brick oven has thickest walls", () => {
    expect(wallThicknessCm("brick_oven")).toBeGreaterThan(
      wallThicknessCm("tandoori")
    );
  });
});

describe("cookingCapacity", () => {
  it("brick oven has most capacity", () => {
    expect(cookingCapacity("brick_oven")).toBeGreaterThan(
      cookingCapacity("taboon")
    );
  });
});

describe("portability", () => {
  it("taboon is portable", () => {
    expect(portability("taboon")).toBe(true);
  });
  it("brick oven is not", () => {
    expect(portability("brick_oven")).toBe(false);
  });
});

describe("buildTimedays", () => {
  it("brick oven takes longest to build", () => {
    expect(buildTimedays("brick_oven")).toBeGreaterThan(
      buildTimedays("taboon")
    );
  });
});

describe("bestForFood", () => {
  it("brick oven is best for pizza", () => {
    expect(bestForFood("brick_oven")).toBe("pizza");
  });
});

describe("costEstimate", () => {
  it("brick oven is most expensive", () => {
    expect(costEstimate("brick_oven")).toBeGreaterThan(
      costEstimate("taboon")
    );
  });
});

describe("clayOvenTypes", () => {
  it("returns 5 types", () => {
    expect(clayOvenTypes()).toHaveLength(5);
  });
});
