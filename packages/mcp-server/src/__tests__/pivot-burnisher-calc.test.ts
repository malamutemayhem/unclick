import { describe, it, expect } from "vitest";
import {
  finishQuality, reachAccess, speedPolish, pivotRange,
  burnisherCost, powered, forEndshake, tipShape,
  bestUse, pivotBurnishers,
} from "../pivot-burnisher-calc.js";

describe("finishQuality", () => {
  it("jacot drum lathe best finish", () => {
    expect(finishQuality("jacot_drum_lathe")).toBeGreaterThan(finishQuality("pivot_file_flat"));
  });
});

describe("reachAccess", () => {
  it("curved tip reach best access", () => {
    expect(reachAccess("curved_tip_reach")).toBeGreaterThan(reachAccess("jacot_drum_lathe"));
  });
});

describe("speedPolish", () => {
  it("jacot drum lathe fastest polish", () => {
    expect(speedPolish("jacot_drum_lathe")).toBeGreaterThan(speedPolish("straight_steel_rod"));
  });
});

describe("pivotRange", () => {
  it("jacot drum lathe widest range", () => {
    expect(pivotRange("jacot_drum_lathe")).toBeGreaterThan(pivotRange("pivot_file_flat"));
  });
});

describe("burnisherCost", () => {
  it("jacot drum lathe most expensive", () => {
    expect(burnisherCost("jacot_drum_lathe")).toBeGreaterThan(burnisherCost("pivot_file_flat"));
  });
});

describe("powered", () => {
  it("jacot drum lathe is powered", () => {
    expect(powered("jacot_drum_lathe")).toBe(true);
  });
  it("straight steel rod not powered", () => {
    expect(powered("straight_steel_rod")).toBe(false);
  });
});

describe("forEndshake", () => {
  it("bell mouth open is for endshake", () => {
    expect(forEndshake("bell_mouth_open")).toBe(true);
  });
  it("straight steel rod not for endshake", () => {
    expect(forEndshake("straight_steel_rod")).toBe(false);
  });
});

describe("tipShape", () => {
  it("curved tip reach uses curved hook tip", () => {
    expect(tipShape("curved_tip_reach")).toBe("curved_hook_tip");
  });
});

describe("bestUse", () => {
  it("jacot drum lathe best for precision pivot true", () => {
    expect(bestUse("jacot_drum_lathe")).toBe("precision_pivot_true");
  });
});

describe("pivotBurnishers", () => {
  it("returns 5 types", () => {
    expect(pivotBurnishers()).toHaveLength(5);
  });
});
