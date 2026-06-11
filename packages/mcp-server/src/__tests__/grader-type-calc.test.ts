import { describe, it, expect } from "vitest";
import {
  precision, speed, bladeWidth, gradeControl,
  grCost, selfPropelled, forRoad, blade,
  bestUse, graderTypes,
} from "../grader-type-calc.js";

describe("precision", () => {
  it("laser grader most precise", () => {
    expect(precision("laser_grader_gps_guided")).toBeGreaterThan(precision("towed_grader_pull_behind"));
  });
});

describe("speed", () => {
  it("motor grader fastest", () => {
    expect(speed("motor_grader_tandem_axle")).toBeGreaterThan(speed("grader_attachment_skid_steer"));
  });
});

describe("bladeWidth", () => {
  it("motor grader widest blade", () => {
    expect(bladeWidth("motor_grader_tandem_axle")).toBeGreaterThan(bladeWidth("grader_attachment_skid_steer"));
  });
});

describe("gradeControl", () => {
  it("laser best grade control", () => {
    expect(gradeControl("laser_grader_gps_guided")).toBeGreaterThan(gradeControl("towed_grader_pull_behind"));
  });
});

describe("grCost", () => {
  it("laser most expensive", () => {
    expect(grCost("laser_grader_gps_guided")).toBeGreaterThan(grCost("grader_attachment_skid_steer"));
  });
});

describe("selfPropelled", () => {
  it("motor grader is self propelled", () => {
    expect(selfPropelled("motor_grader_tandem_axle")).toBe(true);
  });
  it("towed not self propelled", () => {
    expect(selfPropelled("towed_grader_pull_behind")).toBe(false);
  });
});

describe("forRoad", () => {
  it("motor grader for road", () => {
    expect(forRoad("motor_grader_tandem_axle")).toBe(true);
  });
  it("compact not for road", () => {
    expect(forRoad("compact_grader_mini")).toBe(false);
  });
});

describe("blade", () => {
  it("laser uses gps laser control", () => {
    expect(blade("laser_grader_gps_guided")).toBe("moldboard_auto_gps_laser_control");
  });
});

describe("bestUse", () => {
  it("motor grader for road grading", () => {
    expect(bestUse("motor_grader_tandem_axle")).toBe("road_grading_ditch_cut_shoulder");
  });
});

describe("graderTypes", () => {
  it("returns 5 types", () => {
    expect(graderTypes()).toHaveLength(5);
  });
});
