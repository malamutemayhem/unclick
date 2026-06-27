import { describe, it, expect } from "vitest";
import {
  juiceYieldPercent, pressureCapacity, batchSizeLiters,
  operatorStrength, cleanupMinutes, portability,
  clarityResult, bestFruit, costEstimate, pressTypes,
} from "../cider-press-calc.js";

describe("juiceYieldPercent", () => {
  it("hydraulic yields most juice", () => {
    expect(juiceYieldPercent("hydraulic")).toBeGreaterThan(
      juiceYieldPercent("basket")
    );
  });
});

describe("pressureCapacity", () => {
  it("hydraulic has most pressure", () => {
    expect(pressureCapacity("hydraulic")).toBeGreaterThan(
      pressureCapacity("basket")
    );
  });
});

describe("batchSizeLiters", () => {
  it("hydraulic handles largest batch", () => {
    expect(batchSizeLiters("hydraulic")).toBeGreaterThan(
      batchSizeLiters("basket")
    );
  });
});

describe("operatorStrength", () => {
  it("screw needs most strength", () => {
    expect(operatorStrength("screw")).toBeGreaterThan(
      operatorStrength("hydraulic")
    );
  });
});

describe("cleanupMinutes", () => {
  it("rack cloth takes longest to clean", () => {
    expect(cleanupMinutes("rack_cloth")).toBeGreaterThan(
      cleanupMinutes("screw")
    );
  });
});

describe("portability", () => {
  it("basket is most portable", () => {
    expect(portability("basket")).toBeGreaterThan(
      portability("hydraulic")
    );
  });
});

describe("clarityResult", () => {
  it("hydraulic produces clearest juice", () => {
    expect(clarityResult("hydraulic")).toBeGreaterThan(
      clarityResult("screw")
    );
  });
});

describe("bestFruit", () => {
  it("bladder press is best for grapes", () => {
    expect(bestFruit("bladder")).toBe("grapes");
  });
});

describe("costEstimate", () => {
  it("hydraulic costs most", () => {
    expect(costEstimate("hydraulic")).toBeGreaterThan(
      costEstimate("basket")
    );
  });
});

describe("pressTypes", () => {
  it("returns 5 types", () => {
    expect(pressTypes()).toHaveLength(5);
  });
});
