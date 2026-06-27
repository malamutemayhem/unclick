import { describe, it, expect } from "vitest";
import {
  leakProof, insulation, oneHandUse, cleanEase,
  mugCost, cupHolderFit, baristaFriendly, lidMechanism,
  bestCommute, travelMugs,
} from "../travel-mug-calc.js";

describe("leakProof", () => {
  it("contigo autoseal snap most leak proof", () => {
    expect(leakProof("contigo_autoseal_snap")).toBeGreaterThan(leakProof("keepcup_glass_cork"));
  });
});

describe("insulation", () => {
  it("zojirushi flip open best insulation", () => {
    expect(insulation("zojirushi_flip_open")).toBeGreaterThan(insulation("keepcup_glass_cork"));
  });
});

describe("oneHandUse", () => {
  it("contigo autoseal snap best one hand use", () => {
    expect(oneHandUse("contigo_autoseal_snap")).toBeGreaterThan(oneHandUse("keepcup_glass_cork"));
  });
});

describe("cleanEase", () => {
  it("keepcup glass cork easiest to clean", () => {
    expect(cleanEase("keepcup_glass_cork")).toBeGreaterThan(cleanEase("contigo_autoseal_snap"));
  });
});

describe("mugCost", () => {
  it("yeti rambler mag most expensive", () => {
    expect(mugCost("yeti_rambler_mag")).toBeGreaterThan(mugCost("contigo_autoseal_snap"));
  });
});

describe("cupHolderFit", () => {
  it("contigo autoseal snap fits cup holder", () => {
    expect(cupHolderFit("contigo_autoseal_snap")).toBe(true);
  });
  it("keepcup glass cork does not", () => {
    expect(cupHolderFit("keepcup_glass_cork")).toBe(false);
  });
});

describe("baristaFriendly", () => {
  it("keepcup glass cork is barista friendly", () => {
    expect(baristaFriendly("keepcup_glass_cork")).toBe(true);
  });
  it("yeti rambler mag is not", () => {
    expect(baristaFriendly("yeti_rambler_mag")).toBe(false);
  });
});

describe("lidMechanism", () => {
  it("contigo autoseal snap uses button press autoseal", () => {
    expect(lidMechanism("contigo_autoseal_snap")).toBe("button_press_autoseal");
  });
});

describe("bestCommute", () => {
  it("zojirushi flip open best for long commute hot all day", () => {
    expect(bestCommute("zojirushi_flip_open")).toBe("long_commute_hot_all_day");
  });
});

describe("travelMugs", () => {
  it("returns 5 types", () => {
    expect(travelMugs()).toHaveLength(5);
  });
});
