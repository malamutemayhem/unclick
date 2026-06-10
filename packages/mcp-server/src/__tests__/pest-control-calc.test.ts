import { describe, it, expect } from "vitest";
import {
  effectiveness, environmentalImpact, costPerHectare,
  resistanceRisk, speedOfAction, organicApproved,
  requiresExpertise, exampleMethod, targetPest, pestControls,
} from "../pest-control-calc.js";

describe("effectiveness", () => {
  it("chemical most effective", () => {
    expect(effectiveness("chemical")).toBeGreaterThan(
      effectiveness("cultural")
    );
  });
});

describe("environmentalImpact", () => {
  it("chemical highest impact", () => {
    expect(environmentalImpact("chemical")).toBeGreaterThan(
      environmentalImpact("biological")
    );
  });
});

describe("costPerHectare", () => {
  it("integrated most costly", () => {
    expect(costPerHectare("integrated")).toBeGreaterThan(
      costPerHectare("cultural")
    );
  });
});

describe("resistanceRisk", () => {
  it("chemical highest resistance risk", () => {
    expect(resistanceRisk("chemical")).toBeGreaterThan(
      resistanceRisk("mechanical")
    );
  });
});

describe("speedOfAction", () => {
  it("chemical fastest acting", () => {
    expect(speedOfAction("chemical")).toBeGreaterThan(
      speedOfAction("biological")
    );
  });
});

describe("organicApproved", () => {
  it("biological is organic approved", () => {
    expect(organicApproved("biological")).toBe(true);
  });
  it("chemical is not", () => {
    expect(organicApproved("chemical")).toBe(false);
  });
});

describe("requiresExpertise", () => {
  it("integrated requires expertise", () => {
    expect(requiresExpertise("integrated")).toBe(true);
  });
  it("mechanical does not", () => {
    expect(requiresExpertise("mechanical")).toBe(false);
  });
});

describe("exampleMethod", () => {
  it("biological uses ladybug release", () => {
    expect(exampleMethod("biological")).toBe("ladybug_release");
  });
});

describe("targetPest", () => {
  it("chemical is broad spectrum", () => {
    expect(targetPest("chemical")).toBe("broad_spectrum");
  });
});

describe("pestControls", () => {
  it("returns 5 methods", () => {
    expect(pestControls()).toHaveLength(5);
  });
});
