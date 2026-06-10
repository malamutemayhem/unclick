import { describe, it, expect } from "vitest";
import {
  supportLevel, pressureRelief, motionIsolation, breathability,
  durabilityYears, hypoallergenic, adjustableFirmness, bestSleepPosition,
  coreMaterial, mattressTypes,
} from "../mattress-type-calc.js";

describe("supportLevel", () => {
  it("latex best support", () => {
    expect(supportLevel("latex")).toBeGreaterThan(supportLevel("airbed"));
  });
});

describe("pressureRelief", () => {
  it("memory foam best pressure relief", () => {
    expect(pressureRelief("memory_foam")).toBeGreaterThan(pressureRelief("innerspring"));
  });
});

describe("motionIsolation", () => {
  it("memory foam best motion isolation", () => {
    expect(motionIsolation("memory_foam")).toBeGreaterThan(motionIsolation("innerspring"));
  });
});

describe("breathability", () => {
  it("innerspring most breathable", () => {
    expect(breathability("innerspring")).toBeGreaterThan(breathability("memory_foam"));
  });
});

describe("durabilityYears", () => {
  it("latex most durable", () => {
    expect(durabilityYears("latex")).toBeGreaterThan(durabilityYears("airbed"));
  });
});

describe("hypoallergenic", () => {
  it("latex is hypoallergenic", () => {
    expect(hypoallergenic("latex")).toBe(true);
  });
  it("innerspring is not", () => {
    expect(hypoallergenic("innerspring")).toBe(false);
  });
});

describe("adjustableFirmness", () => {
  it("airbed has adjustable firmness", () => {
    expect(adjustableFirmness("airbed")).toBe(true);
  });
  it("memory foam does not", () => {
    expect(adjustableFirmness("memory_foam")).toBe(false);
  });
});

describe("bestSleepPosition", () => {
  it("memory foam for side sleeper", () => {
    expect(bestSleepPosition("memory_foam")).toBe("side_sleeper");
  });
});

describe("coreMaterial", () => {
  it("innerspring uses steel coils", () => {
    expect(coreMaterial("innerspring")).toBe("steel_coils");
  });
});

describe("mattressTypes", () => {
  it("returns 5 types", () => {
    expect(mattressTypes()).toHaveLength(5);
  });
});
