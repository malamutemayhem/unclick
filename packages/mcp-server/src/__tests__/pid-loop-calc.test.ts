import { describe, it, expect } from "vitest";
import {
  settlingTime, overshoot, steadyState, robustness,
  loopCost, antiWindup, forMotion, tuning,
  bestUse, pidLoops,
} from "../pid-loop-calc.js";

describe("settlingTime", () => {
  it("pid cascade fastest settling time", () => {
    expect(settlingTime("pid_cascade")).toBeGreaterThan(settlingTime("p_only_proportional"));
  });
});

describe("overshoot", () => {
  it("fuzzy pid adaptive best overshoot control", () => {
    expect(overshoot("fuzzy_pid_adaptive")).toBeGreaterThan(overshoot("p_only_proportional"));
  });
});

describe("steadyState", () => {
  it("pid cascade best steady state", () => {
    expect(steadyState("pid_cascade")).toBeGreaterThan(steadyState("p_only_proportional"));
  });
});

describe("robustness", () => {
  it("fuzzy pid adaptive most robust", () => {
    expect(robustness("fuzzy_pid_adaptive")).toBeGreaterThan(robustness("pid_cascade"));
  });
});

describe("loopCost", () => {
  it("fuzzy pid adaptive most expensive", () => {
    expect(loopCost("fuzzy_pid_adaptive")).toBeGreaterThan(loopCost("p_only_proportional"));
  });
});

describe("antiWindup", () => {
  it("pi integral has anti windup", () => {
    expect(antiWindup("pi_integral")).toBe(true);
  });
  it("p only proportional no anti windup", () => {
    expect(antiWindup("p_only_proportional")).toBe(false);
  });
});

describe("forMotion", () => {
  it("pid classic is for motion", () => {
    expect(forMotion("pid_classic")).toBe(true);
  });
  it("pi integral not for motion", () => {
    expect(forMotion("pi_integral")).toBe(false);
  });
});

describe("tuning", () => {
  it("pid classic uses ziegler nichols pid", () => {
    expect(tuning("pid_classic")).toBe("ziegler_nichols_pid");
  });
});

describe("bestUse", () => {
  it("pid cascade best for precision servo positioning", () => {
    expect(bestUse("pid_cascade")).toBe("precision_servo_positioning");
  });
});

describe("pidLoops", () => {
  it("returns 5 types", () => {
    expect(pidLoops()).toHaveLength(5);
  });
});
