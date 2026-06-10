import { describe, it, expect } from "vitest";
import {
  mixingArea, paintFresh, cleanEase, durability,
  paletteCost, hasLid, nonAbsorbent, paletteMaterial,
  bestMedium, paintPalettes,
} from "../paint-palette-calc.js";

describe("mixingArea", () => {
  it("glass tempered flat most mixing area", () => {
    expect(mixingArea("glass_tempered_flat")).toBeGreaterThan(mixingArea("ceramic_mixing_tile"));
  });
});

describe("paintFresh", () => {
  it("plastic stay wet keeps paint freshest", () => {
    expect(paintFresh("plastic_stay_wet")).toBeGreaterThan(paintFresh("disposable_tear_pad"));
  });
});

describe("cleanEase", () => {
  it("disposable tear pad easiest to clean", () => {
    expect(cleanEase("disposable_tear_pad")).toBeGreaterThan(cleanEase("wooden_traditional_oval"));
  });
});

describe("durability", () => {
  it("glass tempered flat most durable", () => {
    expect(durability("glass_tempered_flat")).toBeGreaterThan(durability("disposable_tear_pad"));
  });
});

describe("paletteCost", () => {
  it("glass tempered flat most expensive", () => {
    expect(paletteCost("glass_tempered_flat")).toBeGreaterThan(paletteCost("disposable_tear_pad"));
  });
});

describe("hasLid", () => {
  it("plastic stay wet has lid", () => {
    expect(hasLid("plastic_stay_wet")).toBe(true);
  });
  it("wooden traditional oval does not", () => {
    expect(hasLid("wooden_traditional_oval")).toBe(false);
  });
});

describe("nonAbsorbent", () => {
  it("glass tempered flat is non absorbent", () => {
    expect(nonAbsorbent("glass_tempered_flat")).toBe(true);
  });
  it("wooden traditional oval is not", () => {
    expect(nonAbsorbent("wooden_traditional_oval")).toBe(false);
  });
});

describe("paletteMaterial", () => {
  it("ceramic mixing tile uses glazed porcelain wells", () => {
    expect(paletteMaterial("ceramic_mixing_tile")).toBe("glazed_porcelain_wells");
  });
});

describe("bestMedium", () => {
  it("plastic stay wet best for acrylic slow dry session", () => {
    expect(bestMedium("plastic_stay_wet")).toBe("acrylic_slow_dry_session");
  });
});

describe("paintPalettes", () => {
  it("returns 5 types", () => {
    expect(paintPalettes()).toHaveLength(5);
  });
});
