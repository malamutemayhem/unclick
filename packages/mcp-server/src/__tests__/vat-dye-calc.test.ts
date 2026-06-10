import { describe, it, expect } from "vitest";
import {
  reductionPh, vatTempCelsius, dipsRequired, lightfastnessRating,
  washfastnessRating, reducingAgent, oxidationTimeMinutes,
  historicalOrigin, costPerKg, vatDyeTypes,
} from "../vat-dye-calc.js";

describe("reductionPh", () => {
  it("tyrian purple needs highest pH", () => {
    expect(reductionPh("tyrian_purple")).toBeGreaterThan(
      reductionPh("logwood")
    );
  });
});

describe("vatTempCelsius", () => {
  it("tyrian purple needs highest temp", () => {
    expect(vatTempCelsius("tyrian_purple")).toBeGreaterThan(
      vatTempCelsius("logwood")
    );
  });
});

describe("dipsRequired", () => {
  it("tyrian purple needs most dips", () => {
    expect(dipsRequired("tyrian_purple")).toBeGreaterThan(
      dipsRequired("logwood")
    );
  });
});

describe("lightfastnessRating", () => {
  it("tyrian purple is most lightfast", () => {
    expect(lightfastnessRating("tyrian_purple")).toBeGreaterThan(
      lightfastnessRating("logwood")
    );
  });
});

describe("washfastnessRating", () => {
  it("tyrian purple is most washfast", () => {
    expect(washfastnessRating("tyrian_purple")).toBeGreaterThan(
      washfastnessRating("logwood")
    );
  });
});

describe("reducingAgent", () => {
  it("indigo uses fructose", () => {
    expect(reducingAgent("indigo")).toBe("fructose");
  });
});

describe("oxidationTimeMinutes", () => {
  it("tyrian purple oxidizes longest", () => {
    expect(oxidationTimeMinutes("tyrian_purple")).toBeGreaterThan(
      oxidationTimeMinutes("logwood")
    );
  });
});

describe("historicalOrigin", () => {
  it("indigo comes from india", () => {
    expect(historicalOrigin("indigo")).toBe("india");
  });
});

describe("costPerKg", () => {
  it("tyrian purple is most expensive", () => {
    expect(costPerKg("tyrian_purple")).toBeGreaterThan(
      costPerKg("synthetic_indigo")
    );
  });
});

describe("vatDyeTypes", () => {
  it("returns 5 types", () => {
    expect(vatDyeTypes()).toHaveLength(5);
  });
});
