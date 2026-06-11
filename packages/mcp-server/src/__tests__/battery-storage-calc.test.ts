import { describe, it, expect } from "vitest";
import {
  capacity, cycles, efficiency, safety,
  bsCost, scalable, forResidential, chemistry,
  bestUse, batteryStorageTypes,
} from "../battery-storage-calc.js";

describe("capacity", () => {
  it("flow highest capacity", () => {
    expect(capacity("flow_vanadium_redox")).toBeGreaterThan(capacity("lead_acid_flooded"));
  });
});

describe("cycles", () => {
  it("lfp most cycles", () => {
    expect(cycles("lithium_iron_phosphate")).toBeGreaterThan(cycles("lead_acid_flooded"));
  });
});

describe("efficiency", () => {
  it("lithium ion high efficiency", () => {
    expect(efficiency("lithium_ion_wall_mount")).toBeGreaterThan(efficiency("lead_acid_flooded"));
  });
});

describe("safety", () => {
  it("lfp safest", () => {
    expect(safety("lithium_iron_phosphate")).toBeGreaterThan(safety("lead_acid_flooded"));
  });
});

describe("bsCost", () => {
  it("flow most expensive", () => {
    expect(bsCost("flow_vanadium_redox")).toBeGreaterThan(bsCost("lead_acid_flooded"));
  });
});

describe("scalable", () => {
  it("flow is scalable", () => {
    expect(scalable("flow_vanadium_redox")).toBe(true);
  });
  it("wall mount not scalable", () => {
    expect(scalable("lithium_ion_wall_mount")).toBe(false);
  });
});

describe("forResidential", () => {
  it("wall mount for residential", () => {
    expect(forResidential("lithium_ion_wall_mount")).toBe(true);
  });
  it("flow not residential", () => {
    expect(forResidential("flow_vanadium_redox")).toBe(false);
  });
});

describe("chemistry", () => {
  it("sodium ion uses prussian blue", () => {
    expect(chemistry("sodium_ion_grid_scale")).toBe("sodium_ion_prussian_blue");
  });
});

describe("bestUse", () => {
  it("lead acid for budget backup", () => {
    expect(bestUse("lead_acid_flooded")).toBe("off_grid_budget_backup");
  });
});

describe("batteryStorageTypes", () => {
  it("returns 5 types", () => {
    expect(batteryStorageTypes()).toHaveLength(5);
  });
});
