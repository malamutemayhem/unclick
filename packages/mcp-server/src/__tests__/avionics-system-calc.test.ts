import { describe, it, expect } from "vitest";
import {
  safetyContribution, complexity, maintenanceCost,
  weightKg, pilotReliance, mandatoryForAirline,
  displaysToPilot, primaryFunction, integrationLevel, avionicsSystems,
} from "../avionics-system-calc.js";

describe("safetyContribution", () => {
  it("tcas highest safety contribution", () => {
    expect(safetyContribution("tcas")).toBeGreaterThan(
      safetyContribution("fms")
    );
  });
});

describe("complexity", () => {
  it("autopilot most complex", () => {
    expect(complexity("autopilot")).toBeGreaterThan(
      complexity("efis")
    );
  });
});

describe("maintenanceCost", () => {
  it("autopilot highest maintenance cost", () => {
    expect(maintenanceCost("autopilot")).toBeGreaterThan(
      maintenanceCost("efis")
    );
  });
});

describe("weightKg", () => {
  it("weather_radar heaviest", () => {
    expect(weightKg("weather_radar")).toBeGreaterThan(
      weightKg("fms")
    );
  });
});

describe("pilotReliance", () => {
  it("autopilot most relied upon", () => {
    expect(pilotReliance("autopilot")).toBeGreaterThan(
      pilotReliance("weather_radar")
    );
  });
});

describe("mandatoryForAirline", () => {
  it("tcas is mandatory", () => {
    expect(mandatoryForAirline("tcas")).toBe(true);
  });
  it("efis is not", () => {
    expect(mandatoryForAirline("efis")).toBe(false);
  });
});

describe("displaysToPilot", () => {
  it("efis displays to pilot", () => {
    expect(displaysToPilot("efis")).toBe(true);
  });
  it("autopilot does not", () => {
    expect(displaysToPilot("autopilot")).toBe(false);
  });
});

describe("primaryFunction", () => {
  it("tcas for collision avoidance", () => {
    expect(primaryFunction("tcas")).toBe("collision_avoidance");
  });
});

describe("integrationLevel", () => {
  it("fms is navigation core", () => {
    expect(integrationLevel("fms")).toBe("navigation_core");
  });
});

describe("avionicsSystems", () => {
  it("returns 5 systems", () => {
    expect(avionicsSystems()).toHaveLength(5);
  });
});
