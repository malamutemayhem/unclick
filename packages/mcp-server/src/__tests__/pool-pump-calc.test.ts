import { describe, it, expect } from "vitest";
import {
  flow, efficiency, noise, longevity,
  ppCost, variableSpeed, forCommercial, motor,
  bestUse, poolPumpTypes,
} from "../pool-pump-calc.js";

describe("flow", () => {
  it("commercial highest flow", () => {
    expect(flow("commercial_high_flow")).toBeGreaterThan(flow("above_ground_self_prime"));
  });
});

describe("efficiency", () => {
  it("variable speed most efficient", () => {
    expect(efficiency("variable_speed_inverter")).toBeGreaterThan(efficiency("single_speed_standard"));
  });
});

describe("noise", () => {
  it("variable speed quietest", () => {
    expect(noise("variable_speed_inverter")).toBeGreaterThan(noise("commercial_high_flow"));
  });
});

describe("longevity", () => {
  it("variable speed longest lasting", () => {
    expect(longevity("variable_speed_inverter")).toBeGreaterThan(longevity("above_ground_self_prime"));
  });
});

describe("ppCost", () => {
  it("commercial most expensive", () => {
    expect(ppCost("commercial_high_flow")).toBeGreaterThan(ppCost("above_ground_self_prime"));
  });
});

describe("variableSpeed", () => {
  it("inverter has variable speed", () => {
    expect(variableSpeed("variable_speed_inverter")).toBe(true);
  });
  it("single speed not variable", () => {
    expect(variableSpeed("single_speed_standard")).toBe(false);
  });
});

describe("forCommercial", () => {
  it("high flow for commercial", () => {
    expect(forCommercial("commercial_high_flow")).toBe(true);
  });
  it("single speed not commercial", () => {
    expect(forCommercial("single_speed_standard")).toBe(false);
  });
});

describe("motor", () => {
  it("variable speed uses ecm", () => {
    expect(motor("variable_speed_inverter")).toBe("ecm_permanent_magnet_inverter");
  });
});

describe("bestUse", () => {
  it("above ground for small pool", () => {
    expect(bestUse("above_ground_self_prime")).toBe("above_ground_pool_spa_small");
  });
});

describe("poolPumpTypes", () => {
  it("returns 5 types", () => {
    expect(poolPumpTypes()).toHaveLength(5);
  });
});
