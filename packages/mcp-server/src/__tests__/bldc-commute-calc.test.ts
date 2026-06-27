import { describe, it, expect } from "vitest";
import {
  efficiency, torqueRipple, startupTorque, complexity,
  comCost, sensorless, forPrecision, algorithm,
  bestUse, bldcCommutes,
} from "../bldc-commute-calc.js";

describe("efficiency", () => {
  it("space vector svpwm highest efficiency", () => {
    expect(efficiency("space_vector_svpwm")).toBeGreaterThan(efficiency("trapezoidal_six_step"));
  });
});

describe("torqueRipple", () => {
  it("space vector svpwm lowest torque ripple", () => {
    expect(torqueRipple("space_vector_svpwm")).toBeGreaterThan(torqueRipple("trapezoidal_six_step"));
  });
});

describe("startupTorque", () => {
  it("sinusoidal foc best startup torque", () => {
    expect(startupTorque("sinusoidal_foc")).toBeGreaterThan(startupTorque("sensorless_bemf_zero"));
  });
});

describe("complexity", () => {
  it("trapezoidal six step simplest", () => {
    expect(complexity("trapezoidal_six_step")).toBeGreaterThan(complexity("space_vector_svpwm"));
  });
});

describe("comCost", () => {
  it("space vector svpwm most expensive", () => {
    expect(comCost("space_vector_svpwm")).toBeGreaterThan(comCost("trapezoidal_six_step"));
  });
});

describe("sensorless", () => {
  it("sensorless bemf zero is sensorless", () => {
    expect(sensorless("sensorless_bemf_zero")).toBe(true);
  });
  it("sinusoidal foc not sensorless", () => {
    expect(sensorless("sinusoidal_foc")).toBe(false);
  });
});

describe("forPrecision", () => {
  it("sinusoidal foc for precision", () => {
    expect(forPrecision("sinusoidal_foc")).toBe(true);
  });
  it("trapezoidal six step not for precision", () => {
    expect(forPrecision("trapezoidal_six_step")).toBe(false);
  });
});

describe("algorithm", () => {
  it("space vector svpwm uses sector dwell time calc", () => {
    expect(algorithm("space_vector_svpwm")).toBe("sector_dwell_time_calc");
  });
});

describe("bestUse", () => {
  it("space vector svpwm best for traction motor ev", () => {
    expect(bestUse("space_vector_svpwm")).toBe("traction_motor_ev");
  });
});

describe("bldcCommutes", () => {
  it("returns 5 types", () => {
    expect(bldcCommutes()).toHaveLength(5);
  });
});
