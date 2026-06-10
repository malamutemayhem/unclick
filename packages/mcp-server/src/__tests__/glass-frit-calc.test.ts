import { describe, it, expect } from "vitest";
import {
  meltControl, colorBlend, textureEffect, placementEase,
  fritCost, dissolvesOnFire, linearPattern, particleForm,
  bestEffect, glassFrits,
} from "../glass-frit-calc.js";

describe("meltControl", () => {
  it("coarse chunk gravel best melt control", () => {
    expect(meltControl("coarse_chunk_gravel")).toBeGreaterThan(meltControl("fine_powder_dust"));
  });
});

describe("colorBlend", () => {
  it("fine powder dust best color blend", () => {
    expect(colorBlend("fine_powder_dust")).toBeGreaterThan(colorBlend("coarse_chunk_gravel"));
  });
});

describe("textureEffect", () => {
  it("coarse chunk gravel best texture effect", () => {
    expect(textureEffect("coarse_chunk_gravel")).toBeGreaterThan(textureEffect("fine_powder_dust"));
  });
});

describe("placementEase", () => {
  it("confetti sheet flat easiest placement", () => {
    expect(placementEase("confetti_sheet_flat")).toBeGreaterThan(placementEase("noodle_stringer_thin"));
  });
});

describe("fritCost", () => {
  it("noodle stringer thin more expensive than medium grain", () => {
    expect(fritCost("noodle_stringer_thin")).toBeGreaterThan(fritCost("medium_grain_sand"));
  });
});

describe("dissolvesOnFire", () => {
  it("fine powder dust dissolves on fire", () => {
    expect(dissolvesOnFire("fine_powder_dust")).toBe(true);
  });
  it("coarse chunk gravel does not dissolve on fire", () => {
    expect(dissolvesOnFire("coarse_chunk_gravel")).toBe(false);
  });
});

describe("linearPattern", () => {
  it("noodle stringer thin creates linear pattern", () => {
    expect(linearPattern("noodle_stringer_thin")).toBe(true);
  });
  it("fine powder dust does not create linear pattern", () => {
    expect(linearPattern("fine_powder_dust")).toBe(false);
  });
});

describe("particleForm", () => {
  it("noodle stringer thin is pulled glass thread", () => {
    expect(particleForm("noodle_stringer_thin")).toBe("pulled_glass_thread");
  });
});

describe("bestEffect", () => {
  it("coarse chunk gravel best for chunky mosaic look", () => {
    expect(bestEffect("coarse_chunk_gravel")).toBe("chunky_mosaic_look");
  });
});

describe("glassFrits", () => {
  it("returns 5 types", () => {
    expect(glassFrits()).toHaveLength(5);
  });
});
