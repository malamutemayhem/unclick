import { describe, it, expect } from "vitest";
import {
  pullControl, comfort, easeOnOff, durability,
  harnessCost, reflective, hasHandle, strapDesign,
  bestDog, dogHarnesses,
} from "../dog-harness-calc.js";

describe("pullControl", () => {
  it("front clip no pull best pull control", () => {
    expect(pullControl("front_clip_no_pull")).toBeGreaterThan(pullControl("back_clip_standard"));
  });
});

describe("comfort", () => {
  it("step in easy most comfortable", () => {
    expect(comfort("step_in_easy")).toBeGreaterThan(comfort("tactical_molle"));
  });
});

describe("easeOnOff", () => {
  it("step in easy easiest on off", () => {
    expect(easeOnOff("step_in_easy")).toBeGreaterThan(easeOnOff("tactical_molle"));
  });
});

describe("durability", () => {
  it("tactical molle most durable", () => {
    expect(durability("tactical_molle")).toBeGreaterThan(durability("step_in_easy"));
  });
});

describe("harnessCost", () => {
  it("tactical molle most expensive", () => {
    expect(harnessCost("tactical_molle")).toBeGreaterThan(harnessCost("back_clip_standard"));
  });
});

describe("reflective", () => {
  it("front clip no pull is reflective", () => {
    expect(reflective("front_clip_no_pull")).toBe(true);
  });
  it("back clip standard is not", () => {
    expect(reflective("back_clip_standard")).toBe(false);
  });
});

describe("hasHandle", () => {
  it("tactical molle has handle", () => {
    expect(hasHandle("tactical_molle")).toBe(true);
  });
  it("front clip no pull does not", () => {
    expect(hasHandle("front_clip_no_pull")).toBe(false);
  });
});

describe("strapDesign", () => {
  it("tactical molle uses nylon molle webbing", () => {
    expect(strapDesign("tactical_molle")).toBe("nylon_molle_webbing");
  });
});

describe("bestDog", () => {
  it("step in easy best for small senior arthritic", () => {
    expect(bestDog("step_in_easy")).toBe("small_senior_arthritic");
  });
});

describe("dogHarnesses", () => {
  it("returns 5 types", () => {
    expect(dogHarnesses()).toHaveLength(5);
  });
});
