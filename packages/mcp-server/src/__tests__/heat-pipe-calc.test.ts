import { describe, it, expect } from "vitest";
import {
  conductance, maxPower, flexibility, orientation,
  hpCost, antigravity, forLaptop, wick,
  bestUse, heatPipes,
} from "../heat-pipe-calc.js";

describe("conductance", () => {
  it("loop heat pipe highest conductance", () => {
    expect(conductance("loop_heat_pipe")).toBeGreaterThan(conductance("pulsating_oscillating"));
  });
});

describe("maxPower", () => {
  it("loop heat pipe highest max power", () => {
    expect(maxPower("loop_heat_pipe")).toBeGreaterThan(maxPower("pulsating_oscillating"));
  });
});

describe("flexibility", () => {
  it("mesh wick flexible most flexible", () => {
    expect(flexibility("mesh_wick_flexible")).toBeGreaterThan(flexibility("grooved_axial"));
  });
});

describe("orientation", () => {
  it("loop heat pipe best orientation independence", () => {
    expect(orientation("loop_heat_pipe")).toBeGreaterThan(orientation("grooved_axial"));
  });
});

describe("hpCost", () => {
  it("loop heat pipe most expensive", () => {
    expect(hpCost("loop_heat_pipe")).toBeGreaterThan(hpCost("pulsating_oscillating"));
  });
});

describe("antigravity", () => {
  it("sintered wick copper works antigravity", () => {
    expect(antigravity("sintered_wick_copper")).toBe(true);
  });
  it("grooved axial no antigravity", () => {
    expect(antigravity("grooved_axial")).toBe(false);
  });
});

describe("forLaptop", () => {
  it("sintered wick copper for laptop", () => {
    expect(forLaptop("sintered_wick_copper")).toBe(true);
  });
  it("loop heat pipe not for laptop", () => {
    expect(forLaptop("loop_heat_pipe")).toBe(false);
  });
});

describe("wick", () => {
  it("pulsating oscillating uses wickless slug oscillation", () => {
    expect(wick("pulsating_oscillating")).toBe("wickless_slug_oscillation");
  });
});

describe("bestUse", () => {
  it("loop heat pipe best for spacecraft high power remote", () => {
    expect(bestUse("loop_heat_pipe")).toBe("spacecraft_high_power_remote");
  });
});

describe("heatPipes", () => {
  it("returns 5 types", () => {
    expect(heatPipes()).toHaveLength(5);
  });
});
