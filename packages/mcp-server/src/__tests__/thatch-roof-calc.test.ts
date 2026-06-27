import { describe, it, expect } from "vitest";
import {
  lifespanYears, thicknessCm, rValuePerCm,
  fireResistance, windResistance, ridgeTypeRecommended,
  installDaysPerSquare, maintenanceCycleYears, costPerM2, thatchMaterials,
} from "../thatch-roof-calc.js";

describe("lifespanYears", () => {
  it("water reed lasts longest", () => {
    expect(lifespanYears("water_reed")).toBeGreaterThan(
      lifespanYears("palm_leaf")
    );
  });
});

describe("thicknessCm", () => {
  it("long straw is thickest", () => {
    expect(thicknessCm("long_straw")).toBeGreaterThan(
      thicknessCm("palm_leaf")
    );
  });
});

describe("rValuePerCm", () => {
  it("long straw insulates best", () => {
    expect(rValuePerCm("long_straw")).toBeGreaterThan(
      rValuePerCm("palm_leaf")
    );
  });
});

describe("fireResistance", () => {
  it("heather resists fire best", () => {
    expect(fireResistance("heather")).toBeGreaterThan(
      fireResistance("palm_leaf")
    );
  });
});

describe("windResistance", () => {
  it("heather resists wind best", () => {
    expect(windResistance("heather")).toBeGreaterThan(
      windResistance("long_straw")
    );
  });
});

describe("ridgeTypeRecommended", () => {
  it("long straw uses wrap over", () => {
    expect(ridgeTypeRecommended("long_straw")).toBe("wrap_over");
  });
});

describe("installDaysPerSquare", () => {
  it("heather takes longest to install", () => {
    expect(installDaysPerSquare("heather")).toBeGreaterThan(
      installDaysPerSquare("palm_leaf")
    );
  });
});

describe("maintenanceCycleYears", () => {
  it("water reed needs least maintenance", () => {
    expect(maintenanceCycleYears("water_reed")).toBeGreaterThan(
      maintenanceCycleYears("palm_leaf")
    );
  });
});

describe("costPerM2", () => {
  it("heather is most expensive", () => {
    expect(costPerM2("heather")).toBeGreaterThan(
      costPerM2("palm_leaf")
    );
  });
});

describe("thatchMaterials", () => {
  it("returns 5 materials", () => {
    expect(thatchMaterials()).toHaveLength(5);
  });
});
