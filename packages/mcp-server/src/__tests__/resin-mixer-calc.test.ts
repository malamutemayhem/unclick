import { describe, it, expect } from "vitest";
import {
  mixHomogeneity, throughput, ratioAccuracy, potLifeControl,
  rxCost, degassing, forTwoComponent, mixerConfig,
  bestUse, resinMixerTypes,
} from "../resin-mixer-calc.js";

describe("mixHomogeneity", () => {
  it("planetary dual best mix homogeneity", () => {
    expect(mixHomogeneity("planetary_dual")).toBeGreaterThan(mixHomogeneity("static_inline"));
  });
});

describe("throughput", () => {
  it("static inline highest throughput", () => {
    expect(throughput("static_inline")).toBeGreaterThan(throughput("vacuum_degas"));
  });
});

describe("ratioAccuracy", () => {
  it("meter mix dispense best ratio accuracy", () => {
    expect(ratioAccuracy("meter_mix_dispense")).toBeGreaterThan(ratioAccuracy("dynamic_impeller"));
  });
});

describe("potLifeControl", () => {
  it("meter mix dispense best pot life control", () => {
    expect(potLifeControl("meter_mix_dispense")).toBeGreaterThan(potLifeControl("dynamic_impeller"));
  });
});

describe("rxCost", () => {
  it("meter mix dispense most expensive", () => {
    expect(rxCost("meter_mix_dispense")).toBeGreaterThan(rxCost("static_inline"));
  });
});

describe("degassing", () => {
  it("planetary dual has degassing", () => {
    expect(degassing("planetary_dual")).toBe(true);
  });
  it("static inline no degassing", () => {
    expect(degassing("static_inline")).toBe(false);
  });
});

describe("forTwoComponent", () => {
  it("meter mix dispense for two component", () => {
    expect(forTwoComponent("meter_mix_dispense")).toBe(true);
  });
  it("vacuum degas not for two component", () => {
    expect(forTwoComponent("vacuum_degas")).toBe(false);
  });
});

describe("mixerConfig", () => {
  it("planetary dual uses revolve rotate blade degas vacuum", () => {
    expect(mixerConfig("planetary_dual")).toBe("planetary_dual_resin_mixer_revolve_rotate_blade_degas_vacuum");
  });
});

describe("bestUse", () => {
  it("meter mix dispense for potting seal precise ratio shot", () => {
    expect(bestUse("meter_mix_dispense")).toBe("potting_seal_meter_mix_dispense_resin_mixer_precise_ratio_shot");
  });
});

describe("resinMixerTypes", () => {
  it("returns 5 types", () => {
    expect(resinMixerTypes()).toHaveLength(5);
  });
});
