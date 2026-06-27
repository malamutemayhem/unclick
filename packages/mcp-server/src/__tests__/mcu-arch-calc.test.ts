import { describe, it, expect } from "vitest";
import {
  performance, powerEff, codeSize, ecosystem,
  archCost, fpu, forSecurity, pipeline,
  bestUse, mcuArchs,
} from "../mcu-arch-calc.js";

describe("performance", () => {
  it("xtensa lx7 dual highest performance", () => {
    expect(performance("xtensa_lx7_dual")).toBeGreaterThan(performance("arm_cortex_m0"));
  });
});

describe("powerEff", () => {
  it("arm cortex m0 most power efficient", () => {
    expect(powerEff("arm_cortex_m0")).toBeGreaterThan(powerEff("xtensa_lx7_dual"));
  });
});

describe("codeSize", () => {
  it("arm cortex m0 smallest code size", () => {
    expect(codeSize("arm_cortex_m0")).toBeGreaterThan(codeSize("xtensa_lx7_dual"));
  });
});

describe("ecosystem", () => {
  it("arm cortex m4f best ecosystem", () => {
    expect(ecosystem("arm_cortex_m4f")).toBeGreaterThan(ecosystem("risc_v_rv32imc"));
  });
});

describe("archCost", () => {
  it("arm cortex m33 most expensive", () => {
    expect(archCost("arm_cortex_m33")).toBeGreaterThan(archCost("arm_cortex_m0"));
  });
});

describe("fpu", () => {
  it("arm cortex m4f has fpu", () => {
    expect(fpu("arm_cortex_m4f")).toBe(true);
  });
  it("arm cortex m0 no fpu", () => {
    expect(fpu("arm_cortex_m0")).toBe(false);
  });
});

describe("forSecurity", () => {
  it("arm cortex m33 for security", () => {
    expect(forSecurity("arm_cortex_m33")).toBe(true);
  });
  it("arm cortex m4f not for security", () => {
    expect(forSecurity("arm_cortex_m4f")).toBe(false);
  });
});

describe("pipeline", () => {
  it("risc v rv32imc uses 5 stage open isa", () => {
    expect(pipeline("risc_v_rv32imc")).toBe("5_stage_open_isa");
  });
});

describe("bestUse", () => {
  it("xtensa lx7 dual best for wifi ble edge ai", () => {
    expect(bestUse("xtensa_lx7_dual")).toBe("wifi_ble_edge_ai");
  });
});

describe("mcuArchs", () => {
  it("returns 5 types", () => {
    expect(mcuArchs()).toHaveLength(5);
  });
});
