import { describe, it, expect } from "vitest";
import {
  installEase, weightCapacity, aestheticAppeal, spanLength,
  rodCost, noDrilling, layerCapable, rodMaterial,
  bestWindow, curtainRods,
} from "../curtain-rod-calc.js";

describe("installEase", () => {
  it("tension spring easiest install", () => {
    expect(installEase("tension_spring")).toBeGreaterThan(installEase("traverse_cord_draw"));
  });
});

describe("weightCapacity", () => {
  it("traverse cord draw highest weight capacity", () => {
    expect(weightCapacity("traverse_cord_draw")).toBeGreaterThan(weightCapacity("tension_spring"));
  });
});

describe("aestheticAppeal", () => {
  it("single decorative most aesthetic", () => {
    expect(aestheticAppeal("single_decorative")).toBeGreaterThan(aestheticAppeal("tension_spring"));
  });
});

describe("spanLength", () => {
  it("traverse cord draw longest span", () => {
    expect(spanLength("traverse_cord_draw")).toBeGreaterThan(spanLength("tension_spring"));
  });
});

describe("rodCost", () => {
  it("traverse cord draw most expensive", () => {
    expect(rodCost("traverse_cord_draw")).toBeGreaterThan(rodCost("tension_spring"));
  });
});

describe("noDrilling", () => {
  it("tension spring needs no drilling", () => {
    expect(noDrilling("tension_spring")).toBe(true);
  });
  it("single decorative does", () => {
    expect(noDrilling("single_decorative")).toBe(false);
  });
});

describe("layerCapable", () => {
  it("double layer is layer capable", () => {
    expect(layerCapable("double_layer")).toBe(true);
  });
  it("tension spring is not", () => {
    expect(layerCapable("tension_spring")).toBe(false);
  });
});

describe("rodMaterial", () => {
  it("single decorative uses wrought iron finial", () => {
    expect(rodMaterial("single_decorative")).toBe("wrought_iron_finial");
  });
});

describe("bestWindow", () => {
  it("double layer best for sheer plus blackout", () => {
    expect(bestWindow("double_layer")).toBe("sheer_plus_blackout");
  });
});

describe("curtainRods", () => {
  it("returns 5 types", () => {
    expect(curtainRods()).toHaveLength(5);
  });
});
