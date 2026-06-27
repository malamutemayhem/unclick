import { describe, it, expect } from "vitest";
import {
  bandwidth, stiffness, disturbReject, complexity,
  svCost, feedforward, forPrecision, controller,
  bestUse, servoLoops,
} from "../servo-loop-calc.js";

describe("bandwidth", () => {
  it("current torque highest bandwidth", () => {
    expect(bandwidth("current_torque")).toBeGreaterThan(bandwidth("position_pid"));
  });
});

describe("stiffness", () => {
  it("cascade pvt highest stiffness", () => {
    expect(stiffness("cascade_pvt")).toBeGreaterThan(stiffness("current_torque"));
  });
});

describe("disturbReject", () => {
  it("model predictive best disturbance rejection", () => {
    expect(disturbReject("model_predictive")).toBeGreaterThan(disturbReject("position_pid"));
  });
});

describe("complexity", () => {
  it("model predictive most complex", () => {
    expect(complexity("model_predictive")).toBeGreaterThan(complexity("velocity_pi"));
  });
});

describe("svCost", () => {
  it("model predictive most expensive", () => {
    expect(svCost("model_predictive")).toBeGreaterThan(svCost("position_pid"));
  });
});

describe("feedforward", () => {
  it("cascade pvt has feedforward", () => {
    expect(feedforward("cascade_pvt")).toBe(true);
  });
  it("position pid no feedforward", () => {
    expect(feedforward("position_pid")).toBe(false);
  });
});

describe("forPrecision", () => {
  it("cascade pvt for precision", () => {
    expect(forPrecision("cascade_pvt")).toBe(true);
  });
  it("velocity pi not for precision", () => {
    expect(forPrecision("velocity_pi")).toBe(false);
  });
});

describe("controller", () => {
  it("model predictive uses receding horizon optim", () => {
    expect(controller("model_predictive")).toBe("receding_horizon_optim");
  });
});

describe("bestUse", () => {
  it("cascade pvt best for cnc axis servo drive", () => {
    expect(bestUse("cascade_pvt")).toBe("cnc_axis_servo_drive");
  });
});

describe("servoLoops", () => {
  it("returns 5 types", () => {
    expect(servoLoops()).toHaveLength(5);
  });
});
