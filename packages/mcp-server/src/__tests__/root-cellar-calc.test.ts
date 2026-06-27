import { describe, it, expect } from "vitest";
import {
  tempRangeCelsius, humidityPercent, storageMonths,
  constructionDays, capacityBushels, ventilationNeeded,
  floodRisk, bestCrop, costEstimate, cellarTypes,
} from "../root-cellar-calc.js";

describe("tempRangeCelsius", () => {
  it("buried is coldest", () => {
    expect(tempRangeCelsius("buried")).toBeLessThan(
      tempRangeCelsius("basement")
    );
  });
});

describe("humidityPercent", () => {
  it("buried has highest humidity", () => {
    expect(humidityPercent("buried")).toBeGreaterThan(
      humidityPercent("basement")
    );
  });
});

describe("storageMonths", () => {
  it("buried stores longest", () => {
    expect(storageMonths("buried")).toBeGreaterThan(
      storageMonths("cold_room")
    );
  });
});

describe("constructionDays", () => {
  it("hillside takes longest to build", () => {
    expect(constructionDays("hillside")).toBeGreaterThan(
      constructionDays("cold_room")
    );
  });
});

describe("capacityBushels", () => {
  it("hillside holds most", () => {
    expect(capacityBushels("hillside")).toBeGreaterThan(
      capacityBushels("cold_room")
    );
  });
});

describe("ventilationNeeded", () => {
  it("hillside needs ventilation", () => {
    expect(ventilationNeeded("hillside")).toBe(true);
  });
  it("spring house does not", () => {
    expect(ventilationNeeded("spring_house")).toBe(false);
  });
});

describe("floodRisk", () => {
  it("spring house has highest flood risk", () => {
    expect(floodRisk("spring_house")).toBeGreaterThan(
      floodRisk("cold_room")
    );
  });
});

describe("bestCrop", () => {
  it("spring house is best for dairy", () => {
    expect(bestCrop("spring_house")).toBe("dairy");
  });
});

describe("costEstimate", () => {
  it("hillside costs most", () => {
    expect(costEstimate("hillside")).toBeGreaterThan(
      costEstimate("cold_room")
    );
  });
});

describe("cellarTypes", () => {
  it("returns 5 types", () => {
    expect(cellarTypes()).toHaveLength(5);
  });
});
