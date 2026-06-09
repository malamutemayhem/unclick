import { describe, it, expect } from "vitest";
import {
  reflections, symmetryFold, mirrorAngle, tubeLength,
  mirrorWidth, mirrorLength, objectChamberDepth, eyepieceDiameter,
  imageSegments, rotationSpeed, colorCount, optimalViewing,
  materialCost, mirrorConfigs,
} from "../kaleidoscope-calc.js";

describe("reflections", () => {
  it("2 mirrors create reflections", () => {
    expect(reflections(2)).toBeGreaterThan(0);
  });
  it("1 mirror = 1 reflection", () => {
    expect(reflections(1)).toBe(1);
  });
});

describe("symmetryFold", () => {
  it("60 degrees = 6 fold", () => {
    expect(symmetryFold(60)).toBe(6);
  });
  it("zero angle returns 0", () => {
    expect(symmetryFold(0)).toBe(0);
  });
});

describe("mirrorAngle", () => {
  it("2_mirror = 60 degrees", () => {
    expect(mirrorAngle("2_mirror")).toBe(60);
  });
  it("4_mirror = 45 degrees", () => {
    expect(mirrorAngle("4_mirror")).toBe(45);
  });
});

describe("tubeLength", () => {
  it("positive cm", () => {
    expect(tubeLength(4)).toBeGreaterThan(0);
  });
  it("proportional to diameter", () => {
    expect(tubeLength(6)).toBeGreaterThan(tubeLength(3));
  });
});

describe("mirrorWidth", () => {
  it("positive cm", () => {
    expect(mirrorWidth(5, "3_mirror")).toBeGreaterThan(0);
  });
});

describe("mirrorLength", () => {
  it("90% of tube length", () => {
    expect(mirrorLength(30)).toBe(27);
  });
});

describe("objectChamberDepth", () => {
  it("half of diameter", () => {
    expect(objectChamberDepth(4)).toBe(2);
  });
});

describe("eyepieceDiameter", () => {
  it("smaller than tube", () => {
    expect(eyepieceDiameter(5)).toBeLessThan(5);
  });
});

describe("imageSegments", () => {
  it("60 degrees = 6 segments", () => {
    expect(imageSegments(60)).toBe(6);
  });
});

describe("rotationSpeed", () => {
  it("60 rpm = 1 rps", () => {
    expect(rotationSpeed(60)).toBe(1);
  });
});

describe("colorCount", () => {
  it("beads have 12 colors", () => {
    expect(colorCount("beads")).toBe(12);
  });
  it("teleidoscope has 0", () => {
    expect(colorCount("teleidoscope")).toBe(0);
  });
});

describe("optimalViewing", () => {
  it("positive cm", () => {
    expect(optimalViewing(25)).toBeGreaterThan(0);
  });
});

describe("materialCost", () => {
  it("positive dollars", () => {
    expect(materialCost("3_mirror", 25)).toBeGreaterThan(0);
  });
  it("more mirrors cost more", () => {
    expect(materialCost("4_mirror", 25)).toBeGreaterThan(materialCost("2_mirror", 25));
  });
});

describe("mirrorConfigs", () => {
  it("returns 4 configs", () => {
    expect(mirrorConfigs()).toHaveLength(4);
  });
});
