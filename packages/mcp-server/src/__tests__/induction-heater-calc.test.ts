import { describe, it, expect } from "vitest";
import {
  heatingDepth, speed, efficiency, controlPrecision,
  ihCost, contactless, forHardening, coil,
  bestUse, inductionHeaterTypes,
} from "../induction-heater-calc.js";

describe("heatingDepth", () => {
  it("line frequency deepest heating", () => {
    expect(heatingDepth("line_frequency")).toBeGreaterThan(heatingDepth("high_frequency"));
  });
});

describe("speed", () => {
  it("high frequency fastest", () => {
    expect(speed("high_frequency")).toBeGreaterThan(speed("line_frequency"));
  });
});

describe("efficiency", () => {
  it("medium frequency and dual frequency most efficient", () => {
    expect(efficiency("medium_frequency")).toBeGreaterThan(efficiency("line_frequency"));
    expect(efficiency("dual_frequency")).toBeGreaterThan(efficiency("line_frequency"));
  });
});

describe("controlPrecision", () => {
  it("dual frequency most precise control", () => {
    expect(controlPrecision("dual_frequency")).toBeGreaterThan(controlPrecision("line_frequency"));
  });
});

describe("ihCost", () => {
  it("dual frequency most expensive", () => {
    expect(ihCost("dual_frequency")).toBeGreaterThan(ihCost("line_frequency"));
  });
});

describe("contactless", () => {
  it("all types are contactless", () => {
    expect(contactless("medium_frequency")).toBe(true);
    expect(contactless("line_frequency")).toBe(true);
  });
});

describe("forHardening", () => {
  it("high frequency for hardening", () => {
    expect(forHardening("high_frequency")).toBe(true);
  });
  it("line frequency not for hardening", () => {
    expect(forHardening("line_frequency")).toBe(false);
  });
});

describe("coil", () => {
  it("dual frequency uses simultaneous mf hf", () => {
    expect(coil("dual_frequency")).toBe("simultaneous_dual_freq_mf_hf_combined_uniform_profile");
  });
});

describe("bestUse", () => {
  it("line frequency for metal melting foundry", () => {
    expect(bestUse("line_frequency")).toBe("metal_melting_holding_furnace_cast_iron_aluminum_foundry");
  });
});

describe("inductionHeaterTypes", () => {
  it("returns 5 types", () => {
    expect(inductionHeaterTypes()).toHaveLength(5);
  });
});
