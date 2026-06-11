import { describe, it, expect } from "vitest";
import {
  purity, throughput, energyEfficiency, flavorRetention,
  csCost, continuous, forNeutral, stillConfig,
  bestUse, columnStillTypes,
} from "../column-still-calc.js";

describe("purity", () => {
  it("multi column highest purity", () => {
    expect(purity("multi_column")).toBeGreaterThan(purity("coffey_patent"));
  });
});

describe("throughput", () => {
  it("multi column highest throughput", () => {
    expect(throughput("multi_column")).toBeGreaterThan(throughput("vacuum_column"));
  });
});

describe("energyEfficiency", () => {
  it("vacuum column best energy efficiency", () => {
    expect(energyEfficiency("vacuum_column")).toBeGreaterThan(energyEfficiency("plate_column"));
  });
});

describe("flavorRetention", () => {
  it("vacuum column best flavor retention", () => {
    expect(flavorRetention("vacuum_column")).toBeGreaterThan(flavorRetention("multi_column"));
  });
});

describe("csCost", () => {
  it("multi column most expensive", () => {
    expect(csCost("multi_column")).toBeGreaterThan(csCost("packed_column"));
  });
});

describe("continuous", () => {
  it("all column stills are continuous", () => {
    expect(continuous("coffey_patent")).toBe(true);
    expect(continuous("vacuum_column")).toBe(true);
  });
});

describe("forNeutral", () => {
  it("multi column for neutral spirit", () => {
    expect(forNeutral("multi_column")).toBe(true);
  });
  it("plate column not for neutral", () => {
    expect(forNeutral("plate_column")).toBe(false);
  });
});

describe("stillConfig", () => {
  it("packed column uses random structured packing", () => {
    expect(stillConfig("packed_column")).toBe("packed_column_still_random_structured_packing_high_purity_neutral");
  });
});

describe("bestUse", () => {
  it("vacuum column for delicate fruit brandy", () => {
    expect(bestUse("vacuum_column")).toBe("delicate_fruit_brandy_eau_de_vie_vacuum_column_low_temp_preserve");
  });
});

describe("columnStillTypes", () => {
  it("returns 5 types", () => {
    expect(columnStillTypes()).toHaveLength(5);
  });
});
