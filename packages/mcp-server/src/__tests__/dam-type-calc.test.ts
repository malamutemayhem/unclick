import { describe, it, expect } from "vitest";
import {
  heightPotentialM, materialVolume, constructionSpeed,
  seismicResistance, costPerMegawatt, requiresNarrowValley,
  usesEarthFill, famousExample, failureMode, damTypes,
} from "../dam-type-calc.js";

describe("heightPotentialM", () => {
  it("arch tallest potential", () => {
    expect(heightPotentialM("arch")).toBeGreaterThan(
      heightPotentialM("buttress")
    );
  });
});

describe("materialVolume", () => {
  it("embankment most material", () => {
    expect(materialVolume("embankment")).toBeGreaterThan(
      materialVolume("arch")
    );
  });
});

describe("constructionSpeed", () => {
  it("roller_compacted fastest", () => {
    expect(constructionSpeed("roller_compacted")).toBeGreaterThan(
      constructionSpeed("arch")
    );
  });
});

describe("seismicResistance", () => {
  it("gravity best seismic resistance", () => {
    expect(seismicResistance("gravity")).toBeGreaterThan(
      seismicResistance("embankment")
    );
  });
});

describe("costPerMegawatt", () => {
  it("arch most expensive per megawatt", () => {
    expect(costPerMegawatt("arch")).toBeGreaterThan(
      costPerMegawatt("roller_compacted")
    );
  });
});

describe("requiresNarrowValley", () => {
  it("arch requires narrow valley", () => {
    expect(requiresNarrowValley("arch")).toBe(true);
  });
  it("gravity does not", () => {
    expect(requiresNarrowValley("gravity")).toBe(false);
  });
});

describe("usesEarthFill", () => {
  it("embankment uses earth fill", () => {
    expect(usesEarthFill("embankment")).toBe(true);
  });
  it("gravity does not", () => {
    expect(usesEarthFill("gravity")).toBe(false);
  });
});

describe("famousExample", () => {
  it("arch example is hoover dam", () => {
    expect(famousExample("arch")).toBe("hoover_dam");
  });
});

describe("failureMode", () => {
  it("embankment fails by piping erosion", () => {
    expect(failureMode("embankment")).toBe("piping_erosion");
  });
});

describe("damTypes", () => {
  it("returns 5 types", () => {
    expect(damTypes()).toHaveLength(5);
  });
});
