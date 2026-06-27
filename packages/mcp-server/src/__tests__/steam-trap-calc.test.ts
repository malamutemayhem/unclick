import { describe, it, expect } from "vitest";
import {
  capacity, airVent, durability, energyLoss,
  stCost, modulating, forProcess, mechanism,
  bestUse, steamTrapTypes,
} from "../steam-trap-calc.js";

describe("capacity", () => {
  it("float bucket highest capacity", () => {
    expect(capacity("mechanical_float_bucket")).toBeGreaterThan(capacity("thermostatic_bellows_bimetal"));
  });
});

describe("airVent", () => {
  it("thermostatic best air vent", () => {
    expect(airVent("thermostatic_bellows_bimetal")).toBeGreaterThan(airVent("venturi_orifice_fixed"));
  });
});

describe("durability", () => {
  it("venturi most durable", () => {
    expect(durability("venturi_orifice_fixed")).toBeGreaterThan(durability("thermostatic_bellows_bimetal"));
  });
});

describe("energyLoss", () => {
  it("float bucket lowest energy loss", () => {
    expect(energyLoss("mechanical_float_bucket")).toBeGreaterThan(energyLoss("thermodynamic_disc_impulse"));
  });
});

describe("stCost", () => {
  it("float bucket most expensive", () => {
    expect(stCost("mechanical_float_bucket")).toBeGreaterThan(stCost("venturi_orifice_fixed"));
  });
});

describe("modulating", () => {
  it("float bucket is modulating", () => {
    expect(modulating("mechanical_float_bucket")).toBe(true);
  });
  it("thermodynamic not modulating", () => {
    expect(modulating("thermodynamic_disc_impulse")).toBe(false);
  });
});

describe("forProcess", () => {
  it("float bucket for process", () => {
    expect(forProcess("mechanical_float_bucket")).toBe(true);
  });
  it("thermodynamic not for process", () => {
    expect(forProcess("thermodynamic_disc_impulse")).toBe(false);
  });
});

describe("mechanism", () => {
  it("venturi uses fixed orifice", () => {
    expect(mechanism("venturi_orifice_fixed")).toBe("fixed_orifice_continuous_bleed");
  });
});

describe("bestUse", () => {
  it("float bucket for heat exchanger", () => {
    expect(bestUse("mechanical_float_bucket")).toBe("process_heat_exchanger_continuous");
  });
});

describe("steamTrapTypes", () => {
  it("returns 5 types", () => {
    expect(steamTrapTypes()).toHaveLength(5);
  });
});
