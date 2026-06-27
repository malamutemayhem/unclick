import { describe, it, expect } from "vitest";
import {
  scaleRatio, trackGauge, realToScale, scaleToReal,
  minimumRadius, trackLength, turnoutCount, trainSpeed,
  powerSupply, wireGauge, feederWires, sceneryArea,
  treeCount, buildingFootprint, estimateCost, scales,
} from "../model-train.js";

describe("scaleRatio", () => {
  it("HO = 1:87", () => {
    expect(scaleRatio("HO")).toBe(87);
  });
});

describe("trackGauge", () => {
  it("HO = 16.5mm", () => {
    expect(trackGauge("HO")).toBe(16.5);
  });
});

describe("realToScale", () => {
  it("1m HO = ~11.5mm", () => {
    expect(realToScale(1000, "HO")).toBeCloseTo(11.5, 0);
  });
});

describe("scaleToReal", () => {
  it("round trips", () => {
    const scaled = realToScale(5000, "N");
    expect(scaleToReal(scaled, "N")).toBeCloseTo(5000, -1);
  });
});

describe("minimumRadius", () => {
  it("larger scale = larger radius", () => {
    expect(minimumRadius("G")).toBeGreaterThan(minimumRadius("N"));
  });
});

describe("trackLength", () => {
  it("positive meters", () => {
    expect(trackLength(200, 100)).toBeGreaterThan(0);
  });
});

describe("turnoutCount", () => {
  it("equals switches", () => {
    expect(turnoutCount(5)).toBe(5);
  });
});

describe("trainSpeed", () => {
  it("scale speed from real", () => {
    expect(trainSpeed(100, "HO")).toBeGreaterThan(0);
  });
});

describe("powerSupply", () => {
  it("scales with locos", () => {
    expect(powerSupply(3)).toBeGreaterThan(powerSupply(1));
  });
});

describe("wireGauge", () => {
  it("thicker for more power", () => {
    expect(wireGauge(100)).toBeLessThan(wireGauge(10));
  });
});

describe("feederWires", () => {
  it("more for longer track", () => {
    expect(feederWires(10)).toBeGreaterThan(feederWires(3));
  });
});

describe("sceneryArea", () => {
  it("positive m2", () => {
    expect(sceneryArea(20000)).toBeGreaterThan(0);
  });
});

describe("treeCount", () => {
  it("dense > sparse", () => {
    expect(treeCount(1, "dense")).toBeGreaterThan(treeCount(1, "sparse"));
  });
});

describe("buildingFootprint", () => {
  it("positive mm2", () => {
    expect(buildingFootprint(100, "HO")).toBeGreaterThan(0);
  });
});

describe("estimateCost", () => {
  it("positive cost", () => {
    expect(estimateCost(5, 10, 2, 100, 3, 30)).toBeGreaterThan(0);
  });
});

describe("scales", () => {
  it("returns 7 scales", () => {
    expect(scales()).toHaveLength(7);
    expect(scales()).toContain("HO");
  });
});
