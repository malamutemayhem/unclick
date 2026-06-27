import { describe, it, expect } from "vitest";
import {
  magnification, throughput, edgeDetection, measureRange,
  ocCost, digital, forProfile, comparatorConfig,
  bestUse, opticalComparatorTypes,
} from "../optical-comparator-calc.js";

describe("magnification", () => {
  it("video comparator best magnification", () => {
    expect(magnification("video_comparator")).toBeGreaterThan(magnification("floor_model"));
  });
});

describe("throughput", () => {
  it("digital comparator highest throughput", () => {
    expect(throughput("digital_comparator")).toBeGreaterThan(throughput("video_comparator"));
  });
});

describe("edgeDetection", () => {
  it("digital comparator best edge detection", () => {
    expect(edgeDetection("digital_comparator")).toBeGreaterThan(edgeDetection("floor_model"));
  });
});

describe("measureRange", () => {
  it("floor model best measure range", () => {
    expect(measureRange("floor_model")).toBeGreaterThan(measureRange("benchtop_overlay"));
  });
});

describe("ocCost", () => {
  it("video comparator most expensive", () => {
    expect(ocCost("video_comparator")).toBeGreaterThan(ocCost("benchtop_overlay"));
  });
});

describe("digital", () => {
  it("digital comparator is digital", () => {
    expect(digital("digital_comparator")).toBe(true);
  });
  it("profile projector not digital", () => {
    expect(digital("profile_projector")).toBe(false);
  });
});

describe("forProfile", () => {
  it("profile projector for profile", () => {
    expect(forProfile("profile_projector")).toBe(true);
  });
  it("benchtop overlay not for profile", () => {
    expect(forProfile("benchtop_overlay")).toBe(false);
  });
});

describe("comparatorConfig", () => {
  it("digital comparator uses camera edge detect auto measure report", () => {
    expect(comparatorConfig("digital_comparator")).toBe("digital_optical_comparator_camera_edge_detect_auto_measure_report");
  });
});

describe("bestUse", () => {
  it("floor model for large forging big screen profile", () => {
    expect(bestUse("floor_model")).toBe("large_forging_floor_model_optical_comparator_big_screen_profile");
  });
});

describe("opticalComparatorTypes", () => {
  it("returns 5 types", () => {
    expect(opticalComparatorTypes()).toHaveLength(5);
  });
});
