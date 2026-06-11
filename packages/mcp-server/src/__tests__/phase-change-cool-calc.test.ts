import { describe, it, expect } from "vitest";
import {
  cop, tempDelta, compactness, noise,
  pcCost, solidState, forSpot, cycle,
  bestUse, phaseChangeCools,
} from "../phase-change-cool-calc.js";

describe("cop", () => {
  it("compressor vapor highest cop", () => {
    expect(cop("compressor_vapor")).toBeGreaterThan(cop("thermoelectric_peltier"));
  });
});

describe("tempDelta", () => {
  it("compressor vapor largest temp delta", () => {
    expect(tempDelta("compressor_vapor")).toBeGreaterThan(tempDelta("electrocaloric_film"));
  });
});

describe("compactness", () => {
  it("thermoelectric peltier most compact", () => {
    expect(compactness("thermoelectric_peltier")).toBeGreaterThan(compactness("absorption_chiller"));
  });
});

describe("noise", () => {
  it("thermoelectric peltier quietest", () => {
    expect(noise("thermoelectric_peltier")).toBeGreaterThan(noise("compressor_vapor"));
  });
});

describe("pcCost", () => {
  it("magnetic caloric most expensive", () => {
    expect(pcCost("magnetic_caloric")).toBeGreaterThan(pcCost("thermoelectric_peltier"));
  });
});

describe("solidState", () => {
  it("electrocaloric film is solid state", () => {
    expect(solidState("electrocaloric_film")).toBe(true);
  });
  it("compressor vapor not solid state", () => {
    expect(solidState("compressor_vapor")).toBe(false);
  });
});

describe("forSpot", () => {
  it("thermoelectric peltier for spot cooling", () => {
    expect(forSpot("thermoelectric_peltier")).toBe(true);
  });
  it("compressor vapor not for spot cooling", () => {
    expect(forSpot("compressor_vapor")).toBe(false);
  });
});

describe("cycle", () => {
  it("magnetic caloric uses magnetocaloric gadolinium cycle", () => {
    expect(cycle("magnetic_caloric")).toBe("magnetocaloric_gadolinium_cycle");
  });
});

describe("bestUse", () => {
  it("electrocaloric film best for wearable personal cooling", () => {
    expect(bestUse("electrocaloric_film")).toBe("wearable_personal_cooling");
  });
});

describe("phaseChangeCools", () => {
  it("returns 5 types", () => {
    expect(phaseChangeCools()).toHaveLength(5);
  });
});
