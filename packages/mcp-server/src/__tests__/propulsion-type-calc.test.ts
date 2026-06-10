import { describe, it, expect } from "vitest";
import {
  thrustKn, fuelEfficiency, noiseLevel,
  maxMachNumber, reliabilityScore, requiresIntake,
  zeroCarbonEmission, bestAircraft, maintenanceIntervalHours, propulsionTypes,
} from "../propulsion-type-calc.js";

describe("thrustKn", () => {
  it("turbofan has most thrust", () => {
    expect(thrustKn("turbofan")).toBeGreaterThan(
      thrustKn("turboprop")
    );
  });
});

describe("fuelEfficiency", () => {
  it("turboprop is most efficient", () => {
    expect(fuelEfficiency("turboprop")).toBeGreaterThan(
      fuelEfficiency("turbojet")
    );
  });
});

describe("noiseLevel", () => {
  it("electric is quietest", () => {
    expect(noiseLevel("electric")).toBeLessThan(
      noiseLevel("ramjet")
    );
  });
});

describe("maxMachNumber", () => {
  it("ramjet reaches highest mach", () => {
    expect(maxMachNumber("ramjet")).toBeGreaterThan(
      maxMachNumber("turbofan")
    );
  });
});

describe("reliabilityScore", () => {
  it("turbofan is most reliable", () => {
    expect(reliabilityScore("turbofan")).toBeGreaterThan(
      reliabilityScore("ramjet")
    );
  });
});

describe("requiresIntake", () => {
  it("turbofan requires intake", () => {
    expect(requiresIntake("turbofan")).toBe(true);
  });
  it("electric does not", () => {
    expect(requiresIntake("electric")).toBe(false);
  });
});

describe("zeroCarbonEmission", () => {
  it("electric has zero carbon", () => {
    expect(zeroCarbonEmission("electric")).toBe(true);
  });
  it("turbofan does not", () => {
    expect(zeroCarbonEmission("turbofan")).toBe(false);
  });
});

describe("bestAircraft", () => {
  it("turbofan for airliners", () => {
    expect(bestAircraft("turbofan")).toBe("airliner");
  });
});

describe("maintenanceIntervalHours", () => {
  it("electric has longest interval", () => {
    expect(maintenanceIntervalHours("electric")).toBeGreaterThan(
      maintenanceIntervalHours("turbofan")
    );
  });
});

describe("propulsionTypes", () => {
  it("returns 5 types", () => {
    expect(propulsionTypes()).toHaveLength(5);
  });
});
