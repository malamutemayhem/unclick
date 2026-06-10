import { describe, it, expect } from "vitest";
import {
  waterDistribution, flexibility, durability, waterEfficiency,
  hoseCost, buriable, pressureRegulated, wallConstruction,
  bestGarden, soakerHoses,
} from "../soaker-hose-calc.js";

describe("waterDistribution", () => {
  it("drip line emitter built best water distribution", () => {
    expect(waterDistribution("drip_line_emitter_built")).toBeGreaterThan(waterDistribution("recycled_tire_rubber"));
  });
});

describe("flexibility", () => {
  it("flat weeping tape most flexible", () => {
    expect(flexibility("flat_weeping_tape")).toBeGreaterThan(flexibility("soaker_ring_tree_base"));
  });
});

describe("durability", () => {
  it("drip line emitter built most durable", () => {
    expect(durability("drip_line_emitter_built")).toBeGreaterThan(durability("flat_weeping_tape"));
  });
});

describe("waterEfficiency", () => {
  it("drip line emitter built most water efficient", () => {
    expect(waterEfficiency("drip_line_emitter_built")).toBeGreaterThan(waterEfficiency("recycled_tire_rubber"));
  });
});

describe("hoseCost", () => {
  it("drip line emitter built most expensive", () => {
    expect(hoseCost("drip_line_emitter_built")).toBeGreaterThan(hoseCost("flat_weeping_tape"));
  });
});

describe("buriable", () => {
  it("round porous rubber is buriable", () => {
    expect(buriable("round_porous_rubber")).toBe(true);
  });
  it("soaker ring tree base is not buriable", () => {
    expect(buriable("soaker_ring_tree_base")).toBe(false);
  });
});

describe("pressureRegulated", () => {
  it("drip line emitter built is pressure regulated", () => {
    expect(pressureRegulated("drip_line_emitter_built")).toBe(true);
  });
  it("round porous rubber is not pressure regulated", () => {
    expect(pressureRegulated("round_porous_rubber")).toBe(false);
  });
});

describe("wallConstruction", () => {
  it("recycled tire rubber uses ground tire crumb", () => {
    expect(wallConstruction("recycled_tire_rubber")).toBe("ground_tire_crumb");
  });
});

describe("bestGarden", () => {
  it("drip line emitter built best for precision orchard drip", () => {
    expect(bestGarden("drip_line_emitter_built")).toBe("precision_orchard_drip");
  });
});

describe("soakerHoses", () => {
  it("returns 5 types", () => {
    expect(soakerHoses()).toHaveLength(5);
  });
});
