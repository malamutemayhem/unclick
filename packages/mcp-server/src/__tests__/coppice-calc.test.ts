import { describe, it, expect } from "vitest";
import {
  rotationYears, stemsPerStool, yieldM3PerHa, stoolSpacingM,
  stoolsPerHa, cuttingSeason, regenerationMonths,
  biodiversityScore, charcoalYieldKg, carbonSequestrationKg, coppiceTrees,
} from "../coppice-calc.js";

describe("rotationYears", () => {
  it("willow shortest", () => {
    expect(rotationYears("willow")).toBeLessThan(rotationYears("oak"));
  });
});

describe("stemsPerStool", () => {
  it("willow most stems", () => {
    expect(stemsPerStool("willow", 5)).toBeGreaterThan(stemsPerStool("oak", 5));
  });
});

describe("yieldM3PerHa", () => {
  it("willow highest yield", () => {
    expect(yieldM3PerHa("willow")).toBeGreaterThan(yieldM3PerHa("oak"));
  });
});

describe("stoolSpacingM", () => {
  it("willow closest", () => {
    expect(stoolSpacingM("willow")).toBeLessThan(stoolSpacingM("oak"));
  });
});

describe("stoolsPerHa", () => {
  it("positive count", () => {
    expect(stoolsPerHa(3)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(stoolsPerHa(0)).toBe(0);
  });
});

describe("cuttingSeason", () => {
  it("willow is winter_spring", () => {
    expect(cuttingSeason("willow")).toBe("winter_spring");
  });
  it("hazel is winter", () => {
    expect(cuttingSeason("hazel")).toBe("winter");
  });
});

describe("regenerationMonths", () => {
  it("willow fastest", () => {
    expect(regenerationMonths("willow")).toBeLessThan(regenerationMonths("oak"));
  });
});

describe("biodiversityScore", () => {
  it("positive score", () => {
    expect(biodiversityScore(3, 5)).toBeGreaterThan(0);
  });
});

describe("charcoalYieldKg", () => {
  it("25% of wood", () => {
    expect(charcoalYieldKg(100)).toBe(25);
  });
});

describe("carbonSequestrationKg", () => {
  it("positive kg", () => {
    expect(carbonSequestrationKg(2, 10)).toBeGreaterThan(0);
  });
});

describe("coppiceTrees", () => {
  it("returns 5 trees", () => {
    expect(coppiceTrees()).toHaveLength(5);
  });
});
