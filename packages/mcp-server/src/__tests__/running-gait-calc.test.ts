import { describe, it, expect } from "vitest";
import {
  groundContactMs, impactForce, energyEfficiency,
  injuryRisk, cadenceOptimal, naturalForBeginner,
  requiresCoaching, primaryMuscle, bestTerrain, runningGaits,
} from "../running-gait-calc.js";

describe("groundContactMs", () => {
  it("overstriding longest contact", () => {
    expect(groundContactMs("overstriding")).toBeGreaterThan(
      groundContactMs("forefoot")
    );
  });
});

describe("impactForce", () => {
  it("overstriding highest impact", () => {
    expect(impactForce("overstriding")).toBeGreaterThan(
      impactForce("pose_method")
    );
  });
});

describe("energyEfficiency", () => {
  it("pose method most efficient", () => {
    expect(energyEfficiency("pose_method")).toBeGreaterThan(
      energyEfficiency("heel_strike")
    );
  });
});

describe("injuryRisk", () => {
  it("overstriding highest injury risk", () => {
    expect(injuryRisk("overstriding")).toBeGreaterThan(
      injuryRisk("midfoot")
    );
  });
});

describe("cadenceOptimal", () => {
  it("pose method highest cadence", () => {
    expect(cadenceOptimal("pose_method")).toBeGreaterThan(
      cadenceOptimal("overstriding")
    );
  });
});

describe("naturalForBeginner", () => {
  it("heel strike natural for beginners", () => {
    expect(naturalForBeginner("heel_strike")).toBe(true);
  });
  it("forefoot is not", () => {
    expect(naturalForBeginner("forefoot")).toBe(false);
  });
});

describe("requiresCoaching", () => {
  it("pose method requires coaching", () => {
    expect(requiresCoaching("pose_method")).toBe(true);
  });
  it("heel strike does not", () => {
    expect(requiresCoaching("heel_strike")).toBe(false);
  });
});

describe("primaryMuscle", () => {
  it("forefoot targets calves", () => {
    expect(primaryMuscle("forefoot")).toBe("calves");
  });
});

describe("bestTerrain", () => {
  it("pose method best on trail", () => {
    expect(bestTerrain("pose_method")).toBe("trail");
  });
});

describe("runningGaits", () => {
  it("returns 5 gaits", () => {
    expect(runningGaits()).toHaveLength(5);
  });
});
