import { describe, it, expect } from "vitest";
import {
  snr, sensitivity, bandwidth, aop,
  micCost, waterproof, forAi, transduction,
  bestUse, memsMics,
} from "../mems-mic-calc.js";

describe("snr", () => {
  it("optical fabry perot best snr", () => {
    expect(snr("optical_fabry_perot")).toBeGreaterThan(snr("bone_conduction"));
  });
});

describe("sensitivity", () => {
  it("optical fabry perot highest sensitivity", () => {
    expect(sensitivity("optical_fabry_perot")).toBeGreaterThan(sensitivity("bone_conduction"));
  });
});

describe("bandwidth", () => {
  it("optical fabry perot widest bandwidth", () => {
    expect(bandwidth("optical_fabry_perot")).toBeGreaterThan(bandwidth("bone_conduction"));
  });
});

describe("aop", () => {
  it("piezoelectric pzt highest aop", () => {
    expect(aop("piezoelectric_pzt")).toBeGreaterThan(aop("optical_fabry_perot"));
  });
});

describe("micCost", () => {
  it("optical fabry perot most expensive", () => {
    expect(micCost("optical_fabry_perot")).toBeGreaterThan(micCost("digital_pdm_mems"));
  });
});

describe("waterproof", () => {
  it("piezoelectric pzt is waterproof", () => {
    expect(waterproof("piezoelectric_pzt")).toBe(true);
  });
  it("capacitive condenser not waterproof", () => {
    expect(waterproof("capacitive_condenser")).toBe(false);
  });
});

describe("forAi", () => {
  it("digital pdm mems for ai", () => {
    expect(forAi("digital_pdm_mems")).toBe(true);
  });
  it("piezoelectric pzt not for ai", () => {
    expect(forAi("piezoelectric_pzt")).toBe(false);
  });
});

describe("transduction", () => {
  it("digital pdm mems uses sigma delta modulated bit", () => {
    expect(transduction("digital_pdm_mems")).toBe("sigma_delta_modulated_bit");
  });
});

describe("bestUse", () => {
  it("bone conduction best for noisy env voice comm", () => {
    expect(bestUse("bone_conduction")).toBe("noisy_env_voice_comm");
  });
});

describe("memsMics", () => {
  it("returns 5 types", () => {
    expect(memsMics()).toHaveLength(5);
  });
});
