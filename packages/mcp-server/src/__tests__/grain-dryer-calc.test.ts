import { describe, it, expect } from "vitest";
import {
  capacity, efficiency, uniformity, quality,
  gdCost, continuous, forLargeFarm, heat,
  bestUse, grainDryerTypes,
} from "../grain-dryer-calc.js";

describe("capacity", () => {
  it("recirculating tower highest capacity", () => {
    expect(capacity("recirculating_tower")).toBeGreaterThan(capacity("low_temp_solar_hybrid"));
  });
});

describe("efficiency", () => {
  it("solar most efficient", () => {
    expect(efficiency("low_temp_solar_hybrid")).toBeGreaterThan(efficiency("batch_in_bin_fan"));
  });
});

describe("uniformity", () => {
  it("mixed flow most uniform", () => {
    expect(uniformity("continuous_flow_mixed")).toBeGreaterThan(uniformity("batch_in_bin_fan"));
  });
});

describe("quality", () => {
  it("solar best quality", () => {
    expect(quality("low_temp_solar_hybrid")).toBeGreaterThan(quality("continuous_flow_crossflow"));
  });
});

describe("gdCost", () => {
  it("recirculating most expensive", () => {
    expect(gdCost("recirculating_tower")).toBeGreaterThan(gdCost("batch_in_bin_fan"));
  });
});

describe("continuous", () => {
  it("crossflow is continuous", () => {
    expect(continuous("continuous_flow_crossflow")).toBe(true);
  });
  it("batch not continuous", () => {
    expect(continuous("batch_in_bin_fan")).toBe(false);
  });
});

describe("forLargeFarm", () => {
  it("crossflow for large farm", () => {
    expect(forLargeFarm("continuous_flow_crossflow")).toBe(true);
  });
  it("batch not large farm", () => {
    expect(forLargeFarm("batch_in_bin_fan")).toBe(false);
  });
});

describe("heat", () => {
  it("solar uses collector", () => {
    expect(heat("low_temp_solar_hybrid")).toBe("solar_collector_low_temp_ambient");
  });
});

describe("bestUse", () => {
  it("recirculating for elevator", () => {
    expect(bestUse("recirculating_tower")).toBe("elevator_commercial_high_throughput");
  });
});

describe("grainDryerTypes", () => {
  it("returns 5 types", () => {
    expect(grainDryerTypes()).toHaveLength(5);
  });
});
