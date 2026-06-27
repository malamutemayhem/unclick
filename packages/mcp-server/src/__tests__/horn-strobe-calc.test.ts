import { describe, it, expect } from "vitest";
import {
  audible, visible, coverage, aesthetic,
  hsCost, voiceCapable, forAda, candela,
  bestUse, hornStrobeTypes,
} from "../horn-strobe-calc.js";

describe("audible", () => {
  it("high power loudest", () => {
    expect(audible("high_power_outdoor")).toBeGreaterThan(audible("ceiling_mount_strobe"));
  });
});

describe("visible", () => {
  it("high power brightest", () => {
    expect(visible("high_power_outdoor")).toBeGreaterThan(visible("mini_horn_compact"));
  });
});

describe("coverage", () => {
  it("high power best coverage", () => {
    expect(coverage("high_power_outdoor")).toBeGreaterThan(coverage("mini_horn_compact"));
  });
});

describe("aesthetic", () => {
  it("mini horn best aesthetic", () => {
    expect(aesthetic("mini_horn_compact")).toBeGreaterThan(aesthetic("high_power_outdoor"));
  });
});

describe("hsCost", () => {
  it("high power most expensive", () => {
    expect(hsCost("high_power_outdoor")).toBeGreaterThan(hsCost("mini_horn_compact"));
  });
});

describe("voiceCapable", () => {
  it("speaker strobe is voice capable", () => {
    expect(voiceCapable("speaker_strobe_voice")).toBe(true);
  });
  it("wall mount not voice capable", () => {
    expect(voiceCapable("wall_mount_horn_strobe")).toBe(false);
  });
});

describe("forAda", () => {
  it("ceiling mount for ada", () => {
    expect(forAda("ceiling_mount_strobe")).toBe(true);
  });
  it("high power not for ada", () => {
    expect(forAda("high_power_outdoor")).toBe(false);
  });
});

describe("candela", () => {
  it("high power uses weatherproof", () => {
    expect(candela("high_power_outdoor")).toBe("135_185_cd_weatherproof");
  });
});

describe("bestUse", () => {
  it("speaker strobe for high rise", () => {
    expect(bestUse("speaker_strobe_voice")).toBe("high_rise_mass_notification");
  });
});

describe("hornStrobeTypes", () => {
  it("returns 5 types", () => {
    expect(hornStrobeTypes()).toHaveLength(5);
  });
});
