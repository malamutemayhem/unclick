import { describe, it, expect } from "vitest";
import {
  mixVolume, resinWeight, mixRatio, resinAmount, potLife,
  cureTime, layerCount, colorantAmount, bubbleRisk,
  shrinkagePercent, sandingGrits, polishingSteps,
  costEstimate, resinTypes,
} from "../resin-calc.js";

describe("mixVolume", () => {
  it("L x W x D", () => {
    expect(mixVolume(10, 5, 2)).toBe(100);
  });
});

describe("resinWeight", () => {
  it("heavier than water", () => {
    expect(resinWeight(100, "epoxy")).toBeGreaterThan(100);
  });
});

describe("mixRatio", () => {
  it("epoxy is 2:1", () => {
    const r = mixRatio("epoxy");
    expect(r.resin).toBe(2);
    expect(r.hardener).toBe(1);
  });

  it("UV needs no hardener", () => {
    expect(mixRatio("uv").hardener).toBe(0);
  });
});

describe("resinAmount", () => {
  it("sums to total", () => {
    const a = resinAmount(300, "epoxy");
    expect(a.resinMl + a.hardenerMl).toBeCloseTo(300, 0);
  });
});

describe("potLife", () => {
  it("UV has infinite pot life", () => {
    expect(potLife("uv")).toBe(Infinity);
  });

  it("shorter when hot", () => {
    expect(potLife("epoxy", 30)).toBeLessThan(potLife("epoxy", 20));
  });
});

describe("cureTime", () => {
  it("UV is fastest", () => {
    expect(cureTime("uv")).toBeLessThan(cureTime("epoxy"));
  });
});

describe("layerCount", () => {
  it("multiple layers for deep pours", () => {
    expect(layerCount(30, 10)).toBe(3);
  });

  it("single layer for shallow", () => {
    expect(layerCount(5, 10)).toBe(1);
  });
});

describe("colorantAmount", () => {
  it("3% default", () => {
    expect(colorantAmount(100)).toBe(3);
  });
});

describe("bubbleRisk", () => {
  it("high in hot humid conditions", () => {
    expect(bubbleRisk(30, 70)).toBe("high");
  });

  it("low in ideal conditions", () => {
    expect(bubbleRisk(22, 40)).toBe("low");
  });
});

describe("shrinkagePercent", () => {
  it("polyester shrinks most", () => {
    expect(shrinkagePercent("polyester")).toBeGreaterThan(shrinkagePercent("epoxy"));
  });
});

describe("sandingGrits", () => {
  it("ascending order", () => {
    const grits = sandingGrits();
    for (let i = 1; i < grits.length; i++) {
      expect(grits[i]).toBeGreaterThan(grits[i - 1]);
    }
  });
});

describe("polishingSteps", () => {
  it("has multiple steps", () => {
    expect(polishingSteps().length).toBeGreaterThan(3);
  });
});

describe("costEstimate", () => {
  it("positive cost", () => {
    expect(costEstimate(200, 50, 100, 60)).toBeGreaterThan(0);
  });
});

describe("resinTypes", () => {
  it("returns 4 types", () => {
    expect(resinTypes()).toHaveLength(4);
  });
});
