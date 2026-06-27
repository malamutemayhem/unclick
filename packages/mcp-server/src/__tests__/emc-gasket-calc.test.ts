import { describe, it, expect } from "vitest";
import {
  shieldEffect, compression, durability, envResist,
  gasketCost, reusable, forOutdoor, material,
  bestUse, emcGaskets,
} from "../emc-gasket-calc.js";

describe("shieldEffect", () => {
  it("beryllium copper finger best shield effect", () => {
    expect(shieldEffect("beryllium_copper_finger")).toBeGreaterThan(shieldEffect("fabric_over_foam"));
  });
});

describe("compression", () => {
  it("conductive elastomer best compression", () => {
    expect(compression("conductive_elastomer")).toBeGreaterThan(compression("spiral_wound_metal"));
  });
});

describe("durability", () => {
  it("spiral wound metal most durable", () => {
    expect(durability("spiral_wound_metal")).toBeGreaterThan(durability("fabric_over_foam"));
  });
});

describe("envResist", () => {
  it("spiral wound metal best env resist", () => {
    expect(envResist("spiral_wound_metal")).toBeGreaterThan(envResist("fabric_over_foam"));
  });
});

describe("gasketCost", () => {
  it("spiral wound metal most expensive", () => {
    expect(gasketCost("spiral_wound_metal")).toBeGreaterThan(gasketCost("fabric_over_foam"));
  });
});

describe("reusable", () => {
  it("beryllium copper finger is reusable", () => {
    expect(reusable("beryllium_copper_finger")).toBe(true);
  });
  it("conductive elastomer not reusable", () => {
    expect(reusable("conductive_elastomer")).toBe(false);
  });
});

describe("forOutdoor", () => {
  it("conductive elastomer is for outdoor", () => {
    expect(forOutdoor("conductive_elastomer")).toBe(true);
  });
  it("beryllium copper finger not for outdoor", () => {
    expect(forOutdoor("beryllium_copper_finger")).toBe(false);
  });
});

describe("material", () => {
  it("wire mesh strip uses knitted monel mesh", () => {
    expect(material("wire_mesh_strip")).toBe("knitted_monel_mesh");
  });
});

describe("bestUse", () => {
  it("fabric over foam best for low cost cover gasket", () => {
    expect(bestUse("fabric_over_foam")).toBe("low_cost_cover_gasket");
  });
});

describe("emcGaskets", () => {
  it("returns 5 types", () => {
    expect(emcGaskets()).toHaveLength(5);
  });
});
