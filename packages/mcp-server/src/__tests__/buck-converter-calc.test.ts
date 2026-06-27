import { describe, it, expect } from "vitest";
import {
  efficiency, transientResp, ripple, inputRange,
  buckCost, integrated, forMobile, control,
  bestUse, buckConverters,
} from "../buck-converter-calc.js";

describe("efficiency", () => {
  it("sync integrated fet highest efficiency", () => {
    expect(efficiency("sync_integrated_fet")).toBeGreaterThan(efficiency("async_ext_diode"));
  });
});

describe("transientResp", () => {
  it("cot constant on fastest transient response", () => {
    expect(transientResp("cot_constant_on")).toBeGreaterThan(transientResp("async_ext_diode"));
  });
});

describe("ripple", () => {
  it("multiphase vrm lowest ripple", () => {
    expect(ripple("multiphase_vrm")).toBeGreaterThan(ripple("async_ext_diode"));
  });
});

describe("inputRange", () => {
  it("high voltage offline widest input range", () => {
    expect(inputRange("high_voltage_offline")).toBeGreaterThan(inputRange("multiphase_vrm"));
  });
});

describe("buckCost", () => {
  it("multiphase vrm most expensive", () => {
    expect(buckCost("multiphase_vrm")).toBeGreaterThan(buckCost("async_ext_diode"));
  });
});

describe("integrated", () => {
  it("sync integrated fet is integrated", () => {
    expect(integrated("sync_integrated_fet")).toBe(true);
  });
  it("async ext diode not integrated", () => {
    expect(integrated("async_ext_diode")).toBe(false);
  });
});

describe("forMobile", () => {
  it("sync integrated fet is for mobile", () => {
    expect(forMobile("sync_integrated_fet")).toBe(true);
  });
  it("multiphase vrm not for mobile", () => {
    expect(forMobile("multiphase_vrm")).toBe(false);
  });
});

describe("control", () => {
  it("multiphase vrm uses coupled inductor phase", () => {
    expect(control("multiphase_vrm")).toBe("coupled_inductor_phase");
  });
});

describe("bestUse", () => {
  it("cot constant on best for ddr memory vtt", () => {
    expect(bestUse("cot_constant_on")).toBe("ddr_memory_vtt");
  });
});

describe("buckConverters", () => {
  it("returns 5 types", () => {
    expect(buckConverters()).toHaveLength(5);
  });
});
