import { describe, it, expect } from "vitest";
import {
  push, spread, grading, flotation,
  bdCost, ripper, forClearing, blade,
  bestUse, bulldozerTypes,
} from "../bulldozer-type-calc.js";

describe("push", () => {
  it("u blade best push", () => {
    expect(push("universal_u_blade_bowl")).toBeGreaterThan(push("angle_blade_tilt"));
  });
});

describe("spread", () => {
  it("angle blade best spread", () => {
    expect(spread("angle_blade_tilt")).toBeGreaterThan(spread("universal_u_blade_bowl"));
  });
});

describe("grading", () => {
  it("angle blade best grading", () => {
    expect(grading("angle_blade_tilt")).toBeGreaterThan(grading("universal_u_blade_bowl"));
  });
});

describe("flotation", () => {
  it("swamp best flotation", () => {
    expect(flotation("swamp_low_ground_pressure")).toBeGreaterThan(flotation("standard_straight_blade_s"));
  });
});

describe("bdCost", () => {
  it("swamp most expensive", () => {
    expect(bdCost("swamp_low_ground_pressure")).toBeGreaterThan(bdCost("standard_straight_blade_s"));
  });
});

describe("ripper", () => {
  it("standard has ripper", () => {
    expect(ripper("standard_straight_blade_s")).toBe(true);
  });
  it("u blade no ripper", () => {
    expect(ripper("universal_u_blade_bowl")).toBe(false);
  });
});

describe("forClearing", () => {
  it("standard for clearing", () => {
    expect(forClearing("standard_straight_blade_s")).toBe(true);
  });
  it("u blade not for clearing", () => {
    expect(forClearing("universal_u_blade_bowl")).toBe(false);
  });
});

describe("blade", () => {
  it("swamp uses wide track lgp", () => {
    expect(blade("swamp_low_ground_pressure")).toBe("wide_track_low_pressure_lgp");
  });
});

describe("bestUse", () => {
  it("standard for general push grade", () => {
    expect(bestUse("standard_straight_blade_s")).toBe("general_push_grade_rip_backfill");
  });
});

describe("bulldozerTypes", () => {
  it("returns 5 types", () => {
    expect(bulldozerTypes()).toHaveLength(5);
  });
});
