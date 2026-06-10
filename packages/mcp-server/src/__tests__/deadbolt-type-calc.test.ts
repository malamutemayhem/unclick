import { describe, it, expect } from "vitest";
import {
  securityLevel, convenienceScore, installDifficulty, fireEgressSafety,
  pricePoint, requiresBattery, remoteAccess, bestUseCase,
  gradeRating, deadboltTypes,
} from "../deadbolt-type-calc.js";

describe("securityLevel", () => {
  it("jimmy proof most secure", () => {
    expect(securityLevel("jimmy_proof")).toBeGreaterThan(securityLevel("single_cylinder"));
  });
});

describe("convenienceScore", () => {
  it("smart most convenient", () => {
    expect(convenienceScore("smart")).toBeGreaterThan(convenienceScore("double_cylinder"));
  });
});

describe("installDifficulty", () => {
  it("jimmy proof hardest to install", () => {
    expect(installDifficulty("jimmy_proof")).toBeGreaterThan(installDifficulty("keyless"));
  });
});

describe("fireEgressSafety", () => {
  it("single cylinder safest for fire egress", () => {
    expect(fireEgressSafety("single_cylinder")).toBeGreaterThan(
      fireEgressSafety("double_cylinder")
    );
  });
});

describe("pricePoint", () => {
  it("smart most expensive", () => {
    expect(pricePoint("smart")).toBeGreaterThan(pricePoint("single_cylinder"));
  });
});

describe("requiresBattery", () => {
  it("smart requires battery", () => {
    expect(requiresBattery("smart")).toBe(true);
  });
  it("single cylinder does not", () => {
    expect(requiresBattery("single_cylinder")).toBe(false);
  });
});

describe("remoteAccess", () => {
  it("smart has remote access", () => {
    expect(remoteAccess("smart")).toBe(true);
  });
  it("keyless does not", () => {
    expect(remoteAccess("keyless")).toBe(false);
  });
});

describe("bestUseCase", () => {
  it("smart for home automation", () => {
    expect(bestUseCase("smart")).toBe("home_automation");
  });
});

describe("gradeRating", () => {
  it("jimmy proof is commercial grade", () => {
    expect(gradeRating("jimmy_proof")).toBe("commercial_grade");
  });
});

describe("deadboltTypes", () => {
  it("returns 5 types", () => {
    expect(deadboltTypes()).toHaveLength(5);
  });
});
