import { describe, it, expect } from "vitest";
import {
  security, speed, automation, reliability,
  trCost, automatic, forHighTraffic, engagement,
  bestUse, truckRestraintTypes,
} from "../truck-restraint-calc.js";

describe("security", () => {
  it("rotating hook most secure", () => {
    expect(security("rotating_hook_powered")).toBeGreaterThan(security("manual_wheel_chock"));
  });
});

describe("speed", () => {
  it("rotating hook fastest", () => {
    expect(speed("rotating_hook_powered")).toBeGreaterThan(speed("manual_wheel_chock"));
  });
});

describe("automation", () => {
  it("rotating hook most automated", () => {
    expect(automation("rotating_hook_powered")).toBeGreaterThan(automation("manual_wheel_chock"));
  });
});

describe("reliability", () => {
  it("auto hook very reliable", () => {
    expect(reliability("automatic_hook_rear_guard")).toBeGreaterThan(reliability("wheel_based_sensor"));
  });
});

describe("trCost", () => {
  it("rotating hook most expensive", () => {
    expect(trCost("rotating_hook_powered")).toBeGreaterThan(trCost("manual_wheel_chock"));
  });
});

describe("automatic", () => {
  it("auto hook is automatic", () => {
    expect(automatic("automatic_hook_rear_guard")).toBe(true);
  });
  it("manual chock not automatic", () => {
    expect(automatic("manual_wheel_chock")).toBe(false);
  });
});

describe("forHighTraffic", () => {
  it("rotating hook for high traffic", () => {
    expect(forHighTraffic("rotating_hook_powered")).toBe(true);
  });
  it("manual not high traffic", () => {
    expect(forHighTraffic("manual_wheel_chock")).toBe(false);
  });
});

describe("engagement", () => {
  it("rotating uses hydraulic", () => {
    expect(engagement("rotating_hook_powered")).toBe("powered_rotating_hook_hydraul");
  });
});

describe("bestUse", () => {
  it("manual for basic safety", () => {
    expect(bestUse("manual_wheel_chock")).toBe("low_volume_dock_basic_safety");
  });
});

describe("truckRestraintTypes", () => {
  it("returns 5 types", () => {
    expect(truckRestraintTypes()).toHaveLength(5);
  });
});
