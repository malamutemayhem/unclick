import { describe, it, expect } from "vitest";
import {
  capacity, hatchRate, uniformity, energyEfficiency,
  piCost, automated, forCommercial, control,
  bestUse, poultryIncubatorTypes,
} from "../poultry-incubator-calc.js";

describe("capacity", () => {
  it("single stage setter highest capacity", () => {
    expect(capacity("single_stage_setter")).toBeGreaterThan(capacity("benchtop_research"));
  });
});

describe("hatchRate", () => {
  it("single stage setter best hatch rate", () => {
    expect(hatchRate("single_stage_setter")).toBeGreaterThan(hatchRate("combined_setter_hatcher"));
  });
});

describe("uniformity", () => {
  it("single stage setter best uniformity", () => {
    expect(uniformity("single_stage_setter")).toBeGreaterThan(uniformity("multi_stage_setter"));
  });
});

describe("energyEfficiency", () => {
  it("multi stage setter most energy efficient", () => {
    expect(energyEfficiency("multi_stage_setter")).toBeGreaterThan(energyEfficiency("benchtop_research"));
  });
});

describe("piCost", () => {
  it("single stage setter most expensive", () => {
    expect(piCost("single_stage_setter")).toBeGreaterThan(piCost("benchtop_research"));
  });
});

describe("automated", () => {
  it("single stage setter is automated", () => {
    expect(automated("single_stage_setter")).toBe(true);
  });
  it("benchtop research not automated", () => {
    expect(automated("benchtop_research")).toBe(false);
  });
});

describe("forCommercial", () => {
  it("single stage setter for commercial", () => {
    expect(forCommercial("single_stage_setter")).toBe(true);
  });
  it("benchtop research not for commercial", () => {
    expect(forCommercial("benchtop_research")).toBe(false);
  });
});

describe("control", () => {
  it("benchtop research uses digital thermostat", () => {
    expect(control("benchtop_research")).toBe("benchtop_digital_thermostat_manual_turn_viewing_window");
  });
});

describe("bestUse", () => {
  it("combined setter hatcher for small farm specialty", () => {
    expect(bestUse("combined_setter_hatcher")).toBe("small_farm_specialty_breed_game_bird_waterfowl_mixed_hatch");
  });
});

describe("poultryIncubatorTypes", () => {
  it("returns 5 types", () => {
    expect(poultryIncubatorTypes()).toHaveLength(5);
  });
});
