import { describe, it, expect } from "vitest";
import {
  kiteArea, liftForce, dragForce, lineLength, lineStrength,
  windCategory, beaufortScale, recommendedSize, tailLength,
  bridleAngle, fabricAmount, sparWeight, maxAltitude,
  costEstimate, kiteShapes,
} from "../kite-calc.js";

describe("kiteArea", () => {
  it("positive area", () => {
    expect(kiteArea("diamond", 100, 120)).toBeGreaterThan(0);
  });

  it("box > diamond for same dims", () => {
    expect(kiteArea("box", 100, 100)).toBeGreaterThan(kiteArea("diamond", 100, 100));
  });
});

describe("liftForce", () => {
  it("positive for wind", () => {
    expect(liftForce(1, 5)).toBeGreaterThan(0);
  });

  it("scales with wind speed", () => {
    expect(liftForce(1, 10)).toBeGreaterThan(liftForce(1, 5));
  });
});

describe("dragForce", () => {
  it("less than lift", () => {
    expect(dragForce(1, 5)).toBeLessThan(liftForce(1, 5));
  });
});

describe("lineLength", () => {
  it("longer at shallow angle", () => {
    expect(lineLength(100, 30)).toBeGreaterThan(lineLength(100, 60));
  });
});

describe("lineStrength", () => {
  it("3x lift default", () => {
    expect(lineStrength(10)).toBe(30);
  });
});

describe("windCategory", () => {
  it("light for calm", () => {
    expect(windCategory(5)).toBe("light");
  });

  it("strong for 30 kmh", () => {
    expect(windCategory(30)).toBe("strong");
  });
});

describe("beaufortScale", () => {
  it("0 for calm", () => {
    expect(beaufortScale(0)).toBe(0);
  });

  it("4 for moderate breeze", () => {
    expect(beaufortScale(25)).toBe(4);
  });
});

describe("recommendedSize", () => {
  it("large for light wind", () => {
    expect(recommendedSize(8)).toContain("large");
  });
});

describe("tailLength", () => {
  it("box has no tail", () => {
    expect(tailLength(100, "box")).toBe(0);
  });

  it("diamond has long tail", () => {
    expect(tailLength(100, "diamond")).toBe(700);
  });
});

describe("bridleAngle", () => {
  it("parafoil has no bridle", () => {
    expect(bridleAngle("parafoil")).toBe(0);
  });
});

describe("fabricAmount", () => {
  it("more than raw area", () => {
    expect(fabricAmount(2, 4)).toBeGreaterThan(2);
  });
});

describe("sparWeight", () => {
  it("carbon lighter than fiberglass", () => {
    expect(sparWeight(200, 12, "carbon")).toBeLessThan(sparWeight(200, 12, "fiberglass"));
  });
});

describe("maxAltitude", () => {
  it("positive altitude", () => {
    expect(maxAltitude(100, 45)).toBeGreaterThan(0);
  });
});

describe("costEstimate", () => {
  it("positive cost", () => {
    expect(costEstimate(1.5, "nylon")).toBeGreaterThan(0);
  });
});

describe("kiteShapes", () => {
  it("returns 6 shapes", () => {
    expect(kiteShapes()).toHaveLength(6);
  });
});
