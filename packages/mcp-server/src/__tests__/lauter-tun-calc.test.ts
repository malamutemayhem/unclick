import { describe, it, expect } from "vitest";
import {
  lauteringSpeed, extractEfficiency, wortClarity, grainBedDepth,
  ltCost, automated, forHighGravity, vesselConfig,
  bestUse, lauterTunTypes,
} from "../lauter-tun-calc.js";

describe("lauteringSpeed", () => {
  it("mash filter press fastest lautering", () => {
    expect(lauteringSpeed("mash_filter_press")).toBeGreaterThan(lauteringSpeed("lauter_grant"));
  });
});

describe("extractEfficiency", () => {
  it("mash filter press best extract efficiency", () => {
    expect(extractEfficiency("mash_filter_press")).toBeGreaterThan(extractEfficiency("strain_master"));
  });
});

describe("wortClarity", () => {
  it("mash filter press best wort clarity", () => {
    expect(wortClarity("mash_filter_press")).toBeGreaterThan(wortClarity("strain_master"));
  });
});

describe("grainBedDepth", () => {
  it("lauter grant deepest grain bed", () => {
    expect(grainBedDepth("lauter_grant")).toBeGreaterThan(grainBedDepth("mash_filter_press"));
  });
});

describe("ltCost", () => {
  it("mash filter press most expensive", () => {
    expect(ltCost("mash_filter_press")).toBeGreaterThan(ltCost("lauter_grant"));
  });
});

describe("automated", () => {
  it("mash filter press is automated", () => {
    expect(automated("mash_filter_press")).toBe(true);
  });
  it("traditional rake not automated", () => {
    expect(automated("traditional_rake")).toBe(false);
  });
});

describe("forHighGravity", () => {
  it("mash filter press for high gravity", () => {
    expect(forHighGravity("mash_filter_press")).toBe(true);
  });
  it("traditional rake not for high gravity", () => {
    expect(forHighGravity("traditional_rake")).toBe(false);
  });
});

describe("vesselConfig", () => {
  it("strain master uses perforated screen drum", () => {
    expect(vesselConfig("strain_master")).toBe("perforated_screen_drum_rotating_strain_separate_wort_grain");
  });
});

describe("bestUse", () => {
  it("lauter grant for traditional gravity fed", () => {
    expect(bestUse("lauter_grant")).toBe("traditional_gravity_fed_brew_house_wort_collection_monitoring");
  });
});

describe("lauterTunTypes", () => {
  it("returns 5 types", () => {
    expect(lauterTunTypes()).toHaveLength(5);
  });
});
