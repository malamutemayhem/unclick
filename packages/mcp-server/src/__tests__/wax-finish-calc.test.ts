import { describe, it, expect } from "vitest";
import {
  sheenLevel, protectDepth, buffEase, durability,
  waxCost, natural, darkening, waxSource,
  bestUse, waxFinishs,
} from "../wax-finish-calc.js";

describe("sheenLevel", () => {
  it("carnauba wax hard highest sheen", () => {
    expect(sheenLevel("carnauba_wax_hard")).toBeGreaterThan(sheenLevel("paraffin_wax_budget"));
  });
});

describe("protectDepth", () => {
  it("carnauba wax hard deepest protect", () => {
    expect(protectDepth("carnauba_wax_hard")).toBeGreaterThan(protectDepth("paraffin_wax_budget"));
  });
});

describe("buffEase", () => {
  it("paraffin wax budget easiest buff", () => {
    expect(buffEase("paraffin_wax_budget")).toBeGreaterThan(buffEase("carnauba_wax_hard"));
  });
});

describe("durability", () => {
  it("carnauba wax hard most durable", () => {
    expect(durability("carnauba_wax_hard")).toBeGreaterThan(durability("paraffin_wax_budget"));
  });
});

describe("waxCost", () => {
  it("carnauba wax hard most expensive", () => {
    expect(waxCost("carnauba_wax_hard")).toBeGreaterThan(waxCost("paraffin_wax_budget"));
  });
});

describe("natural", () => {
  it("beeswax paste natural is natural", () => {
    expect(natural("beeswax_paste_natural")).toBe(true);
  });
  it("microcrystal wax fine not natural", () => {
    expect(natural("microcrystal_wax_fine")).toBe(false);
  });
});

describe("darkening", () => {
  it("dark wax antique is darkening", () => {
    expect(darkening("dark_wax_antique")).toBe(true);
  });
  it("beeswax paste natural not darkening", () => {
    expect(darkening("beeswax_paste_natural")).toBe(false);
  });
});

describe("waxSource", () => {
  it("carnauba wax hard uses palm leaf extract", () => {
    expect(waxSource("carnauba_wax_hard")).toBe("palm_leaf_extract");
  });
});

describe("bestUse", () => {
  it("beeswax paste natural best for gentle natural sheen", () => {
    expect(bestUse("beeswax_paste_natural")).toBe("gentle_natural_sheen");
  });
});

describe("waxFinishs", () => {
  it("returns 5 types", () => {
    expect(waxFinishs()).toHaveLength(5);
  });
});
