import { describe, it, expect } from "vitest";
import {
  incubationTempCelsius, incubationHours, humidityPercent,
  turningIntervalHours, enzymeActivity, primaryUse,
  sporeDensity, contaminationRisk, costPerKg, kojiSubstrates,
} from "../koji-calc.js";

describe("incubationTempCelsius", () => {
  it("sweet potato incubates warmest", () => {
    expect(incubationTempCelsius("sweet_potato")).toBeGreaterThan(
      incubationTempCelsius("soybean")
    );
  });
});

describe("incubationHours", () => {
  it("barley incubates longest", () => {
    expect(incubationHours("barley")).toBeGreaterThan(
      incubationHours("sweet_potato")
    );
  });
});

describe("humidityPercent", () => {
  it("soybean needs highest humidity", () => {
    expect(humidityPercent("soybean")).toBeGreaterThan(
      humidityPercent("barley")
    );
  });
});

describe("turningIntervalHours", () => {
  it("sweet potato is turned most often", () => {
    expect(turningIntervalHours("sweet_potato")).toBeLessThan(
      turningIntervalHours("soybean")
    );
  });
});

describe("enzymeActivity", () => {
  it("wheat has highest enzyme activity", () => {
    expect(enzymeActivity("wheat")).toBeGreaterThan(
      enzymeActivity("sweet_potato")
    );
  });
});

describe("primaryUse", () => {
  it("rice koji is for sake", () => {
    expect(primaryUse("rice")).toBe("sake");
  });
});

describe("sporeDensity", () => {
  it("rice has highest spore density", () => {
    expect(sporeDensity("rice")).toBeGreaterThan(
      sporeDensity("sweet_potato")
    );
  });
});

describe("contaminationRisk", () => {
  it("soybean has highest contamination risk", () => {
    expect(contaminationRisk("soybean")).toBeGreaterThan(
      contaminationRisk("rice")
    );
  });
});

describe("costPerKg", () => {
  it("sweet potato is most expensive", () => {
    expect(costPerKg("sweet_potato")).toBeGreaterThan(
      costPerKg("soybean")
    );
  });
});

describe("kojiSubstrates", () => {
  it("returns 5 substrates", () => {
    expect(kojiSubstrates()).toHaveLength(5);
  });
});
