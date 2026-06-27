import { describe, it, expect } from "vitest";
import {
  holdFirm, detailSupport, reworkEase, heatResist,
  repousseCost, waxBased, forFine, consistency,
  bestUse, repoussePitches,
} from "../repousse-pitch-calc.js";

describe("holdFirm", () => {
  it("german pitch hard firmest hold", () => {
    expect(holdFirm("german_pitch_hard")).toBeGreaterThan(holdFirm("swedish_pitch_soft"));
  });
});

describe("detailSupport", () => {
  it("german pitch hard best detail support", () => {
    expect(detailSupport("german_pitch_hard")).toBeGreaterThan(detailSupport("swedish_pitch_soft"));
  });
});

describe("reworkEase", () => {
  it("swedish pitch soft easiest rework", () => {
    expect(reworkEase("swedish_pitch_soft")).toBeGreaterThan(reworkEase("german_pitch_hard"));
  });
});

describe("heatResist", () => {
  it("german pitch hard best heat resist", () => {
    expect(heatResist("german_pitch_hard")).toBeGreaterThan(heatResist("microcrystalline_wax_mix"));
  });
});

describe("repousseCost", () => {
  it("pitch bowl cast most expensive", () => {
    expect(repousseCost("pitch_bowl_cast")).toBeGreaterThan(repousseCost("microcrystalline_wax_mix"));
  });
});

describe("waxBased", () => {
  it("microcrystalline wax mix is wax based", () => {
    expect(waxBased("microcrystalline_wax_mix")).toBe(true);
  });
  it("burgundy pitch standard not wax based", () => {
    expect(waxBased("burgundy_pitch_standard")).toBe(false);
  });
});

describe("forFine", () => {
  it("german pitch hard is for fine", () => {
    expect(forFine("german_pitch_hard")).toBe(true);
  });
  it("swedish pitch soft not for fine", () => {
    expect(forFine("swedish_pitch_soft")).toBe(false);
  });
});

describe("consistency", () => {
  it("swedish pitch soft uses soft pliable warm", () => {
    expect(consistency("swedish_pitch_soft")).toBe("soft_pliable_warm");
  });
});

describe("bestUse", () => {
  it("pitch bowl cast best for rotating work hold", () => {
    expect(bestUse("pitch_bowl_cast")).toBe("rotating_work_hold");
  });
});

describe("repoussePitches", () => {
  it("returns 5 types", () => {
    expect(repoussePitches()).toHaveLength(5);
  });
});
