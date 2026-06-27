import { describe, it, expect } from "vitest";
import {
  tensionAccuracy, throughput, responseTime, spoolCapacity,
  ctCost_, active, forHighSpeed, tensionerConfig,
  bestUse, creelTensionerTypes,
} from "../creel-tensioner-calc.js";

describe("tensionAccuracy", () => {
  it("active servo best tension accuracy", () => {
    expect(tensionAccuracy("active_servo")).toBeGreaterThan(tensionAccuracy("passive_brake"));
  });
});

describe("throughput", () => {
  it("active servo highest throughput", () => {
    expect(throughput("active_servo")).toBeGreaterThan(throughput("magnetic_hysteresis"));
  });
});

describe("responseTime", () => {
  it("active servo best response time", () => {
    expect(responseTime("active_servo")).toBeGreaterThan(responseTime("passive_brake"));
  });
});

describe("spoolCapacity", () => {
  it("pneumatic disc best spool capacity", () => {
    expect(spoolCapacity("pneumatic_disc")).toBeGreaterThan(spoolCapacity("active_servo"));
  });
});

describe("ctCost_", () => {
  it("active servo most expensive", () => {
    expect(ctCost_("active_servo")).toBeGreaterThan(ctCost_("passive_brake"));
  });
});

describe("active", () => {
  it("active servo is active", () => {
    expect(active("active_servo")).toBe(true);
  });
  it("passive brake not active", () => {
    expect(active("passive_brake")).toBe(false);
  });
});

describe("forHighSpeed", () => {
  it("active servo for high speed", () => {
    expect(forHighSpeed("active_servo")).toBe(true);
  });
  it("magnetic hysteresis not for high speed", () => {
    expect(forHighSpeed("magnetic_hysteresis")).toBe(false);
  });
});

describe("tensionerConfig", () => {
  it("dancer arm uses pivot weight accumulate smooth pull", () => {
    expect(tensionerConfig("dancer_arm")).toBe("dancer_arm_creel_tensioner_pivot_weight_accumulate_smooth_pull");
  });
});

describe("bestUse", () => {
  it("active servo for afp feed pid loop constant force", () => {
    expect(bestUse("active_servo")).toBe("afp_feed_active_servo_creel_tensioner_pid_loop_constant_force");
  });
});

describe("creelTensionerTypes", () => {
  it("returns 5 types", () => {
    expect(creelTensionerTypes()).toHaveLength(5);
  });
});
