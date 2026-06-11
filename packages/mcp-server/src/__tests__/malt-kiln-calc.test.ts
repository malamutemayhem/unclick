import { describe, it, expect } from "vitest";
import {
  dryingEfficiency, airflowRate, temperatureControl, maltQuality,
  mkCost, recirculating, forSpecialty, kilnConfig,
  bestUse, maltKilnTypes,
} from "../malt-kiln-calc.js";

describe("dryingEfficiency", () => {
  it("continuous belt and energy recovery best drying efficiency", () => {
    expect(dryingEfficiency("continuous_belt")).toBeGreaterThan(dryingEfficiency("single_deck_direct"));
    expect(dryingEfficiency("energy_recovery")).toBeGreaterThan(dryingEfficiency("single_deck_direct"));
  });
});

describe("airflowRate", () => {
  it("continuous belt highest airflow rate", () => {
    expect(airflowRate("continuous_belt")).toBeGreaterThan(airflowRate("single_deck_direct"));
  });
});

describe("temperatureControl", () => {
  it("circular turret and energy recovery best temperature control", () => {
    expect(temperatureControl("circular_turret")).toBeGreaterThan(temperatureControl("single_deck_direct"));
  });
});

describe("maltQuality", () => {
  it("circular turret best malt quality", () => {
    expect(maltQuality("circular_turret")).toBeGreaterThan(maltQuality("single_deck_direct"));
  });
});

describe("mkCost", () => {
  it("energy recovery most expensive", () => {
    expect(mkCost("energy_recovery")).toBeGreaterThan(mkCost("single_deck_direct"));
  });
});

describe("recirculating", () => {
  it("double deck indirect is recirculating", () => {
    expect(recirculating("double_deck_indirect")).toBe(true);
  });
  it("single deck direct not recirculating", () => {
    expect(recirculating("single_deck_direct")).toBe(false);
  });
});

describe("forSpecialty", () => {
  it("circular turret for specialty malt", () => {
    expect(forSpecialty("circular_turret")).toBe(true);
  });
  it("double deck indirect not for specialty", () => {
    expect(forSpecialty("double_deck_indirect")).toBe(false);
  });
});

describe("kilnConfig", () => {
  it("energy recovery uses heat pump recovery", () => {
    expect(kilnConfig("energy_recovery")).toBe("heat_pump_recovery_condenser_reuse_exhaust_energy_green_kiln");
  });
});

describe("bestUse", () => {
  it("continuous belt for large industrial maltster", () => {
    expect(bestUse("continuous_belt")).toBe("large_industrial_maltster_high_volume_base_malt_continuous_run");
  });
});

describe("maltKilnTypes", () => {
  it("returns 5 types", () => {
    expect(maltKilnTypes()).toHaveLength(5);
  });
});
