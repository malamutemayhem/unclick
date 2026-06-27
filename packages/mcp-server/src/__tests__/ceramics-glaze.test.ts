import { describe, it, expect } from "vitest";
import {
  coneToTemp, tempToCone, firingRange, shrinkagePercent,
  firedSize, greenSizeNeeded, glazeWeight, glazeBatchWeight,
  specificGravity, glazeThicknessFromSG, firingSchedule,
  kilnCapacity, electricityCost, thermalExpansion, crazingRisk,
  firingTypes,
} from "../ceramics-glaze.js";

describe("coneToTemp", () => {
  it("cone 6 = 1222C", () => {
    expect(coneToTemp("6")).toBe(1222);
  });

  it("cone 10 = 1305C", () => {
    expect(coneToTemp("10")).toBe(1305);
  });
});

describe("tempToCone", () => {
  it("finds closest cone", () => {
    expect(tempToCone(1220)).toBe("6");
  });
});

describe("firingRange", () => {
  it("stoneware higher than earthenware", () => {
    expect(firingRange("stoneware").minC).toBeGreaterThan(firingRange("earthenware").minC);
  });
});

describe("shrinkagePercent", () => {
  it("porcelain shrinks most", () => {
    expect(shrinkagePercent("porcelain")).toBeGreaterThan(shrinkagePercent("earthenware"));
  });
});

describe("firedSize", () => {
  it("smaller than green size", () => {
    expect(firedSize(10, "stoneware")).toBeLessThan(10);
  });
});

describe("greenSizeNeeded", () => {
  it("larger than target", () => {
    expect(greenSizeNeeded(10, "stoneware")).toBeGreaterThan(10);
  });

  it("round trips with firedSize", () => {
    const green = greenSizeNeeded(10, "porcelain");
    expect(firedSize(green, "porcelain")).toBeCloseTo(10, 1);
  });
});

describe("glazeWeight", () => {
  it("positive weight", () => {
    expect(glazeWeight(500)).toBeGreaterThan(0);
  });
});

describe("glazeBatchWeight", () => {
  it("sums to total", () => {
    const recipe = [
      { name: "feldspar", percent: 40 },
      { name: "silica", percent: 30 },
      { name: "whiting", percent: 30 },
    ];
    const batch = glazeBatchWeight(recipe, 1000);
    const sum = batch.reduce((s, i) => s + i.grams, 0);
    expect(sum).toBeCloseTo(1000, 0);
  });
});

describe("specificGravity", () => {
  it("greater than 1", () => {
    expect(specificGravity(500, 500)).toBeGreaterThan(1);
  });
});

describe("glazeThicknessFromSG", () => {
  it("thin at low SG", () => {
    expect(glazeThicknessFromSG(1.3)).toBe("thin");
  });

  it("thick at high SG", () => {
    expect(glazeThicknessFromSG(1.6)).toBe("thick");
  });
});

describe("firingSchedule", () => {
  it("raku is fastest", () => {
    expect(firingSchedule("raku").totalHours).toBeLessThan(firingSchedule("stoneware").totalHours);
  });
});

describe("kilnCapacity", () => {
  it("calculates liters", () => {
    expect(kilnCapacity(50, 50, 50)).toBe(125);
  });
});

describe("electricityCost", () => {
  it("scales with usage", () => {
    expect(electricityCost(10, 14, 0.3)).toBeGreaterThan(0);
  });
});

describe("thermalExpansion", () => {
  it("positive expansion", () => {
    expect(thermalExpansion(30, 1000)).toBeGreaterThan(0);
  });
});

describe("crazingRisk", () => {
  it("high when glaze expands more", () => {
    expect(crazingRisk(8, 7)).toBe("high");
  });

  it("low when body expands more", () => {
    expect(crazingRisk(6, 7)).toBe("low");
  });
});

describe("firingTypes", () => {
  it("returns 4 types", () => {
    expect(firingTypes()).toHaveLength(4);
    expect(firingTypes()).toContain("stoneware");
  });
});
