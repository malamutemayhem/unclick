import { describe, it, expect } from "vitest";
import {
  soothingPower, dentalSafety, durability, cleanEase,
  pacifierCost, bpaFree, dishwasherSafe, nippleMaterial,
  bestAge, pacifiers,
} from "../pacifier-calc.js";

describe("soothingPower", () => {
  it("orthodontic silicone most soothing", () => {
    expect(soothingPower("orthodontic_silicone")).toBeGreaterThan(soothingPower("fruit_feeder_mesh"));
  });
});

describe("dentalSafety", () => {
  it("orthodontic silicone best dental safety", () => {
    expect(dentalSafety("orthodontic_silicone")).toBeGreaterThan(dentalSafety("fruit_feeder_mesh"));
  });
});

describe("durability", () => {
  it("one piece hospital most durable", () => {
    expect(durability("one_piece_hospital")).toBeGreaterThan(durability("natural_rubber_round"));
  });
});

describe("cleanEase", () => {
  it("one piece hospital easiest to clean", () => {
    expect(cleanEase("one_piece_hospital")).toBeGreaterThan(cleanEase("fruit_feeder_mesh"));
  });
});

describe("pacifierCost", () => {
  it("fruit feeder mesh most expensive", () => {
    expect(pacifierCost("fruit_feeder_mesh")).toBeGreaterThan(pacifierCost("one_piece_hospital"));
  });
});

describe("bpaFree", () => {
  it("all pacifiers are bpa free", () => {
    expect(bpaFree("orthodontic_silicone")).toBe(true);
    expect(bpaFree("natural_rubber_round")).toBe(true);
  });
});

describe("dishwasherSafe", () => {
  it("orthodontic silicone is dishwasher safe", () => {
    expect(dishwasherSafe("orthodontic_silicone")).toBe(true);
  });
  it("natural rubber round is not", () => {
    expect(dishwasherSafe("natural_rubber_round")).toBe(false);
  });
});

describe("nippleMaterial", () => {
  it("natural rubber round uses natural latex cherry round", () => {
    expect(nippleMaterial("natural_rubber_round")).toBe("natural_latex_cherry_round");
  });
});

describe("bestAge", () => {
  it("one piece hospital best for preemie nicu first days", () => {
    expect(bestAge("one_piece_hospital")).toBe("preemie_nicu_first_days");
  });
});

describe("pacifiers", () => {
  it("returns 5 types", () => {
    expect(pacifiers()).toHaveLength(5);
  });
});
