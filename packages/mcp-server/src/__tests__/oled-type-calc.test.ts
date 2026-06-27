import { describe, it, expect } from "vitest";
import {
  lifetime, brightness, resolution, efficiency,
  oledCost, flexible, forTv, emitter,
  bestUse, oledTypes,
} from "../oled-type-calc.js";

describe("lifetime", () => {
  it("woled white cf longest lifetime", () => {
    expect(lifetime("woled_white_cf")).toBeGreaterThan(lifetime("pmoled_passive"));
  });
});

describe("brightness", () => {
  it("qd oled quantum brightest", () => {
    expect(brightness("qd_oled_quantum")).toBeGreaterThan(brightness("amoled_pentile"));
  });
});

describe("resolution", () => {
  it("amoled rgb stripe highest resolution", () => {
    expect(resolution("amoled_rgb_stripe")).toBeGreaterThan(resolution("woled_white_cf"));
  });
});

describe("efficiency", () => {
  it("qd oled quantum most efficient", () => {
    expect(efficiency("qd_oled_quantum")).toBeGreaterThan(efficiency("woled_white_cf"));
  });
});

describe("oledCost", () => {
  it("qd oled quantum most expensive", () => {
    expect(oledCost("qd_oled_quantum")).toBeGreaterThan(oledCost("pmoled_passive"));
  });
});

describe("flexible", () => {
  it("amoled rgb stripe is flexible", () => {
    expect(flexible("amoled_rgb_stripe")).toBe(true);
  });
  it("woled white cf not flexible", () => {
    expect(flexible("woled_white_cf")).toBe(false);
  });
});

describe("forTv", () => {
  it("woled white cf for tv", () => {
    expect(forTv("woled_white_cf")).toBe(true);
  });
  it("amoled pentile not for tv", () => {
    expect(forTv("amoled_pentile")).toBe(false);
  });
});

describe("emitter", () => {
  it("qd oled quantum uses blue oled qd conversion", () => {
    expect(emitter("qd_oled_quantum")).toBe("blue_oled_qd_conversion");
  });
});

describe("bestUse", () => {
  it("amoled pentile best for vr headset panel", () => {
    expect(bestUse("amoled_pentile")).toBe("vr_headset_panel");
  });
});

describe("oledTypes", () => {
  it("returns 5 types", () => {
    expect(oledTypes()).toHaveLength(5);
  });
});
