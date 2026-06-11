import { describe, it, expect } from "vitest";
import {
  setupSpeed, pickEfficiency, traceability, errorReduction,
  listCost, machineReady, forHighVol, sortMethod,
  bestUse, pickLists,
} from "../pick-list-calc.js";

describe("setupSpeed", () => {
  it("reel location map fastest setup", () => {
    expect(setupSpeed("reel_location_map")).toBeGreaterThan(setupSpeed("sequential_ref_des"));
  });
});

describe("pickEfficiency", () => {
  it("feeder optimized best pick efficiency", () => {
    expect(pickEfficiency("feeder_optimized")).toBeGreaterThan(pickEfficiency("sequential_ref_des"));
  });
});

describe("traceability", () => {
  it("reel location map best traceability", () => {
    expect(traceability("reel_location_map")).toBeGreaterThan(traceability("placement_ordered"));
  });
});

describe("errorReduction", () => {
  it("reel location map best error reduction", () => {
    expect(errorReduction("reel_location_map")).toBeGreaterThan(errorReduction("sequential_ref_des"));
  });
});

describe("listCost", () => {
  it("reel location map most expensive", () => {
    expect(listCost("reel_location_map")).toBeGreaterThan(listCost("sequential_ref_des"));
  });
});

describe("machineReady", () => {
  it("feeder optimized is machine ready", () => {
    expect(machineReady("feeder_optimized")).toBe(true);
  });
  it("sequential ref des not machine ready", () => {
    expect(machineReady("sequential_ref_des")).toBe(false);
  });
});

describe("forHighVol", () => {
  it("feeder optimized is for high vol", () => {
    expect(forHighVol("feeder_optimized")).toBe(true);
  });
  it("sequential ref des not for high vol", () => {
    expect(forHighVol("sequential_ref_des")).toBe(false);
  });
});

describe("sortMethod", () => {
  it("placement ordered uses board xy sequence", () => {
    expect(sortMethod("placement_ordered")).toBe("board_xy_sequence");
  });
});

describe("bestUse", () => {
  it("reel location map best for smart factory inventory", () => {
    expect(bestUse("reel_location_map")).toBe("smart_factory_inventory");
  });
});

describe("pickLists", () => {
  it("returns 5 types", () => {
    expect(pickLists()).toHaveLength(5);
  });
});
