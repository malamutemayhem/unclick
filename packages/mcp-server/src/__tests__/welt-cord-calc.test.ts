import { describe, it, expect } from "vitest";
import {
  edgeDefine, flexBend, durability, sewEase,
  cordCost, forMarine, leather, profileShape,
  bestUse, weltCords,
} from "../welt-cord-calc.js";

describe("edgeDefine", () => {
  it("double welt thick best edge define", () => {
    expect(edgeDefine("double_welt_thick")).toBeGreaterThan(edgeDefine("micro_welt_thin"));
  });
});

describe("flexBend", () => {
  it("micro welt thin most flexible", () => {
    expect(flexBend("micro_welt_thin")).toBeGreaterThan(flexBend("double_welt_thick"));
  });
});

describe("durability", () => {
  it("vinyl welt marine most durable", () => {
    expect(durability("vinyl_welt_marine")).toBeGreaterThan(durability("micro_welt_thin"));
  });
});

describe("sewEase", () => {
  it("single welt standard easiest sew", () => {
    expect(sewEase("single_welt_standard")).toBeGreaterThan(sewEase("leather_welt_premium"));
  });
});

describe("cordCost", () => {
  it("leather welt premium most expensive", () => {
    expect(cordCost("leather_welt_premium")).toBeGreaterThan(cordCost("single_welt_standard"));
  });
});

describe("forMarine", () => {
  it("vinyl welt marine is for marine", () => {
    expect(forMarine("vinyl_welt_marine")).toBe(true);
  });
  it("single welt standard not for marine", () => {
    expect(forMarine("single_welt_standard")).toBe(false);
  });
});

describe("leather", () => {
  it("leather welt premium is leather", () => {
    expect(leather("leather_welt_premium")).toBe(true);
  });
  it("single welt standard not leather", () => {
    expect(leather("single_welt_standard")).toBe(false);
  });
});

describe("profileShape", () => {
  it("double welt thick uses double channel bead", () => {
    expect(profileShape("double_welt_thick")).toBe("double_channel_bead");
  });
});

describe("bestUse", () => {
  it("single welt standard best for general seam finish", () => {
    expect(bestUse("single_welt_standard")).toBe("general_seam_finish");
  });
});

describe("weltCords", () => {
  it("returns 5 types", () => {
    expect(weltCords()).toHaveLength(5);
  });
});
