import { describe, it, expect } from "vitest";
import {
  speed, filmUsage, sealQuality, baleSize,
  bwCost, selfLoading, forSilage, wrap,
  bestUse, baleWrapperTypes,
} from "../bale-wrapper-calc.js";

describe("speed", () => {
  it("inline round fastest", () => {
    expect(speed("inline_round")).toBeGreaterThan(speed("square_bale"));
  });
});

describe("filmUsage", () => {
  it("tube wrapper best film usage", () => {
    expect(filmUsage("tube_wrapper")).toBeGreaterThan(filmUsage("square_bale"));
  });
});

describe("sealQuality", () => {
  it("tube wrapper best seal quality", () => {
    expect(sealQuality("tube_wrapper")).toBeGreaterThan(sealQuality("square_bale"));
  });
});

describe("baleSize", () => {
  it("square bale largest bale size", () => {
    expect(baleSize("square_bale")).toBeGreaterThan(baleSize("combination_baler"));
  });
});

describe("bwCost", () => {
  it("combination baler most expensive", () => {
    expect(bwCost("combination_baler")).toBeGreaterThan(bwCost("individual_satellite"));
  });
});

describe("selfLoading", () => {
  it("inline round is self loading", () => {
    expect(selfLoading("inline_round")).toBe(true);
  });
  it("individual satellite not self loading", () => {
    expect(selfLoading("individual_satellite")).toBe(false);
  });
});

describe("forSilage", () => {
  it("all types for silage", () => {
    expect(forSilage("inline_round")).toBe(true);
    expect(forSilage("tube_wrapper")).toBe(true);
  });
});

describe("wrap", () => {
  it("combination baler uses integrated baler wrapper", () => {
    expect(wrap("combination_baler")).toBe("integrated_baler_wrapper_one_pass_bale_and_wrap_combined");
  });
});

describe("bestUse", () => {
  it("tube wrapper for large dairy operation", () => {
    expect(bestUse("tube_wrapper")).toBe("large_dairy_operation_tube_line_silage_maximum_air_exclude");
  });
});

describe("baleWrapperTypes", () => {
  it("returns 5 types", () => {
    expect(baleWrapperTypes()).toHaveLength(5);
  });
});
