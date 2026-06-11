import { describe, it, expect } from "vitest";
import {
  ultimateVacuum, throughput, pumpingSpeed, backstreaming,
  dfCost, oilFree, forHighVacuum, pumpConfig,
  bestUse, diffusionPumpTypes,
} from "../diffusion-pump-calc.js";

describe("ultimateVacuum", () => {
  it("mercury diffusion best ultimate vacuum", () => {
    expect(ultimateVacuum("mercury_diffusion")).toBeGreaterThan(ultimateVacuum("vapor_booster"));
  });
});

describe("throughput", () => {
  it("vapor booster highest throughput", () => {
    expect(throughput("vapor_booster")).toBeGreaterThan(throughput("mercury_diffusion"));
  });
});

describe("pumpingSpeed", () => {
  it("vapor booster best pumping speed", () => {
    expect(pumpingSpeed("vapor_booster")).toBeGreaterThan(pumpingSpeed("mercury_diffusion"));
  });
});

describe("backstreaming", () => {
  it("self purifying best backstreaming control", () => {
    expect(backstreaming("self_purifying")).toBeGreaterThan(backstreaming("vapor_booster"));
  });
});

describe("dfCost", () => {
  it("self purifying most expensive", () => {
    expect(dfCost("self_purifying")).toBeGreaterThan(dfCost("oil_diffusion"));
  });
});

describe("oilFree", () => {
  it("mercury diffusion is oil free", () => {
    expect(oilFree("mercury_diffusion")).toBe(true);
  });
  it("oil diffusion not oil free", () => {
    expect(oilFree("oil_diffusion")).toBe(false);
  });
});

describe("forHighVacuum", () => {
  it("oil diffusion for high vacuum", () => {
    expect(forHighVacuum("oil_diffusion")).toBe(true);
  });
  it("vapor booster not for high vacuum", () => {
    expect(forHighVacuum("vapor_booster")).toBe(false);
  });
});

describe("pumpConfig", () => {
  it("fractionating uses cold cap condense trap back stream", () => {
    expect(pumpConfig("fractionating")).toBe("fractionating_diffusion_pump_cold_cap_condense_trap_back_stream");
  });
});

describe("bestUse", () => {
  it("oil diffusion for vacuum coating high speed large chamber evap", () => {
    expect(bestUse("oil_diffusion")).toBe("vacuum_coating_oil_diffusion_pump_high_speed_large_chamber_evap");
  });
});

describe("diffusionPumpTypes", () => {
  it("returns 5 types", () => {
    expect(diffusionPumpTypes()).toHaveLength(5);
  });
});
