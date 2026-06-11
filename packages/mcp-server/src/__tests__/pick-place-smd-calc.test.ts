import { describe, it, expect } from "vitest";
import {
  placementSpeed, accuracy, componentRange, feederCapacity,
  ppCost, visionAligned, forFinePitch, headType,
  bestUse, pickPlaceSmdTypes,
} from "../pick-place-smd-calc.js";

describe("placementSpeed", () => {
  it("chip shooter and turret head fastest placement", () => {
    expect(placementSpeed("chip_shooter")).toBeGreaterThan(placementSpeed("flexible_placer"));
    expect(placementSpeed("turret_head")).toBeGreaterThan(placementSpeed("flexible_placer"));
  });
});

describe("accuracy", () => {
  it("collect and place highest accuracy", () => {
    expect(accuracy("collect_and_place")).toBeGreaterThan(accuracy("chip_shooter"));
  });
});

describe("componentRange", () => {
  it("flexible placer widest component range", () => {
    expect(componentRange("flexible_placer")).toBeGreaterThan(componentRange("chip_shooter"));
  });
});

describe("feederCapacity", () => {
  it("multi gantry highest feeder capacity", () => {
    expect(feederCapacity("multi_gantry")).toBeGreaterThan(feederCapacity("flexible_placer"));
  });
});

describe("ppCost", () => {
  it("multi gantry most expensive", () => {
    expect(ppCost("multi_gantry")).toBeGreaterThan(ppCost("flexible_placer"));
  });
});

describe("visionAligned", () => {
  it("all types are vision aligned", () => {
    expect(visionAligned("chip_shooter")).toBe(true);
    expect(visionAligned("collect_and_place")).toBe(true);
  });
});

describe("forFinePitch", () => {
  it("collect and place for fine pitch", () => {
    expect(forFinePitch("collect_and_place")).toBe(true);
  });
  it("chip shooter not for fine pitch", () => {
    expect(forFinePitch("chip_shooter")).toBe(false);
  });
});

describe("headType", () => {
  it("turret head uses continuous rotation turret", () => {
    expect(headType("turret_head")).toBe("continuous_rotation_turret_12_24_nozzle_fly_pick_place");
  });
});

describe("bestUse", () => {
  it("flexible placer for prototype low volume", () => {
    expect(bestUse("flexible_placer")).toBe("prototype_low_volume_mixed_board_odd_form_connector_ic");
  });
});

describe("pickPlaceSmdTypes", () => {
  it("returns 5 types", () => {
    expect(pickPlaceSmdTypes()).toHaveLength(5);
  });
});
