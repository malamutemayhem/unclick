import { describe, it, expect } from "vitest";
import {
  coatingUniformity, throughput, particleControl, dryingRate,
  fmCost, spraying, forGranulation, mixerConfig,
  bestUse, fluidizedMixerTypes,
} from "../fluidized-mixer-calc.js";

describe("coatingUniformity", () => {
  it("bottom spray best coating uniformity", () => {
    expect(coatingUniformity("bottom_spray_fluid")).toBeGreaterThan(coatingUniformity("dry_fluid_mix"));
  });
});

describe("throughput", () => {
  it("continuous fluid highest throughput", () => {
    expect(throughput("continuous_fluid")).toBeGreaterThan(throughput("bottom_spray_fluid"));
  });
});

describe("particleControl", () => {
  it("bottom spray best particle control", () => {
    expect(particleControl("bottom_spray_fluid")).toBeGreaterThan(particleControl("dry_fluid_mix"));
  });
});

describe("dryingRate", () => {
  it("dry fluid mix best drying rate", () => {
    expect(dryingRate("dry_fluid_mix")).toBeGreaterThan(dryingRate("bottom_spray_fluid"));
  });
});

describe("fmCost", () => {
  it("bottom spray most expensive", () => {
    expect(fmCost("bottom_spray_fluid")).toBeGreaterThan(fmCost("dry_fluid_mix"));
  });
});

describe("spraying", () => {
  it("top spray uses spraying", () => {
    expect(spraying("top_spray_fluid")).toBe(true);
  });
  it("dry fluid mix no spraying", () => {
    expect(spraying("dry_fluid_mix")).toBe(false);
  });
});

describe("forGranulation", () => {
  it("top spray for granulation", () => {
    expect(forGranulation("top_spray_fluid")).toBe(true);
  });
  it("bottom spray not for granulation", () => {
    expect(forGranulation("bottom_spray_fluid")).toBe(false);
  });
});

describe("mixerConfig", () => {
  it("tangential spray uses rotor disc spin coat layer up", () => {
    expect(mixerConfig("tangential_spray")).toBe("tangential_spray_fluidized_mixer_rotor_disc_spin_coat_layer_up");
  });
});

describe("bestUse", () => {
  it("top spray for instant powder agglomerate dissolve", () => {
    expect(bestUse("top_spray_fluid")).toBe("instant_powder_top_spray_fluidized_mixer_agglomerate_dissolve");
  });
});

describe("fluidizedMixerTypes", () => {
  it("returns 5 types", () => {
    expect(fluidizedMixerTypes()).toHaveLength(5);
  });
});
