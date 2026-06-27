import { describe, it, expect } from "vitest";
import {
  fogDensity, hangTime, fluidConsumption, noiseLevel,
  machineCost, requiresCO2, staysLow, generationMethod,
  bestVenue, fogMachines,
} from "../fog-machine-calc.js";

describe("fogDensity", () => {
  it("heated fog densest fog", () => {
    expect(fogDensity("heated_fog")).toBeGreaterThan(fogDensity("hazer"));
  });
});

describe("hangTime", () => {
  it("hazer longest hang time", () => {
    expect(hangTime("hazer")).toBeGreaterThan(hangTime("low_fog"));
  });
});

describe("fluidConsumption", () => {
  it("heated fog highest fluid consumption", () => {
    expect(fluidConsumption("heated_fog")).toBeGreaterThan(fluidConsumption("ultrasonic"));
  });
});

describe("noiseLevel", () => {
  it("cracker noisiest", () => {
    expect(noiseLevel("cracker")).toBeGreaterThan(noiseLevel("ultrasonic"));
  });
});

describe("machineCost", () => {
  it("low fog most expensive machine", () => {
    expect(machineCost("low_fog")).toBeGreaterThan(machineCost("heated_fog"));
  });
});

describe("requiresCO2", () => {
  it("cracker requires co2", () => {
    expect(requiresCO2("cracker")).toBe(true);
  });
  it("heated fog does not", () => {
    expect(requiresCO2("heated_fog")).toBe(false);
  });
});

describe("staysLow", () => {
  it("low fog stays low", () => {
    expect(staysLow("low_fog")).toBe(true);
  });
  it("heated fog does not", () => {
    expect(staysLow("heated_fog")).toBe(false);
  });
});

describe("generationMethod", () => {
  it("ultrasonic uses piezoelectric water mist", () => {
    expect(generationMethod("ultrasonic")).toBe("piezoelectric_water_mist");
  });
});

describe("bestVenue", () => {
  it("hazer for theater broadcast subtle", () => {
    expect(bestVenue("hazer")).toBe("theater_broadcast_subtle");
  });
});

describe("fogMachines", () => {
  it("returns 5 machine types", () => {
    expect(fogMachines()).toHaveLength(5);
  });
});
