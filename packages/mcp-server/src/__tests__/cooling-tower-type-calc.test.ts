import { describe, it, expect } from "vitest";
import {
  capacity, efficiency, noise, waterUse,
  ctCost, fan, forPower, airflow,
  bestUse, coolingTowerTypes,
} from "../cooling-tower-type-calc.js";

describe("capacity", () => {
  it("natural draft highest capacity", () => {
    expect(capacity("natural_draft_hyperbolic")).toBeGreaterThan(capacity("dry_cooler_fin_tube"));
  });
});

describe("efficiency", () => {
  it("induced draft most efficient", () => {
    expect(efficiency("mechanical_induced_draft")).toBeGreaterThan(efficiency("dry_cooler_fin_tube"));
  });
});

describe("noise", () => {
  it("natural draft quietest", () => {
    expect(noise("natural_draft_hyperbolic")).toBeGreaterThan(noise("mechanical_forced_draft"));
  });
});

describe("waterUse", () => {
  it("dry cooler least water use", () => {
    expect(waterUse("dry_cooler_fin_tube")).toBeGreaterThan(waterUse("crossflow_splash_fill"));
  });
});

describe("ctCost", () => {
  it("natural draft most expensive", () => {
    expect(ctCost("natural_draft_hyperbolic")).toBeGreaterThan(ctCost("crossflow_splash_fill"));
  });
});

describe("fan", () => {
  it("induced draft has fan", () => {
    expect(fan("mechanical_induced_draft")).toBe(true);
  });
  it("natural draft no fan", () => {
    expect(fan("natural_draft_hyperbolic")).toBe(false);
  });
});

describe("forPower", () => {
  it("natural draft for power", () => {
    expect(forPower("natural_draft_hyperbolic")).toBe(true);
  });
  it("induced draft not for power", () => {
    expect(forPower("mechanical_induced_draft")).toBe(false);
  });
});

describe("airflow", () => {
  it("dry cooler uses finned tube", () => {
    expect(airflow("dry_cooler_fin_tube")).toBe("air_over_finned_tube_no_evap");
  });
});

describe("bestUse", () => {
  it("natural draft for large power plant", () => {
    expect(bestUse("natural_draft_hyperbolic")).toBe("large_power_plant_nuclear_thermal");
  });
});

describe("coolingTowerTypes", () => {
  it("returns 5 types", () => {
    expect(coolingTowerTypes()).toHaveLength(5);
  });
});
