import { describe, it, expect } from "vitest";
import {
  heatTransfer, capacity, fouling, energy,
  evCost, multiEffect, forViscous, film,
  bestUse, evaporatorTypes,
} from "../evaporator-type-calc.js";

describe("heatTransfer", () => {
  it("plate best heat transfer", () => {
    expect(heatTransfer("plate_evaporator_compact")).toBeGreaterThan(heatTransfer("rising_film_natural_circ"));
  });
});

describe("capacity", () => {
  it("multiple effect highest capacity", () => {
    expect(capacity("multiple_effect_cascade")).toBeGreaterThan(capacity("plate_evaporator_compact"));
  });
});

describe("fouling", () => {
  it("forced circulation best fouling resistance", () => {
    expect(fouling("forced_circulation_pump")).toBeGreaterThan(fouling("rising_film_natural_circ"));
  });
});

describe("energy", () => {
  it("multiple effect most energy efficient", () => {
    expect(energy("multiple_effect_cascade")).toBeGreaterThan(energy("forced_circulation_pump"));
  });
});

describe("evCost", () => {
  it("multiple effect most expensive", () => {
    expect(evCost("multiple_effect_cascade")).toBeGreaterThan(evCost("rising_film_natural_circ"));
  });
});

describe("multiEffect", () => {
  it("multiple effect is multi effect", () => {
    expect(multiEffect("multiple_effect_cascade")).toBe(true);
  });
  it("falling film not multi effect", () => {
    expect(multiEffect("falling_film_vertical")).toBe(false);
  });
});

describe("forViscous", () => {
  it("forced circulation for viscous", () => {
    expect(forViscous("forced_circulation_pump")).toBe(true);
  });
  it("falling film not for viscous", () => {
    expect(forViscous("falling_film_vertical")).toBe(false);
  });
});

describe("film", () => {
  it("multiple effect uses cascade vapor reuse", () => {
    expect(film("multiple_effect_cascade")).toBe("cascade_vapor_reuse_multi_stage");
  });
});

describe("bestUse", () => {
  it("falling film for juice milk", () => {
    expect(bestUse("falling_film_vertical")).toBe("juice_milk_heat_sensitive_liquid");
  });
});

describe("evaporatorTypes", () => {
  it("returns 5 types", () => {
    expect(evaporatorTypes()).toHaveLength(5);
  });
});
