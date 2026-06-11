import { describe, it, expect } from "vitest";
import {
  resolution, speed, durability, substrate,
  ijCost, nonContact, forPrimary, ink,
  bestUse, industrialInkjetTypes,
} from "../industrial-inkjet-calc.js";

describe("resolution", () => {
  it("piezo DOD highest resolution", () => {
    expect(resolution("piezo_dod_high_res")).toBeGreaterThan(resolution("valve_jet_large_char"));
  });
});

describe("speed", () => {
  it("CIJ fastest", () => {
    expect(speed("continuous_cij_small_char")).toBeGreaterThanOrEqual(speed("uv_led_cure_inline"));
  });
});

describe("durability", () => {
  it("UV LED cure most durable", () => {
    expect(durability("uv_led_cure_inline")).toBeGreaterThan(durability("continuous_cij_small_char"));
  });
});

describe("substrate", () => {
  it("CIJ widest substrate range", () => {
    expect(substrate("continuous_cij_small_char")).toBeGreaterThanOrEqual(substrate("uv_led_cure_inline"));
  });
});

describe("ijCost", () => {
  it("UV LED most expensive", () => {
    expect(ijCost("uv_led_cure_inline")).toBeGreaterThan(ijCost("thermal_dod_large_char"));
  });
});

describe("nonContact", () => {
  it("all inkjet types are non-contact", () => {
    expect(nonContact("continuous_cij_small_char")).toBe(true);
  });
  it("piezo also non-contact", () => {
    expect(nonContact("piezo_dod_high_res")).toBe(true);
  });
});

describe("forPrimary", () => {
  it("piezo DOD for primary printing", () => {
    expect(forPrimary("piezo_dod_high_res")).toBe(true);
  });
  it("CIJ not for primary", () => {
    expect(forPrimary("continuous_cij_small_char")).toBe(false);
  });
});

describe("ink", () => {
  it("UV LED uses UV curable ink", () => {
    expect(ink("uv_led_cure_inline")).toBe("uv_curable_led_pinning_cure");
  });
});

describe("bestUse", () => {
  it("CIJ for date code fast line", () => {
    expect(bestUse("continuous_cij_small_char")).toBe("date_code_lot_expiry_fast_line");
  });
});

describe("industrialInkjetTypes", () => {
  it("returns 5 types", () => {
    expect(industrialInkjetTypes()).toHaveLength(5);
  });
});
