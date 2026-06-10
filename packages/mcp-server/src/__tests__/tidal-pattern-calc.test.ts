import { describe, it, expect } from "vitest";
import {
  cyclesPerDay, tidalRangeM, predictability,
  currentStrength, ecologicalImpact, lunarDependent,
  sunAligned, commonLocation, drivingForce, tidalPatterns,
} from "../tidal-pattern-calc.js";

describe("cyclesPerDay", () => {
  it("semidiurnal has 2 cycles", () => {
    expect(cyclesPerDay("semidiurnal")).toBe(2);
  });
  it("diurnal has 1 cycle", () => {
    expect(cyclesPerDay("diurnal")).toBe(1);
  });
});

describe("tidalRangeM", () => {
  it("spring tides have greatest range", () => {
    expect(tidalRangeM("spring")).toBeGreaterThan(
      tidalRangeM("neap")
    );
  });
});

describe("predictability", () => {
  it("spring tides highly predictable", () => {
    expect(predictability("spring")).toBeGreaterThan(
      predictability("mixed")
    );
  });
});

describe("currentStrength", () => {
  it("spring tides strongest current", () => {
    expect(currentStrength("spring")).toBeGreaterThan(
      currentStrength("neap")
    );
  });
});

describe("ecologicalImpact", () => {
  it("spring tides highest impact", () => {
    expect(ecologicalImpact("spring")).toBeGreaterThan(
      ecologicalImpact("neap")
    );
  });
});

describe("lunarDependent", () => {
  it("all tides are lunar dependent", () => {
    expect(lunarDependent("semidiurnal")).toBe(true);
  });
});

describe("sunAligned", () => {
  it("spring tides are sun aligned", () => {
    expect(sunAligned("spring")).toBe(true);
  });
  it("neap tides are not", () => {
    expect(sunAligned("neap")).toBe(false);
  });
});

describe("commonLocation", () => {
  it("diurnal in gulf of mexico", () => {
    expect(commonLocation("diurnal")).toBe("gulf_of_mexico");
  });
});

describe("drivingForce", () => {
  it("spring driven by sun moon alignment", () => {
    expect(drivingForce("spring")).toBe("sun_moon_aligned");
  });
});

describe("tidalPatterns", () => {
  it("returns 5 patterns", () => {
    expect(tidalPatterns()).toHaveLength(5);
  });
});
