import { describe, it, expect } from "vitest";
import {
  tunnelLengthKm, shaftDepthMeters, flowRateLitersPerSec,
  constructionYears, maintenanceCycleMonths, siltRisk,
  gravityFed, hectaresIrrigated, lifespanCenturies, qanatRegions,
} from "../qanat-calc.js";

describe("tunnelLengthKm", () => {
  it("iran has longest tunnels", () => {
    expect(tunnelLengthKm("iran")).toBeGreaterThan(
      tunnelLengthKm("morocco")
    );
  });
});

describe("shaftDepthMeters", () => {
  it("iran has deepest shafts", () => {
    expect(shaftDepthMeters("iran")).toBeGreaterThan(
      shaftDepthMeters("oman")
    );
  });
});

describe("flowRateLitersPerSec", () => {
  it("iran has highest flow", () => {
    expect(flowRateLitersPerSec("iran")).toBeGreaterThan(
      flowRateLitersPerSec("morocco")
    );
  });
});

describe("constructionYears", () => {
  it("iran takes longest to build", () => {
    expect(constructionYears("iran")).toBeGreaterThan(
      constructionYears("morocco")
    );
  });
});

describe("maintenanceCycleMonths", () => {
  it("iran has longest maintenance cycle", () => {
    expect(maintenanceCycleMonths("iran")).toBeGreaterThan(
      maintenanceCycleMonths("morocco")
    );
  });
});

describe("siltRisk", () => {
  it("afghanistan has highest silt risk", () => {
    expect(siltRisk("afghanistan")).toBeGreaterThan(
      siltRisk("china")
    );
  });
});

describe("gravityFed", () => {
  it("all qanats are gravity fed", () => {
    expect(gravityFed("iran")).toBe(true);
    expect(gravityFed("oman")).toBe(true);
  });
});

describe("hectaresIrrigated", () => {
  it("iran irrigates most", () => {
    expect(hectaresIrrigated("iran")).toBeGreaterThan(
      hectaresIrrigated("oman")
    );
  });
});

describe("lifespanCenturies", () => {
  it("iran lasts longest", () => {
    expect(lifespanCenturies("iran")).toBeGreaterThan(
      lifespanCenturies("morocco")
    );
  });
});

describe("qanatRegions", () => {
  it("returns 5 regions", () => {
    expect(qanatRegions()).toHaveLength(5);
  });
});
