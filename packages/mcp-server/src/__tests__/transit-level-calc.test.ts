import { describe, it, expect } from "vitest";
import {
  magnification, accuracyMmPerKm, selfLeveling, maxRangeMeters,
  setupTimeMinutes, weatherResistance, batteryRequired, weightKg,
  costEstimate, transitTypes,
} from "../transit-level-calc.js";

describe("magnification", () => {
  it("digital has highest magnification", () => {
    expect(magnification("digital")).toBeGreaterThan(magnification("dumpy"));
  });
});

describe("accuracyMmPerKm", () => {
  it("digital is most accurate", () => {
    expect(accuracyMmPerKm("digital")).toBeLessThan(
      accuracyMmPerKm("dumpy")
    );
  });
});

describe("selfLeveling", () => {
  it("automatic self-levels", () => {
    expect(selfLeveling("automatic")).toBe(true);
  });
  it("dumpy does not self-level", () => {
    expect(selfLeveling("dumpy")).toBe(false);
  });
});

describe("maxRangeMeters", () => {
  it("laser rotary has longest range", () => {
    expect(maxRangeMeters("laser_rotary")).toBeGreaterThan(
      maxRangeMeters("dumpy")
    );
  });
});

describe("setupTimeMinutes", () => {
  it("laser rotary is fastest to set up", () => {
    expect(setupTimeMinutes("laser_rotary")).toBeLessThan(
      setupTimeMinutes("dumpy")
    );
  });
});

describe("weatherResistance", () => {
  it("dumpy resists weather best", () => {
    expect(weatherResistance("dumpy")).toBeGreaterThan(
      weatherResistance("laser_rotary")
    );
  });
});

describe("batteryRequired", () => {
  it("digital needs battery", () => {
    expect(batteryRequired("digital")).toBe(true);
  });
  it("dumpy does not need battery", () => {
    expect(batteryRequired("dumpy")).toBe(false);
  });
});

describe("weightKg", () => {
  it("dumpy is heaviest", () => {
    expect(weightKg("dumpy")).toBeGreaterThan(weightKg("digital"));
  });
});

describe("costEstimate", () => {
  it("digital is most expensive", () => {
    expect(costEstimate("digital")).toBeGreaterThan(costEstimate("dumpy"));
  });
});

describe("transitTypes", () => {
  it("returns 5 types", () => {
    expect(transitTypes()).toHaveLength(5);
  });
});
