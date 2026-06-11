import { describe, it, expect } from "vitest";
import {
  formSupport, surfacePolish, shapeRange, reachAccess,
  planishCost, tapered, forHollow, stakeProfile,
  bestUse, planishingStakes,
} from "../planishing-stake-calc.js";

describe("formSupport", () => {
  it("t stake flat edge best form support", () => {
    expect(formSupport("t_stake_flat_edge")).toBeGreaterThan(formSupport("spoon_stake_hollow"));
  });
});

describe("surfacePolish", () => {
  it("mushroom dome round best surface polish", () => {
    expect(surfacePolish("mushroom_dome_round")).toBeGreaterThan(surfacePolish("anvil_horn_point"));
  });
});

describe("shapeRange", () => {
  it("anvil horn point widest shape range", () => {
    expect(shapeRange("anvil_horn_point")).toBeGreaterThan(shapeRange("spoon_stake_hollow"));
  });
});

describe("reachAccess", () => {
  it("mandrel taper cone best reach access", () => {
    expect(reachAccess("mandrel_taper_cone")).toBeGreaterThan(reachAccess("mushroom_dome_round"));
  });
});

describe("planishCost", () => {
  it("anvil horn point most expensive", () => {
    expect(planishCost("anvil_horn_point")).toBeGreaterThan(planishCost("mushroom_dome_round"));
  });
});

describe("tapered", () => {
  it("mandrel taper cone is tapered", () => {
    expect(tapered("mandrel_taper_cone")).toBe(true);
  });
  it("mushroom dome round not tapered", () => {
    expect(tapered("mushroom_dome_round")).toBe(false);
  });
});

describe("forHollow", () => {
  it("spoon stake hollow is for hollow", () => {
    expect(forHollow("spoon_stake_hollow")).toBe(true);
  });
  it("t stake flat edge not for hollow", () => {
    expect(forHollow("t_stake_flat_edge")).toBe(false);
  });
});

describe("stakeProfile", () => {
  it("anvil horn point uses horn point taper", () => {
    expect(stakeProfile("anvil_horn_point")).toBe("horn_point_taper");
  });
});

describe("bestUse", () => {
  it("mandrel taper cone best for ring bracelet form", () => {
    expect(bestUse("mandrel_taper_cone")).toBe("ring_bracelet_form");
  });
});

describe("planishingStakes", () => {
  it("returns 5 types", () => {
    expect(planishingStakes()).toHaveLength(5);
  });
});
