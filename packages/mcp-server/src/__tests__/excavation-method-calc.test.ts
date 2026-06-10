import { describe, it, expect } from "vitest";
import {
  depthCapabilityM, speedMPerDay, surfaceDisruption,
  costPerMeter, vibrationLevel, requiresDewatering,
  undergroundOnly, bestSoilType, typicalProject, excavationMethods,
} from "../excavation-method-calc.js";

describe("depthCapabilityM", () => {
  it("drill_and_blast deepest", () => {
    expect(depthCapabilityM("drill_and_blast")).toBeGreaterThan(
      depthCapabilityM("open_cut")
    );
  });
});

describe("speedMPerDay", () => {
  it("open_cut fastest", () => {
    expect(speedMPerDay("open_cut")).toBeGreaterThan(
      speedMPerDay("cut_and_cover")
    );
  });
});

describe("surfaceDisruption", () => {
  it("open_cut most disruptive", () => {
    expect(surfaceDisruption("open_cut")).toBeGreaterThan(
      surfaceDisruption("tbm")
    );
  });
});

describe("costPerMeter", () => {
  it("tbm most expensive", () => {
    expect(costPerMeter("tbm")).toBeGreaterThan(
      costPerMeter("open_cut")
    );
  });
});

describe("vibrationLevel", () => {
  it("drill_and_blast most vibration", () => {
    expect(vibrationLevel("drill_and_blast")).toBeGreaterThan(
      vibrationLevel("tbm")
    );
  });
});

describe("requiresDewatering", () => {
  it("open_cut requires dewatering", () => {
    expect(requiresDewatering("open_cut")).toBe(true);
  });
  it("tbm does not", () => {
    expect(requiresDewatering("tbm")).toBe(false);
  });
});

describe("undergroundOnly", () => {
  it("tbm is underground only", () => {
    expect(undergroundOnly("tbm")).toBe(true);
  });
  it("open_cut is not", () => {
    expect(undergroundOnly("open_cut")).toBe(false);
  });
});

describe("bestSoilType", () => {
  it("drill_and_blast for hard rock", () => {
    expect(bestSoilType("drill_and_blast")).toBe("hard_rock");
  });
});

describe("typicalProject", () => {
  it("tbm for rail tunnel", () => {
    expect(typicalProject("tbm")).toBe("rail_tunnel");
  });
});

describe("excavationMethods", () => {
  it("returns 5 methods", () => {
    expect(excavationMethods()).toHaveLength(5);
  });
});
