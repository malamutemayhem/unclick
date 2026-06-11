import { describe, it, expect } from "vitest";
import {
  payload, throughput, flexibility, navigationAccuracy,
  agCost, infrastructureFree, forHeavyLoad, carrierConfig,
  bestUse, agvCarrierTypes,
} from "../agv-carrier-calc.js";

describe("payload", () => {
  it("rail guided best payload", () => {
    expect(payload("rail_guided")).toBeGreaterThan(payload("autonomous_mobile"));
  });
});

describe("throughput", () => {
  it("rail guided highest throughput", () => {
    expect(throughput("rail_guided")).toBeGreaterThan(throughput("magnetic_guide"));
  });
});

describe("flexibility", () => {
  it("natural nav best flexibility", () => {
    expect(flexibility("natural_nav")).toBeGreaterThan(flexibility("magnetic_guide"));
  });
});

describe("navigationAccuracy", () => {
  it("laser nav best navigation accuracy", () => {
    expect(navigationAccuracy("laser_nav")).toBeGreaterThan(navigationAccuracy("natural_nav"));
  });
});

describe("agCost", () => {
  it("autonomous mobile most expensive", () => {
    expect(agCost("autonomous_mobile")).toBeGreaterThan(agCost("magnetic_guide"));
  });
});

describe("infrastructureFree", () => {
  it("natural nav is infrastructure free", () => {
    expect(infrastructureFree("natural_nav")).toBe(true);
  });
  it("magnetic guide not infrastructure free", () => {
    expect(infrastructureFree("magnetic_guide")).toBe(false);
  });
});

describe("forHeavyLoad", () => {
  it("rail guided for heavy load", () => {
    expect(forHeavyLoad("rail_guided")).toBe(true);
  });
  it("natural nav not for heavy load", () => {
    expect(forHeavyLoad("natural_nav")).toBe(false);
  });
});

describe("carrierConfig", () => {
  it("natural nav uses lidar slam map no reflector no tape", () => {
    expect(carrierConfig("natural_nav")).toBe("natural_nav_agv_carrier_lidar_slam_map_no_reflector_no_tape");
  });
});

describe("bestUse", () => {
  it("rail guided for heavy transfer multi ton press to press", () => {
    expect(bestUse("rail_guided")).toBe("heavy_transfer_rail_guided_agv_carrier_multi_ton_press_to_press");
  });
});

describe("agvCarrierTypes", () => {
  it("returns 5 types", () => {
    expect(agvCarrierTypes()).toHaveLength(5);
  });
});
