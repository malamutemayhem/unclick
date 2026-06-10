import { describe, it, expect } from "vitest";
import {
  warmthRating, attackSharpness, sustainSeconds,
  volumeLevel, densityKgPerM3, tuningStability,
  bestGenre, plySuitable, costPerShell, shellMaterials,
} from "../drum-shell-calc.js";

describe("warmthRating", () => {
  it("mahogany is warmest", () => {
    expect(warmthRating("mahogany")).toBeGreaterThan(
      warmthRating("birch")
    );
  });
});

describe("attackSharpness", () => {
  it("birch has sharpest attack", () => {
    expect(attackSharpness("birch")).toBeGreaterThan(
      attackSharpness("mahogany")
    );
  });
});

describe("sustainSeconds", () => {
  it("mahogany sustains longest", () => {
    expect(sustainSeconds("mahogany")).toBeGreaterThan(
      sustainSeconds("birch")
    );
  });
});

describe("volumeLevel", () => {
  it("birch is loudest", () => {
    expect(volumeLevel("birch")).toBeGreaterThan(
      volumeLevel("mahogany")
    );
  });
});

describe("densityKgPerM3", () => {
  it("oak is densest", () => {
    expect(densityKgPerM3("oak")).toBeGreaterThan(
      densityKgPerM3("mahogany")
    );
  });
});

describe("tuningStability", () => {
  it("oak has best tuning stability", () => {
    expect(tuningStability("oak")).toBeGreaterThan(
      tuningStability("mahogany")
    );
  });
});

describe("bestGenre", () => {
  it("birch is best for rock", () => {
    expect(bestGenre("birch")).toBe("rock");
  });
});

describe("plySuitable", () => {
  it("maple is ply suitable", () => {
    expect(plySuitable("maple")).toBe(true);
  });
  it("mahogany is not", () => {
    expect(plySuitable("mahogany")).toBe(false);
  });
});

describe("costPerShell", () => {
  it("walnut costs most", () => {
    expect(costPerShell("walnut")).toBeGreaterThan(
      costPerShell("birch")
    );
  });
});

describe("shellMaterials", () => {
  it("returns 5 materials", () => {
    expect(shellMaterials()).toHaveLength(5);
  });
});
