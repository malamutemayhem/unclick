import { describe, it, expect } from "vitest";
import {
  guideSmooth, wearResist, sizeRange, twistControl,
  topCost, adjustable, grooved, coneMaterial,
  bestUse, layingTops,
} from "../laying-top-calc.js";

describe("guideSmooth", () => {
  it("brass cone smooth smoothest guide", () => {
    expect(guideSmooth("brass_cone_smooth")).toBeGreaterThan(guideSmooth("wooden_cone_standard"));
  });
});

describe("wearResist", () => {
  it("hardened steel heavy best wear resist", () => {
    expect(wearResist("hardened_steel_heavy")).toBeGreaterThan(wearResist("wooden_cone_standard"));
  });
});

describe("sizeRange", () => {
  it("adjustable cone set best size range", () => {
    expect(sizeRange("adjustable_cone_set")).toBeGreaterThan(sizeRange("brass_cone_smooth"));
  });
});

describe("twistControl", () => {
  it("grooved cone guide best twist control", () => {
    expect(twistControl("grooved_cone_guide")).toBeGreaterThan(twistControl("wooden_cone_standard"));
  });
});

describe("topCost", () => {
  it("adjustable cone set most expensive", () => {
    expect(topCost("adjustable_cone_set")).toBeGreaterThan(topCost("wooden_cone_standard"));
  });
});

describe("adjustable", () => {
  it("adjustable cone set is adjustable", () => {
    expect(adjustable("adjustable_cone_set")).toBe(true);
  });
  it("brass cone smooth not adjustable", () => {
    expect(adjustable("brass_cone_smooth")).toBe(false);
  });
});

describe("grooved", () => {
  it("grooved cone guide is grooved", () => {
    expect(grooved("grooved_cone_guide")).toBe(true);
  });
  it("brass cone smooth not grooved", () => {
    expect(grooved("brass_cone_smooth")).toBe(false);
  });
});

describe("coneMaterial", () => {
  it("hardened steel heavy uses hardened tool steel", () => {
    expect(coneMaterial("hardened_steel_heavy")).toBe("hardened_tool_steel");
  });
});

describe("bestUse", () => {
  it("wooden cone standard best for general strand lay", () => {
    expect(bestUse("wooden_cone_standard")).toBe("general_strand_lay");
  });
});

describe("layingTops", () => {
  it("returns 5 types", () => {
    expect(layingTops()).toHaveLength(5);
  });
});
