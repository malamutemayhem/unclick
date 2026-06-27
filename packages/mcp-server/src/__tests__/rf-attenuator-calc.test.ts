import { describe, it, expect } from "vitest";
import {
  range, flatness, speed, powerHandle,
  attCost, continuous, forAgc, element,
  bestUse, rfAttenuators,
} from "../rf-attenuator-calc.js";

describe("range", () => {
  it("variable voltage ctrl widest range", () => {
    expect(range("variable_voltage_ctrl")).toBeGreaterThan(range("fixed_pi_pad"));
  });
});

describe("flatness", () => {
  it("fixed pi pad flattest", () => {
    expect(flatness("fixed_pi_pad")).toBeGreaterThan(flatness("variable_voltage_ctrl"));
  });
});

describe("speed", () => {
  it("fixed pi pad fastest switching", () => {
    expect(speed("fixed_pi_pad")).toBeGreaterThan(speed("step_switched"));
  });
});

describe("powerHandle", () => {
  it("fixed pi pad highest power handling", () => {
    expect(powerHandle("fixed_pi_pad")).toBeGreaterThan(powerHandle("variable_voltage_ctrl"));
  });
});

describe("attCost", () => {
  it("variable voltage ctrl most expensive", () => {
    expect(attCost("variable_voltage_ctrl")).toBeGreaterThan(attCost("fixed_pi_pad"));
  });
});

describe("continuous", () => {
  it("digital pin diode is continuous", () => {
    expect(continuous("digital_pin_diode")).toBe(true);
  });
  it("fixed pi pad not continuous", () => {
    expect(continuous("fixed_pi_pad")).toBe(false);
  });
});

describe("forAgc", () => {
  it("variable voltage ctrl for agc", () => {
    expect(forAgc("variable_voltage_ctrl")).toBe(true);
  });
  it("fixed pi pad not for agc", () => {
    expect(forAgc("fixed_pi_pad")).toBe(false);
  });
});

describe("element", () => {
  it("digital pin diode uses forward bias pin junction", () => {
    expect(element("digital_pin_diode")).toBe("forward_bias_pin_junction");
  });
});

describe("bestUse", () => {
  it("variable voltage ctrl best for agc loop dynamic range", () => {
    expect(bestUse("variable_voltage_ctrl")).toBe("agc_loop_dynamic_range");
  });
});

describe("rfAttenuators", () => {
  it("returns 5 types", () => {
    expect(rfAttenuators()).toHaveLength(5);
  });
});
