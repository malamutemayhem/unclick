import { describe, it, expect } from "vitest";
import {
  formationTemperature, hardnessScale, porosity,
  weatheringResistance, fossilLikelihood, crystalline,
  formedUnderground, exampleRock, formationProcess, rockTypes,
} from "../rock-cycle-calc.js";

describe("formationTemperature", () => {
  it("volcanic forms at highest temp", () => {
    expect(formationTemperature("volcanic")).toBeGreaterThan(
      formationTemperature("sedimentary")
    );
  });
});

describe("hardnessScale", () => {
  it("metamorphic is hardest", () => {
    expect(hardnessScale("metamorphic")).toBeGreaterThan(
      hardnessScale("sedimentary")
    );
  });
});

describe("porosity", () => {
  it("volcanic most porous", () => {
    expect(porosity("volcanic")).toBeGreaterThan(
      porosity("plutonic")
    );
  });
});

describe("weatheringResistance", () => {
  it("metamorphic most resistant", () => {
    expect(weatheringResistance("metamorphic")).toBeGreaterThan(
      weatheringResistance("sedimentary")
    );
  });
});

describe("fossilLikelihood", () => {
  it("sedimentary most likely to have fossils", () => {
    expect(fossilLikelihood("sedimentary")).toBeGreaterThan(
      fossilLikelihood("igneous")
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

describe("formedUnderground", () => {
  it("plutonic formed underground", () => {
    expect(formedUnderground("plutonic")).toBe(true);
  });
  it("volcanic is not", () => {
    expect(formedUnderground("volcanic")).toBe(false);
  });
});

describe("exampleRock", () => {
  it("metamorphic example is marble", () => {
    expect(exampleRock("metamorphic")).toBe("marble");
  });
});

describe("formationProcess", () => {
  it("sedimentary forms by compaction", () => {
    expect(formationProcess("sedimentary")).toBe("compaction");
  });
});

describe("rockTypes", () => {
  it("returns 5 types", () => {
    expect(rockTypes()).toHaveLength(5);
  });
});
