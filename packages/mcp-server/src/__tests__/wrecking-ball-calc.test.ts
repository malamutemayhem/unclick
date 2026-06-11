import { describe, it, expect } from "vitest";
import {
  impact, reach, precision, speed,
  wbCost, swinging, forMasonry, attachment,
  bestUse, wreckingBallTypes,
} from "../wrecking-ball-calc.js";

describe("impact", () => {
  it("standard sphere highest impact", () => {
    expect(impact("standard_cast_steel_sphere")).toBeGreaterThan(impact("headache_ball_crane_weight"));
  });
});

describe("reach", () => {
  it("headache ball longest reach", () => {
    expect(reach("headache_ball_crane_weight")).toBeGreaterThan(reach("pear_shaped_drop_weight"));
  });
});

describe("precision", () => {
  it("concrete crusher most precise", () => {
    expect(precision("concrete_crusher_jaw_pulverize")).toBeGreaterThan(precision("standard_cast_steel_sphere"));
  });
});

describe("speed", () => {
  it("clamshell grab fastest", () => {
    expect(speed("demolition_clamshell_grab")).toBeGreaterThan(speed("headache_ball_crane_weight"));
  });
});

describe("wbCost", () => {
  it("concrete crusher most expensive", () => {
    expect(wbCost("concrete_crusher_jaw_pulverize")).toBeGreaterThan(wbCost("headache_ball_crane_weight"));
  });
});

describe("swinging", () => {
  it("standard sphere is swinging", () => {
    expect(swinging("standard_cast_steel_sphere")).toBe(true);
  });
  it("pear shaped not swinging", () => {
    expect(swinging("pear_shaped_drop_weight")).toBe(false);
  });
});

describe("forMasonry", () => {
  it("standard sphere for masonry", () => {
    expect(forMasonry("standard_cast_steel_sphere")).toBe(true);
  });
  it("headache ball not for masonry", () => {
    expect(forMasonry("headache_ball_crane_weight")).toBe(false);
  });
});

describe("attachment", () => {
  it("clamshell uses hydraulic jaw grab", () => {
    expect(attachment("demolition_clamshell_grab")).toBe("hydraulic_jaw_grab_clam_open_close");
  });
});

describe("bestUse", () => {
  it("standard sphere for masonry wall chimney", () => {
    expect(bestUse("standard_cast_steel_sphere")).toBe("masonry_concrete_wall_chimney_drop");
  });
});

describe("wreckingBallTypes", () => {
  it("returns 5 types", () => {
    expect(wreckingBallTypes()).toHaveLength(5);
  });
});
