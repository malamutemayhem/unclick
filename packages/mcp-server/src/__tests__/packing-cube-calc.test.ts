import { describe, it, expect } from "vitest";
import {
  organization, spaceEfficiency, wrinkleReduce, durability,
  cubeCost, seeThrough, waterResistant, fabricType,
  bestPacker, packingCubes,
} from "../packing-cube-calc.js";

describe("organization", () => {
  it("garment folder best organization", () => {
    expect(organization("garment_folder")).toBeGreaterThan(organization("waterproof_roll"));
  });
});

describe("spaceEfficiency", () => {
  it("compression zip best space efficiency", () => {
    expect(spaceEfficiency("compression_zip")).toBeGreaterThan(spaceEfficiency("mesh_top_basic"));
  });
});

describe("wrinkleReduce", () => {
  it("garment folder best wrinkle reduction", () => {
    expect(wrinkleReduce("garment_folder")).toBeGreaterThan(wrinkleReduce("compression_zip"));
  });
});

describe("durability", () => {
  it("waterproof roll most durable", () => {
    expect(durability("waterproof_roll")).toBeGreaterThan(durability("mesh_top_basic"));
  });
});

describe("cubeCost", () => {
  it("waterproof roll most expensive", () => {
    expect(cubeCost("waterproof_roll")).toBeGreaterThan(cubeCost("mesh_top_basic"));
  });
});

describe("seeThrough", () => {
  it("mesh top basic is see through", () => {
    expect(seeThrough("mesh_top_basic")).toBe(true);
  });
  it("compression zip is not", () => {
    expect(seeThrough("compression_zip")).toBe(false);
  });
});

describe("waterResistant", () => {
  it("waterproof roll is water resistant", () => {
    expect(waterResistant("waterproof_roll")).toBe(true);
  });
  it("mesh top basic is not", () => {
    expect(waterResistant("mesh_top_basic")).toBe(false);
  });
});

describe("fabricType", () => {
  it("compression zip uses double zip cordura", () => {
    expect(fabricType("compression_zip")).toBe("double_zip_cordura");
  });
});

describe("bestPacker", () => {
  it("garment folder for business suit dress", () => {
    expect(bestPacker("garment_folder")).toBe("business_suit_dress");
  });
});

describe("packingCubes", () => {
  it("returns 5 types", () => {
    expect(packingCubes()).toHaveLength(5);
  });
});
