import { describe, it, expect } from "vitest";
import {
  durability, engagement, mentalStimulation, safetyRating,
  toyCost, holdsTreats, machineWashable, toyMaterial,
  bestPlayStyle, petToys,
} from "../pet-toy-calc.js";

describe("durability", () => {
  it("rubber kong stuff most durable", () => {
    expect(durability("rubber_kong_stuff")).toBeGreaterThan(durability("plush_squeaker_soft"));
  });
});

describe("engagement", () => {
  it("puzzle treat dispense highest engagement", () => {
    expect(engagement("puzzle_treat_dispense")).toBeGreaterThan(engagement("plush_squeaker_soft"));
  });
});

describe("mentalStimulation", () => {
  it("puzzle treat dispense best mental stimulation", () => {
    expect(mentalStimulation("puzzle_treat_dispense")).toBeGreaterThan(mentalStimulation("rope_tug_knot"));
  });
});

describe("safetyRating", () => {
  it("rubber kong stuff highest safety rating", () => {
    expect(safetyRating("rubber_kong_stuff")).toBeGreaterThan(safetyRating("plush_squeaker_soft"));
  });
});

describe("toyCost", () => {
  it("puzzle treat dispense most expensive", () => {
    expect(toyCost("puzzle_treat_dispense")).toBeGreaterThan(toyCost("ball_tennis_fetch"));
  });
});

describe("holdsTreats", () => {
  it("rubber kong stuff holds treats", () => {
    expect(holdsTreats("rubber_kong_stuff")).toBe(true);
  });
  it("rope tug knot does not", () => {
    expect(holdsTreats("rope_tug_knot")).toBe(false);
  });
});

describe("machineWashable", () => {
  it("plush squeaker soft is machine washable", () => {
    expect(machineWashable("plush_squeaker_soft")).toBe(true);
  });
  it("ball tennis fetch is not", () => {
    expect(machineWashable("ball_tennis_fetch")).toBe(false);
  });
});

describe("toyMaterial", () => {
  it("rubber kong stuff uses natural rubber vulcanized", () => {
    expect(toyMaterial("rubber_kong_stuff")).toBe("natural_rubber_vulcanized");
  });
});

describe("bestPlayStyle", () => {
  it("puzzle treat dispense best for boredom buster slow feed", () => {
    expect(bestPlayStyle("puzzle_treat_dispense")).toBe("boredom_buster_slow_feed");
  });
});

describe("petToys", () => {
  it("returns 5 types", () => {
    expect(petToys()).toHaveLength(5);
  });
});
