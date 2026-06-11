import { describe, it, expect } from "vitest";
import {
  bendAccuracy, throughput, minRadius, wallThinning,
  tbCost, multiAxis, forThinWall, benderConfig,
  bestUse, tubeBenderTypes,
} from "../tube-bender-calc.js";

describe("bendAccuracy", () => {
  it("cnc multi stack best bend accuracy", () => {
    expect(bendAccuracy("cnc_multi_stack")).toBeGreaterThan(bendAccuracy("press_bend"));
  });
});

describe("throughput", () => {
  it("press bend highest throughput", () => {
    expect(throughput("press_bend")).toBeGreaterThan(throughput("mandrel_bend"));
  });
});

describe("minRadius", () => {
  it("mandrel bend best min radius", () => {
    expect(minRadius("mandrel_bend")).toBeGreaterThan(minRadius("press_bend"));
  });
});

describe("wallThinning", () => {
  it("mandrel bend best wall thinning control", () => {
    expect(wallThinning("mandrel_bend")).toBeGreaterThan(wallThinning("press_bend"));
  });
});

describe("tbCost", () => {
  it("cnc multi stack most expensive", () => {
    expect(tbCost("cnc_multi_stack")).toBeGreaterThan(tbCost("press_bend"));
  });
});

describe("multiAxis", () => {
  it("cnc multi stack is multi axis", () => {
    expect(multiAxis("cnc_multi_stack")).toBe(true);
  });
  it("rotary draw not multi axis", () => {
    expect(multiAxis("rotary_draw")).toBe(false);
  });
});

describe("forThinWall", () => {
  it("mandrel bend for thin wall", () => {
    expect(forThinWall("mandrel_bend")).toBe(true);
  });
  it("roll bend not for thin wall", () => {
    expect(forThinWall("roll_bend")).toBe(false);
  });
});

describe("benderConfig", () => {
  it("cnc multi stack uses servo axis compound bend 3d shape", () => {
    expect(benderConfig("cnc_multi_stack")).toBe("cnc_multi_stack_tube_bender_servo_axis_compound_bend_3d_shape");
  });
});

describe("bestUse", () => {
  it("mandrel bend for aircraft tube ball support thin wall no wrinkle", () => {
    expect(bestUse("mandrel_bend")).toBe("aircraft_tube_mandrel_bender_ball_support_thin_wall_no_wrinkle");
  });
});

describe("tubeBenderTypes", () => {
  it("returns 5 types", () => {
    expect(tubeBenderTypes()).toHaveLength(5);
  });
});
