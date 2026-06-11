import { describe, it, expect } from "vitest";
import {
  capacity, efficiency, precision, density,
  pcCost, waterCooled, forHighDensity, airPath,
  bestUse, precisionCoolTypes,
} from "../precision-cool-calc.js";

describe("capacity", () => {
  it("crah highest capacity", () => {
    expect(capacity("chilled_water_crah")).toBeGreaterThan(capacity("downflow_perimeter_crac"));
  });
});

describe("efficiency", () => {
  it("rear door most efficient", () => {
    expect(efficiency("rear_door_heat_exchanger")).toBeGreaterThan(efficiency("downflow_perimeter_crac"));
  });
});

describe("precision", () => {
  it("inrow most precise", () => {
    expect(precision("inrow_close_coupled")).toBeGreaterThan(precision("downflow_perimeter_crac"));
  });
});

describe("density", () => {
  it("rear door best density", () => {
    expect(density("rear_door_heat_exchanger")).toBeGreaterThan(density("downflow_perimeter_crac"));
  });
});

describe("pcCost", () => {
  it("rear door most expensive", () => {
    expect(pcCost("rear_door_heat_exchanger")).toBeGreaterThan(pcCost("downflow_perimeter_crac"));
  });
});

describe("waterCooled", () => {
  it("inrow is water cooled", () => {
    expect(waterCooled("inrow_close_coupled")).toBe(true);
  });
  it("downflow not water cooled", () => {
    expect(waterCooled("downflow_perimeter_crac")).toBe(false);
  });
});

describe("forHighDensity", () => {
  it("inrow for high density", () => {
    expect(forHighDensity("inrow_close_coupled")).toBe(true);
  });
  it("crah not high density", () => {
    expect(forHighDensity("chilled_water_crah")).toBe(false);
  });
});

describe("airPath", () => {
  it("rear door uses passive chilled water", () => {
    expect(airPath("rear_door_heat_exchanger")).toBe("passive_rear_door_chilled_water");
  });
});

describe("bestUse", () => {
  it("inrow for containment", () => {
    expect(bestUse("inrow_close_coupled")).toBe("high_density_rack_containment");
  });
});

describe("precisionCoolTypes", () => {
  it("returns 5 types", () => {
    expect(precisionCoolTypes()).toHaveLength(5);
  });
});
