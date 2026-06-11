import { describe, it, expect } from "vitest";
import {
  barrier, clarity, weight, recyclability,
  btCost, reusable, forCarbonated, forming,
  bestUse, bottleTypes,
} from "../bottle-type-calc.js";

describe("barrier", () => {
  it("glass best barrier", () => {
    expect(barrier("glass_narrow_neck")).toBeGreaterThan(barrier("bioplastic_pla_compost"));
  });
});

describe("clarity", () => {
  it("glass best clarity", () => {
    expect(clarity("glass_narrow_neck")).toBeGreaterThan(clarity("aluminum_drawn_ironed"));
  });
});

describe("weight", () => {
  it("pet lightest", () => {
    expect(weight("pet_stretch_blow")).toBeGreaterThan(weight("glass_narrow_neck"));
  });
});

describe("recyclability", () => {
  it("glass most recyclable", () => {
    expect(recyclability("glass_narrow_neck")).toBeGreaterThan(recyclability("bioplastic_pla_compost"));
  });
});

describe("btCost", () => {
  it("bioplastic most expensive", () => {
    expect(btCost("bioplastic_pla_compost")).toBeGreaterThan(btCost("hdpe_extrusion_blow"));
  });
});

describe("reusable", () => {
  it("glass is reusable", () => {
    expect(reusable("glass_narrow_neck")).toBe(true);
  });
  it("pet not reusable", () => {
    expect(reusable("pet_stretch_blow")).toBe(false);
  });
});

describe("forCarbonated", () => {
  it("pet for carbonated", () => {
    expect(forCarbonated("pet_stretch_blow")).toBe(true);
  });
  it("hdpe not for carbonated", () => {
    expect(forCarbonated("hdpe_extrusion_blow")).toBe(false);
  });
});

describe("forming", () => {
  it("aluminum uses draw redraw wall ironing", () => {
    expect(forming("aluminum_drawn_ironed")).toBe("draw_redraw_wall_ironing");
  });
});

describe("bestUse", () => {
  it("hdpe best for milk jug detergent", () => {
    expect(bestUse("hdpe_extrusion_blow")).toBe("milk_jug_detergent_chemical");
  });
});

describe("bottleTypes", () => {
  it("returns 5 types", () => {
    expect(bottleTypes()).toHaveLength(5);
  });
});
