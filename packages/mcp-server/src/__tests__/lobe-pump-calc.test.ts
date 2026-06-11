import { describe, it, expect } from "vitest";
import {
  flow, pressure, gentleness, cleanability,
  lpCost, cip, forFood, rotor,
  bestUse, lobePumpTypes,
} from "../lobe-pump-calc.js";

describe("flow", () => {
  it("circumferential highest flow", () => {
    expect(flow("circumferential_piston")).toBeGreaterThan(flow("rotary_bi_wing"));
  });
});

describe("pressure", () => {
  it("circumferential highest pressure", () => {
    expect(pressure("circumferential_piston")).toBeGreaterThan(pressure("rotary_bi_wing"));
  });
});

describe("gentleness", () => {
  it("sanitary most gentle", () => {
    expect(gentleness("sanitary_front_loaded")).toBeGreaterThan(gentleness("high_viscosity_heated"));
  });
});

describe("cleanability", () => {
  it("sanitary most cleanable", () => {
    expect(cleanability("sanitary_front_loaded")).toBeGreaterThan(cleanability("high_viscosity_heated"));
  });
});

describe("lpCost", () => {
  it("heated most expensive", () => {
    expect(lpCost("high_viscosity_heated")).toBeGreaterThan(lpCost("rotary_bi_wing"));
  });
});

describe("cip", () => {
  it("tri lobe has cip", () => {
    expect(cip("rotary_tri_lobe")).toBe(true);
  });
  it("bi wing no cip", () => {
    expect(cip("rotary_bi_wing")).toBe(false);
  });
});

describe("forFood", () => {
  it("tri lobe for food", () => {
    expect(forFood("rotary_tri_lobe")).toBe(true);
  });
  it("heated not food", () => {
    expect(forFood("high_viscosity_heated")).toBe(false);
  });
});

describe("rotor", () => {
  it("sanitary uses front pull out", () => {
    expect(rotor("sanitary_front_loaded")).toBe("front_pull_out_quick_service");
  });
});

describe("bestUse", () => {
  it("circumferential for paste filling", () => {
    expect(bestUse("circumferential_piston")).toBe("high_viscosity_paste_filling");
  });
});

describe("lobePumpTypes", () => {
  it("returns 5 types", () => {
    expect(lobePumpTypes()).toHaveLength(5);
  });
});
