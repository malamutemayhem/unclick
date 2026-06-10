import { describe, it, expect } from "vitest";
import {
  protection, fit, breathability, speakability,
  guardCost, remoldable, bracesCompat, guardMaterial,
  bestSport, mouthGuards,
} from "../mouth-guard-calc.js";

describe("protection", () => {
  it("custom mold dentist best protection", () => {
    expect(protection("custom_mold_dentist")).toBeGreaterThan(protection("instant_fit_stock"));
  });
});

describe("fit", () => {
  it("custom mold dentist best fit", () => {
    expect(fit("custom_mold_dentist")).toBeGreaterThan(fit("instant_fit_stock"));
  });
});

describe("breathability", () => {
  it("custom mold dentist most breathable", () => {
    expect(breathability("custom_mold_dentist")).toBeGreaterThan(breathability("instant_fit_stock"));
  });
});

describe("speakability", () => {
  it("custom mold dentist best speakability", () => {
    expect(speakability("custom_mold_dentist")).toBeGreaterThan(speakability("instant_fit_stock"));
  });
});

describe("guardCost", () => {
  it("custom mold dentist most expensive", () => {
    expect(guardCost("custom_mold_dentist")).toBeGreaterThan(guardCost("instant_fit_stock"));
  });
});

describe("remoldable", () => {
  it("boil bite basic is remoldable", () => {
    expect(remoldable("boil_bite_basic")).toBe(true);
  });
  it("custom mold dentist is not", () => {
    expect(remoldable("custom_mold_dentist")).toBe(false);
  });
});

describe("bracesCompat", () => {
  it("double braces ortho is braces compatible", () => {
    expect(bracesCompat("double_braces_ortho")).toBe(true);
  });
  it("boil bite basic is not", () => {
    expect(bracesCompat("boil_bite_basic")).toBe(false);
  });
});

describe("guardMaterial", () => {
  it("night guard grind uses dual laminate hard soft", () => {
    expect(guardMaterial("night_guard_grind")).toBe("dual_laminate_hard_soft");
  });
});

describe("bestSport", () => {
  it("night guard grind best for sleep bruxism tmj", () => {
    expect(bestSport("night_guard_grind")).toBe("sleep_bruxism_tmj");
  });
});

describe("mouthGuards", () => {
  it("returns 5 types", () => {
    expect(mouthGuards()).toHaveLength(5);
  });
});
