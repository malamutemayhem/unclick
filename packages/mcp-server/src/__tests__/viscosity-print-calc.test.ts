import { describe, it, expect } from "vitest";
import {
  layerSeparation, colorIntense, controlFlow, mixEase,
  viscCost, oilBased, forMultiColor, viscosityGrade,
  bestUse, viscosityPrints,
} from "../viscosity-print-calc.js";

describe("layerSeparation", () => {
  it("stiff ink heavy best layer separation", () => {
    expect(layerSeparation("stiff_ink_heavy")).toBeGreaterThan(layerSeparation("thin_ink_light"));
  });
});

describe("colorIntense", () => {
  it("stiff ink heavy most intense color", () => {
    expect(colorIntense("stiff_ink_heavy")).toBeGreaterThan(colorIntense("modifier_ink_blend"));
  });
});

describe("controlFlow", () => {
  it("modifier ink blend best flow control", () => {
    expect(controlFlow("modifier_ink_blend")).toBeGreaterThan(controlFlow("thin_ink_light"));
  });
});

describe("mixEase", () => {
  it("modifier ink blend easiest mix", () => {
    expect(mixEase("modifier_ink_blend")).toBeGreaterThan(mixEase("tack_ink_sticky"));
  });
});

describe("viscCost", () => {
  it("tack ink sticky most expensive", () => {
    expect(viscCost("tack_ink_sticky")).toBeGreaterThan(viscCost("thin_ink_light"));
  });
});

describe("oilBased", () => {
  it("stiff ink heavy is oil based", () => {
    expect(oilBased("stiff_ink_heavy")).toBe(true);
  });
  it("modifier ink blend not oil based", () => {
    expect(oilBased("modifier_ink_blend")).toBe(false);
  });
});

describe("forMultiColor", () => {
  it("stiff ink heavy is for multi color", () => {
    expect(forMultiColor("stiff_ink_heavy")).toBe(true);
  });
  it("tack ink sticky not for multi color", () => {
    expect(forMultiColor("tack_ink_sticky")).toBe(false);
  });
});

describe("viscosityGrade", () => {
  it("stiff ink heavy uses high body stiff", () => {
    expect(viscosityGrade("stiff_ink_heavy")).toBe("high_body_stiff");
  });
});

describe("bestUse", () => {
  it("medium ink standard best for general viscosity layer", () => {
    expect(bestUse("medium_ink_standard")).toBe("general_viscosity_layer");
  });
});

describe("viscosityPrints", () => {
  it("returns 5 types", () => {
    expect(viscosityPrints()).toHaveLength(5);
  });
});
