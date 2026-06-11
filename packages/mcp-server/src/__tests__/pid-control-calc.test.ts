import { describe, it, expect } from "vitest";
import {
  responseTime, stability, disturbReject, tuningEase,
  pidCost, autoTune, forProcess, algorithm,
  bestUse, pidControls,
} from "../pid-control-calc.js";

describe("responseTime", () => {
  it("model predictive fastest response", () => {
    expect(responseTime("model_predictive")).toBeGreaterThan(responseTime("classic_pid"));
  });
});

describe("stability", () => {
  it("model predictive most stable", () => {
    expect(stability("model_predictive")).toBeGreaterThan(stability("classic_pid"));
  });
});

describe("disturbReject", () => {
  it("feedforward pid best disturbance rejection", () => {
    expect(disturbReject("feedforward_pid")).toBeGreaterThan(disturbReject("classic_pid"));
  });
});

describe("tuningEase", () => {
  it("classic pid easiest tuning", () => {
    expect(tuningEase("classic_pid")).toBeGreaterThan(tuningEase("model_predictive"));
  });
});

describe("pidCost", () => {
  it("model predictive most expensive", () => {
    expect(pidCost("model_predictive")).toBeGreaterThan(pidCost("classic_pid"));
  });
});

describe("autoTune", () => {
  it("adaptive gain sched has auto tune", () => {
    expect(autoTune("adaptive_gain_sched")).toBe(true);
  });
  it("classic pid no auto tune", () => {
    expect(autoTune("classic_pid")).toBe(false);
  });
});

describe("forProcess", () => {
  it("classic pid is for process", () => {
    expect(forProcess("classic_pid")).toBe(true);
  });
  it("model predictive not for process", () => {
    expect(forProcess("model_predictive")).toBe(false);
  });
});

describe("algorithm", () => {
  it("cascade dual loop uses inner outer loop", () => {
    expect(algorithm("cascade_dual_loop")).toBe("inner_outer_loop");
  });
});

describe("bestUse", () => {
  it("model predictive best for multi variable refinery", () => {
    expect(bestUse("model_predictive")).toBe("multi_variable_refinery");
  });
});

describe("pidControls", () => {
  it("returns 5 types", () => {
    expect(pidControls()).toHaveLength(5);
  });
});
