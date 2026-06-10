import { describe, it, expect } from "vitest";
import {
  measurementAccuracy, temporalResolution, heavyRainCapability, maintenanceNeed,
  instrumentCost, automated, measuresDropSize, collectionMethod,
  bestApplication, rainGauges,
} from "../rain-gauge-calc.js";

describe("measurementAccuracy", () => {
  it("disdrometer most accurate", () => {
    expect(measurementAccuracy("disdrometer")).toBeGreaterThan(measurementAccuracy("standard_manual"));
  });
});

describe("temporalResolution", () => {
  it("optical highest temporal resolution", () => {
    expect(temporalResolution("optical")).toBeGreaterThan(temporalResolution("standard_manual"));
  });
});

describe("heavyRainCapability", () => {
  it("weighing best for heavy rain", () => {
    expect(heavyRainCapability("weighing")).toBeGreaterThan(heavyRainCapability("tipping_bucket"));
  });
});

describe("maintenanceNeed", () => {
  it("disdrometer highest maintenance", () => {
    expect(maintenanceNeed("disdrometer")).toBeGreaterThan(maintenanceNeed("standard_manual"));
  });
});

describe("instrumentCost", () => {
  it("disdrometer most expensive", () => {
    expect(instrumentCost("disdrometer")).toBeGreaterThan(instrumentCost("standard_manual"));
  });
});

describe("automated", () => {
  it("tipping bucket is automated", () => {
    expect(automated("tipping_bucket")).toBe(true);
  });
  it("standard manual is not", () => {
    expect(automated("standard_manual")).toBe(false);
  });
});

describe("measuresDropSize", () => {
  it("disdrometer measures drop size", () => {
    expect(measuresDropSize("disdrometer")).toBe(true);
  });
  it("tipping bucket does not", () => {
    expect(measuresDropSize("tipping_bucket")).toBe(false);
  });
});

describe("collectionMethod", () => {
  it("weighing uses collection vessel strain gauge", () => {
    expect(collectionMethod("weighing")).toBe("collection_vessel_strain_gauge");
  });
});

describe("bestApplication", () => {
  it("standard manual for citizen science garden", () => {
    expect(bestApplication("standard_manual")).toBe("citizen_science_garden");
  });
});

describe("rainGauges", () => {
  it("returns 5 gauge types", () => {
    expect(rainGauges()).toHaveLength(5);
  });
});
