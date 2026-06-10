import { describe, it, expect } from "vitest";
import {
  salinityPpt, speciesAdaptation, oxygenContent,
  evaporationRate, humanUsability, drinkable,
  supportsCoralReefs, typicalEnvironment, keySpecies, salinityZones,
} from "../salinity-zone-calc.js";

describe("salinityPpt", () => {
  it("brine pool is saltiest", () => {
    expect(salinityPpt("brine_pool")).toBeGreaterThan(
      salinityPpt("freshwater")
    );
  });
});

describe("speciesAdaptation", () => {
  it("marine has most species", () => {
    expect(speciesAdaptation("marine")).toBeGreaterThan(
      speciesAdaptation("brine_pool")
    );
  });
});

describe("oxygenContent", () => {
  it("freshwater has most oxygen", () => {
    expect(oxygenContent("freshwater")).toBeGreaterThan(
      oxygenContent("brine_pool")
    );
  });
});

describe("evaporationRate", () => {
  it("brine pool evaporates fastest", () => {
    expect(evaporationRate("brine_pool")).toBeGreaterThan(
      evaporationRate("freshwater")
    );
  });
});

describe("humanUsability", () => {
  it("freshwater most usable", () => {
    expect(humanUsability("freshwater")).toBeGreaterThan(
      humanUsability("marine")
    );
  });
});

describe("drinkable", () => {
  it("freshwater is drinkable", () => {
    expect(drinkable("freshwater")).toBe(true);
  });
  it("marine is not", () => {
    expect(drinkable("marine")).toBe(false);
  });
});

describe("supportsCoralReefs", () => {
  it("marine supports coral", () => {
    expect(supportsCoralReefs("marine")).toBe(true);
  });
  it("freshwater does not", () => {
    expect(supportsCoralReefs("freshwater")).toBe(false);
  });
});

describe("typicalEnvironment", () => {
  it("brackish is estuary", () => {
    expect(typicalEnvironment("brackish")).toBe("estuary");
  });
});

describe("keySpecies", () => {
  it("freshwater has trout", () => {
    expect(keySpecies("freshwater")).toBe("trout");
  });
});

describe("salinityZones", () => {
  it("returns 5 zones", () => {
    expect(salinityZones()).toHaveLength(5);
  });
});
