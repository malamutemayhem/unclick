import { describe, it, expect } from "vitest";
import {
  linewidth, outputPower, wallPlug, tempStability,
  laserCost, directMod, forCoherent, cavity,
  bestUse, laserSources,
} from "../laser-source-calc.js";

describe("linewidth", () => {
  it("tunable ecl narrowest linewidth", () => {
    expect(linewidth("tunable_ecl")).toBeGreaterThan(linewidth("vcsel_850nm"));
  });
});

describe("outputPower", () => {
  it("tunable ecl highest output power", () => {
    expect(outputPower("tunable_ecl")).toBeGreaterThan(outputPower("vcsel_850nm"));
  });
});

describe("wallPlug", () => {
  it("vcsel 850nm best wall plug efficiency", () => {
    expect(wallPlug("vcsel_850nm")).toBeGreaterThan(wallPlug("tunable_ecl"));
  });
});

describe("tempStability", () => {
  it("quantum dot best temp stability", () => {
    expect(tempStability("quantum_dot")).toBeGreaterThan(tempStability("vcsel_850nm"));
  });
});

describe("laserCost", () => {
  it("hybrid iii v si most expensive", () => {
    expect(laserCost("hybrid_iii_v_si")).toBeGreaterThan(laserCost("vcsel_850nm"));
  });
});

describe("directMod", () => {
  it("dfb telecom is direct mod", () => {
    expect(directMod("dfb_telecom")).toBe(true);
  });
  it("tunable ecl not direct mod", () => {
    expect(directMod("tunable_ecl")).toBe(false);
  });
});

describe("forCoherent", () => {
  it("tunable ecl is for coherent", () => {
    expect(forCoherent("tunable_ecl")).toBe(true);
  });
  it("vcsel 850nm not for coherent", () => {
    expect(forCoherent("vcsel_850nm")).toBe(false);
  });
});

describe("cavity", () => {
  it("quantum dot uses self assembled dot", () => {
    expect(cavity("quantum_dot")).toBe("self_assembled_dot");
  });
});

describe("bestUse", () => {
  it("hybrid iii v si best for silicon photonic engine", () => {
    expect(bestUse("hybrid_iii_v_si")).toBe("silicon_photonic_engine");
  });
});

describe("laserSources", () => {
  it("returns 5 types", () => {
    expect(laserSources()).toHaveLength(5);
  });
});
