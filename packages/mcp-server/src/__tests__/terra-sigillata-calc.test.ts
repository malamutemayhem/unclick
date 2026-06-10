import { describe, it, expect } from "vitest";
import {
  settleDays, defloccWaterRatio, sodiumSilicateGPerLiter, applicationCoats,
  burnishRequired, firingTempCelsius, sheenRating, colorRange, costPerKg, clayTypes,
} from "../terra-sigillata-calc.js";

describe("settleDays", () => {
  it("kaolin takes longest", () => {
    expect(settleDays("kaolin")).toBeGreaterThan(settleDays("red_earthenware"));
  });
});

describe("defloccWaterRatio", () => {
  it("kaolin needs most water", () => {
    expect(defloccWaterRatio("kaolin")).toBeGreaterThan(defloccWaterRatio("red_earthenware"));
  });
});

describe("sodiumSilicateGPerLiter", () => {
  it("kaolin needs most deflocculant", () => {
    expect(sodiumSilicateGPerLiter("kaolin")).toBeGreaterThan(
      sodiumSilicateGPerLiter("red_earthenware")
    );
  });
});

describe("applicationCoats", () => {
  it("returns 3", () => {
    expect(applicationCoats()).toBe(3);
  });
});

describe("burnishRequired", () => {
  it("returns true", () => {
    expect(burnishRequired()).toBe(true);
  });
});

describe("firingTempCelsius", () => {
  it("fireclay fires hottest", () => {
    expect(firingTempCelsius("fireclay")).toBeGreaterThan(
      firingTempCelsius("red_earthenware")
    );
  });
});

describe("sheenRating", () => {
  it("red earthenware has best sheen", () => {
    expect(sheenRating("red_earthenware")).toBeGreaterThan(sheenRating("kaolin"));
  });
});

describe("colorRange", () => {
  it("red earthenware is red_orange", () => {
    expect(colorRange("red_earthenware")).toBe("red_orange");
  });
  it("kaolin is white", () => {
    expect(colorRange("kaolin")).toBe("white");
  });
});

describe("costPerKg", () => {
  it("kaolin is most expensive", () => {
    expect(costPerKg("kaolin")).toBeGreaterThan(costPerKg("red_earthenware"));
  });
});

describe("clayTypes", () => {
  it("returns 5 types", () => {
    expect(clayTypes()).toHaveLength(5);
  });
});
