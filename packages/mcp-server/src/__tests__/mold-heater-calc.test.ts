import { describe, it, expect } from "vitest";
import {
  tempUniformity, throughput, rampRate, zoneControl,
  mhCost, rapid, forThermoplastic, heaterConfig,
  bestUse, moldHeaterTypes,
} from "../mold-heater-calc.js";

describe("tempUniformity", () => {
  it("oil circulation best temp uniformity", () => {
    expect(tempUniformity("oil_circulation")).toBeGreaterThan(tempUniformity("infrared_panel"));
  });
});

describe("throughput", () => {
  it("steam heat highest throughput", () => {
    expect(throughput("steam_heat")).toBeGreaterThan(throughput("induction_surface"));
  });
});

describe("rampRate", () => {
  it("induction surface best ramp rate", () => {
    expect(rampRate("induction_surface")).toBeGreaterThan(rampRate("oil_circulation"));
  });
});

describe("zoneControl", () => {
  it("electric cartridge best zone control", () => {
    expect(zoneControl("electric_cartridge")).toBeGreaterThan(zoneControl("steam_heat"));
  });
});

describe("mhCost", () => {
  it("induction surface most expensive", () => {
    expect(mhCost("induction_surface")).toBeGreaterThan(mhCost("infrared_panel"));
  });
});

describe("rapid", () => {
  it("electric cartridge is rapid", () => {
    expect(rapid("electric_cartridge")).toBe(true);
  });
  it("oil circulation not rapid", () => {
    expect(rapid("oil_circulation")).toBe(false);
  });
});

describe("forThermoplastic", () => {
  it("oil circulation for thermoplastic", () => {
    expect(forThermoplastic("oil_circulation")).toBe(true);
  });
  it("steam heat not for thermoplastic", () => {
    expect(forThermoplastic("steam_heat")).toBe(false);
  });
});

describe("heaterConfig", () => {
  it("electric cartridge uses rod insert zone pid control", () => {
    expect(heaterConfig("electric_cartridge")).toBe("electric_cartridge_mold_heater_rod_insert_zone_pid_control");
  });
});

describe("bestUse", () => {
  it("induction surface for rapid cycle skin effect seconds", () => {
    expect(bestUse("induction_surface")).toBe("rapid_cycle_induction_surface_mold_heater_skin_effect_seconds");
  });
});

describe("moldHeaterTypes", () => {
  it("returns 5 types", () => {
    expect(moldHeaterTypes()).toHaveLength(5);
  });
});
