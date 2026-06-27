import { describe, it, expect } from "vitest";
import {
  lightBlocking, visualImpact, lightTransmission, riggingComplexity,
  fabricCost, flameRetardant, projectionSurface, fabricType,
  bestUse, theaterCurtains,
} from "../theater-curtain-calc.js";

describe("lightBlocking", () => {
  it("main drape best light blocking", () => {
    expect(lightBlocking("main_drape")).toBeGreaterThan(lightBlocking("scrim"));
  });
});

describe("visualImpact", () => {
  it("main drape highest visual impact", () => {
    expect(visualImpact("main_drape")).toBeGreaterThan(visualImpact("blackout"));
  });
});

describe("lightTransmission", () => {
  it("scrim highest light transmission", () => {
    expect(lightTransmission("scrim")).toBeGreaterThan(lightTransmission("main_drape"));
  });
});

describe("riggingComplexity", () => {
  it("cyclorama most complex rigging", () => {
    expect(riggingComplexity("cyclorama")).toBeGreaterThan(riggingComplexity("blackout"));
  });
});

describe("fabricCost", () => {
  it("main drape most expensive fabric", () => {
    expect(fabricCost("main_drape")).toBeGreaterThan(fabricCost("blackout"));
  });
});

describe("flameRetardant", () => {
  it("all curtains are flame retardant", () => {
    expect(flameRetardant("main_drape")).toBe(true);
    expect(flameRetardant("scrim")).toBe(true);
  });
});

describe("projectionSurface", () => {
  it("cyclorama is projection surface", () => {
    expect(projectionSurface("cyclorama")).toBe(true);
  });
  it("main drape is not", () => {
    expect(projectionSurface("main_drape")).toBe(false);
  });
});

describe("fabricType", () => {
  it("scrim uses sharkstooth gauze open weave", () => {
    expect(fabricType("scrim")).toBe("sharkstooth_gauze_open_weave");
  });
});

describe("bestUse", () => {
  it("scrim for reveal effect transparent", () => {
    expect(bestUse("scrim")).toBe("reveal_effect_transparent");
  });
});

describe("theaterCurtains", () => {
  it("returns 5 curtain types", () => {
    expect(theaterCurtains()).toHaveLength(5);
  });
});
