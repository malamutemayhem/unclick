import { describe, it, expect } from "vitest";
import {
  airSeal, durability, installEase, visibility,
  stripCost, toolFree, insectBlock, sealMaterial,
  bestSpot, weatherStrips,
} from "../weather-strip-calc.js";

describe("airSeal", () => {
  it("magnetic door seal best air seal", () => {
    expect(airSeal("magnetic_door_seal")).toBeGreaterThan(airSeal("adhesive_foam_tape"));
  });
});

describe("durability", () => {
  it("v strip bronze most durable", () => {
    expect(durability("v_strip_bronze")).toBeGreaterThan(durability("adhesive_foam_tape"));
  });
});

describe("installEase", () => {
  it("adhesive foam tape easiest install", () => {
    expect(installEase("adhesive_foam_tape")).toBeGreaterThan(installEase("v_strip_bronze"));
  });
});

describe("visibility", () => {
  it("v strip bronze least visible", () => {
    expect(visibility("v_strip_bronze")).toBeGreaterThan(visibility("door_sweep_brush"));
  });
});

describe("stripCost", () => {
  it("magnetic door seal most expensive", () => {
    expect(stripCost("magnetic_door_seal")).toBeGreaterThan(stripCost("adhesive_foam_tape"));
  });
});

describe("toolFree", () => {
  it("adhesive foam tape is tool free", () => {
    expect(toolFree("adhesive_foam_tape")).toBe(true);
  });
  it("v strip bronze is not", () => {
    expect(toolFree("v_strip_bronze")).toBe(false);
  });
});

describe("insectBlock", () => {
  it("door sweep brush blocks insects", () => {
    expect(insectBlock("door_sweep_brush")).toBe(true);
  });
  it("adhesive foam tape does not", () => {
    expect(insectBlock("adhesive_foam_tape")).toBe(false);
  });
});

describe("sealMaterial", () => {
  it("v strip bronze uses phosphor bronze spring", () => {
    expect(sealMaterial("v_strip_bronze")).toBe("phosphor_bronze_spring");
  });
});

describe("bestSpot", () => {
  it("door sweep brush best for exterior door bottom", () => {
    expect(bestSpot("door_sweep_brush")).toBe("exterior_door_bottom");
  });
});

describe("weatherStrips", () => {
  it("returns 5 types", () => {
    expect(weatherStrips()).toHaveLength(5);
  });
});
