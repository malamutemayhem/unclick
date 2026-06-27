import { describe, it, expect } from "vitest";
import {
  evapRate, energyEff, compactness, foulingResist,
  peCost, mechanicalVapor, forDairy, plateConfig,
  bestUse, plateEvaporatorTypes,
} from "../plate-evaporator-calc.js";

describe("evapRate", () => {
  it("falling film plate highest evap rate", () => {
    expect(evapRate("falling_film_plate")).toBeGreaterThan(evapRate("climbing_film_plate"));
  });
});

describe("energyEff", () => {
  it("mvr plate most energy efficient", () => {
    expect(energyEff("mvr_plate_evap")).toBeGreaterThan(energyEff("climbing_film_plate"));
  });
});

describe("compactness", () => {
  it("climbing film plate most compact", () => {
    expect(compactness("climbing_film_plate")).toBeGreaterThan(compactness("mvr_plate_evap"));
  });
});

describe("foulingResist", () => {
  it("flash plate best fouling resistance", () => {
    expect(foulingResist("flash_plate_evap")).toBeGreaterThan(foulingResist("climbing_film_plate"));
  });
});

describe("peCost", () => {
  it("mvr plate most expensive", () => {
    expect(peCost("mvr_plate_evap")).toBeGreaterThan(peCost("climbing_film_plate"));
  });
});

describe("mechanicalVapor", () => {
  it("mvr uses mechanical vapor", () => {
    expect(mechanicalVapor("mvr_plate_evap")).toBe(true);
  });
  it("falling film no mechanical vapor", () => {
    expect(mechanicalVapor("falling_film_plate")).toBe(false);
  });
});

describe("forDairy", () => {
  it("falling film for dairy", () => {
    expect(forDairy("falling_film_plate")).toBe(true);
  });
  it("flash plate not for dairy", () => {
    expect(forDairy("flash_plate_evap")).toBe(false);
  });
});

describe("plateConfig", () => {
  it("multi effect uses vapor cascade", () => {
    expect(plateConfig("multi_effect_plate")).toBe("series_plate_effects_vapor_cascade_condensate");
  });
});

describe("bestUse", () => {
  it("mvr for zero liquid discharge", () => {
    expect(bestUse("mvr_plate_evap")).toBe("zero_liquid_discharge_wastewater_high_eff_evap");
  });
});

describe("plateEvaporatorTypes", () => {
  it("returns 5 types", () => {
    expect(plateEvaporatorTypes()).toHaveLength(5);
  });
});
