import { describe, it, expect } from "vitest";
import {
  efficiency, regulation, dimRange, ripple,
  drvCost, integrated, forBacklight, topology,
  bestUse, ledDrivers,
} from "../led-driver-calc.js";

describe("efficiency", () => {
  it("constant current buck most efficient", () => {
    expect(efficiency("constant_current_buck")).toBeGreaterThan(efficiency("linear_ldo_driver"));
  });
});

describe("regulation", () => {
  it("linear ldo driver best regulation", () => {
    expect(regulation("linear_ldo_driver")).toBeGreaterThan(regulation("charge_pump_cap"));
  });
});

describe("dimRange", () => {
  it("pwm dimming ic widest dimming range", () => {
    expect(dimRange("pwm_dimming_ic")).toBeGreaterThan(dimRange("charge_pump_cap"));
  });
});

describe("ripple", () => {
  it("linear ldo driver lowest ripple", () => {
    expect(ripple("linear_ldo_driver")).toBeGreaterThan(ripple("pwm_dimming_ic"));
  });
});

describe("drvCost", () => {
  it("pwm dimming ic most expensive", () => {
    expect(drvCost("pwm_dimming_ic")).toBeGreaterThan(drvCost("linear_ldo_driver"));
  });
});

describe("integrated", () => {
  it("constant current buck is integrated", () => {
    expect(integrated("constant_current_buck")).toBe(true);
  });
  it("pwm dimming ic not integrated", () => {
    expect(integrated("pwm_dimming_ic")).toBe(false);
  });
});

describe("forBacklight", () => {
  it("boost string driver for backlight", () => {
    expect(forBacklight("boost_string_driver")).toBe(true);
  });
  it("linear ldo driver not for backlight", () => {
    expect(forBacklight("linear_ldo_driver")).toBe(false);
  });
});

describe("topology", () => {
  it("charge pump cap uses switched capacitor doubler", () => {
    expect(topology("charge_pump_cap")).toBe("switched_capacitor_doubler");
  });
});

describe("bestUse", () => {
  it("constant current buck best for automotive headlamp", () => {
    expect(bestUse("constant_current_buck")).toBe("automotive_headlamp");
  });
});

describe("ledDrivers", () => {
  it("returns 5 types", () => {
    expect(ledDrivers()).toHaveLength(5);
  });
});
