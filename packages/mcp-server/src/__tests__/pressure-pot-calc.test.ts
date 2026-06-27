import { describe, it, expect } from "vitest";
import {
  bubbleRemoval, capacity, pressureRating, easeOfUse,
  potCost, usesPressure, usesVacuum, vesselType,
  bestCast, pressurePots,
} from "../pressure-pot-calc.js";

describe("bubbleRemoval", () => {
  it("purpose built resin best bubble removal", () => {
    expect(bubbleRemoval("purpose_built_resin")).toBeGreaterThan(bubbleRemoval("mini_pot_jewelry"));
  });
});

describe("capacity", () => {
  it("purpose built resin most capacity", () => {
    expect(capacity("purpose_built_resin")).toBeGreaterThan(capacity("mini_pot_jewelry"));
  });
});

describe("pressureRating", () => {
  it("purpose built resin best pressure rating", () => {
    expect(pressureRating("purpose_built_resin")).toBeGreaterThan(pressureRating("vacuum_chamber_degas"));
  });
});

describe("easeOfUse", () => {
  it("mini pot jewelry easiest to use", () => {
    expect(easeOfUse("mini_pot_jewelry")).toBeGreaterThan(easeOfUse("paint_pot_convert"));
  });
});

describe("potCost", () => {
  it("combo pressure vacuum most expensive", () => {
    expect(potCost("combo_pressure_vacuum")).toBeGreaterThan(potCost("paint_pot_convert"));
  });
});

describe("usesPressure", () => {
  it("purpose built resin uses pressure", () => {
    expect(usesPressure("purpose_built_resin")).toBe(true);
  });
  it("vacuum chamber degas does not use pressure", () => {
    expect(usesPressure("vacuum_chamber_degas")).toBe(false);
  });
});

describe("usesVacuum", () => {
  it("vacuum chamber degas uses vacuum", () => {
    expect(usesVacuum("vacuum_chamber_degas")).toBe(true);
  });
  it("paint pot convert does not use vacuum", () => {
    expect(usesVacuum("paint_pot_convert")).toBe(false);
  });
});

describe("vesselType", () => {
  it("paint pot convert uses converted paint tank", () => {
    expect(vesselType("paint_pot_convert")).toBe("converted_paint_tank");
  });
});

describe("bestCast", () => {
  it("mini pot jewelry best for ring pendant small", () => {
    expect(bestCast("mini_pot_jewelry")).toBe("ring_pendant_small");
  });
});

describe("pressurePots", () => {
  it("returns 5 types", () => {
    expect(pressurePots()).toHaveLength(5);
  });
});
