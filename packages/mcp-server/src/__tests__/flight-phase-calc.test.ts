import { describe, it, expect } from "vitest";
import {
  fuelBurnRate, pilotWorkload, accidentRisk,
  durationPercent, altitudeChangeRate, autopilotAvailable,
  communicationCritical, primaryConcern, typicalSpeedKnots, flightPhases,
} from "../flight-phase-calc.js";

describe("fuelBurnRate", () => {
  it("takeoff highest fuel burn", () => {
    expect(fuelBurnRate("takeoff")).toBeGreaterThan(
      fuelBurnRate("cruise")
    );
  });
});

describe("pilotWorkload", () => {
  it("landing highest workload", () => {
    expect(pilotWorkload("landing")).toBeGreaterThan(
      pilotWorkload("cruise")
    );
  });
});

describe("accidentRisk", () => {
  it("landing highest risk", () => {
    expect(accidentRisk("landing")).toBeGreaterThan(
      accidentRisk("cruise")
    );
  });
});

describe("durationPercent", () => {
  it("cruise longest phase", () => {
    expect(durationPercent("cruise")).toBeGreaterThan(
      durationPercent("takeoff")
    );
  });
});

describe("altitudeChangeRate", () => {
  it("landing highest altitude change rate", () => {
    expect(altitudeChangeRate("landing")).toBeGreaterThan(
      altitudeChangeRate("cruise")
    );
  });
});

describe("autopilotAvailable", () => {
  it("cruise has autopilot", () => {
    expect(autopilotAvailable("cruise")).toBe(true);
  });
  it("takeoff does not", () => {
    expect(autopilotAvailable("takeoff")).toBe(false);
  });
});

describe("communicationCritical", () => {
  it("landing communication critical", () => {
    expect(communicationCritical("landing")).toBe(true);
  });
  it("cruise is not", () => {
    expect(communicationCritical("cruise")).toBe(false);
  });
});

describe("primaryConcern", () => {
  it("cruise focuses on fuel efficiency", () => {
    expect(primaryConcern("cruise")).toBe("fuel_efficiency");
  });
});

describe("typicalSpeedKnots", () => {
  it("cruise fastest", () => {
    expect(typicalSpeedKnots("cruise")).toBe("450_500");
  });
});

describe("flightPhases", () => {
  it("returns 5 phases", () => {
    expect(flightPhases()).toHaveLength(5);
  });
});
