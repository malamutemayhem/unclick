import { describe, it, expect } from "vitest";
import {
  lightBlock, comfort, breathability, portability,
  maskCost, washable, adjustableStrap, maskMaterial,
  bestUse, eyeMasks,
} from "../eye-mask-calc.js";

describe("lightBlock", () => {
  it("memory foam molded best light block", () => {
    expect(lightBlock("memory_foam_molded")).toBeGreaterThan(lightBlock("cooling_gel_insert"));
  });
});

describe("comfort", () => {
  it("silk contoured most comfortable", () => {
    expect(comfort("silk_contoured")).toBeGreaterThan(comfort("light_block_travel"));
  });
});

describe("breathability", () => {
  it("silk contoured most breathable", () => {
    expect(breathability("silk_contoured")).toBeGreaterThan(breathability("cooling_gel_insert"));
  });
});

describe("portability", () => {
  it("light block travel most portable", () => {
    expect(portability("light_block_travel")).toBeGreaterThan(portability("weighted_pressure"));
  });
});

describe("maskCost", () => {
  it("weighted pressure most expensive", () => {
    expect(maskCost("weighted_pressure")).toBeGreaterThan(maskCost("light_block_travel"));
  });
});

describe("washable", () => {
  it("silk contoured is washable", () => {
    expect(washable("silk_contoured")).toBe(true);
  });
  it("memory foam molded is not", () => {
    expect(washable("memory_foam_molded")).toBe(false);
  });
});

describe("adjustableStrap", () => {
  it("all masks have adjustable strap", () => {
    expect(adjustableStrap("silk_contoured")).toBe(true);
    expect(adjustableStrap("light_block_travel")).toBe(true);
  });
});

describe("maskMaterial", () => {
  it("weighted pressure uses micro glass bead cotton", () => {
    expect(maskMaterial("weighted_pressure")).toBe("micro_glass_bead_cotton");
  });
});

describe("bestUse", () => {
  it("cooling gel insert best for migraine puffy eye relief", () => {
    expect(bestUse("cooling_gel_insert")).toBe("migraine_puffy_eye_relief");
  });
});

describe("eyeMasks", () => {
  it("returns 5 types", () => {
    expect(eyeMasks()).toHaveLength(5);
  });
});
