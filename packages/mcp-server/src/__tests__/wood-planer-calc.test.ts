import { describe, it, expect } from "vitest";
import {
  speed, surfaceFinish, capacityWidth, profileRange,
  wpCost, multiSide, forProfile, cutting,
  bestUse, woodPlanerTypes,
} from "../wood-planer-calc.js";

describe("speed", () => {
  it("wide belt sander fastest", () => {
    expect(speed("wide_belt_sander")).toBeGreaterThan(speed("jointer_planer"));
  });
});

describe("surfaceFinish", () => {
  it("spiral cutterhead best surface finish", () => {
    expect(surfaceFinish("spiral_cutterhead")).toBeGreaterThan(surfaceFinish("thickness_single"));
  });
});

describe("capacityWidth", () => {
  it("wide belt sander widest capacity", () => {
    expect(capacityWidth("wide_belt_sander")).toBeGreaterThan(capacityWidth("moulder_four_side"));
  });
});

describe("profileRange", () => {
  it("moulder four side widest profile range", () => {
    expect(profileRange("moulder_four_side")).toBeGreaterThan(profileRange("thickness_single"));
  });
});

describe("wpCost", () => {
  it("moulder four side most expensive", () => {
    expect(wpCost("moulder_four_side")).toBeGreaterThan(wpCost("thickness_single"));
  });
});

describe("multiSide", () => {
  it("moulder four side is multi side", () => {
    expect(multiSide("moulder_four_side")).toBe(true);
  });
  it("thickness single not multi side", () => {
    expect(multiSide("thickness_single")).toBe(false);
  });
});

describe("forProfile", () => {
  it("moulder four side for profile", () => {
    expect(forProfile("moulder_four_side")).toBe(true);
  });
  it("spiral cutterhead not for profile", () => {
    expect(forProfile("spiral_cutterhead")).toBe(false);
  });
});

describe("cutting", () => {
  it("spiral cutterhead uses helical carbide insert", () => {
    expect(cutting("spiral_cutterhead")).toBe("helical_carbide_insert_cutterhead_shearing_cut_low_noise");
  });
});

describe("bestUse", () => {
  it("wide belt sander for panel calibration", () => {
    expect(bestUse("wide_belt_sander")).toBe("panel_calibration_veneer_sanding_wide_board_finish_prep");
  });
});

describe("woodPlanerTypes", () => {
  it("returns 5 types", () => {
    expect(woodPlanerTypes()).toHaveLength(5);
  });
});
