import { describe, it, expect } from "vitest";
import {
  fabricMeters, embroideryHours, goldThreadMeters, liningFabricM,
  gemstoneCount, fabricCostPerM, sewingTimeHours,
  maintenanceCostPerYear, storageRequirements, vestmentFabrics,
} from "../vestment-calc.js";

describe("fabricMeters", () => {
  it("cope uses most", () => {
    expect(fabricMeters("cope", 1)).toBeGreaterThan(fabricMeters("stole", 1));
  });
});

describe("embroideryHours", () => {
  it("goldwork takes longest", () => {
    expect(embroideryHours(100, "goldwork")).toBeGreaterThan(embroideryHours(100, "sparse"));
  });
});

describe("goldThreadMeters", () => {
  it("positive meters", () => {
    expect(goldThreadMeters(100, 0.5)).toBeGreaterThan(0);
  });
});

describe("liningFabricM", () => {
  it("less than outer", () => {
    expect(liningFabricM(5)).toBeLessThan(5);
  });
});

describe("gemstoneCount", () => {
  it("plain = 0", () => {
    expect(gemstoneCount("plain")).toBe(0);
  });
  it("cathedral most", () => {
    expect(gemstoneCount("cathedral")).toBeGreaterThan(gemstoneCount("ornate"));
  });
});

describe("fabricCostPerM", () => {
  it("brocade most expensive", () => {
    expect(fabricCostPerM("brocade")).toBeGreaterThan(fabricCostPerM("linen"));
  });
});

describe("sewingTimeHours", () => {
  it("master takes longest", () => {
    expect(sewingTimeHours(5, "master")).toBeGreaterThan(sewingTimeHours(5, "simple"));
  });
});

describe("maintenanceCostPerYear", () => {
  it("increases with age", () => {
    expect(maintenanceCostPerYear("silk", 20)).toBeGreaterThan(maintenanceCostPerYear("silk", 1));
  });
});

describe("storageRequirements", () => {
  it("positive values", () => {
    const s = storageRequirements(10);
    expect(s.hangingRodM).toBeGreaterThan(0);
    expect(s.drawers).toBeGreaterThan(0);
  });
});

describe("vestmentFabrics", () => {
  it("returns 5 fabrics", () => {
    expect(vestmentFabrics()).toHaveLength(5);
  });
});
