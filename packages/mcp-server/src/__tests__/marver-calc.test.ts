import { describe, it, expect } from "vitest";
import {
  heatRetain, surfaceSmooth, shapeControl, durability,
  marverCost, nonStick, portable, surfaceMat,
  bestUse, marvers,
} from "../marver-calc.js";

describe("heatRetain", () => {
  it("brass plate heat best heat retain", () => {
    expect(heatRetain("brass_plate_heat")).toBeGreaterThan(heatRetain("marble_cold_smooth"));
  });
});

describe("surfaceSmooth", () => {
  it("marble cold smooth smoothest surface", () => {
    expect(surfaceSmooth("marble_cold_smooth")).toBeGreaterThan(surfaceSmooth("ceramic_fiber_light"));
  });
});

describe("shapeControl", () => {
  it("graphite flat slab best shape control", () => {
    expect(shapeControl("graphite_flat_slab")).toBeGreaterThan(shapeControl("ceramic_fiber_light"));
  });
});

describe("durability", () => {
  it("steel table heavy most durable", () => {
    expect(durability("steel_table_heavy")).toBeGreaterThan(durability("ceramic_fiber_light"));
  });
});

describe("marverCost", () => {
  it("marble cold smooth most expensive", () => {
    expect(marverCost("marble_cold_smooth")).toBeGreaterThan(marverCost("ceramic_fiber_light"));
  });
});

describe("nonStick", () => {
  it("graphite flat slab is non stick", () => {
    expect(nonStick("graphite_flat_slab")).toBe(true);
  });
  it("steel table heavy not non stick", () => {
    expect(nonStick("steel_table_heavy")).toBe(false);
  });
});

describe("portable", () => {
  it("graphite flat slab is portable", () => {
    expect(portable("graphite_flat_slab")).toBe(true);
  });
  it("steel table heavy not portable", () => {
    expect(portable("steel_table_heavy")).toBe(false);
  });
});

describe("surfaceMat", () => {
  it("graphite flat slab uses solid graphite block", () => {
    expect(surfaceMat("graphite_flat_slab")).toBe("solid_graphite_block");
  });
});

describe("bestUse", () => {
  it("steel table heavy best for production glasswork", () => {
    expect(bestUse("steel_table_heavy")).toBe("production_glasswork");
  });
});

describe("marvers", () => {
  it("returns 5 types", () => {
    expect(marvers()).toHaveLength(5);
  });
});
