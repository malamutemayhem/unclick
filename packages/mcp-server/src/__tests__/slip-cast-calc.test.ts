import { describe, it, expect } from "vitest";
import {
  slipVolumeMl, castingTimeMinutes, drainTimeMinutes, specificGravity,
  moldLifeCasts, moldDryingHours, deflocculantMlPerKg, shrinkagePercent,
  seamCleanupMinutes, moldCost, moldMaterials,
} from "../slip-cast-calc.js";

describe("slipVolumeMl", () => {
  it("thicker walls need more slip", () => {
    expect(slipVolumeMl(500, 5)).toBeGreaterThan(slipVolumeMl(500, 3));
  });
});

describe("castingTimeMinutes", () => {
  it("thicker walls take longer", () => {
    expect(castingTimeMinutes(5)).toBeGreaterThan(castingTimeMinutes(3));
  });
});

describe("drainTimeMinutes", () => {
  it("larger mold takes longer", () => {
    expect(drainTimeMinutes(1000)).toBeGreaterThan(drainTimeMinutes(500));
  });
});

describe("specificGravity", () => {
  it("porcelain is densest", () => {
    expect(specificGravity("porcelain")).toBeGreaterThan(specificGravity("earthenware"));
  });
});

describe("moldLifeCasts", () => {
  it("silicone lasts longest", () => {
    expect(moldLifeCasts("silicone")).toBeGreaterThan(moldLifeCasts("plaster"));
  });
});

describe("moldDryingHours", () => {
  it("plaster takes longest to dry", () => {
    expect(moldDryingHours("plaster")).toBeGreaterThan(moldDryingHours("resin"));
  });
});

describe("deflocculantMlPerKg", () => {
  it("porcelain needs most deflocculant", () => {
    expect(deflocculantMlPerKg("porcelain")).toBeGreaterThan(
      deflocculantMlPerKg("earthenware")
    );
  });
});

describe("shrinkagePercent", () => {
  it("porcelain shrinks most", () => {
    expect(shrinkagePercent("porcelain")).toBeGreaterThan(shrinkagePercent("earthenware"));
  });
});

describe("seamCleanupMinutes", () => {
  it("more parts = more cleanup", () => {
    expect(seamCleanupMinutes(4)).toBeGreaterThan(seamCleanupMinutes(2));
  });
});

describe("moldCost", () => {
  it("silicone most expensive", () => {
    expect(moldCost("silicone", 50)).toBeGreaterThan(moldCost("plaster", 50));
  });
});

describe("moldMaterials", () => {
  it("returns 5 materials", () => {
    expect(moldMaterials()).toHaveLength(5);
  });
});
