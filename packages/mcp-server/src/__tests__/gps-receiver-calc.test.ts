import { describe, it, expect } from "vitest";
import {
  accuracy, speed, range, autonomy,
  gpCost, rtk, forSurvey, correction,
  bestUse, gpsReceiverTypes,
} from "../gps-receiver-calc.js";

describe("accuracy", () => {
  it("rtk most accurate", () => {
    expect(accuracy("gnss_rtk_base_rover")).toBeGreaterThan(accuracy("handheld_navigation_basic"));
  });
});

describe("speed", () => {
  it("machine control fastest", () => {
    expect(speed("machine_control_3d_grade")).toBeGreaterThan(speed("gnss_ppp_precise_point"));
  });
});

describe("range", () => {
  it("handheld widest range", () => {
    expect(range("handheld_navigation_basic")).toBeGreaterThan(range("gnss_rtk_base_rover"));
  });
});

describe("autonomy", () => {
  it("handheld most autonomous", () => {
    expect(autonomy("handheld_navigation_basic")).toBeGreaterThan(autonomy("machine_control_3d_grade"));
  });
});

describe("gpCost", () => {
  it("machine control most expensive", () => {
    expect(gpCost("machine_control_3d_grade")).toBeGreaterThan(gpCost("handheld_navigation_basic"));
  });
});

describe("rtk", () => {
  it("rtk rover has rtk", () => {
    expect(rtk("gnss_rtk_base_rover")).toBe(true);
  });
  it("handheld no rtk", () => {
    expect(rtk("handheld_navigation_basic")).toBe(false);
  });
});

describe("forSurvey", () => {
  it("rtk for survey", () => {
    expect(forSurvey("gnss_rtk_base_rover")).toBe(true);
  });
  it("handheld not for survey", () => {
    expect(forSurvey("handheld_navigation_basic")).toBe(false);
  });
});

describe("correction", () => {
  it("ppp uses precise ephemeris", () => {
    expect(correction("gnss_ppp_precise_point")).toBe("precise_ephemeris_clock_satellite");
  });
});

describe("bestUse", () => {
  it("rtk for survey stakeout", () => {
    expect(bestUse("gnss_rtk_base_rover")).toBe("survey_stakeout_control_cm_accuracy");
  });
});

describe("gpsReceiverTypes", () => {
  it("returns 5 types", () => {
    expect(gpsReceiverTypes()).toHaveLength(5);
  });
});
