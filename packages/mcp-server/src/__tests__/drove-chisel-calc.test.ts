import { describe, it, expect } from "vitest";
import {
  textureDepth, finishSmooth, patternConsist, coverSpeed,
  droveCost, toothed, forFinish, toothCount,
  bestUse, droveChisels,
} from "../drove-chisel-calc.js";

describe("textureDepth", () => {
  it("tooth claw texture deepest texture", () => {
    expect(textureDepth("tooth_claw_texture")).toBeGreaterThan(textureDepth("boaster_flat_smooth"));
  });
});

describe("finishSmooth", () => {
  it("boaster flat smooth smoothest finish", () => {
    expect(finishSmooth("boaster_flat_smooth")).toBeGreaterThan(finishSmooth("tooth_claw_texture"));
  });
});

describe("patternConsist", () => {
  it("scutch comb pattern most consistent", () => {
    expect(patternConsist("scutch_comb_pattern")).toBeGreaterThan(patternConsist("frosting_fine_point"));
  });
});

describe("coverSpeed", () => {
  it("scutch comb pattern fastest cover", () => {
    expect(coverSpeed("scutch_comb_pattern")).toBeGreaterThan(coverSpeed("frosting_fine_point"));
  });
});

describe("droveCost", () => {
  it("claw tool line more expensive than standard", () => {
    expect(droveCost("claw_tool_line")).toBeGreaterThan(droveCost("tooth_claw_texture"));
  });
});

describe("toothed", () => {
  it("tooth claw texture is toothed", () => {
    expect(toothed("tooth_claw_texture")).toBe(true);
  });
  it("boaster flat smooth not toothed", () => {
    expect(toothed("boaster_flat_smooth")).toBe(false);
  });
});

describe("forFinish", () => {
  it("boaster flat smooth is for finish", () => {
    expect(forFinish("boaster_flat_smooth")).toBe(true);
  });
  it("tooth claw texture not for finish", () => {
    expect(forFinish("tooth_claw_texture")).toBe(false);
  });
});

describe("toothCount", () => {
  it("scutch comb pattern uses eight tooth comb", () => {
    expect(toothCount("scutch_comb_pattern")).toBe("eight_tooth_comb");
  });
});

describe("bestUse", () => {
  it("boaster flat smooth best for smooth face finish", () => {
    expect(bestUse("boaster_flat_smooth")).toBe("smooth_face_finish");
  });
});

describe("droveChisels", () => {
  it("returns 5 types", () => {
    expect(droveChisels()).toHaveLength(5);
  });
});
