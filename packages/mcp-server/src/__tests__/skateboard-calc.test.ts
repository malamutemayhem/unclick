import { describe, it, expect } from "vitest";
import {
  deckWidth, wheelbase, truckWidth, wheelDiameter,
  wheelContact, bearingAbec, speedFromSlope, ollieHeight,
  rampSpeed, griptapeFriction, bushingHardness, riserHeight,
  setupCost, deckShapes,
} from "../skateboard-calc.js";

describe("deckWidth", () => {
  it("wider for bigger shoes", () => {
    expect(deckWidth(12)).toBeGreaterThan(deckWidth(7));
  });
});

describe("wheelbase", () => {
  it("55% of length", () => {
    expect(wheelbase(32)).toBeCloseTo(17.6, 0);
  });
});

describe("truckWidth", () => {
  it("slightly narrower than deck", () => {
    expect(truckWidth(8.25)).toBeLessThan(8.25);
  });
});

describe("wheelDiameter", () => {
  it("cruising is biggest", () => {
    expect(wheelDiameter("cruising")).toBeGreaterThan(wheelDiameter("street"));
  });
});

describe("wheelContact", () => {
  it("softer = more contact", () => {
    expect(wheelContact(54, "78a")).toBeGreaterThan(wheelContact(54, "101a"));
  });
});

describe("bearingAbec", () => {
  it("downhill highest", () => {
    expect(bearingAbec("downhill")).toBeGreaterThan(bearingAbec("casual"));
  });
});

describe("speedFromSlope", () => {
  it("positive for steep slope", () => {
    expect(speedFromSlope(10)).toBeGreaterThan(0);
  });

  it("0 for flat", () => {
    expect(speedFromSlope(0)).toBe(0);
  });
});

describe("ollieHeight", () => {
  it("positive cm", () => {
    expect(ollieHeight(45, 600)).toBeGreaterThan(0);
  });
});

describe("rampSpeed", () => {
  it("positive kmh", () => {
    expect(rampSpeed(2)).toBeGreaterThan(0);
  });
});

describe("griptapeFriction", () => {
  it("silicon carbide grippier", () => {
    expect(griptapeFriction("silicon_carbide")).toBeGreaterThan(griptapeFriction("aluminum_oxide"));
  });
});

describe("bushingHardness", () => {
  it("soft for light rider", () => {
    expect(bushingHardness(50)).toContain("soft");
  });
});

describe("riserHeight", () => {
  it("0 for small wheels", () => {
    expect(riserHeight(52)).toBe(0);
  });

  it("6 for big wheels", () => {
    expect(riserHeight(62)).toBe(6);
  });
});

describe("setupCost", () => {
  it("sums all parts", () => {
    expect(setupCost(60, 40, 30, 15, 10)).toBe(155);
  });
});

describe("deckShapes", () => {
  it("returns 5 shapes", () => {
    expect(deckShapes()).toHaveLength(5);
  });
});
