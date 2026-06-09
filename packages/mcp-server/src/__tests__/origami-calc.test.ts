import { describe, it, expect } from "vitest";
import {
  paperArea, paperWeight, foldHalf, maxFolds, craneFromSquare,
  paperSizeForModel, wetFoldingStrength, creaseAngle, kawasaki,
  maekawa, gridDivisions, diagonalLength, paperCost, scaleFactor,
  modulesNeeded, listStandardSizes, Paper,
} from "../origami-calc.js";

const square15: Paper = { shape: "square", widthCm: 15, heightCm: 15, weightGsm: 80 };

describe("paperArea", () => {
  it("square area", () => {
    expect(paperArea(square15)).toBe(225);
  });

  it("circle area", () => {
    const circle: Paper = { shape: "circle", widthCm: 10, heightCm: 10, weightGsm: 80 };
    expect(paperArea(circle)).toBeCloseTo(78.5, 0);
  });
});

describe("paperWeight", () => {
  it("15cm square at 80gsm", () => {
    expect(paperWeight(square15)).toBeCloseTo(1.8, 1);
  });
});

describe("foldHalf", () => {
  it("3 folds = 8 layers", () => {
    const r = foldHalf(square15, 3);
    expect(r.layers).toBe(8);
  });

  it("area halves each fold", () => {
    const r = foldHalf(square15, 2);
    expect(r.area).toBeCloseTo(225 / 4, 0);
  });
});

describe("maxFolds", () => {
  it("limited by paper size", () => {
    const m = maxFolds(square15);
    expect(m).toBeGreaterThanOrEqual(4);
    expect(m).toBeLessThanOrEqual(10);
  });
});

describe("craneFromSquare", () => {
  it("15cm square crane", () => {
    const c = craneFromSquare(15);
    expect(c.wingspanCm).toBe(9);
    expect(c.heightCm).toBe(7.5);
    expect(c.difficulty).toBe("medium");
  });

  it("small paper is hard", () => {
    expect(craneFromSquare(7).difficulty).toBe("hard");
  });
});

describe("paperSizeForModel", () => {
  it("10cm model needs 40cm paper", () => {
    expect(paperSizeForModel(10)).toBe(40);
  });
});

describe("wetFoldingStrength", () => {
  it("80gsm is good", () => {
    expect(wetFoldingStrength(80)).toBe("good");
  });

  it("light paper is fragile", () => {
    expect(wetFoldingStrength(50)).toBe("too light");
  });
});

describe("creaseAngle", () => {
  it("sums angles mod 360", () => {
    expect(creaseAngle([{ angle: 90 }, { angle: 90 }, { angle: 90 }])).toBe(270);
  });
});

describe("kawasaki theorem", () => {
  it("valid flat fold", () => {
    expect(kawasaki([90, 90, 90, 90])).toBe(true);
  });

  it("invalid if unequal", () => {
    expect(kawasaki([80, 100, 90, 90])).toBe(false);
  });
});

describe("maekawa theorem", () => {
  it("difference of 2", () => {
    expect(maekawa(5, 3)).toBe(true);
  });

  it("fails for other differences", () => {
    expect(maekawa(5, 5)).toBe(false);
  });
});

describe("gridDivisions", () => {
  it("15cm / 8 = 1.875", () => {
    expect(gridDivisions(15, 8)).toBe(1.875);
  });
});

describe("diagonalLength", () => {
  it("3-4-5 triangle", () => {
    expect(diagonalLength(3, 4)).toBe(5);
  });
});

describe("paperCost", () => {
  it("includes waste", () => {
    expect(paperCost(100, 0.05)).toBeGreaterThan(5);
  });
});

describe("scaleFactor", () => {
  it("doubling size", () => {
    expect(scaleFactor(15, 30)).toBe(2);
  });
});

describe("modulesNeeded", () => {
  it("sonobe cube needs 6", () => {
    expect(modulesNeeded("sonobe_cube")).toBe(6);
  });

  it("kusudama needs 30", () => {
    expect(modulesNeeded("kusudama")).toBe(30);
  });
});

describe("listStandardSizes", () => {
  it("has standard sizes", () => {
    expect(listStandardSizes().length).toBeGreaterThan(3);
  });
});
