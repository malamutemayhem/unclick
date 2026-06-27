import { describe, it, expect } from "vitest";
import {
  capacity, speed, versatility, reach,
  ldCost, articulated, forLoading, steering,
  bestUse, loaderTypes,
} from "../loader-type-calc.js";

describe("capacity", () => {
  it("wheel loader highest capacity", () => {
    expect(capacity("wheel_loader_articulated")).toBeGreaterThan(capacity("skid_steer_compact"));
  });
});

describe("speed", () => {
  it("wheel loader fastest", () => {
    expect(speed("wheel_loader_articulated")).toBeGreaterThan(speed("track_loader_ctl"));
  });
});

describe("versatility", () => {
  it("skid steer most versatile", () => {
    expect(versatility("skid_steer_compact")).toBeGreaterThan(versatility("wheel_loader_articulated"));
  });
});

describe("reach", () => {
  it("telehandler greatest reach", () => {
    expect(reach("telescopic_handler_telehandler")).toBeGreaterThan(reach("skid_steer_compact"));
  });
});

describe("ldCost", () => {
  it("wheel loader most expensive", () => {
    expect(ldCost("wheel_loader_articulated")).toBeGreaterThan(ldCost("skid_steer_compact"));
  });
});

describe("articulated", () => {
  it("wheel loader is articulated", () => {
    expect(articulated("wheel_loader_articulated")).toBe(true);
  });
  it("skid steer not articulated", () => {
    expect(articulated("skid_steer_compact")).toBe(false);
  });
});

describe("forLoading", () => {
  it("wheel loader for loading", () => {
    expect(forLoading("wheel_loader_articulated")).toBe(true);
  });
  it("skid steer not for loading", () => {
    expect(forLoading("skid_steer_compact")).toBe(false);
  });
});

describe("steering", () => {
  it("skid steer uses differential zero turn", () => {
    expect(steering("skid_steer_compact")).toBe("skid_differential_zero_turn");
  });
});

describe("bestUse", () => {
  it("wheel loader for quarry stockpile", () => {
    expect(bestUse("wheel_loader_articulated")).toBe("quarry_stockpile_truck_loading");
  });
});

describe("loaderTypes", () => {
  it("returns 5 types", () => {
    expect(loaderTypes()).toHaveLength(5);
  });
});
