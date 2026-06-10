import { describe, it, expect } from "vitest";
import {
  thicknessCm, weightKgPerM2, insulationRValue,
  moistureRisk, replacementCycleYears, installLaborHours,
  toolsRequired, settlingPercent, costEstimate, sodComponents,
} from "../sod-house-calc.js";

describe("thicknessCm", () => {
  it("wall sod is thickest", () => {
    expect(thicknessCm("wall_sod")).toBeGreaterThan(
      thicknessCm("roof_sod")
    );
  });
});

describe("weightKgPerM2", () => {
  it("wall sod is heaviest", () => {
    expect(weightKgPerM2("wall_sod")).toBeGreaterThan(
      weightKgPerM2("roof_sod")
    );
  });
});

describe("insulationRValue", () => {
  it("wall sod insulates best", () => {
    expect(insulationRValue("wall_sod")).toBeGreaterThan(
      insulationRValue("roof_sod")
    );
  });
});

describe("moistureRisk", () => {
  it("roof sod has highest moisture risk", () => {
    expect(moistureRisk("roof_sod")).toBeGreaterThan(
      moistureRisk("door_frame")
    );
  });
});

describe("replacementCycleYears", () => {
  it("foundation lasts longest", () => {
    expect(replacementCycleYears("foundation")).toBeGreaterThan(
      replacementCycleYears("roof_sod")
    );
  });
});

describe("installLaborHours", () => {
  it("wall sod takes most labor", () => {
    expect(installLaborHours("wall_sod")).toBeGreaterThan(
      installLaborHours("roof_sod")
    );
  });
});

describe("toolsRequired", () => {
  it("wall sod needs breaking plow", () => {
    expect(toolsRequired("wall_sod")).toBe("breaking_plow");
  });
});

describe("settlingPercent", () => {
  it("wall sod settles most", () => {
    expect(settlingPercent("wall_sod")).toBeGreaterThan(
      settlingPercent("ridge_pole")
    );
  });
});

describe("costEstimate", () => {
  it("ridge pole is most expensive", () => {
    expect(costEstimate("ridge_pole")).toBeGreaterThan(
      costEstimate("wall_sod")
    );
  });
});

describe("sodComponents", () => {
  it("returns 5 components", () => {
    expect(sodComponents()).toHaveLength(5);
  });
});
