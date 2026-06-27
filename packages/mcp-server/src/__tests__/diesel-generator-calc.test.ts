import { describe, it, expect } from "vitest";
import {
  powerOutput, fuelEfficiency, reliability, startupSpeed,
  dgCost, portable, forCriticalPower, engine,
  bestUse, dieselGeneratorTypes,
} from "../diesel-generator-calc.js";

describe("powerOutput", () => {
  it("prime power continuous highest output", () => {
    expect(powerOutput("prime_power_continuous")).toBeGreaterThan(powerOutput("portable_towable_gen"));
  });
});

describe("fuelEfficiency", () => {
  it("prime power most fuel efficient", () => {
    expect(fuelEfficiency("prime_power_continuous")).toBeGreaterThan(fuelEfficiency("portable_towable_gen"));
  });
});

describe("reliability", () => {
  it("standby emergency most reliable", () => {
    expect(reliability("standby_emergency_gen")).toBeGreaterThan(reliability("portable_towable_gen"));
  });
});

describe("startupSpeed", () => {
  it("standby emergency fastest startup", () => {
    expect(startupSpeed("standby_emergency_gen")).toBeGreaterThan(startupSpeed("prime_power_continuous"));
  });
});

describe("dgCost", () => {
  it("marine propulsion most expensive", () => {
    expect(dgCost("marine_propulsion_gen")).toBeGreaterThan(dgCost("portable_towable_gen"));
  });
});

describe("portable", () => {
  it("portable towable is portable", () => {
    expect(portable("portable_towable_gen")).toBe(true);
  });
  it("standby emergency not portable", () => {
    expect(portable("standby_emergency_gen")).toBe(false);
  });
});

describe("forCriticalPower", () => {
  it("standby emergency for critical power", () => {
    expect(forCriticalPower("standby_emergency_gen")).toBe(true);
  });
  it("portable towable not for critical power", () => {
    expect(forCriticalPower("portable_towable_gen")).toBe(false);
  });
});

describe("engine", () => {
  it("containerized uses iso container", () => {
    expect(engine("containerized_gen_set")).toBe("iso_container_integrated_fuel_tank_switchgear_control");
  });
});

describe("bestUse", () => {
  it("marine propulsion for ship vessel", () => {
    expect(bestUse("marine_propulsion_gen")).toBe("ship_vessel_offshore_platform_marine_power_supply");
  });
});

describe("dieselGeneratorTypes", () => {
  it("returns 5 types", () => {
    expect(dieselGeneratorTypes()).toHaveLength(5);
  });
});
