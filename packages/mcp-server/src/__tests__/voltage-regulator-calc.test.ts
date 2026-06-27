import { describe, it, expect } from "vitest";
import {
  efficiency, outputStability, noiseLevel, thermalPerform,
  regCost, switching, adjustable, topology,
  bestUse, voltageRegulators,
} from "../voltage-regulator-calc.js";

describe("efficiency", () => {
  it("buck switching most efficient", () => {
    expect(efficiency("buck_switching_step_down")).toBeGreaterThan(efficiency("linear_ldo_low_drop"));
  });
});

describe("outputStability", () => {
  it("linear ldo most stable output", () => {
    expect(outputStability("linear_ldo_low_drop")).toBeGreaterThan(outputStability("shunt_zener_simple"));
  });
});

describe("noiseLevel", () => {
  it("linear ldo lowest noise", () => {
    expect(noiseLevel("linear_ldo_low_drop")).toBeGreaterThan(noiseLevel("boost_switching_step_up"));
  });
});

describe("thermalPerform", () => {
  it("buck switching best thermal", () => {
    expect(thermalPerform("buck_switching_step_down")).toBeGreaterThan(thermalPerform("shunt_zener_simple"));
  });
});

describe("regCost", () => {
  it("buck boost combo most expensive", () => {
    expect(regCost("buck_boost_combo")).toBeGreaterThan(regCost("shunt_zener_simple"));
  });
});

describe("switching", () => {
  it("buck switching is switching type", () => {
    expect(switching("buck_switching_step_down")).toBe(true);
  });
  it("linear ldo not switching", () => {
    expect(switching("linear_ldo_low_drop")).toBe(false);
  });
});

describe("adjustable", () => {
  it("linear ldo is adjustable", () => {
    expect(adjustable("linear_ldo_low_drop")).toBe(true);
  });
  it("shunt zener not adjustable", () => {
    expect(adjustable("shunt_zener_simple")).toBe(false);
  });
});

describe("topology", () => {
  it("boost switching uses inductor switch cap", () => {
    expect(topology("boost_switching_step_up")).toBe("inductor_switch_cap");
  });
});

describe("bestUse", () => {
  it("linear ldo best for noise sensitive analog", () => {
    expect(bestUse("linear_ldo_low_drop")).toBe("noise_sensitive_analog");
  });
});

describe("voltageRegulators", () => {
  it("returns 5 types", () => {
    expect(voltageRegulators()).toHaveLength(5);
  });
});
