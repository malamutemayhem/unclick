import { describe, it, expect } from "vitest";
import {
  durationDays, tempCelsius, humidityPercent,
  weightLossPercent, monitoringFrequencyDays, moldManagement,
  airflowRequired, criticalControl, laborIntensity, dryCuringStages,
} from "../dry-curing-calc.js";

describe("durationDays", () => {
  it("aging takes longest", () => {
    expect(durationDays("aging")).toBeGreaterThan(
      durationDays("salting")
    );
  });
});

describe("tempCelsius", () => {
  it("aging is warmest", () => {
    expect(tempCelsius("aging")).toBeGreaterThan(
      tempCelsius("salting")
    );
  });
});

describe("humidityPercent", () => {
  it("salting has highest humidity", () => {
    expect(humidityPercent("salting")).toBeGreaterThan(
      humidityPercent("drying")
    );
  });
});

describe("weightLossPercent", () => {
  it("drying loses most weight", () => {
    expect(weightLossPercent("drying")).toBeGreaterThan(
      weightLossPercent("resting")
    );
  });
});

describe("monitoringFrequencyDays", () => {
  it("salting monitored most often", () => {
    expect(monitoringFrequencyDays("salting")).toBeLessThan(
      monitoringFrequencyDays("aging")
    );
  });
});

describe("moldManagement", () => {
  it("drying encourages white mold", () => {
    expect(moldManagement("drying")).toBe("encourage_white");
  });
});

describe("airflowRequired", () => {
  it("drying needs most airflow", () => {
    expect(airflowRequired("drying")).toBeGreaterThan(
      airflowRequired("salting")
    );
  });
});

describe("criticalControl", () => {
  it("salting is critical", () => {
    expect(criticalControl("salting")).toBe(true);
  });
  it("resting is not", () => {
    expect(criticalControl("resting")).toBe(false);
  });
});

describe("laborIntensity", () => {
  it("salting is most labor intensive", () => {
    expect(laborIntensity("salting")).toBeGreaterThan(
      laborIntensity("aging")
    );
  });
});

describe("dryCuringStages", () => {
  it("returns 5 stages", () => {
    expect(dryCuringStages()).toHaveLength(5);
  });
});
