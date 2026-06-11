import { describe, it, expect } from "vitest";
import {
  efficiency, coolingCapacity, overloadTolerance, noiseLevel,
  ptCost, oilFilled, forIndoor, cooling,
  bestUse, powerTransformerTypes,
} from "../power-transformer-calc.js";

describe("efficiency", () => {
  it("oil immersed highest efficiency", () => {
    expect(efficiency("oil_immersed_core")).toBeGreaterThan(efficiency("dry_type_cast_resin"));
  });
});

describe("coolingCapacity", () => {
  it("oil immersed best cooling", () => {
    expect(coolingCapacity("oil_immersed_core")).toBeGreaterThan(coolingCapacity("instrument_ct_vt"));
  });
});

describe("overloadTolerance", () => {
  it("oil immersed best overload tolerance", () => {
    expect(overloadTolerance("oil_immersed_core")).toBeGreaterThan(overloadTolerance("instrument_ct_vt"));
  });
});

describe("noiseLevel", () => {
  it("instrument ct vt quietest", () => {
    expect(noiseLevel("instrument_ct_vt")).toBeGreaterThan(noiseLevel("oil_immersed_core"));
  });
});

describe("ptCost", () => {
  it("dry type cast resin most expensive", () => {
    expect(ptCost("dry_type_cast_resin")).toBeGreaterThan(ptCost("instrument_ct_vt"));
  });
});

describe("oilFilled", () => {
  it("oil immersed is oil filled", () => {
    expect(oilFilled("oil_immersed_core")).toBe(true);
  });
  it("dry type not oil filled", () => {
    expect(oilFilled("dry_type_cast_resin")).toBe(false);
  });
});

describe("forIndoor", () => {
  it("dry type for indoor", () => {
    expect(forIndoor("dry_type_cast_resin")).toBe(true);
  });
  it("oil immersed not for indoor", () => {
    expect(forIndoor("oil_immersed_core")).toBe(false);
  });
});

describe("cooling", () => {
  it("pad mounted uses sealed tank", () => {
    expect(cooling("pad_mounted_dist")).toBe("onan_sealed_tank_pad_mounted_loop_feed");
  });
});

describe("bestUse", () => {
  it("auto transformer for voltage regulation", () => {
    expect(bestUse("auto_transformer_step")).toBe("voltage_regulation_motor_start_buck_boost");
  });
});

describe("powerTransformerTypes", () => {
  it("returns 5 types", () => {
    expect(powerTransformerTypes()).toHaveLength(5);
  });
});
