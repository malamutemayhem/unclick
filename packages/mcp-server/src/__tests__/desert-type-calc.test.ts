import { describe, it, expect } from "vitest";
import {
  avgTempCelsius, annualRainfallMm, diurnalRangeCelsius,
  sandDuneCoverage, vegetationCover, fogMoisture,
  permafrost, exampleDesert, solarPotential, desertTypes,
} from "../desert-type-calc.js";

describe("avgTempCelsius", () => {
  it("hot sandy is warmest", () => {
    expect(avgTempCelsius("hot_sandy")).toBeGreaterThan(
      avgTempCelsius("polar")
    );
  });
});

describe("annualRainfallMm", () => {
  it("rain shadow gets most rain", () => {
    expect(annualRainfallMm("rain_shadow")).toBeGreaterThan(
      annualRainfallMm("hot_sandy")
    );
  });
});

describe("diurnalRangeCelsius", () => {
  it("hot sandy has largest diurnal range", () => {
    expect(diurnalRangeCelsius("hot_sandy")).toBeGreaterThan(
      diurnalRangeCelsius("coastal")
    );
  });
});

describe("sandDuneCoverage", () => {
  it("hot sandy has most dune coverage", () => {
    expect(sandDuneCoverage("hot_sandy")).toBeGreaterThan(
      sandDuneCoverage("polar")
    );
  });
});

describe("vegetationCover", () => {
  it("rain shadow has most vegetation", () => {
    expect(vegetationCover("rain_shadow")).toBeGreaterThan(
      vegetationCover("polar")
    );
  });
});

describe("fogMoisture", () => {
  it("coastal has fog moisture", () => {
    expect(fogMoisture("coastal")).toBe(true);
  });
  it("hot sandy does not", () => {
    expect(fogMoisture("hot_sandy")).toBe(false);
  });
});

describe("permafrost", () => {
  it("polar has permafrost", () => {
    expect(permafrost("polar")).toBe(true);
  });
  it("hot sandy does not", () => {
    expect(permafrost("hot_sandy")).toBe(false);
  });
});

describe("exampleDesert", () => {
  it("hot sandy example is sahara", () => {
    expect(exampleDesert("hot_sandy")).toBe("sahara");
  });
});

describe("solarPotential", () => {
  it("hot sandy has highest solar potential", () => {
    expect(solarPotential("hot_sandy")).toBeGreaterThan(
      solarPotential("polar")
    );
  });
});

describe("desertTypes", () => {
  it("returns 5 types", () => {
    expect(desertTypes()).toHaveLength(5);
  });
});
