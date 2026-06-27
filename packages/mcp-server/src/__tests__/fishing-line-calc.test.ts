import { describe, it, expect } from "vitest";
import {
  stretchAmount, lineVisibility, abrasionResist, knotStrength,
  lineCost, sinksNaturally, uvResistant, construction,
  bestTechnique, fishingLines,
} from "../fishing-line-calc.js";

describe("stretchAmount", () => {
  it("mono nylon most stretch", () => {
    expect(stretchAmount("mono_nylon")).toBeGreaterThan(stretchAmount("braided_pe"));
  });
});

describe("lineVisibility", () => {
  it("fluorocarbon least visible", () => {
    expect(lineVisibility("fluorocarbon")).toBeGreaterThan(lineVisibility("wire_leader"));
  });
});

describe("abrasionResist", () => {
  it("wire leader best abrasion resistance", () => {
    expect(abrasionResist("wire_leader")).toBeGreaterThan(abrasionResist("mono_nylon"));
  });
});

describe("knotStrength", () => {
  it("mono nylon best knot strength", () => {
    expect(knotStrength("mono_nylon")).toBeGreaterThan(knotStrength("wire_leader"));
  });
});

describe("lineCost", () => {
  it("fly line weight most expensive", () => {
    expect(lineCost("fly_line_weight")).toBeGreaterThan(lineCost("mono_nylon"));
  });
});

describe("sinksNaturally", () => {
  it("fluorocarbon sinks naturally", () => {
    expect(sinksNaturally("fluorocarbon")).toBe(true);
  });
  it("mono nylon does not", () => {
    expect(sinksNaturally("mono_nylon")).toBe(false);
  });
});

describe("uvResistant", () => {
  it("braided pe is uv resistant", () => {
    expect(uvResistant("braided_pe")).toBe(true);
  });
  it("mono nylon is not", () => {
    expect(uvResistant("mono_nylon")).toBe(false);
  });
});

describe("construction", () => {
  it("braided pe uses multi strand woven fiber", () => {
    expect(construction("braided_pe")).toBe("multi_strand_woven_fiber");
  });
});

describe("bestTechnique", () => {
  it("wire leader for toothy fish pike musky", () => {
    expect(bestTechnique("wire_leader")).toBe("toothy_fish_pike_musky");
  });
});

describe("fishingLines", () => {
  it("returns 5 types", () => {
    expect(fishingLines()).toHaveLength(5);
  });
});
