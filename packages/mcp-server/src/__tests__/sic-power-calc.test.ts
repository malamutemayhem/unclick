import { describe, it, expect } from "vitest";
import {
  voltageClass, switchLoss, thermalCond, avalanche,
  deviceCost, normallyOff, forEv, dieType,
  bestUse, sicPowers,
} from "../sic-power-calc.js";

describe("voltageClass", () => {
  it("sic module 62mm highest voltage class", () => {
    expect(voltageClass("sic_module_62mm")).toBeGreaterThan(voltageClass("sic_schottky_650v"));
  });
});

describe("switchLoss", () => {
  it("sic jfet norm on lowest switch loss", () => {
    expect(switchLoss("sic_jfet_norm_on")).toBeGreaterThan(switchLoss("sic_schottky_650v"));
  });
});

describe("thermalCond", () => {
  it("sic jfet norm on best thermal conductivity", () => {
    expect(thermalCond("sic_jfet_norm_on")).toBeGreaterThan(thermalCond("sic_cascode_hybrid"));
  });
});

describe("avalanche", () => {
  it("sic jfet norm on best avalanche rating", () => {
    expect(avalanche("sic_jfet_norm_on")).toBeGreaterThan(avalanche("sic_schottky_650v"));
  });
});

describe("deviceCost", () => {
  it("sic module 62mm most expensive", () => {
    expect(deviceCost("sic_module_62mm")).toBeGreaterThan(deviceCost("sic_schottky_650v"));
  });
});

describe("normallyOff", () => {
  it("sic mosfet 1200v is normally off", () => {
    expect(normallyOff("sic_mosfet_1200v")).toBe(true);
  });
  it("sic jfet norm on not normally off", () => {
    expect(normallyOff("sic_jfet_norm_on")).toBe(false);
  });
});

describe("forEv", () => {
  it("sic mosfet 1200v is for ev", () => {
    expect(forEv("sic_mosfet_1200v")).toBe(true);
  });
  it("sic schottky 650v not for ev", () => {
    expect(forEv("sic_schottky_650v")).toBe(false);
  });
});

describe("dieType", () => {
  it("sic mosfet 1200v uses planar dmosfet 4h", () => {
    expect(dieType("sic_mosfet_1200v")).toBe("planar_dmosfet_4h");
  });
});

describe("bestUse", () => {
  it("sic mosfet 1200v best for ev traction inverter", () => {
    expect(bestUse("sic_mosfet_1200v")).toBe("ev_traction_inverter");
  });
});

describe("sicPowers", () => {
  it("returns 5 types", () => {
    expect(sicPowers()).toHaveLength(5);
  });
});
