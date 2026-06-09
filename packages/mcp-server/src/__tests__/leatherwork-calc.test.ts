import { describe, it, expect } from "vitest";
import {
  ozToMm, mmToOz, sqFtToSqDm, sqDmToSqFt, hideArea,
  piecesFromHide, stitchingLength, needleSize, punchSize,
  edgeFinishTime, dyeAmount, conditionerAmount, beltLength,
  beltHoles, walletPanels, costPerPiece, leatherTypes,
} from "../leatherwork-calc.js";

describe("ozToMm", () => {
  it("1 oz = 0.4mm", () => {
    expect(ozToMm(1)).toBe(0.4);
  });

  it("8 oz = 3.2mm", () => {
    expect(ozToMm(8)).toBe(3.2);
  });
});

describe("mmToOz", () => {
  it("round trips", () => {
    expect(mmToOz(ozToMm(6))).toBe(6);
  });
});

describe("sqFtToSqDm", () => {
  it("positive conversion", () => {
    expect(sqFtToSqDm(1)).toBeCloseTo(9.29, 0);
  });
});

describe("sqDmToSqFt", () => {
  it("inverse of sqFtToSqDm", () => {
    expect(sqDmToSqFt(sqFtToSqDm(5))).toBeCloseTo(5, 0);
  });
});

describe("hideArea", () => {
  it("veg tan avg ~24 sqft", () => {
    expect(hideArea("vegetable_tan").avgSqFt).toBe(24);
  });

  it("exotic is smallest", () => {
    expect(hideArea("exotic").avgSqFt).toBeLessThan(hideArea("vegetable_tan").avgSqFt);
  });
});

describe("piecesFromHide", () => {
  it("accounts for waste", () => {
    expect(piecesFromHide(24, 2)).toBeLessThan(12);
  });
});

describe("stitchingLength", () => {
  it("positive length", () => {
    expect(stitchingLength(30)).toBeGreaterThan(0);
  });
});

describe("needleSize", () => {
  it("larger for thicker leather", () => {
    expect(needleSize(4)).toBeGreaterThan(needleSize(1));
  });
});

describe("punchSize", () => {
  it("proportional to thickness", () => {
    expect(punchSize(3)).toBeGreaterThan(punchSize(1));
  });
});

describe("edgeFinishTime", () => {
  it("fold takes longest", () => {
    expect(edgeFinishTime(100, "fold")).toBeGreaterThan(edgeFinishTime(100, "paint"));
  });
});

describe("dyeAmount", () => {
  it("more coats = more dye", () => {
    expect(dyeAmount(5, 3)).toBeGreaterThan(dyeAmount(5, 1));
  });
});

describe("conditionerAmount", () => {
  it("scales with area", () => {
    expect(conditionerAmount(10)).toBeGreaterThan(conditionerAmount(5));
  });
});

describe("beltLength", () => {
  it("adds overhang", () => {
    expect(beltLength(80)).toBeGreaterThan(80);
  });
});

describe("beltHoles", () => {
  it("default 5 holes", () => {
    expect(beltHoles()).toHaveLength(5);
  });
});

describe("walletPanels", () => {
  it("bifold = 4", () => {
    expect(walletPanels("bifold")).toBe(4);
  });

  it("trifold = 6", () => {
    expect(walletPanels("trifold")).toBe(6);
  });
});

describe("costPerPiece", () => {
  it("divides hide cost", () => {
    expect(costPerPiece(200, 10)).toBe(20);
  });
});

describe("leatherTypes", () => {
  it("returns 6 types", () => {
    expect(leatherTypes()).toHaveLength(6);
    expect(leatherTypes()).toContain("vegetable_tan");
  });
});
