import { describe, it, expect } from "vitest";
import {
  cuttingAbility, grindingAbility, rootCount, decayRisk,
  eruptionAge, visibleWhenSmiling, commonlyExtracted,
  primaryFunction, surfaceShape, toothTypes,
} from "../tooth-type-calc.js";

describe("cuttingAbility", () => {
  it("incisor best at cutting", () => {
    expect(cuttingAbility("incisor")).toBeGreaterThan(cuttingAbility("molar"));
  });
});

describe("grindingAbility", () => {
  it("molar best at grinding", () => {
    expect(grindingAbility("molar")).toBeGreaterThan(grindingAbility("incisor"));
  });
});

describe("rootCount", () => {
  it("molar has most roots", () => {
    expect(rootCount("molar")).toBeGreaterThan(rootCount("canine"));
  });
});

describe("decayRisk", () => {
  it("wisdom highest decay risk", () => {
    expect(decayRisk("wisdom")).toBeGreaterThan(decayRisk("canine"));
  });
});

describe("eruptionAge", () => {
  it("wisdom erupts latest", () => {
    expect(eruptionAge("wisdom")).toBeGreaterThan(eruptionAge("incisor"));
  });
});

describe("visibleWhenSmiling", () => {
  it("incisor visible when smiling", () => {
    expect(visibleWhenSmiling("incisor")).toBe(true);
  });
  it("molar not visible", () => {
    expect(visibleWhenSmiling("molar")).toBe(false);
  });
});

describe("commonlyExtracted", () => {
  it("wisdom commonly extracted", () => {
    expect(commonlyExtracted("wisdom")).toBe(true);
  });
  it("canine not commonly extracted", () => {
    expect(commonlyExtracted("canine")).toBe(false);
  });
});

describe("primaryFunction", () => {
  it("canine for tearing", () => {
    expect(primaryFunction("canine")).toBe("tearing_piercing");
  });
});

describe("surfaceShape", () => {
  it("incisor flat chisel shape", () => {
    expect(surfaceShape("incisor")).toBe("flat_chisel");
  });
});

describe("toothTypes", () => {
  it("returns 5 types", () => {
    expect(toothTypes()).toHaveLength(5);
  });
});
