import { describe, it, expect } from "vitest";
import {
  baseTemp, coolingPower, efficiency, vibration,
  ccCost, cryoFree, forQuantum, cycle,
  bestUse, cryogenicCools,
} from "../cryogenic-cool-calc.js";

describe("baseTemp", () => {
  it("adiabatic demagnetization lowest base temp", () => {
    expect(baseTemp("adiabatic_demagnetization")).toBeGreaterThan(baseTemp("stirling_free_piston"));
  });
});

describe("coolingPower", () => {
  it("gifford mcmahon highest cooling power", () => {
    expect(coolingPower("gifford_mcmahon_displacer")).toBeGreaterThan(coolingPower("joule_thomson_expansion"));
  });
});

describe("efficiency", () => {
  it("stirling most efficient", () => {
    expect(efficiency("stirling_free_piston")).toBeGreaterThan(efficiency("joule_thomson_expansion"));
  });
});

describe("vibration", () => {
  it("joule thomson lowest vibration", () => {
    expect(vibration("joule_thomson_expansion")).toBeGreaterThan(vibration("gifford_mcmahon_displacer"));
  });
});

describe("ccCost", () => {
  it("adiabatic demagnetization most expensive", () => {
    expect(ccCost("adiabatic_demagnetization")).toBeGreaterThan(ccCost("joule_thomson_expansion"));
  });
});

describe("cryoFree", () => {
  it("pulse tube is cryo free", () => {
    expect(cryoFree("pulse_tube_regenerative")).toBe(true);
  });
  it("joule thomson not cryo free", () => {
    expect(cryoFree("joule_thomson_expansion")).toBe(false);
  });
});

describe("forQuantum", () => {
  it("pulse tube for quantum", () => {
    expect(forQuantum("pulse_tube_regenerative")).toBe(true);
  });
  it("gifford mcmahon not for quantum", () => {
    expect(forQuantum("gifford_mcmahon_displacer")).toBe(false);
  });
});

describe("cycle", () => {
  it("stirling uses isothermal compress expand", () => {
    expect(cycle("stirling_free_piston")).toBe("isothermal_compress_expand");
  });
});

describe("bestUse", () => {
  it("pulse tube best for squid detector", () => {
    expect(bestUse("pulse_tube_regenerative")).toBe("squid_detector_low_vibration");
  });
});

describe("cryogenicCools", () => {
  it("returns 5 types", () => {
    expect(cryogenicCools()).toHaveLength(5);
  });
});
