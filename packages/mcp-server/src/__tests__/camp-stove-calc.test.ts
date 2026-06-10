import { describe, it, expect } from "vitest";
import {
  boilTime, fuelEfficiency, windResistance, simmerControl,
  stoveCost, requiresCanister, airlineCarryOn, fuelSource,
  bestTrip, campStoves,
} from "../camp-stove-calc.js";

describe("boilTime", () => {
  it("canister top fastest boil", () => {
    expect(boilTime("canister_top")).toBeGreaterThan(boilTime("solid_fuel_tab"));
  });
});

describe("fuelEfficiency", () => {
  it("wood burning most efficient", () => {
    expect(fuelEfficiency("wood_burning")).toBeGreaterThan(fuelEfficiency("solid_fuel_tab"));
  });
});

describe("windResistance", () => {
  it("liquid fuel best wind resistance", () => {
    expect(windResistance("liquid_fuel")).toBeGreaterThan(windResistance("alcohol_burner"));
  });
});

describe("simmerControl", () => {
  it("canister top best simmer control", () => {
    expect(simmerControl("canister_top")).toBeGreaterThan(simmerControl("solid_fuel_tab"));
  });
});

describe("stoveCost", () => {
  it("liquid fuel most expensive", () => {
    expect(stoveCost("liquid_fuel")).toBeGreaterThan(stoveCost("solid_fuel_tab"));
  });
});

describe("requiresCanister", () => {
  it("canister top requires canister", () => {
    expect(requiresCanister("canister_top")).toBe(true);
  });
  it("wood burning does not", () => {
    expect(requiresCanister("wood_burning")).toBe(false);
  });
});

describe("airlineCarryOn", () => {
  it("wood burning is airline safe", () => {
    expect(airlineCarryOn("wood_burning")).toBe(true);
  });
  it("canister top is not", () => {
    expect(airlineCarryOn("canister_top")).toBe(false);
  });
});

describe("fuelSource", () => {
  it("wood burning uses twigs leaves biomass free", () => {
    expect(fuelSource("wood_burning")).toBe("twigs_leaves_biomass_free");
  });
});

describe("bestTrip", () => {
  it("liquid fuel for expedition cold altitude", () => {
    expect(bestTrip("liquid_fuel")).toBe("expedition_cold_altitude");
  });
});

describe("campStoves", () => {
  it("returns 5 types", () => {
    expect(campStoves()).toHaveLength(5);
  });
});
