import { describe, it, expect } from "vitest";
import {
  edgeClean, splitControl, forceTransfer, stoneRange,
  pitchCost, angled, forSplit, bladeWidth,
  bestUse, pitchingTools,
} from "../pitching-tool-calc.js";

describe("edgeClean", () => {
  it("narrow blade detail cleanest edge", () => {
    expect(edgeClean("narrow_blade_detail")).toBeGreaterThan(edgeClean("mason_set_flat"));
  });
});

describe("splitControl", () => {
  it("narrow blade detail best split control", () => {
    expect(splitControl("narrow_blade_detail")).toBeGreaterThan(splitControl("mason_set_flat"));
  });
});

describe("forceTransfer", () => {
  it("bolster wide split best force transfer", () => {
    expect(forceTransfer("bolster_wide_split")).toBeGreaterThan(forceTransfer("narrow_blade_detail"));
  });
});

describe("stoneRange", () => {
  it("bolster wide split best stone range", () => {
    expect(stoneRange("bolster_wide_split")).toBeGreaterThan(stoneRange("narrow_blade_detail"));
  });
});

describe("pitchCost", () => {
  it("pitcher angled face more expensive than mason set", () => {
    expect(pitchCost("pitcher_angled_face")).toBeGreaterThan(pitchCost("mason_set_flat"));
  });
});

describe("angled", () => {
  it("pitcher angled face is angled", () => {
    expect(angled("pitcher_angled_face")).toBe(true);
  });
  it("wide blade standard not angled", () => {
    expect(angled("wide_blade_standard")).toBe(false);
  });
});

describe("forSplit", () => {
  it("bolster wide split is for split", () => {
    expect(forSplit("bolster_wide_split")).toBe(true);
  });
  it("wide blade standard not for split", () => {
    expect(forSplit("wide_blade_standard")).toBe(false);
  });
});

describe("bladeWidth", () => {
  it("bolster wide split uses extra wide 4 inch", () => {
    expect(bladeWidth("bolster_wide_split")).toBe("extra_wide_4_inch");
  });
});

describe("bestUse", () => {
  it("pitcher angled face best for angled face dress", () => {
    expect(bestUse("pitcher_angled_face")).toBe("angled_face_dress");
  });
});

describe("pitchingTools", () => {
  it("returns 5 types", () => {
    expect(pitchingTools()).toHaveLength(5);
  });
});
