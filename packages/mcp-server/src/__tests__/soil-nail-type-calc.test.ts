import { describe, it, expect } from "vitest";
import {
  pullout, speed, depth, versatility,
  snCost, grouted, forTemporary, installation,
  bestUse, soilNailTypes,
} from "../soil-nail-type-calc.js";

describe("pullout", () => {
  it("grouted highest pullout", () => {
    expect(pullout("grouted_drill_hollow")).toBeGreaterThan(pullout("launched_compressed_air"));
  });
});

describe("speed", () => {
  it("launched fastest", () => {
    expect(speed("launched_compressed_air")).toBeGreaterThan(speed("grouted_drill_hollow"));
  });
});

describe("depth", () => {
  it("grouted deepest", () => {
    expect(depth("grouted_drill_hollow")).toBeGreaterThan(depth("driven_steel_bar"));
  });
});

describe("versatility", () => {
  it("self drilling most versatile", () => {
    expect(versatility("self_drilling_sacrificial")).toBeGreaterThan(versatility("launched_compressed_air"));
  });
});

describe("snCost", () => {
  it("self drilling most expensive", () => {
    expect(snCost("self_drilling_sacrificial")).toBeGreaterThan(snCost("driven_steel_bar"));
  });
});

describe("grouted", () => {
  it("grouted drill is grouted", () => {
    expect(grouted("grouted_drill_hollow")).toBe(true);
  });
  it("driven not grouted", () => {
    expect(grouted("driven_steel_bar")).toBe(false);
  });
});

describe("forTemporary", () => {
  it("driven for temporary", () => {
    expect(forTemporary("driven_steel_bar")).toBe(true);
  });
  it("grouted not for temporary", () => {
    expect(forTemporary("grouted_drill_hollow")).toBe(false);
  });
});

describe("installation", () => {
  it("launched uses compressed air", () => {
    expect(installation("launched_compressed_air")).toBe("compressed_air_ballistic_launch");
  });
});

describe("bestUse", () => {
  it("driven for temporary excavation", () => {
    expect(bestUse("driven_steel_bar")).toBe("temporary_excavation_support");
  });
});

describe("soilNailTypes", () => {
  it("returns 5 types", () => {
    expect(soilNailTypes()).toHaveLength(5);
  });
});
