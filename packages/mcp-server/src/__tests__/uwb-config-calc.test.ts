import { describe, it, expect } from "vitest";
import {
  accuracy, range, updateRate, anchorCount,
  configCost, lineOfSight, forIndoor, technique,
  bestUse, uwbConfigs,
} from "../uwb-config-calc.js";

describe("accuracy", () => {
  it("tdoa anchor grid most accurate", () => {
    expect(accuracy("tdoa_anchor_grid")).toBeGreaterThan(accuracy("uwb_radar_detect"));
  });
});

describe("range", () => {
  it("tdoa anchor grid longest range", () => {
    expect(range("tdoa_anchor_grid")).toBeGreaterThan(range("uwb_radar_detect"));
  });
});

describe("updateRate", () => {
  it("uwb radar detect fastest update", () => {
    expect(updateRate("uwb_radar_detect")).toBeGreaterThan(updateRate("uwb_secure_range"));
  });
});

describe("anchorCount", () => {
  it("tdoa anchor grid most anchors", () => {
    expect(anchorCount("tdoa_anchor_grid")).toBeGreaterThan(anchorCount("uwb_radar_detect"));
  });
});

describe("configCost", () => {
  it("tdoa anchor grid most expensive", () => {
    expect(configCost("tdoa_anchor_grid")).toBeGreaterThan(configCost("twr_two_way_range"));
  });
});

describe("lineOfSight", () => {
  it("uwb radar detect requires line of sight", () => {
    expect(lineOfSight("uwb_radar_detect")).toBe(true);
  });
  it("twr two way range no line of sight required", () => {
    expect(lineOfSight("twr_two_way_range")).toBe(false);
  });
});

describe("forIndoor", () => {
  it("twr two way range is for indoor", () => {
    expect(forIndoor("twr_two_way_range")).toBe(true);
  });
  it("uwb radar detect not for indoor", () => {
    expect(forIndoor("uwb_radar_detect")).toBe(false);
  });
});

describe("technique", () => {
  it("twr two way range uses ss ds twr tof", () => {
    expect(technique("twr_two_way_range")).toBe("ss_ds_twr_tof");
  });
});

describe("bestUse", () => {
  it("tdoa anchor grid best for warehouse 3d tracking", () => {
    expect(bestUse("tdoa_anchor_grid")).toBe("warehouse_3d_tracking");
  });
});

describe("uwbConfigs", () => {
  it("returns 5 types", () => {
    expect(uwbConfigs()).toHaveLength(5);
  });
});
