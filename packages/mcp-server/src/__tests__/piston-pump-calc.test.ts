import { describe, it, expect } from "vitest";
import {
  pressure, efficiency, flowPulsation, variableDisp,
  ppCost, variableFlow, forHighPressure, mechanism,
  bestUse, pistonPumpTypes,
} from "../piston-pump-calc.js";

describe("pressure", () => {
  it("radial piston highest pressure", () => {
    expect(pressure("radial_piston_cam")).toBeGreaterThanOrEqual(pressure("triplex_plunger"));
  });
});

describe("efficiency", () => {
  it("axial piston highest efficiency", () => {
    expect(efficiency("axial_piston_swash")).toBeGreaterThan(efficiency("air_operated_double"));
  });
});

describe("flowPulsation", () => {
  it("radial piston better pulsation than triplex", () => {
    expect(flowPulsation("radial_piston_cam")).toBeGreaterThan(flowPulsation("triplex_plunger"));
  });
});

describe("variableDisp", () => {
  it("axial piston best variable displacement", () => {
    expect(variableDisp("axial_piston_swash")).toBeGreaterThan(variableDisp("triplex_plunger"));
  });
});

describe("ppCost", () => {
  it("radial piston most expensive", () => {
    expect(ppCost("radial_piston_cam")).toBeGreaterThan(ppCost("air_operated_double"));
  });
});

describe("variableFlow", () => {
  it("axial piston has variable flow", () => {
    expect(variableFlow("axial_piston_swash")).toBe(true);
  });
  it("triplex plunger no variable flow", () => {
    expect(variableFlow("triplex_plunger")).toBe(false);
  });
});

describe("forHighPressure", () => {
  it("radial piston for high pressure", () => {
    expect(forHighPressure("radial_piston_cam")).toBe(true);
  });
  it("air operated not for high pressure", () => {
    expect(forHighPressure("air_operated_double")).toBe(false);
  });
});

describe("mechanism", () => {
  it("metering solenoid uses electronic stroke", () => {
    expect(mechanism("metering_solenoid")).toBe("solenoid_driven_diaphragm_electronic_stroke");
  });
});

describe("bestUse", () => {
  it("triplex for water jetting", () => {
    expect(bestUse("triplex_plunger")).toBe("water_jetting_descaling_high_pressure_wash");
  });
});

describe("pistonPumpTypes", () => {
  it("returns 5 types", () => {
    expect(pistonPumpTypes()).toHaveLength(5);
  });
});
