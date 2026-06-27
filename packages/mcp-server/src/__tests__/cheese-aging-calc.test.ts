import { describe, it, expect } from "vitest";
import {
  agingMonthsMin, agingTempCelsius, humidityPercent,
  turningFrequencyDays, rindType, moistureLossPercent,
  flavorIntensity, piercingRequired, costPerKg, cheeseTypes,
} from "../cheese-aging-calc.js";

describe("agingMonthsMin", () => {
  it("parmesan ages longest", () => {
    expect(agingMonthsMin("parmesan")).toBeGreaterThan(
      agingMonthsMin("brie")
    );
  });
});

describe("agingTempCelsius", () => {
  it("parmesan ages warmest", () => {
    expect(agingTempCelsius("parmesan")).toBeGreaterThan(
      agingTempCelsius("brie")
    );
  });
});

describe("humidityPercent", () => {
  it("brie needs highest humidity", () => {
    expect(humidityPercent("brie")).toBeGreaterThanOrEqual(
      humidityPercent("parmesan")
    );
  });
});

describe("turningFrequencyDays", () => {
  it("brie is turned most often", () => {
    expect(turningFrequencyDays("brie")).toBeLessThan(
      turningFrequencyDays("gouda")
    );
  });
});

describe("rindType", () => {
  it("brie has bloomy rind", () => {
    expect(rindType("brie")).toBe("bloomy");
  });
});

describe("moistureLossPercent", () => {
  it("parmesan loses most moisture", () => {
    expect(moistureLossPercent("parmesan")).toBeGreaterThan(
      moistureLossPercent("brie")
    );
  });
});

describe("flavorIntensity", () => {
  it("blue is most intense", () => {
    expect(flavorIntensity("blue")).toBeGreaterThan(
      flavorIntensity("brie")
    );
  });
});

describe("piercingRequired", () => {
  it("blue needs piercing", () => {
    expect(piercingRequired("blue")).toBe(true);
  });
  it("cheddar does not", () => {
    expect(piercingRequired("cheddar")).toBe(false);
  });
});

describe("costPerKg", () => {
  it("parmesan is most expensive", () => {
    expect(costPerKg("parmesan")).toBeGreaterThan(costPerKg("cheddar"));
  });
});

describe("cheeseTypes", () => {
  it("returns 5 types", () => {
    expect(cheeseTypes()).toHaveLength(5);
  });
});
