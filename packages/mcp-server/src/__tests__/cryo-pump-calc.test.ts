import { describe, it, expect } from "vitest";
import {
  pumpSpeed, throughput, ultimateVacuum, cooldownTime,
  cpCost, oilFree, forClean, pumpConfig,
  bestUse, cryoPumpTypes,
} from "../cryo-pump-calc.js";

describe("pumpSpeed", () => {
  it("liquid helium best pump speed", () => {
    expect(pumpSpeed("liquid_helium")).toBeGreaterThan(pumpSpeed("sorption_cryo"));
  });
});

describe("throughput", () => {
  it("gifford mcmahon highest throughput", () => {
    expect(throughput("gifford_mcmahon")).toBeGreaterThan(throughput("sorption_cryo"));
  });
});

describe("ultimateVacuum", () => {
  it("liquid helium best ultimate vacuum", () => {
    expect(ultimateVacuum("liquid_helium")).toBeGreaterThan(ultimateVacuum("sorption_cryo"));
  });
});

describe("cooldownTime", () => {
  it("joule thomson best cooldown time", () => {
    expect(cooldownTime("joule_thomson")).toBeGreaterThan(cooldownTime("liquid_helium"));
  });
});

describe("cpCost", () => {
  it("liquid helium most expensive", () => {
    expect(cpCost("liquid_helium")).toBeGreaterThan(cpCost("sorption_cryo"));
  });
});

describe("oilFree", () => {
  it("gifford mcmahon is oil free", () => {
    expect(oilFree("gifford_mcmahon")).toBe(true);
  });
});

describe("forClean", () => {
  it("gifford mcmahon for clean", () => {
    expect(forClean("gifford_mcmahon")).toBe(true);
  });
  it("joule thomson not for clean", () => {
    expect(forClean("joule_thomson")).toBe(false);
  });
});

describe("pumpConfig", () => {
  it("pulse tube uses no moving cold part low vibration quiet", () => {
    expect(pumpConfig("pulse_tube")).toBe("pulse_tube_cryo_pump_no_moving_cold_part_low_vibration_quiet");
  });
});

describe("bestUse", () => {
  it("sorption cryo for clean rough pump oil free backing", () => {
    expect(bestUse("sorption_cryo")).toBe("clean_rough_pump_sorption_cryo_zeolite_sieve_oil_free_backing");
  });
});

describe("cryoPumpTypes", () => {
  it("returns 5 types", () => {
    expect(cryoPumpTypes()).toHaveLength(5);
  });
});
