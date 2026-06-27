import { describe, it, expect } from "vitest";
import {
  traceAccuracy, fabricPreserve, carbonTransfer, handComfort,
  wheelCost, sharp, dualWheel, handleType,
  bestUse, tracingWheels,
} from "../tracing-wheel-calc.js";

describe("traceAccuracy", () => {
  it("needle point sharp most accurate trace", () => {
    expect(traceAccuracy("needle_point_sharp")).toBeGreaterThan(traceAccuracy("smooth_edge_blunt"));
  });
});

describe("fabricPreserve", () => {
  it("smooth edge blunt best fabric preserve", () => {
    expect(fabricPreserve("smooth_edge_blunt")).toBeGreaterThan(fabricPreserve("needle_point_sharp"));
  });
});

describe("carbonTransfer", () => {
  it("serrated fine tooth best carbon transfer", () => {
    expect(carbonTransfer("serrated_fine_tooth")).toBeGreaterThan(carbonTransfer("smooth_edge_blunt"));
  });
});

describe("handComfort", () => {
  it("ergonomic grip comfort most comfortable", () => {
    expect(handComfort("ergonomic_grip_comfort")).toBeGreaterThan(handComfort("needle_point_sharp"));
  });
});

describe("wheelCost", () => {
  it("double wheel seam more expensive", () => {
    expect(wheelCost("double_wheel_seam")).toBeGreaterThan(wheelCost("needle_point_sharp"));
  });
});

describe("sharp", () => {
  it("needle point sharp is sharp", () => {
    expect(sharp("needle_point_sharp")).toBe(true);
  });
  it("smooth edge blunt not sharp", () => {
    expect(sharp("smooth_edge_blunt")).toBe(false);
  });
});

describe("dualWheel", () => {
  it("double wheel seam is dual wheel", () => {
    expect(dualWheel("double_wheel_seam")).toBe(true);
  });
  it("needle point sharp not dual wheel", () => {
    expect(dualWheel("needle_point_sharp")).toBe(false);
  });
});

describe("handleType", () => {
  it("needle point sharp uses wood straight handle", () => {
    expect(handleType("needle_point_sharp")).toBe("wood_straight_handle");
  });
});

describe("bestUse", () => {
  it("smooth edge blunt best for delicate fabric safe", () => {
    expect(bestUse("smooth_edge_blunt")).toBe("delicate_fabric_safe");
  });
});

describe("tracingWheels", () => {
  it("returns 5 types", () => {
    expect(tracingWheels()).toHaveLength(5);
  });
});
