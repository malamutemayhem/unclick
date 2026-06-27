import { describe, it, expect } from "vitest";
import {
  tensionConsistency, setupTimeMinutes, adjustability,
  maxWarpLengthMeters, fineThreadSuitable, portability,
  historicalSystem, bestWeaveType, costEstimate, warpTensionSystems,
} from "../warp-tension-calc.js";

describe("tensionConsistency", () => {
  it("sectional is most consistent", () => {
    expect(tensionConsistency("sectional")).toBeGreaterThan(
      tensionConsistency("warp_weighted")
    );
  });
});

describe("setupTimeMinutes", () => {
  it("warp weighted takes longest setup", () => {
    expect(setupTimeMinutes("warp_weighted")).toBeGreaterThan(
      setupTimeMinutes("weighted")
    );
  });
});

describe("adjustability", () => {
  it("weighted is most adjustable", () => {
    expect(adjustability("weighted")).toBeGreaterThan(
      adjustability("warp_weighted")
    );
  });
});

describe("maxWarpLengthMeters", () => {
  it("sectional handles longest warp", () => {
    expect(maxWarpLengthMeters("sectional")).toBeGreaterThan(
      maxWarpLengthMeters("back_beam")
    );
  });
});

describe("fineThreadSuitable", () => {
  it("sectional best for fine threads", () => {
    expect(fineThreadSuitable("sectional")).toBeGreaterThan(
      fineThreadSuitable("warp_weighted")
    );
  });
});

describe("portability", () => {
  it("weighted is portable", () => {
    expect(portability("weighted")).toBe(true);
  });
  it("back beam is not", () => {
    expect(portability("back_beam")).toBe(false);
  });
});

describe("historicalSystem", () => {
  it("warp weighted is historical", () => {
    expect(historicalSystem("warp_weighted")).toBe(true);
  });
  it("sectional is not", () => {
    expect(historicalSystem("sectional")).toBe(false);
  });
});

describe("bestWeaveType", () => {
  it("sectional best for complex patterns", () => {
    expect(bestWeaveType("sectional")).toBe("complex_pattern");
  });
});

describe("costEstimate", () => {
  it("sectional costs most", () => {
    expect(costEstimate("sectional")).toBeGreaterThan(
      costEstimate("weighted")
    );
  });
});

describe("warpTensionSystems", () => {
  it("returns 5 systems", () => {
    expect(warpTensionSystems()).toHaveLength(5);
  });
});
