import { describe, it, expect } from "vitest";
import {
  speed, robustness, overshoot, modelReq,
  ptCost, autoTune, forProcess, method,
  bestUse, pidTunes,
} from "../pid-tune-calc.js";

describe("speed", () => {
  it("ziegler nichols fastest", () => {
    expect(speed("ziegler_nichols_osc")).toBeGreaterThan(speed("lambda_imc_model"));
  });
});

describe("robustness", () => {
  it("robust h infinity most robust", () => {
    expect(robustness("robust_h_infinity")).toBeGreaterThan(robustness("ziegler_nichols_osc"));
  });
});

describe("overshoot", () => {
  it("robust h infinity least overshoot", () => {
    expect(overshoot("robust_h_infinity")).toBeGreaterThan(overshoot("ziegler_nichols_osc"));
  });
});

describe("modelReq", () => {
  it("robust h infinity highest model req", () => {
    expect(modelReq("robust_h_infinity")).toBeGreaterThan(modelReq("ziegler_nichols_osc"));
  });
});

describe("ptCost", () => {
  it("robust h infinity most expensive", () => {
    expect(ptCost("robust_h_infinity")).toBeGreaterThan(ptCost("ziegler_nichols_osc"));
  });
});

describe("autoTune", () => {
  it("relay feedback is auto tune", () => {
    expect(autoTune("relay_feedback_auto")).toBe(true);
  });
  it("ziegler nichols not auto tune", () => {
    expect(autoTune("ziegler_nichols_osc")).toBe(false);
  });
});

describe("forProcess", () => {
  it("lambda imc for process", () => {
    expect(forProcess("lambda_imc_model")).toBe(true);
  });
  it("robust h infinity not for process", () => {
    expect(forProcess("robust_h_infinity")).toBe(false);
  });
});

describe("method", () => {
  it("relay feedback uses relay oscillation identify", () => {
    expect(method("relay_feedback_auto")).toBe("relay_oscillation_identify");
  });
});

describe("bestUse", () => {
  it("lambda imc best for chemical reactor", () => {
    expect(bestUse("lambda_imc_model")).toBe("chemical_reactor_temp_hold");
  });
});

describe("pidTunes", () => {
  it("returns 5 types", () => {
    expect(pidTunes()).toHaveLength(5);
  });
});
