import { describe, it, expect } from "vitest";
import {
  heightMeters, wavelengthMeters, speedKmh,
  predictability, destructivePower, deepWater,
  periodicOccurrence, primaryCause, surfingQuality, waveTypes,
} from "../wave-type-calc.js";

describe("heightMeters", () => {
  it("tsunami is tallest", () => {
    expect(heightMeters("tsunami")).toBeGreaterThan(
      heightMeters("swell")
    );
  });
});

describe("wavelengthMeters", () => {
  it("tsunami has longest wavelength", () => {
    expect(wavelengthMeters("tsunami")).toBeGreaterThan(
      wavelengthMeters("swell")
    );
  });
});

describe("speedKmh", () => {
  it("tsunami is fastest", () => {
    expect(speedKmh("tsunami")).toBeGreaterThan(speedKmh("swell"));
  });
});

describe("predictability", () => {
  it("swell is most predictable", () => {
    expect(predictability("swell")).toBeGreaterThan(
      predictability("rogue")
    );
  });
});

describe("destructivePower", () => {
  it("tsunami is most destructive", () => {
    expect(destructivePower("tsunami")).toBeGreaterThan(
      destructivePower("wind_wave")
    );
  });
});

describe("deepWater", () => {
  it("swell is deep water", () => {
    expect(deepWater("swell")).toBe(true);
  });
  it("tsunami is not deep water", () => {
    expect(deepWater("tsunami")).toBe(false);
  });
});

describe("periodicOccurrence", () => {
  it("swell is periodic", () => {
    expect(periodicOccurrence("swell")).toBe(true);
  });
  it("rogue is not periodic", () => {
    expect(periodicOccurrence("rogue")).toBe(false);
  });
});

describe("primaryCause", () => {
  it("tsunami caused by earthquake", () => {
    expect(primaryCause("tsunami")).toBe("earthquake");
  });
});

describe("surfingQuality", () => {
  it("swell is best for surfing", () => {
    expect(surfingQuality("swell")).toBeGreaterThan(
      surfingQuality("tsunami")
    );
  });
});

describe("waveTypes", () => {
  it("returns 5 types", () => {
    expect(waveTypes()).toHaveLength(5);
  });
});
