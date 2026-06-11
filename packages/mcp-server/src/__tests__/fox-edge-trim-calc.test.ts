import { describe, it, expect } from "vitest";
import {
  finishClean, holdSecure, speedApply, durability,
  trimCost, hidden, decorative, attachMethod,
  bestUse, foxEdgeTrims,
} from "../fox-edge-trim-calc.js";

describe("finishClean", () => {
  it("blind tack hidden cleanest finish", () => {
    expect(finishClean("blind_tack_hidden")).toBeGreaterThan(finishClean("staple_back_fast"));
  });
});

describe("holdSecure", () => {
  it("staple back fast most secure hold", () => {
    expect(holdSecure("staple_back_fast")).toBeGreaterThan(holdSecure("gimp_cover_decorative"));
  });
});

describe("speedApply", () => {
  it("staple back fast fastest apply", () => {
    expect(speedApply("staple_back_fast")).toBeGreaterThan(speedApply("blind_tack_hidden"));
  });
});

describe("durability", () => {
  it("staple back fast most durable", () => {
    expect(durability("staple_back_fast")).toBeGreaterThan(durability("single_fold_standard"));
  });
});

describe("trimCost", () => {
  it("gimp cover decorative most expensive", () => {
    expect(trimCost("gimp_cover_decorative")).toBeGreaterThan(trimCost("staple_back_fast"));
  });
});

describe("hidden", () => {
  it("blind tack hidden is hidden", () => {
    expect(hidden("blind_tack_hidden")).toBe(true);
  });
  it("single fold standard not hidden", () => {
    expect(hidden("single_fold_standard")).toBe(false);
  });
});

describe("decorative", () => {
  it("gimp cover decorative is decorative", () => {
    expect(decorative("gimp_cover_decorative")).toBe(true);
  });
  it("single fold standard not decorative", () => {
    expect(decorative("single_fold_standard")).toBe(false);
  });
});

describe("attachMethod", () => {
  it("double fold thick uses double fold tack", () => {
    expect(attachMethod("double_fold_thick")).toBe("double_fold_tack");
  });
});

describe("bestUse", () => {
  it("single fold standard best for general edge finish", () => {
    expect(bestUse("single_fold_standard")).toBe("general_edge_finish");
  });
});

describe("foxEdgeTrims", () => {
  it("returns 5 types", () => {
    expect(foxEdgeTrims()).toHaveLength(5);
  });
});
