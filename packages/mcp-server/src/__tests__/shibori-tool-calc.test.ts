import { describe, it, expect } from "vitest";
import {
  patternDetail, repeatConsist, easeOfUse, fabricRange,
  toolCost, needsClamp, needsStitch, toolType,
  bestPattern, shiboriTools,
} from "../shibori-tool-calc.js";

describe("patternDetail", () => {
  it("stitch ori nui most detail", () => {
    expect(patternDetail("stitch_ori_nui")).toBeGreaterThan(patternDetail("bind_kumo_scrunch"));
  });
});

describe("repeatConsist", () => {
  it("clamp itajime fold most consistent repeat", () => {
    expect(repeatConsist("clamp_itajime_fold")).toBeGreaterThan(repeatConsist("bind_kumo_scrunch"));
  });
});

describe("easeOfUse", () => {
  it("bind kumo scrunch easiest to use", () => {
    expect(easeOfUse("bind_kumo_scrunch")).toBeGreaterThan(easeOfUse("stitch_ori_nui"));
  });
});

describe("fabricRange", () => {
  it("bind kumo scrunch widest fabric range", () => {
    expect(fabricRange("bind_kumo_scrunch")).toBeGreaterThan(fabricRange("cap_boshi_cover"));
  });
});

describe("toolCost", () => {
  it("clamp itajime fold most expensive", () => {
    expect(toolCost("clamp_itajime_fold")).toBeGreaterThan(toolCost("bind_kumo_scrunch"));
  });
});

describe("needsClamp", () => {
  it("clamp itajime fold needs clamp", () => {
    expect(needsClamp("clamp_itajime_fold")).toBe(true);
  });
  it("pole arashi wrap does not need clamp", () => {
    expect(needsClamp("pole_arashi_wrap")).toBe(false);
  });
});

describe("needsStitch", () => {
  it("stitch ori nui needs stitch", () => {
    expect(needsStitch("stitch_ori_nui")).toBe(true);
  });
  it("bind kumo scrunch does not need stitch", () => {
    expect(needsStitch("bind_kumo_scrunch")).toBe(false);
  });
});

describe("toolType", () => {
  it("clamp itajime fold uses wood block clamp", () => {
    expect(toolType("clamp_itajime_fold")).toBe("wood_block_clamp");
  });
});

describe("bestPattern", () => {
  it("pole arashi wrap best for diagonal rain stripe", () => {
    expect(bestPattern("pole_arashi_wrap")).toBe("diagonal_rain_stripe");
  });
});

describe("shiboriTools", () => {
  it("returns 5 types", () => {
    expect(shiboriTools()).toHaveLength(5);
  });
});
