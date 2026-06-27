import { describe, it, expect } from "vitest";
import {
  orbitalPeriodYears, tailLengthAu, nucleusDiameterKm,
  brightnessAtPerihelion, dustProduction, visibleNakedEye,
  retrogradeOrbit, originRegion, meteorShowerPotential, cometTypes,
} from "../comet-type-calc.js";

describe("orbitalPeriodYears", () => {
  it("long period takes longest", () => {
    expect(orbitalPeriodYears("long_period")).toBeGreaterThan(
      orbitalPeriodYears("short_period")
    );
  });
});

describe("tailLengthAu", () => {
  it("long period has longest tail", () => {
    expect(tailLengthAu("long_period")).toBeGreaterThan(
      tailLengthAu("main_belt")
    );
  });
});

describe("nucleusDiameterKm", () => {
  it("long period has largest nucleus", () => {
    expect(nucleusDiameterKm("long_period")).toBeGreaterThan(
      nucleusDiameterKm("sungrazer")
    );
  });
});

describe("brightnessAtPerihelion", () => {
  it("sungrazer is brightest", () => {
    expect(brightnessAtPerihelion("sungrazer")).toBeGreaterThan(
      brightnessAtPerihelion("main_belt")
    );
  });
});

describe("dustProduction", () => {
  it("sungrazer produces most dust", () => {
    expect(dustProduction("sungrazer")).toBeGreaterThan(
      dustProduction("main_belt")
    );
  });
});

describe("visibleNakedEye", () => {
  it("halley type is visible naked eye", () => {
    expect(visibleNakedEye("halley_type")).toBe(true);
  });
  it("main belt is not", () => {
    expect(visibleNakedEye("main_belt")).toBe(false);
  });
});

describe("retrogradeOrbit", () => {
  it("halley type has retrograde orbit", () => {
    expect(retrogradeOrbit("halley_type")).toBe(true);
  });
  it("short period does not", () => {
    expect(retrogradeOrbit("short_period")).toBe(false);
  });
});

describe("originRegion", () => {
  it("short period from kuiper belt", () => {
    expect(originRegion("short_period")).toBe("kuiper_belt");
  });
});

describe("meteorShowerPotential", () => {
  it("halley type has highest meteor shower potential", () => {
    expect(meteorShowerPotential("halley_type")).toBeGreaterThan(
      meteorShowerPotential("main_belt")
    );
  });
});

describe("cometTypes", () => {
  it("returns 5 types", () => {
    expect(cometTypes()).toHaveLength(5);
  });
});
