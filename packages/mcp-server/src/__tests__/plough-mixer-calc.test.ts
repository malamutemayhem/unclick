import { describe, it, expect } from "vitest";
import {
  mixIntensity, throughput, heatingCapability, lumpBreak,
  pmCost, jacketed, forReaction, mixerConfig,
  bestUse, ploughMixerTypes,
} from "../plough-mixer-calc.js";

describe("mixIntensity", () => {
  it("chopper plough best mix intensity", () => {
    expect(mixIntensity("chopper_plough")).toBeGreaterThan(mixIntensity("vacuum_plough"));
  });
});

describe("throughput", () => {
  it("continuous plough highest throughput", () => {
    expect(throughput("continuous_plough")).toBeGreaterThan(throughput("vacuum_plough"));
  });
});

describe("heatingCapability", () => {
  it("heated jacket best heating capability", () => {
    expect(heatingCapability("heated_jacket_plough")).toBeGreaterThan(heatingCapability("standard_plough"));
  });
});

describe("lumpBreak", () => {
  it("chopper plough best lump break", () => {
    expect(lumpBreak("chopper_plough")).toBeGreaterThan(lumpBreak("vacuum_plough"));
  });
});

describe("pmCost", () => {
  it("vacuum plough most expensive", () => {
    expect(pmCost("vacuum_plough")).toBeGreaterThan(pmCost("standard_plough"));
  });
});

describe("jacketed", () => {
  it("heated jacket is jacketed", () => {
    expect(jacketed("heated_jacket_plough")).toBe(true);
  });
  it("standard plough not jacketed", () => {
    expect(jacketed("standard_plough")).toBe(false);
  });
});

describe("forReaction", () => {
  it("heated jacket for reaction", () => {
    expect(forReaction("heated_jacket_plough")).toBe(true);
  });
  it("standard plough not for reaction", () => {
    expect(forReaction("standard_plough")).toBe(false);
  });
});

describe("mixerConfig", () => {
  it("chopper plough uses high speed knife head deagglomerate disperse", () => {
    expect(mixerConfig("chopper_plough")).toBe("chopper_plough_mixer_high_speed_knife_head_deagglomerate_disperse");
  });
});

describe("bestUse", () => {
  it("continuous plough for fertilizer blend inline steady throughput", () => {
    expect(bestUse("continuous_plough")).toBe("fertilizer_blend_continuous_plough_mixer_inline_steady_throughput");
  });
});

describe("ploughMixerTypes", () => {
  it("returns 5 types", () => {
    expect(ploughMixerTypes()).toHaveLength(5);
  });
});
