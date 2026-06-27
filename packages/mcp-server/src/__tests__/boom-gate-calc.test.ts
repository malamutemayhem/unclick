import { describe, it, expect } from "vitest";
import {
  speed, security, durability, maintenance,
  bgCost, automatic, forHighSecurity, actuation,
  bestUse, boomGateTypes,
} from "../boom-gate-calc.js";

describe("speed", () => {
  it("hydraulic fastest", () => {
    expect(speed("hydraulic_high_speed")).toBeGreaterThan(speed("manual_counterweight_arm"));
  });
});

describe("security", () => {
  it("crash rated most secure", () => {
    expect(security("crash_rated_k12")).toBeGreaterThan(security("electromechanical_standard"));
  });
});

describe("durability", () => {
  it("crash rated most durable", () => {
    expect(durability("crash_rated_k12")).toBeGreaterThan(durability("folding_articulated_arm"));
  });
});

describe("maintenance", () => {
  it("manual lowest maintenance", () => {
    expect(maintenance("manual_counterweight_arm")).toBeGreaterThan(maintenance("crash_rated_k12"));
  });
});

describe("bgCost", () => {
  it("crash rated most expensive", () => {
    expect(bgCost("crash_rated_k12")).toBeGreaterThan(bgCost("manual_counterweight_arm"));
  });
});

describe("automatic", () => {
  it("hydraulic is automatic", () => {
    expect(automatic("hydraulic_high_speed")).toBe(true);
  });
  it("manual not automatic", () => {
    expect(automatic("manual_counterweight_arm")).toBe(false);
  });
});

describe("forHighSecurity", () => {
  it("crash rated for high security", () => {
    expect(forHighSecurity("crash_rated_k12")).toBe(true);
  });
  it("standard not high security", () => {
    expect(forHighSecurity("electromechanical_standard")).toBe(false);
  });
});

describe("actuation", () => {
  it("folding uses articulated fold", () => {
    expect(actuation("folding_articulated_arm")).toBe("articulated_fold_low_clearance");
  });
});

describe("bestUse", () => {
  it("hydraulic for toll plaza", () => {
    expect(bestUse("hydraulic_high_speed")).toBe("toll_plaza_high_volume_lane");
  });
});

describe("boomGateTypes", () => {
  it("returns 5 types", () => {
    expect(boomGateTypes()).toHaveLength(5);
  });
});
