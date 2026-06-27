import { describe, it, expect } from "vitest";
import {
  holdStrength, lightEntry, skillRequired, stoneProtect,
  settingCost, forCabochon, showsFullStone, metalNeeded,
  bestStone, stoneSetters,
} from "../stone-setter-calc.js";

describe("holdStrength", () => {
  it("bezel tube cabochon strongest hold", () => {
    expect(holdStrength("bezel_tube_cabochon")).toBeGreaterThan(holdStrength("pave_bead_micro"));
  });
});

describe("lightEntry", () => {
  it("prong claw faceted most light entry", () => {
    expect(lightEntry("prong_claw_faceted")).toBeGreaterThan(lightEntry("bezel_tube_cabochon"));
  });
});

describe("skillRequired", () => {
  it("pave bead micro most skill required", () => {
    expect(skillRequired("pave_bead_micro")).toBeGreaterThan(skillRequired("bezel_tube_cabochon"));
  });
});

describe("stoneProtect", () => {
  it("bezel tube cabochon best stone protect", () => {
    expect(stoneProtect("bezel_tube_cabochon")).toBeGreaterThan(stoneProtect("prong_claw_faceted"));
  });
});

describe("settingCost", () => {
  it("pave bead micro most expensive", () => {
    expect(settingCost("pave_bead_micro")).toBeGreaterThan(settingCost("bezel_tube_cabochon"));
  });
});

describe("forCabochon", () => {
  it("bezel tube cabochon is for cabochon", () => {
    expect(forCabochon("bezel_tube_cabochon")).toBe(true);
  });
  it("prong claw faceted is not for cabochon", () => {
    expect(forCabochon("prong_claw_faceted")).toBe(false);
  });
});

describe("showsFullStone", () => {
  it("prong claw faceted shows full stone", () => {
    expect(showsFullStone("prong_claw_faceted")).toBe(true);
  });
  it("bezel tube cabochon does not show full stone", () => {
    expect(showsFullStone("bezel_tube_cabochon")).toBe(false);
  });
});

describe("metalNeeded", () => {
  it("pave bead micro uses drilled seat bead", () => {
    expect(metalNeeded("pave_bead_micro")).toBe("drilled_seat_bead");
  });
});

describe("bestStone", () => {
  it("prong claw faceted best for diamond sapphire cut", () => {
    expect(bestStone("prong_claw_faceted")).toBe("diamond_sapphire_cut");
  });
});

describe("stoneSetters", () => {
  it("returns 5 types", () => {
    expect(stoneSetters()).toHaveLength(5);
  });
});
