import { describe, it, expect } from "vitest";
import {
  mixIntensity, batchTime, gentleness, cleanability,
  pmCost, twinShaft, forWetMix, paddle,
  bestUse, paddleMixerTypes,
} from "../paddle-mixer-calc.js";

describe("mixIntensity", () => {
  it("twin shaft highest mix intensity", () => {
    expect(mixIntensity("twin_shaft_counter")).toBeGreaterThan(mixIntensity("gravity_fall_gentle"));
  });
});

describe("batchTime", () => {
  it("fluidized zone fastest batch time", () => {
    expect(batchTime("fluidized_zone_rapid")).toBeGreaterThan(batchTime("gravity_fall_gentle"));
  });
});

describe("gentleness", () => {
  it("gravity fall gentlest", () => {
    expect(gentleness("gravity_fall_gentle")).toBeGreaterThan(gentleness("fluidized_zone_rapid"));
  });
});

describe("cleanability", () => {
  it("gravity fall easiest to clean", () => {
    expect(cleanability("gravity_fall_gentle")).toBeGreaterThan(cleanability("twin_shaft_counter"));
  });
});

describe("pmCost", () => {
  it("heated jacket most expensive", () => {
    expect(pmCost("heated_jacket_dry")).toBeGreaterThan(pmCost("gravity_fall_gentle"));
  });
});

describe("twinShaft", () => {
  it("twin shaft counter is twin shaft", () => {
    expect(twinShaft("twin_shaft_counter")).toBe(true);
  });
  it("single shaft not twin", () => {
    expect(twinShaft("single_shaft_plow")).toBe(false);
  });
});

describe("forWetMix", () => {
  it("twin shaft for wet mix", () => {
    expect(forWetMix("twin_shaft_counter")).toBe(true);
  });
  it("gravity fall not for wet mix", () => {
    expect(forWetMix("gravity_fall_gentle")).toBe(false);
  });
});

describe("paddle", () => {
  it("fluidized zone uses high speed chopper", () => {
    expect(paddle("fluidized_zone_rapid")).toBe("high_speed_chopper_plus_paddle_fluidize");
  });
});

describe("bestUse", () => {
  it("gravity fall for fragile cereal", () => {
    expect(bestUse("gravity_fall_gentle")).toBe("fragile_cereal_snack_gentle_coat_blend");
  });
});

describe("paddleMixerTypes", () => {
  it("returns 5 types", () => {
    expect(paddleMixerTypes()).toHaveLength(5);
  });
});
