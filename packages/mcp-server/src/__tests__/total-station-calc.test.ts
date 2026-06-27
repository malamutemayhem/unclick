import { describe, it, expect } from "vitest";
import {
  accuracy, range, speed, automation,
  tsCost, robotic, forLayout, measurement,
  bestUse, totalStationTypes,
} from "../total-station-calc.js";

describe("accuracy", () => {
  it("robotic most accurate", () => {
    expect(accuracy("robotic_motorized_track")).toBeGreaterThan(accuracy("reflectorless_edm_direct"));
  });
});

describe("range", () => {
  it("robotic longest range", () => {
    expect(range("robotic_motorized_track")).toBeGreaterThan(range("manual_optical_standard"));
  });
});

describe("speed", () => {
  it("scanning fastest", () => {
    expect(speed("scanning_3d_point_cloud")).toBeGreaterThan(speed("manual_optical_standard"));
  });
});

describe("automation", () => {
  it("robotic most automated", () => {
    expect(automation("robotic_motorized_track")).toBeGreaterThan(automation("manual_optical_standard"));
  });
});

describe("tsCost", () => {
  it("scanning most expensive", () => {
    expect(tsCost("scanning_3d_point_cloud")).toBeGreaterThan(tsCost("manual_optical_standard"));
  });
});

describe("robotic", () => {
  it("robotic is robotic", () => {
    expect(robotic("robotic_motorized_track")).toBe(true);
  });
  it("manual not robotic", () => {
    expect(robotic("manual_optical_standard")).toBe(false);
  });
});

describe("forLayout", () => {
  it("robotic for layout", () => {
    expect(forLayout("robotic_motorized_track")).toBe(true);
  });
  it("scanning not for layout", () => {
    expect(forLayout("scanning_3d_point_cloud")).toBe(false);
  });
});

describe("measurement", () => {
  it("reflectorless uses laser pulse direct", () => {
    expect(measurement("reflectorless_edm_direct")).toBe("laser_pulse_direct_surface_return");
  });
});

describe("bestUse", () => {
  it("robotic for one person layout", () => {
    expect(bestUse("robotic_motorized_track")).toBe("one_person_layout_monitoring_machine");
  });
});

describe("totalStationTypes", () => {
  it("returns 5 types", () => {
    expect(totalStationTypes()).toHaveLength(5);
  });
});
