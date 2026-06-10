import { describe, it, expect } from "vitest";
import {
  footworkDrill, portability, durability, drillVariety,
  ladderCost, laysFlat, adjustableSpacing, rungMaterial,
  bestSport, speedLadders,
} from "../speed-ladder-calc.js";

describe("footworkDrill", () => {
  it("hex ring grid best footwork drill", () => {
    expect(footworkDrill("hex_ring_grid")).toBeGreaterThan(footworkDrill("round_rung_elevated"));
  });
});

describe("portability", () => {
  it("flat rung standard most portable", () => {
    expect(portability("flat_rung_standard")).toBeGreaterThan(portability("hex_ring_grid"));
  });
});

describe("durability", () => {
  it("hex ring grid most durable", () => {
    expect(durability("hex_ring_grid")).toBeGreaterThan(durability("flat_rung_standard"));
  });
});

describe("drillVariety", () => {
  it("hex ring grid most drill variety", () => {
    expect(drillVariety("hex_ring_grid")).toBeGreaterThan(drillVariety("round_rung_elevated"));
  });
});

describe("ladderCost", () => {
  it("hex ring grid most expensive", () => {
    expect(ladderCost("hex_ring_grid")).toBeGreaterThan(ladderCost("flat_rung_standard"));
  });
});

describe("laysFlat", () => {
  it("flat rung standard lays flat", () => {
    expect(laysFlat("flat_rung_standard")).toBe(true);
  });
  it("round rung elevated does not lay flat", () => {
    expect(laysFlat("round_rung_elevated")).toBe(false);
  });
});

describe("adjustableSpacing", () => {
  it("adjustable spacing custom has adjustable spacing", () => {
    expect(adjustableSpacing("adjustable_spacing_custom")).toBe(true);
  });
  it("flat rung standard has no adjustable spacing", () => {
    expect(adjustableSpacing("flat_rung_standard")).toBe(false);
  });
});

describe("rungMaterial", () => {
  it("hex ring grid uses polypropylene hex", () => {
    expect(rungMaterial("hex_ring_grid")).toBe("polypropylene_hex");
  });
});

describe("bestSport", () => {
  it("flat rung standard best for soccer footwork drill", () => {
    expect(bestSport("flat_rung_standard")).toBe("soccer_footwork_drill");
  });
});

describe("speedLadders", () => {
  it("returns 5 types", () => {
    expect(speedLadders()).toHaveLength(5);
  });
});
