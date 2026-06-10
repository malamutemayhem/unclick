import { describe, it, expect } from "vitest";
import {
  salinityPpt, tidalRangeMeters, nurseryProductivity,
  sedimentLoad, biodiversity, hasSandBar,
  glacialOrigin, exampleLocation, floodRisk, estuaryTypes,
} from "../estuary-type-calc.js";

describe("salinityPpt", () => {
  it("fjord has highest salinity", () => {
    expect(salinityPpt("fjord")).toBeGreaterThan(salinityPpt("delta"));
  });
});

describe("tidalRangeMeters", () => {
  it("fjord has highest tidal range", () => {
    expect(tidalRangeMeters("fjord")).toBeGreaterThan(
      tidalRangeMeters("bar_built")
    );
  });
});

describe("nurseryProductivity", () => {
  it("delta is most productive nursery", () => {
    expect(nurseryProductivity("delta")).toBeGreaterThan(
      nurseryProductivity("fjord")
    );
  });
});

describe("sedimentLoad", () => {
  it("delta has highest sediment load", () => {
    expect(sedimentLoad("delta")).toBeGreaterThan(
      sedimentLoad("fjord")
    );
  });
});

describe("biodiversity", () => {
  it("delta has highest biodiversity", () => {
    expect(biodiversity("delta")).toBeGreaterThan(
      biodiversity("fjord")
    );
  });
});

describe("hasSandBar", () => {
  it("bar built has sand bar", () => {
    expect(hasSandBar("bar_built")).toBe(true);
  });
  it("fjord does not", () => {
    expect(hasSandBar("fjord")).toBe(false);
  });
});

describe("glacialOrigin", () => {
  it("fjord has glacial origin", () => {
    expect(glacialOrigin("fjord")).toBe(true);
  });
  it("delta does not", () => {
    expect(glacialOrigin("delta")).toBe(false);
  });
});

describe("exampleLocation", () => {
  it("delta example is nile", () => {
    expect(exampleLocation("delta")).toBe("nile_delta");
  });
});

describe("floodRisk", () => {
  it("delta has highest flood risk", () => {
    expect(floodRisk("delta")).toBeGreaterThan(floodRisk("fjord"));
  });
});

describe("estuaryTypes", () => {
  it("returns 5 types", () => {
    expect(estuaryTypes()).toHaveLength(5);
  });
});
