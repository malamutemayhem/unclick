import { describe, it, expect } from "vitest";
import {
  dryingRate, heatSensitivity, solventRecovery, mixQuality,
  vdCost, agitated, forSolvent, vessel,
  bestUse, vacuumDryerTypes,
} from "../vacuum-dryer-calc.js";

describe("dryingRate", () => {
  it("microwave vacuum fastest drying", () => {
    expect(dryingRate("microwave_vacuum_hybrid")).toBeGreaterThan(dryingRate("shelf_tray_vacuum"));
  });
});

describe("heatSensitivity", () => {
  it("shelf tray best heat sensitivity", () => {
    expect(heatSensitivity("shelf_tray_vacuum")).toBeGreaterThan(heatSensitivity("paddle_agitated_vacuum"));
  });
});

describe("solventRecovery", () => {
  it("conical tumble excellent solvent recovery", () => {
    expect(solventRecovery("conical_tumble_vacuum")).toBeGreaterThan(solventRecovery("shelf_tray_vacuum"));
  });
});

describe("mixQuality", () => {
  it("paddle agitated best mix quality", () => {
    expect(mixQuality("paddle_agitated_vacuum")).toBeGreaterThan(mixQuality("shelf_tray_vacuum"));
  });
});

describe("vdCost", () => {
  it("microwave most expensive", () => {
    expect(vdCost("microwave_vacuum_hybrid")).toBeGreaterThan(vdCost("shelf_tray_vacuum"));
  });
});

describe("agitated", () => {
  it("conical tumble is agitated", () => {
    expect(agitated("conical_tumble_vacuum")).toBe(true);
  });
  it("shelf tray not agitated", () => {
    expect(agitated("shelf_tray_vacuum")).toBe(false);
  });
});

describe("forSolvent", () => {
  it("paddle agitated for solvent", () => {
    expect(forSolvent("paddle_agitated_vacuum")).toBe(true);
  });
  it("shelf tray not for solvent", () => {
    expect(forSolvent("shelf_tray_vacuum")).toBe(false);
  });
});

describe("vessel", () => {
  it("belt vacuum uses continuous conveyor", () => {
    expect(vessel("belt_vacuum_continuous")).toBe("continuous_belt_conveyor_vacuum_chamber_multi");
  });
});

describe("bestUse", () => {
  it("microwave for high value pharma", () => {
    expect(bestUse("microwave_vacuum_hybrid")).toBe("high_value_pharma_botanical_rapid_uniform_dry");
  });
});

describe("vacuumDryerTypes", () => {
  it("returns 5 types", () => {
    expect(vacuumDryerTypes()).toHaveLength(5);
  });
});
