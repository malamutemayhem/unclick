import { describe, it, expect } from "vitest";
import {
  armCount, intelligence, camouflageAbility,
  maxDepthMeters, lifespanYears, hasExternalShell,
  producesInk, primaryDefense, scientificInterest, cephalopodTypes,
} from "../cephalopod-type-calc.js";

describe("armCount", () => {
  it("nautilus has most arms", () => {
    expect(armCount("nautilus")).toBeGreaterThan(
      armCount("octopus")
    );
  });
});

describe("intelligence", () => {
  it("octopus is most intelligent", () => {
    expect(intelligence("octopus")).toBeGreaterThan(
      intelligence("nautilus")
    );
  });
});

describe("camouflageAbility", () => {
  it("octopus has best camouflage", () => {
    expect(camouflageAbility("octopus")).toBeGreaterThan(
      camouflageAbility("nautilus")
    );
  });
});

describe("maxDepthMeters", () => {
  it("giant squid goes deepest", () => {
    expect(maxDepthMeters("giant_squid")).toBeGreaterThan(
      maxDepthMeters("cuttlefish")
    );
  });
});

describe("lifespanYears", () => {
  it("nautilus lives longest", () => {
    expect(lifespanYears("nautilus")).toBeGreaterThan(
      lifespanYears("squid")
    );
  });
});

describe("hasExternalShell", () => {
  it("nautilus has external shell", () => {
    expect(hasExternalShell("nautilus")).toBe(true);
  });
  it("octopus does not", () => {
    expect(hasExternalShell("octopus")).toBe(false);
  });
});

describe("producesInk", () => {
  it("octopus produces ink", () => {
    expect(producesInk("octopus")).toBe(true);
  });
  it("nautilus does not", () => {
    expect(producesInk("nautilus")).toBe(false);
  });
});

describe("primaryDefense", () => {
  it("octopus primary defense is camouflage", () => {
    expect(primaryDefense("octopus")).toBe("camouflage");
  });
});

describe("scientificInterest", () => {
  it("giant squid has highest scientific interest", () => {
    expect(scientificInterest("giant_squid")).toBeGreaterThan(
      scientificInterest("squid")
    );
  });
});

describe("cephalopodTypes", () => {
  it("returns 5 types", () => {
    expect(cephalopodTypes()).toHaveLength(5);
  });
});
