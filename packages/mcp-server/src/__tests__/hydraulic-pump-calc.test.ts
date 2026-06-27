import { describe, it, expect } from "vitest";
import {
  maxPressure, flowRate, volumetricEfficiency, noiseLevel,
  hpCost, variableDisplacement, forHighPressure, pumpingElement,
  bestUse, hydraulicPumpTypes,
} from "../hydraulic-pump-calc.js";

describe("maxPressure", () => {
  it("piston axial and radial highest pressure", () => {
    expect(maxPressure("piston_axial")).toBeGreaterThan(maxPressure("gear_external"));
    expect(maxPressure("piston_radial")).toBeGreaterThan(maxPressure("gear_external"));
  });
});

describe("flowRate", () => {
  it("screw triple highest flow rate", () => {
    expect(flowRate("screw_triple")).toBeGreaterThan(flowRate("gear_external"));
  });
});

describe("volumetricEfficiency", () => {
  it("piston axial best volumetric efficiency", () => {
    expect(volumetricEfficiency("piston_axial")).toBeGreaterThan(volumetricEfficiency("gear_external"));
  });
});

describe("noiseLevel", () => {
  it("screw triple quietest", () => {
    expect(noiseLevel("screw_triple")).toBeGreaterThan(noiseLevel("gear_external"));
  });
});

describe("hpCost", () => {
  it("piston radial most expensive", () => {
    expect(hpCost("piston_radial")).toBeGreaterThan(hpCost("gear_external"));
  });
});

describe("variableDisplacement", () => {
  it("piston axial has variable displacement", () => {
    expect(variableDisplacement("piston_axial")).toBe(true);
  });
  it("gear external no variable displacement", () => {
    expect(variableDisplacement("gear_external")).toBe(false);
  });
});

describe("forHighPressure", () => {
  it("piston axial for high pressure", () => {
    expect(forHighPressure("piston_axial")).toBe(true);
  });
  it("gear external not for high pressure", () => {
    expect(forHighPressure("gear_external")).toBe(false);
  });
});

describe("pumpingElement", () => {
  it("screw triple uses helical rotor", () => {
    expect(pumpingElement("screw_triple")).toBe("triple_screw_helical_rotor_positive_displacement_pulseless");
  });
});

describe("bestUse", () => {
  it("vane balanced for machine tool", () => {
    expect(bestUse("vane_balanced")).toBe("machine_tool_injection_mold_quiet_industrial_fixed_install");
  });
});

describe("hydraulicPumpTypes", () => {
  it("returns 5 types", () => {
    expect(hydraulicPumpTypes()).toHaveLength(5);
  });
});
