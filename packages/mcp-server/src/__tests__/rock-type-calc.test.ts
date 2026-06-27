import { describe, it, expect } from "vitest";
import {
  hardnessRange, densityGCm3, porosity,
  weatheringResistance, fossilContent, crystalline,
  layered, exampleRock, buildingMaterialValue, rockTypes,
} from "../rock-type-calc.js";

describe("hardnessRange", () => {
  it("plutonic is hardest", () => {
    expect(hardnessRange("plutonic")).toBeGreaterThan(
      hardnessRange("sedimentary")
    );
  });
});

describe("densityGCm3", () => {
  it("plutonic is densest", () => {
    expect(densityGCm3("plutonic")).toBeGreaterThan(
      densityGCm3("sedimentary")
    );
  });
});

describe("porosity", () => {
  it("sedimentary is most porous", () => {
    expect(porosity("sedimentary")).toBeGreaterThan(
      porosity("plutonic")
    );
  });
});

describe("weatheringResistance", () => {
  it("plutonic resists weathering best", () => {
    expect(weatheringResistance("plutonic")).toBeGreaterThan(
      weatheringResistance("sedimentary")
    );
  });
});

describe("fossilContent", () => {
  it("sedimentary has most fossils", () => {
    expect(fossilContent("sedimentary")).toBeGreaterThan(
      fossilContent("igneous")
    );
  });
});

describe("crystalline", () => {
  it("igneous is crystalline", () => {
    expect(crystalline("igneous")).toBe(true);
  });
  it("sedimentary is not", () => {
    expect(crystalline("sedimentary")).toBe(false);
  });
});

describe("layered", () => {
  it("sedimentary is layered", () => {
    expect(layered("sedimentary")).toBe(true);
  });
  it("igneous is not", () => {
    expect(layered("igneous")).toBe(false);
  });
});

describe("exampleRock", () => {
  it("igneous example is granite", () => {
    expect(exampleRock("igneous")).toBe("granite");
  });
});

describe("buildingMaterialValue", () => {
  it("metamorphic has highest building value", () => {
    expect(buildingMaterialValue("metamorphic")).toBeGreaterThan(
      buildingMaterialValue("volcanic")
    );
  });
});

describe("rockTypes", () => {
  it("returns 5 types", () => {
    expect(rockTypes()).toHaveLength(5);
  });
});
