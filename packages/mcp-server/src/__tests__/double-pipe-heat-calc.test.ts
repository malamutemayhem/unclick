import { describe, it, expect } from "vitest";
import {
  heatTransfer, flexibility, pressureCapability, maintenance,
  dpCost, modular, forHighPress, construction,
  bestUse, doublePipeHeatTypes,
} from "../double-pipe-heat-calc.js";

describe("heatTransfer", () => {
  it("triple tube best heat transfer", () => {
    expect(heatTransfer("triple_tube_annular")).toBeGreaterThan(heatTransfer("plain_tube_concentric"));
  });
});

describe("flexibility", () => {
  it("multi tube hairpin most flexible", () => {
    expect(flexibility("multi_tube_hairpin")).toBeGreaterThan(flexibility("triple_tube_annular"));
  });
});

describe("pressureCapability", () => {
  it("multi tube hairpin highest pressure", () => {
    expect(pressureCapability("multi_tube_hairpin")).toBeGreaterThan(pressureCapability("jacketed_pipe_trace"));
  });
});

describe("maintenance", () => {
  it("plain tube easiest maintenance", () => {
    expect(maintenance("plain_tube_concentric")).toBeGreaterThan(maintenance("triple_tube_annular"));
  });
});

describe("dpCost", () => {
  it("triple tube most expensive", () => {
    expect(dpCost("triple_tube_annular")).toBeGreaterThan(dpCost("plain_tube_concentric"));
  });
});

describe("modular", () => {
  it("plain tube is modular", () => {
    expect(modular("plain_tube_concentric")).toBe(true);
  });
  it("jacketed pipe not modular", () => {
    expect(modular("jacketed_pipe_trace")).toBe(false);
  });
});

describe("forHighPress", () => {
  it("multi tube hairpin for high pressure", () => {
    expect(forHighPress("multi_tube_hairpin")).toBe(true);
  });
  it("finned tube not for high pressure", () => {
    expect(forHighPress("finned_tube_longitudinal")).toBe(false);
  });
});

describe("construction", () => {
  it("triple tube uses three concentric tubes", () => {
    expect(construction("triple_tube_annular")).toBe("three_concentric_tube_two_annuli_flow");
  });
});

describe("bestUse", () => {
  it("triple tube for food pasteurize", () => {
    expect(bestUse("triple_tube_annular")).toBe("food_pasteurize_heat_recover_regen");
  });
});

describe("doublePipeHeatTypes", () => {
  it("returns 5 types", () => {
    expect(doublePipeHeatTypes()).toHaveLength(5);
  });
});
