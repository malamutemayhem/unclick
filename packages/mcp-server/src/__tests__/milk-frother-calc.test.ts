import { describe, it, expect } from "vitest";
import {
  foamQuality, temperatureControl, skillRequired, cleanupEase,
  frotherCost, standalone, heatsMillk, mechanism,
  bestDrink, milkFrothers,
} from "../milk-frother-calc.js";

describe("foamQuality", () => {
  it("steam wand best foam", () => {
    expect(foamQuality("steam_wand")).toBeGreaterThan(foamQuality("handheld_whisk"));
  });
});

describe("temperatureControl", () => {
  it("induction pitcher best temp control", () => {
    expect(temperatureControl("induction_pitcher")).toBeGreaterThan(temperatureControl("handheld_whisk"));
  });
});

describe("skillRequired", () => {
  it("steam wand most skill", () => {
    expect(skillRequired("steam_wand")).toBeGreaterThan(skillRequired("automatic_jug"));
  });
});

describe("cleanupEase", () => {
  it("handheld whisk easiest cleanup", () => {
    expect(cleanupEase("handheld_whisk")).toBeGreaterThan(cleanupEase("steam_wand"));
  });
});

describe("frotherCost", () => {
  it("induction pitcher most expensive", () => {
    expect(frotherCost("induction_pitcher")).toBeGreaterThan(frotherCost("handheld_whisk"));
  });
});

describe("standalone", () => {
  it("automatic jug is standalone", () => {
    expect(standalone("automatic_jug")).toBe(true);
  });
  it("steam wand is not", () => {
    expect(standalone("steam_wand")).toBe(false);
  });
});

describe("heatsMillk", () => {
  it("steam wand heats milk", () => {
    expect(heatsMillk("steam_wand")).toBe(true);
  });
  it("handheld whisk does not", () => {
    expect(heatsMillk("handheld_whisk")).toBe(false);
  });
});

describe("mechanism", () => {
  it("induction pitcher uses magnetic whisk induction heat", () => {
    expect(mechanism("induction_pitcher")).toBe("magnetic_whisk_induction_heat");
  });
});

describe("bestDrink", () => {
  it("steam wand for latte art cappuccino pro", () => {
    expect(bestDrink("steam_wand")).toBe("latte_art_cappuccino_pro");
  });
});

describe("milkFrothers", () => {
  it("returns 5 types", () => {
    expect(milkFrothers()).toHaveLength(5);
  });
});
