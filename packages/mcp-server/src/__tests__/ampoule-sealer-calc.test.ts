import { describe, it, expect } from "vitest";
import {
  sealIntegrity, throughput, heatExposure, glassRange,
  asCost, contactFree, forOxygen, sealerConfig,
  bestUse, ampouleSealerTypes,
} from "../ampoule-sealer-calc.js";

describe("sealIntegrity", () => {
  it("pull seal best seal integrity", () => {
    expect(sealIntegrity("pull_seal")).toBeGreaterThan(sealIntegrity("crimp_seal"));
  });
});

describe("throughput", () => {
  it("flame seal rotary highest throughput", () => {
    expect(throughput("flame_seal_rotary")).toBeGreaterThan(throughput("laser_seal"));
  });
});

describe("heatExposure", () => {
  it("flame seal rotary more heat than laser seal", () => {
    expect(heatExposure("flame_seal_rotary")).toBeGreaterThan(heatExposure("laser_seal"));
  });
});

describe("glassRange", () => {
  it("flame seal rotary widest glass range", () => {
    expect(glassRange("flame_seal_rotary")).toBeGreaterThan(glassRange("crimp_seal"));
  });
});

describe("asCost", () => {
  it("laser seal most expensive", () => {
    expect(asCost("laser_seal")).toBeGreaterThan(asCost("crimp_seal"));
  });
});

describe("contactFree", () => {
  it("tip seal gas is contact free", () => {
    expect(contactFree("tip_seal_gas")).toBe(true);
  });
  it("crimp seal not contact free", () => {
    expect(contactFree("crimp_seal")).toBe(false);
  });
});

describe("forOxygen", () => {
  it("pull seal for oxygen sensitive", () => {
    expect(forOxygen("pull_seal")).toBe(true);
  });
  it("crimp seal not for oxygen sensitive", () => {
    expect(forOxygen("crimp_seal")).toBe(false);
  });
});

describe("sealerConfig", () => {
  it("laser seal uses focused beam precision melt close", () => {
    expect(sealerConfig("laser_seal")).toBe("laser_seal_ampoule_sealer_focused_beam_precision_melt_close");
  });
});

describe("bestUse", () => {
  it("flame seal rotary for high speed pharma mass production", () => {
    expect(bestUse("flame_seal_rotary")).toBe("high_speed_pharma_rotary_flame_seal_ampoule_mass_production");
  });
});

describe("ampouleSealerTypes", () => {
  it("returns 5 types", () => {
    expect(ampouleSealerTypes()).toHaveLength(5);
  });
});
