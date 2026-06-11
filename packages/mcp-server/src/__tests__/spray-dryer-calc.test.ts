import { describe, it, expect } from "vitest";
import {
  evapRate, particleControl, heatEfficiency, scalability,
  sdCost, agglomerate, forHeatSens, atomizer,
  bestUse, sprayDryerTypes,
} from "../spray-dryer-calc.js";

describe("evapRate", () => {
  it("counter current highest evap rate", () => {
    expect(evapRate("counter_current_tower")).toBeGreaterThan(evapRate("closed_cycle_solvent"));
  });
});

describe("particleControl", () => {
  it("fluidized spray best particle control", () => {
    expect(particleControl("fluidized_spray_agglom")).toBeGreaterThan(particleControl("counter_current_tower"));
  });
});

describe("heatEfficiency", () => {
  it("counter current best heat efficiency", () => {
    expect(heatEfficiency("counter_current_tower")).toBeGreaterThan(heatEfficiency("closed_cycle_solvent"));
  });
});

describe("scalability", () => {
  it("co current most scalable", () => {
    expect(scalability("co_current_nozzle")).toBeGreaterThan(scalability("closed_cycle_solvent"));
  });
});

describe("sdCost", () => {
  it("closed cycle most expensive", () => {
    expect(sdCost("closed_cycle_solvent")).toBeGreaterThan(sdCost("co_current_nozzle"));
  });
});

describe("agglomerate", () => {
  it("fluidized spray agglomerates", () => {
    expect(agglomerate("fluidized_spray_agglom")).toBe(true);
  });
  it("co current does not agglomerate", () => {
    expect(agglomerate("co_current_nozzle")).toBe(false);
  });
});

describe("forHeatSens", () => {
  it("co current for heat sensitive", () => {
    expect(forHeatSens("co_current_nozzle")).toBe(true);
  });
  it("counter current not for heat sensitive", () => {
    expect(forHeatSens("counter_current_tower")).toBe(false);
  });
});

describe("atomizer", () => {
  it("closed cycle uses inert gas", () => {
    expect(atomizer("closed_cycle_solvent")).toBe("inert_gas_closed_loop_solvent_recovery");
  });
});

describe("bestUse", () => {
  it("co current for milk powder coffee", () => {
    expect(bestUse("co_current_nozzle")).toBe("milk_powder_coffee_instant_food_pharma");
  });
});

describe("sprayDryerTypes", () => {
  it("returns 5 types", () => {
    expect(sprayDryerTypes()).toHaveLength(5);
  });
});
