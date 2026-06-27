import { describe, it, expect } from "vitest";
import {
  culmDiameter, wallThickness, maxLength, bendingStrength,
  nodeSpacing, curingDays, shrinkagePercent, splitStrips,
  jointStrength, lashingLength, preservativeSoak, weightPerMeter,
  bambooSpecies,
} from "../bamboo-craft.js";

describe("culmDiameter", () => {
  it("timber is largest", () => {
    expect(culmDiameter("timber")).toBeGreaterThan(culmDiameter("arrow"));
  });
  it("arrow is smallest", () => {
    expect(culmDiameter("arrow")).toBe(15);
  });
});

describe("wallThickness", () => {
  it("positive mm", () => {
    expect(wallThickness("moso")).toBeGreaterThan(0);
  });
});

describe("maxLength", () => {
  it("timber is tallest", () => {
    expect(maxLength("timber")).toBeGreaterThan(maxLength("black"));
  });
});

describe("bendingStrength", () => {
  it("larger diameter = more strength", () => {
    expect(bendingStrength(120, 12)).toBeGreaterThan(bendingStrength(50, 5));
  });
});

describe("nodeSpacing", () => {
  it("positive cm", () => {
    expect(nodeSpacing("moso")).toBeGreaterThan(0);
  });
});

describe("curingDays", () => {
  it("air curing takes longest", () => {
    expect(curingDays("air")).toBeGreaterThan(curingDays("chemical"));
  });
});

describe("shrinkagePercent", () => {
  it("larger diameter = more shrinkage", () => {
    expect(shrinkagePercent(120)).toBeGreaterThan(shrinkagePercent(50));
  });
});

describe("splitStrips", () => {
  it("positive count", () => {
    expect(splitStrips(120, 10)).toBeGreaterThan(0);
  });
});

describe("jointStrength", () => {
  it("fish mouth is strongest", () => {
    expect(jointStrength("fish_mouth")).toBeGreaterThan(jointStrength("lashing"));
  });
});

describe("lashingLength", () => {
  it("positive cm", () => {
    expect(lashingLength(120, 10)).toBeGreaterThan(0);
  });
});

describe("preservativeSoak", () => {
  it("at least 1 day", () => {
    expect(preservativeSoak(10)).toBeGreaterThanOrEqual(1);
  });
});

describe("weightPerMeter", () => {
  it("positive kg", () => {
    expect(weightPerMeter(120, 12)).toBeGreaterThan(0);
  });
});

describe("bambooSpecies", () => {
  it("returns 6 species", () => {
    expect(bambooSpecies()).toHaveLength(6);
  });
});
