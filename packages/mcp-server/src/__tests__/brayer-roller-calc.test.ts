import { describe, it, expect } from "vitest";
import {
  inkCoverage, pressureEven, textureAbility, cleanEase,
  brayerCost, forPrintmaking, disposable, rollerMaterial,
  bestProject, brayerRollers,
} from "../brayer-roller-calc.js";

describe("inkCoverage", () => {
  it("soft rubber ink best ink coverage", () => {
    expect(inkCoverage("soft_rubber_ink")).toBeGreaterThan(inkCoverage("acrylic_roller_clay"));
  });
});

describe("pressureEven", () => {
  it("hard rubber block most even pressure", () => {
    expect(pressureEven("hard_rubber_block")).toBeGreaterThan(pressureEven("foam_roller_stamp"));
  });
});

describe("textureAbility", () => {
  it("gelatin plate mono best texture ability", () => {
    expect(textureAbility("gelatin_plate_mono")).toBeGreaterThan(textureAbility("soft_rubber_ink"));
  });
});

describe("cleanEase", () => {
  it("acrylic roller clay easiest to clean", () => {
    expect(cleanEase("acrylic_roller_clay")).toBeGreaterThan(cleanEase("foam_roller_stamp"));
  });
});

describe("brayerCost", () => {
  it("gelatin plate mono most expensive", () => {
    expect(brayerCost("gelatin_plate_mono")).toBeGreaterThan(brayerCost("foam_roller_stamp"));
  });
});

describe("forPrintmaking", () => {
  it("soft rubber ink is for printmaking", () => {
    expect(forPrintmaking("soft_rubber_ink")).toBe(true);
  });
  it("foam roller stamp is not for printmaking", () => {
    expect(forPrintmaking("foam_roller_stamp")).toBe(false);
  });
});

describe("disposable", () => {
  it("foam roller stamp is disposable", () => {
    expect(disposable("foam_roller_stamp")).toBe(true);
  });
  it("soft rubber ink is not disposable", () => {
    expect(disposable("soft_rubber_ink")).toBe(false);
  });
});

describe("rollerMaterial", () => {
  it("acrylic roller clay uses clear acrylic tube", () => {
    expect(rollerMaterial("acrylic_roller_clay")).toBe("clear_acrylic_tube");
  });
});

describe("bestProject", () => {
  it("gelatin plate mono best for monoprint ghost layer", () => {
    expect(bestProject("gelatin_plate_mono")).toBe("monoprint_ghost_layer");
  });
});

describe("brayerRollers", () => {
  it("returns 5 types", () => {
    expect(brayerRollers()).toHaveLength(5);
  });
});
