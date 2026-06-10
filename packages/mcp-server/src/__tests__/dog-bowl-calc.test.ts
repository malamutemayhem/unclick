import { describe, it, expect } from "vitest";
import {
  durability, eatingPace, neckComfort, portability,
  bowlCost, dishwasherSafe, nonSlip, bowlMaterial,
  bestDog, dogBowls,
} from "../dog-bowl-calc.js";

describe("durability", () => {
  it("stainless steel basic most durable", () => {
    expect(durability("stainless_steel_basic")).toBeGreaterThan(durability("travel_collapsible"));
  });
});

describe("eatingPace", () => {
  it("slow feeder maze best eating pace control", () => {
    expect(eatingPace("slow_feeder_maze")).toBeGreaterThan(eatingPace("stainless_steel_basic"));
  });
});

describe("neckComfort", () => {
  it("elevated raised most neck comfort", () => {
    expect(neckComfort("elevated_raised")).toBeGreaterThan(neckComfort("stainless_steel_basic"));
  });
});

describe("portability", () => {
  it("travel collapsible most portable", () => {
    expect(portability("travel_collapsible")).toBeGreaterThan(portability("automatic_gravity"));
  });
});

describe("bowlCost", () => {
  it("automatic gravity most expensive", () => {
    expect(bowlCost("automatic_gravity")).toBeGreaterThan(bowlCost("stainless_steel_basic"));
  });
});

describe("dishwasherSafe", () => {
  it("stainless steel basic is dishwasher safe", () => {
    expect(dishwasherSafe("stainless_steel_basic")).toBe(true);
  });
  it("travel collapsible is not", () => {
    expect(dishwasherSafe("travel_collapsible")).toBe(false);
  });
});

describe("nonSlip", () => {
  it("stainless steel basic is non slip", () => {
    expect(nonSlip("stainless_steel_basic")).toBe(true);
  });
  it("travel collapsible is not", () => {
    expect(nonSlip("travel_collapsible")).toBe(false);
  });
});

describe("bowlMaterial", () => {
  it("slow feeder maze uses bpa free plastic ridge", () => {
    expect(bowlMaterial("slow_feeder_maze")).toBe("bpa_free_plastic_ridge");
  });
});

describe("bestDog", () => {
  it("elevated raised for large breed senior", () => {
    expect(bestDog("elevated_raised")).toBe("large_breed_senior");
  });
});

describe("dogBowls", () => {
  it("returns 5 types", () => {
    expect(dogBowls()).toHaveLength(5);
  });
});
