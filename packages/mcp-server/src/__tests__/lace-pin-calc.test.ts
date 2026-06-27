import { describe, it, expect } from "vitest";
import {
  holdFirm, threadSafe, visibility, insertEase,
  pinCost, rustProof, forFine, headType,
  bestUse, lacePins,
} from "../lace-pin-calc.js";

describe("holdFirm", () => {
  it("map pin thick best hold firm", () => {
    expect(holdFirm("map_pin_thick")).toBeGreaterThan(holdFirm("extra_fine_delicate"));
  });
});

describe("threadSafe", () => {
  it("extra fine delicate most thread safe", () => {
    expect(threadSafe("extra_fine_delicate")).toBeGreaterThan(threadSafe("map_pin_thick"));
  });
});

describe("visibility", () => {
  it("glass head visible most visible", () => {
    expect(visibility("glass_head_visible")).toBeGreaterThan(visibility("extra_fine_delicate"));
  });
});

describe("insertEase", () => {
  it("map pin thick easiest insert", () => {
    expect(insertEase("map_pin_thick")).toBeGreaterThan(insertEase("stainless_rust_proof"));
  });
});

describe("pinCost", () => {
  it("extra fine delicate most expensive", () => {
    expect(pinCost("extra_fine_delicate")).toBeGreaterThan(pinCost("map_pin_thick"));
  });
});

describe("rustProof", () => {
  it("stainless rust proof is rust proof", () => {
    expect(rustProof("stainless_rust_proof")).toBe(true);
  });
  it("brass fine standard not rust proof", () => {
    expect(rustProof("brass_fine_standard")).toBe(false);
  });
});

describe("forFine", () => {
  it("extra fine delicate is for fine", () => {
    expect(forFine("extra_fine_delicate")).toBe(true);
  });
  it("brass fine standard not for fine", () => {
    expect(forFine("brass_fine_standard")).toBe(false);
  });
});

describe("headType", () => {
  it("glass head visible uses colored glass ball", () => {
    expect(headType("glass_head_visible")).toBe("colored_glass_ball");
  });
});

describe("bestUse", () => {
  it("extra fine delicate best for fine silk lace", () => {
    expect(bestUse("extra_fine_delicate")).toBe("fine_silk_lace");
  });
});

describe("lacePins", () => {
  it("returns 5 types", () => {
    expect(lacePins()).toHaveLength(5);
  });
});
