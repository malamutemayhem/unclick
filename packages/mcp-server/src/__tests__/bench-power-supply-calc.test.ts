import { describe, it, expect } from "vitest";
import {
  outputStability, noiseLevel, currentRange, portability,
  supplyCost, programmable, dualChannel, regulationType,
  bestUse, benchPowerSupplies,
} from "../bench-power-supply-calc.js";

describe("outputStability", () => {
  it("programmable digital pro most stable output", () => {
    expect(outputStability("programmable_digital_pro")).toBeGreaterThan(outputStability("variable_analog_basic"));
  });
});

describe("noiseLevel", () => {
  it("linear regulated std lowest noise", () => {
    expect(noiseLevel("linear_regulated_std")).toBeGreaterThan(noiseLevel("switching_compact_mod"));
  });
});

describe("currentRange", () => {
  it("programmable digital pro widest current range", () => {
    expect(currentRange("programmable_digital_pro")).toBeGreaterThan(currentRange("variable_analog_basic"));
  });
});

describe("portability", () => {
  it("switching compact mod most portable", () => {
    expect(portability("switching_compact_mod")).toBeGreaterThan(portability("programmable_digital_pro"));
  });
});

describe("supplyCost", () => {
  it("programmable digital pro most expensive", () => {
    expect(supplyCost("programmable_digital_pro")).toBeGreaterThan(supplyCost("variable_analog_basic"));
  });
});

describe("programmable", () => {
  it("programmable digital pro is programmable", () => {
    expect(programmable("programmable_digital_pro")).toBe(true);
  });
  it("linear regulated std not programmable", () => {
    expect(programmable("linear_regulated_std")).toBe(false);
  });
});

describe("dualChannel", () => {
  it("dual channel tracking is dual channel", () => {
    expect(dualChannel("dual_channel_tracking")).toBe(true);
  });
  it("linear regulated std not dual channel", () => {
    expect(dualChannel("linear_regulated_std")).toBe(false);
  });
});

describe("regulationType", () => {
  it("switching compact mod uses switching buck boost", () => {
    expect(regulationType("switching_compact_mod")).toBe("switching_buck_boost");
  });
});

describe("bestUse", () => {
  it("variable analog basic best for hobby bench supply", () => {
    expect(bestUse("variable_analog_basic")).toBe("hobby_bench_supply");
  });
});

describe("benchPowerSupplies", () => {
  it("returns 5 types", () => {
    expect(benchPowerSupplies()).toHaveLength(5);
  });
});
