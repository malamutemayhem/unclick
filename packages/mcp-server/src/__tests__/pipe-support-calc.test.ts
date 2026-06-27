import { describe, it, expect } from "vitest";
import {
  loadCapacity, movement, adjustability, vibration,
  psCost, springLoaded, forHot, attachment,
  bestUse, pipeSupportTypes,
} from "../pipe-support-calc.js";

describe("loadCapacity", () => {
  it("spring hanger highest load", () => {
    expect(loadCapacity("spring_hanger_variable")).toBeGreaterThan(loadCapacity("pipe_clamp_riser_band"));
  });
});

describe("movement", () => {
  it("spring hanger best movement", () => {
    expect(movement("spring_hanger_variable")).toBeGreaterThan(movement("clevis_hanger_vertical"));
  });
});

describe("adjustability", () => {
  it("trapeze most adjustable", () => {
    expect(adjustability("trapeze_channel_strut")).toBeGreaterThan(adjustability("roller_support_horizontal"));
  });
});

describe("vibration", () => {
  it("spring hanger best vibration", () => {
    expect(vibration("spring_hanger_variable")).toBeGreaterThan(vibration("trapeze_channel_strut"));
  });
});

describe("psCost", () => {
  it("spring hanger most expensive", () => {
    expect(psCost("spring_hanger_variable")).toBeGreaterThan(psCost("pipe_clamp_riser_band"));
  });
});

describe("springLoaded", () => {
  it("spring hanger is spring loaded", () => {
    expect(springLoaded("spring_hanger_variable")).toBe(true);
  });
  it("clevis not spring loaded", () => {
    expect(springLoaded("clevis_hanger_vertical")).toBe(false);
  });
});

describe("forHot", () => {
  it("spring hanger for hot", () => {
    expect(forHot("spring_hanger_variable")).toBe(true);
  });
  it("clevis not for hot", () => {
    expect(forHot("clevis_hanger_vertical")).toBe(false);
  });
});

describe("attachment", () => {
  it("trapeze uses strut channel", () => {
    expect(attachment("trapeze_channel_strut")).toBe("strut_channel_spring_nut_bolt");
  });
});

describe("bestUse", () => {
  it("spring hanger for steam line", () => {
    expect(bestUse("spring_hanger_variable")).toBe("steam_line_thermal_movement_absorb");
  });
});

describe("pipeSupportTypes", () => {
  it("returns 5 types", () => {
    expect(pipeSupportTypes()).toHaveLength(5);
  });
});
