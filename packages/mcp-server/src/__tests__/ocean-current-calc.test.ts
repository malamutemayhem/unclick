import { describe, it, expect } from "vitest";
import {
  speedKnots, widthKm, depthMeters,
  temperatureInfluence, marineProductivity, warmCurrent,
  windDriven, affectedCoast, climateImportance, oceanCurrents,
} from "../ocean-current-calc.js";

describe("speedKnots", () => {
  it("gulf stream is fastest", () => {
    expect(speedKnots("gulf_stream")).toBeGreaterThan(
      speedKnots("humboldt")
    );
  });
});

describe("widthKm", () => {
  it("humboldt is widest", () => {
    expect(widthKm("humboldt")).toBeGreaterThan(
      widthKm("gulf_stream")
    );
  });
});

describe("depthMeters", () => {
  it("antarctic circumpolar is deepest", () => {
    expect(depthMeters("antarctic_circumpolar")).toBeGreaterThan(
      depthMeters("humboldt")
    );
  });
});

describe("temperatureInfluence", () => {
  it("gulf stream has greatest temperature influence", () => {
    expect(temperatureInfluence("gulf_stream")).toBeGreaterThan(
      temperatureInfluence("antarctic_circumpolar")
    );
  });
});

describe("marineProductivity", () => {
  it("humboldt is most productive", () => {
    expect(marineProductivity("humboldt")).toBeGreaterThan(
      marineProductivity("agulhas")
    );
  });
});

describe("warmCurrent", () => {
  it("gulf stream is warm", () => {
    expect(warmCurrent("gulf_stream")).toBe(true);
  });
  it("humboldt is not", () => {
    expect(warmCurrent("humboldt")).toBe(false);
  });
});

describe("windDriven", () => {
  it("gulf stream is wind driven", () => {
    expect(windDriven("gulf_stream")).toBe(true);
  });
  it("agulhas is not", () => {
    expect(windDriven("agulhas")).toBe(false);
  });
});

describe("affectedCoast", () => {
  it("gulf stream affects eastern north america", () => {
    expect(affectedCoast("gulf_stream")).toBe("eastern_north_america");
  });
});

describe("climateImportance", () => {
  it("gulf stream is most important for climate", () => {
    expect(climateImportance("gulf_stream")).toBeGreaterThan(
      climateImportance("agulhas")
    );
  });
});

describe("oceanCurrents", () => {
  it("returns 5 currents", () => {
    expect(oceanCurrents()).toHaveLength(5);
  });
});
