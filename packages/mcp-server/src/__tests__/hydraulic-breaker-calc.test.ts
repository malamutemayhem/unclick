import { describe, it, expect } from "vitest";
import {
  impact, frequency, weight, precision,
  hbCost, carrierMounted, forRock, chisel,
  bestUse, hydraulicBreakerTypes,
} from "../hydraulic-breaker-calc.js";

describe("impact", () => {
  it("heavy top mount highest impact", () => {
    expect(impact("heavy_top_mount_excavator")).toBeGreaterThan(impact("handheld_jack_hammer"));
  });
});

describe("frequency", () => {
  it("handheld highest frequency", () => {
    expect(frequency("handheld_jack_hammer")).toBeGreaterThan(frequency("heavy_top_mount_excavator"));
  });
});

describe("weight", () => {
  it("handheld lightest", () => {
    expect(weight("handheld_jack_hammer")).toBeGreaterThan(weight("heavy_top_mount_excavator"));
  });
});

describe("precision", () => {
  it("handheld most precise", () => {
    expect(precision("handheld_jack_hammer")).toBeGreaterThan(precision("heavy_top_mount_excavator"));
  });
});

describe("hbCost", () => {
  it("pedestal most expensive", () => {
    expect(hbCost("pedestal_boom_static")).toBeGreaterThan(hbCost("handheld_jack_hammer"));
  });
});

describe("carrierMounted", () => {
  it("heavy top is carrier mounted", () => {
    expect(carrierMounted("heavy_top_mount_excavator")).toBe(true);
  });
  it("handheld not carrier mounted", () => {
    expect(carrierMounted("handheld_jack_hammer")).toBe(false);
  });
});

describe("forRock", () => {
  it("heavy top for rock", () => {
    expect(forRock("heavy_top_mount_excavator")).toBe(true);
  });
  it("handheld not for rock", () => {
    expect(forRock("handheld_jack_hammer")).toBe(false);
  });
});

describe("chisel", () => {
  it("light skid uses narrow chisel", () => {
    expect(chisel("light_skid_steer_mini")).toBe("narrow_chisel_compact_tool");
  });
});

describe("bestUse", () => {
  it("heavy top for rock break quarry", () => {
    expect(bestUse("heavy_top_mount_excavator")).toBe("rock_break_quarry_foundation_mass");
  });
});

describe("hydraulicBreakerTypes", () => {
  it("returns 5 types", () => {
    expect(hydraulicBreakerTypes()).toHaveLength(5);
  });
});
