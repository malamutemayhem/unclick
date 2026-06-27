import { describe, it, expect } from "vitest";
import {
  powerOutput, availability, efficiency, formFactor,
  harvestCost, wearable, forIot, source,
  bestUse, energyHarvests,
} from "../energy-harvest-calc.js";

describe("powerOutput", () => {
  it("photovoltaic indoor highest power output", () => {
    expect(powerOutput("photovoltaic_indoor")).toBeGreaterThan(powerOutput("rf_ambient_rectenna"));
  });
});

describe("availability", () => {
  it("thermoelectric body best availability", () => {
    expect(availability("thermoelectric_body")).toBeGreaterThan(availability("triboelectric_motion"));
  });
});

describe("efficiency", () => {
  it("photovoltaic indoor highest efficiency", () => {
    expect(efficiency("photovoltaic_indoor")).toBeGreaterThan(efficiency("rf_ambient_rectenna"));
  });
});

describe("formFactor", () => {
  it("rf ambient rectenna best form factor", () => {
    expect(formFactor("rf_ambient_rectenna")).toBeGreaterThan(formFactor("piezoelectric_vibr"));
  });
});

describe("harvestCost", () => {
  it("rf ambient rectenna most expensive", () => {
    expect(harvestCost("rf_ambient_rectenna")).toBeGreaterThan(harvestCost("triboelectric_motion"));
  });
});

describe("wearable", () => {
  it("thermoelectric body is wearable", () => {
    expect(wearable("thermoelectric_body")).toBe(true);
  });
  it("photovoltaic indoor not wearable", () => {
    expect(wearable("photovoltaic_indoor")).toBe(false);
  });
});

describe("forIot", () => {
  it("photovoltaic indoor is for iot", () => {
    expect(forIot("photovoltaic_indoor")).toBe(true);
  });
  it("thermoelectric body not for iot", () => {
    expect(forIot("thermoelectric_body")).toBe(false);
  });
});

describe("source", () => {
  it("piezoelectric vibr uses mechanical vibration", () => {
    expect(source("piezoelectric_vibr")).toBe("mechanical_vibration");
  });
});

describe("bestUse", () => {
  it("photovoltaic indoor best for shelf label epaper", () => {
    expect(bestUse("photovoltaic_indoor")).toBe("shelf_label_epaper");
  });
});

describe("energyHarvests", () => {
  it("returns 5 types", () => {
    expect(energyHarvests()).toHaveLength(5);
  });
});
