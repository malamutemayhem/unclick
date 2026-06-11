import { describe, it, expect } from "vitest";
import {
  reachHeight, horizontalReach, stability, setupSpeed,
  plCost, selfPropelled, forConstruction, platform,
  bestUse, platformLiftTypes,
} from "../platform-lift-calc.js";

describe("reachHeight", () => {
  it("boom telescopic straight highest reach", () => {
    expect(reachHeight("boom_telescopic_straight")).toBeGreaterThanOrEqual(reachHeight("boom_articulating"));
  });
});

describe("horizontalReach", () => {
  it("personnel basket crane best horizontal reach", () => {
    expect(horizontalReach("personnel_basket_crane")).toBeGreaterThan(horizontalReach("mast_climbing_scaffold"));
  });
});

describe("stability", () => {
  it("mast climbing scaffold most stable", () => {
    expect(stability("mast_climbing_scaffold")).toBeGreaterThan(stability("personnel_basket_crane"));
  });
});

describe("setupSpeed", () => {
  it("aerial truck mount fastest setup", () => {
    expect(setupSpeed("aerial_truck_mount")).toBeGreaterThan(setupSpeed("personnel_basket_crane"));
  });
});

describe("plCost", () => {
  it("boom telescopic straight most expensive", () => {
    expect(plCost("boom_telescopic_straight")).toBeGreaterThan(plCost("personnel_basket_crane"));
  });
});

describe("selfPropelled", () => {
  it("boom articulating is self propelled", () => {
    expect(selfPropelled("boom_articulating")).toBe(true);
  });
  it("mast climbing scaffold not self propelled", () => {
    expect(selfPropelled("mast_climbing_scaffold")).toBe(false);
  });
});

describe("forConstruction", () => {
  it("mast climbing scaffold for construction", () => {
    expect(forConstruction("mast_climbing_scaffold")).toBe(true);
  });
  it("aerial truck mount not for construction", () => {
    expect(forConstruction("aerial_truck_mount")).toBe(false);
  });
});

describe("platform", () => {
  it("aerial truck mount uses insulated boom bucket", () => {
    expect(platform("aerial_truck_mount")).toBe("truck_chassis_mounted_insulated_boom_bucket");
  });
});

describe("bestUse", () => {
  it("mast climbing for facade work", () => {
    expect(bestUse("mast_climbing_scaffold")).toBe("facade_work_high_rise_cladding_long_duration_job");
  });
});

describe("platformLiftTypes", () => {
  it("returns 5 types", () => {
    expect(platformLiftTypes()).toHaveLength(5);
  });
});
