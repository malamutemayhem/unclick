import { describe, it, expect } from "vitest";
import {
  flowSpeed, viscosity, surfaceRoughness, gasContent,
  silicaContent, formsUnderwater, basaltic, typicalVolcano,
  coolingTexture, lavaTypes,
} from "../lava-type-calc.js";

describe("flowSpeed", () => {
  it("pahoehoe fastest flow", () => {
    expect(flowSpeed("pahoehoe")).toBeGreaterThan(flowSpeed("pillow"));
  });
});

describe("viscosity", () => {
  it("blocky most viscous", () => {
    expect(viscosity("blocky")).toBeGreaterThan(viscosity("pahoehoe"));
  });
});

describe("surfaceRoughness", () => {
  it("aa roughest surface", () => {
    expect(surfaceRoughness("aa")).toBeGreaterThan(surfaceRoughness("pahoehoe"));
  });
});

describe("gasContent", () => {
  it("spinifex most gas", () => {
    expect(gasContent("spinifex")).toBeGreaterThan(gasContent("pillow"));
  });
});

describe("silicaContent", () => {
  it("blocky highest silica", () => {
    expect(silicaContent("blocky")).toBeGreaterThan(silicaContent("pahoehoe"));
  });
});

describe("formsUnderwater", () => {
  it("pillow forms underwater", () => {
    expect(formsUnderwater("pillow")).toBe(true);
  });
  it("pahoehoe does not", () => {
    expect(formsUnderwater("pahoehoe")).toBe(false);
  });
});

describe("basaltic", () => {
  it("pahoehoe is basaltic", () => {
    expect(basaltic("pahoehoe")).toBe(true);
  });
  it("blocky is not", () => {
    expect(basaltic("blocky")).toBe(false);
  });
});

describe("typicalVolcano", () => {
  it("pillow at mid ocean ridge", () => {
    expect(typicalVolcano("pillow")).toBe("mid_ocean_ridge");
  });
});

describe("coolingTexture", () => {
  it("aa is jagged clinker rubble", () => {
    expect(coolingTexture("aa")).toBe("jagged_clinker_rubble");
  });
});

describe("lavaTypes", () => {
  it("returns 5 types", () => {
    expect(lavaTypes()).toHaveLength(5);
  });
});
