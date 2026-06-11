import { describe, it, expect } from "vitest";
import {
  dryingUniformity, throughput, energyEfficiency, dryingSpeed,
  ldCost, lowTemp, forHardwood, dryerConfig,
  bestUse, lumberDryerTypes,
} from "../lumber-dryer-calc.js";

describe("dryingUniformity", () => {
  it("radio frequency best drying uniformity", () => {
    expect(dryingUniformity("radio_frequency")).toBeGreaterThan(dryingUniformity("solar_kiln"));
  });
});

describe("throughput", () => {
  it("conventional kiln highest throughput", () => {
    expect(throughput("conventional_kiln")).toBeGreaterThan(throughput("solar_kiln"));
  });
});

describe("energyEfficiency", () => {
  it("solar kiln best energy efficiency", () => {
    expect(energyEfficiency("solar_kiln")).toBeGreaterThan(energyEfficiency("conventional_kiln"));
  });
});

describe("dryingSpeed", () => {
  it("vacuum kiln fastest drying", () => {
    expect(dryingSpeed("vacuum_kiln")).toBeGreaterThan(dryingSpeed("solar_kiln"));
  });
});

describe("ldCost", () => {
  it("radio frequency most expensive", () => {
    expect(ldCost("radio_frequency")).toBeGreaterThan(ldCost("solar_kiln"));
  });
});

describe("lowTemp", () => {
  it("dehumidification is low temp", () => {
    expect(lowTemp("dehumidification")).toBe(true);
  });
  it("conventional kiln not low temp", () => {
    expect(lowTemp("conventional_kiln")).toBe(false);
  });
});

describe("forHardwood", () => {
  it("vacuum kiln for hardwood", () => {
    expect(forHardwood("vacuum_kiln")).toBe(true);
  });
  it("all types for hardwood", () => {
    expect(forHardwood("solar_kiln")).toBe(true);
  });
});

describe("dryerConfig", () => {
  it("vacuum kiln uses low pressure boil water fast gentle", () => {
    expect(dryerConfig("vacuum_kiln")).toBe("vacuum_kiln_lumber_dryer_low_pressure_boil_water_fast_gentle");
  });
});

describe("bestUse", () => {
  it("dehumidification for small mill energy efficient gentle dry", () => {
    expect(bestUse("dehumidification")).toBe("small_mill_dehumidification_dryer_energy_efficient_gentle_dry");
  });
});

describe("lumberDryerTypes", () => {
  it("returns 5 types", () => {
    expect(lumberDryerTypes()).toHaveLength(5);
  });
});
