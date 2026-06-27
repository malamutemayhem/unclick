import { describe, it, expect } from "vitest";
import {
  baseTemp, coolingPower, reliability, vibration,
  cryoCost, continuous, forQuantum, cycle,
  bestUse, cryoCoolers,
} from "../cryo-cooler-calc.js";

describe("baseTemp", () => {
  it("dilution fridge lowest base temp", () => {
    expect(baseTemp("dilution_fridge")).toBeGreaterThan(baseTemp("stirling_mini"));
  });
});

describe("coolingPower", () => {
  it("gifford mcmahon highest cooling power", () => {
    expect(coolingPower("gifford_mcmahon")).toBeGreaterThan(coolingPower("adr_demag"));
  });
});

describe("reliability", () => {
  it("pulse tube most reliable", () => {
    expect(reliability("pulse_tube")).toBeGreaterThan(reliability("adr_demag"));
  });
});

describe("vibration", () => {
  it("adr demag lowest vibration", () => {
    expect(vibration("adr_demag")).toBeGreaterThan(vibration("gifford_mcmahon"));
  });
});

describe("cryoCost", () => {
  it("dilution fridge most expensive", () => {
    expect(cryoCost("dilution_fridge")).toBeGreaterThan(cryoCost("stirling_mini"));
  });
});

describe("continuous", () => {
  it("dilution fridge is continuous", () => {
    expect(continuous("dilution_fridge")).toBe(true);
  });
  it("adr demag not continuous", () => {
    expect(continuous("adr_demag")).toBe(false);
  });
});

describe("forQuantum", () => {
  it("dilution fridge is for quantum", () => {
    expect(forQuantum("dilution_fridge")).toBe(true);
  });
  it("gifford mcmahon not for quantum", () => {
    expect(forQuantum("gifford_mcmahon")).toBe(false);
  });
});

describe("cycle", () => {
  it("dilution fridge uses he3 he4 mixing", () => {
    expect(cycle("dilution_fridge")).toBe("he3_he4_mixing");
  });
});

describe("bestUse", () => {
  it("pulse tube best for 4k shield precool", () => {
    expect(bestUse("pulse_tube")).toBe("4k_shield_precool");
  });
});

describe("cryoCoolers", () => {
  it("returns 5 types", () => {
    expect(cryoCoolers()).toHaveLength(5);
  });
});
