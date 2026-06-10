import { describe, it, expect } from "vitest";
import {
  loadCapacity, tripodWeight, maxHeight, stability,
  tripodCost, quickRelease, panSmooth, headType,
  bestShoot, tripods,
} from "../tripod-calc.js";

describe("loadCapacity", () => {
  it("video fluid head highest load capacity", () => {
    expect(loadCapacity("video_fluid_head")).toBeGreaterThan(loadCapacity("tabletop_mini"));
  });
});

describe("tripodWeight", () => {
  it("tabletop mini lightest", () => {
    expect(tripodWeight("tabletop_mini")).toBeGreaterThan(tripodWeight("video_fluid_head"));
  });
});

describe("maxHeight", () => {
  it("carbon fiber pro tallest", () => {
    expect(maxHeight("carbon_fiber_pro")).toBeGreaterThan(maxHeight("tabletop_mini"));
  });
});

describe("stability", () => {
  it("video fluid head most stable", () => {
    expect(stability("video_fluid_head")).toBeGreaterThan(stability("flexible_gorilla"));
  });
});

describe("tripodCost", () => {
  it("carbon fiber pro most expensive", () => {
    expect(tripodCost("carbon_fiber_pro")).toBeGreaterThan(tripodCost("tabletop_mini"));
  });
});

describe("quickRelease", () => {
  it("carbon fiber pro has quick release", () => {
    expect(quickRelease("carbon_fiber_pro")).toBe(true);
  });
  it("tabletop mini does not", () => {
    expect(quickRelease("tabletop_mini")).toBe(false);
  });
});

describe("panSmooth", () => {
  it("video fluid head has smooth pan", () => {
    expect(panSmooth("video_fluid_head")).toBe(true);
  });
  it("carbon fiber pro does not", () => {
    expect(panSmooth("carbon_fiber_pro")).toBe(false);
  });
});

describe("headType", () => {
  it("video fluid head uses fluid drag pan tilt", () => {
    expect(headType("video_fluid_head")).toBe("fluid_drag_pan_tilt");
  });
});

describe("bestShoot", () => {
  it("flexible gorilla for creative angle mount anywhere", () => {
    expect(bestShoot("flexible_gorilla")).toBe("creative_angle_mount_anywhere");
  });
});

describe("tripods", () => {
  it("returns 5 types", () => {
    expect(tripods()).toHaveLength(5);
  });
});
