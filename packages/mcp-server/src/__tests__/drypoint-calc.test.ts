import { describe, it, expect } from "vitest";
import {
  lineQuality, burrControl, durability, plateRange,
  drypointCost, forMetal, powered, tipMaterial,
  bestUse, drypoints,
} from "../drypoint-calc.js";

describe("lineQuality", () => {
  it("diamond point hard best line quality", () => {
    expect(lineQuality("diamond_point_hard")).toBeGreaterThan(lineQuality("roulette_wheel_texture"));
  });
});

describe("burrControl", () => {
  it("sapphire tip fine best burr control", () => {
    expect(burrControl("sapphire_tip_fine")).toBeGreaterThan(burrControl("roulette_wheel_texture"));
  });
});

describe("durability", () => {
  it("diamond point hard most durable", () => {
    expect(durability("diamond_point_hard")).toBeGreaterThan(durability("steel_needle_standard"));
  });
});

describe("plateRange", () => {
  it("diamond point hard widest plate range", () => {
    expect(plateRange("diamond_point_hard")).toBeGreaterThan(plateRange("roulette_wheel_texture"));
  });
});

describe("drypointCost", () => {
  it("diamond point hard most expensive", () => {
    expect(drypointCost("diamond_point_hard")).toBeGreaterThan(drypointCost("steel_needle_standard"));
  });
});

describe("forMetal", () => {
  it("diamond point hard is for metal", () => {
    expect(forMetal("diamond_point_hard")).toBe(true);
  });
  it("steel needle standard not for metal", () => {
    expect(forMetal("steel_needle_standard")).toBe(false);
  });
});

describe("powered", () => {
  it("steel needle standard not powered", () => {
    expect(powered("steel_needle_standard")).toBe(false);
  });
  it("diamond point hard not powered", () => {
    expect(powered("diamond_point_hard")).toBe(false);
  });
});

describe("tipMaterial", () => {
  it("carbide scribe durable uses tungsten carbide tip", () => {
    expect(tipMaterial("carbide_scribe_durable")).toBe("tungsten_carbide_tip");
  });
});

describe("bestUse", () => {
  it("steel needle standard best for general drypoint line", () => {
    expect(bestUse("steel_needle_standard")).toBe("general_drypoint_line");
  });
});

describe("drypoints", () => {
  it("returns 5 types", () => {
    expect(drypoints()).toHaveLength(5);
  });
});
