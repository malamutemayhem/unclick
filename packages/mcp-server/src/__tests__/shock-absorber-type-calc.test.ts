import { describe, it, expect } from "vitest";
import {
  damping, response, adjustability, comfort,
  saCost, electronic, forPerformance, medium,
  bestUse, shockAbsorberTypes,
} from "../shock-absorber-type-calc.js";

describe("damping", () => {
  it("magnetorheological best damping", () => {
    expect(damping("magnetorheological_mr_fluid")).toBeGreaterThan(damping("twin_tube_hydraulic"));
  });
});

describe("response", () => {
  it("magnetorheological fastest response", () => {
    expect(response("magnetorheological_mr_fluid")).toBeGreaterThan(response("twin_tube_hydraulic"));
  });
});

describe("adjustability", () => {
  it("magnetorheological most adjustable", () => {
    expect(adjustability("magnetorheological_mr_fluid")).toBeGreaterThan(adjustability("adjustable_coilover_threaded"));
  });
});

describe("comfort", () => {
  it("air spring most comfortable", () => {
    expect(comfort("air_spring_electronic")).toBeGreaterThan(comfort("adjustable_coilover_threaded"));
  });
});

describe("saCost", () => {
  it("magnetorheological most expensive", () => {
    expect(saCost("magnetorheological_mr_fluid")).toBeGreaterThan(saCost("twin_tube_hydraulic"));
  });
});

describe("electronic", () => {
  it("air spring is electronic", () => {
    expect(electronic("air_spring_electronic")).toBe(true);
  });
  it("monotube not electronic", () => {
    expect(electronic("monotube_gas_charged")).toBe(false);
  });
});

describe("forPerformance", () => {
  it("coilover for performance", () => {
    expect(forPerformance("adjustable_coilover_threaded")).toBe(true);
  });
  it("twin tube not for performance", () => {
    expect(forPerformance("twin_tube_hydraulic")).toBe(false);
  });
});

describe("medium", () => {
  it("mr fluid uses iron particle fluid", () => {
    expect(medium("magnetorheological_mr_fluid")).toBe("iron_particle_fluid_magnetic_coil");
  });
});

describe("bestUse", () => {
  it("twin tube for economy car", () => {
    expect(bestUse("twin_tube_hydraulic")).toBe("economy_car_replacement_oem");
  });
});

describe("shockAbsorberTypes", () => {
  it("returns 5 types", () => {
    expect(shockAbsorberTypes()).toHaveLength(5);
  });
});
