import { describe, it, expect } from "vitest";
import {
  torqueRipple, efficiency, startupPerf, speedRange,
  ctrlCost, sensorless, forDrone, algorithm,
  bestUse, bldcControls,
} from "../bldc-control-calc.js";

describe("torqueRipple", () => {
  it("foc sinusoidal lowest torque ripple", () => {
    expect(torqueRipple("foc_sinusoidal")).toBeGreaterThan(torqueRipple("six_step_trapezoidal"));
  });
});

describe("efficiency", () => {
  it("foc sinusoidal highest efficiency", () => {
    expect(efficiency("foc_sinusoidal")).toBeGreaterThan(efficiency("six_step_trapezoidal"));
  });
});

describe("startupPerf", () => {
  it("dtc direct torque best startup", () => {
    expect(startupPerf("dtc_direct_torque")).toBeGreaterThan(startupPerf("sensorless_bemf"));
  });
});

describe("speedRange", () => {
  it("field weakening widest speed range", () => {
    expect(speedRange("field_weakening")).toBeGreaterThan(speedRange("six_step_trapezoidal"));
  });
});

describe("ctrlCost", () => {
  it("dtc direct torque most expensive", () => {
    expect(ctrlCost("dtc_direct_torque")).toBeGreaterThan(ctrlCost("six_step_trapezoidal"));
  });
});

describe("sensorless", () => {
  it("sensorless bemf is sensorless", () => {
    expect(sensorless("sensorless_bemf")).toBe(true);
  });
  it("foc sinusoidal not sensorless", () => {
    expect(sensorless("foc_sinusoidal")).toBe(false);
  });
});

describe("forDrone", () => {
  it("sensorless bemf is for drone", () => {
    expect(forDrone("sensorless_bemf")).toBe(true);
  });
  it("six step trapezoidal not for drone", () => {
    expect(forDrone("six_step_trapezoidal")).toBe(false);
  });
});

describe("algorithm", () => {
  it("foc sinusoidal uses park clarke pi svpwm", () => {
    expect(algorithm("foc_sinusoidal")).toBe("park_clarke_pi_svpwm");
  });
});

describe("bestUse", () => {
  it("foc sinusoidal best for ev traction motor", () => {
    expect(bestUse("foc_sinusoidal")).toBe("ev_traction_motor");
  });
});

describe("bldcControls", () => {
  it("returns 5 types", () => {
    expect(bldcControls()).toHaveLength(5);
  });
});
