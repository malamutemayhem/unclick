import { describe, it, expect } from "vitest";
import {
  holdStrength, solderEase, flexibility, widthRange,
  cameCost, forBorder, reinforced, cameProfile,
  bestUse, zincCames,
} from "../zinc-came-calc.js";

describe("holdStrength", () => {
  it("reinforced bar strong strongest hold", () => {
    expect(holdStrength("reinforced_bar_strong")).toBeGreaterThan(holdStrength("round_profile_soft"));
  });
});

describe("solderEase", () => {
  it("h channel standard easiest solder", () => {
    expect(solderEase("h_channel_standard")).toBeGreaterThan(solderEase("reinforced_bar_strong"));
  });
});

describe("flexibility", () => {
  it("round profile soft most flexible", () => {
    expect(flexibility("round_profile_soft")).toBeGreaterThan(flexibility("reinforced_bar_strong"));
  });
});

describe("widthRange", () => {
  it("h channel standard widest range", () => {
    expect(widthRange("h_channel_standard")).toBeGreaterThan(widthRange("reinforced_bar_strong"));
  });
});

describe("cameCost", () => {
  it("reinforced bar strong most expensive", () => {
    expect(cameCost("reinforced_bar_strong")).toBeGreaterThan(cameCost("round_profile_soft"));
  });
});

describe("forBorder", () => {
  it("u channel border is for border", () => {
    expect(forBorder("u_channel_border")).toBe(true);
  });
  it("h channel standard not for border", () => {
    expect(forBorder("h_channel_standard")).toBe(false);
  });
});

describe("reinforced", () => {
  it("reinforced bar strong is reinforced", () => {
    expect(reinforced("reinforced_bar_strong")).toBe(true);
  });
  it("round profile soft not reinforced", () => {
    expect(reinforced("round_profile_soft")).toBe(false);
  });
});

describe("cameProfile", () => {
  it("flat profile modern uses flat face channel", () => {
    expect(cameProfile("flat_profile_modern")).toBe("flat_face_channel");
  });
});

describe("bestUse", () => {
  it("h channel standard best for general panel assembly", () => {
    expect(bestUse("h_channel_standard")).toBe("general_panel_assembly");
  });
});

describe("zincCames", () => {
  it("returns 5 types", () => {
    expect(zincCames()).toHaveLength(5);
  });
});
