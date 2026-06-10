import { describe, it, expect } from "vitest";
import {
  cutPrecision, cutSpeed, bladeControl, kerfWidth,
  sawCost, hasBackbone, pullStroke, toothPattern,
  bestJoint, dovetailSaws,
} from "../dovetail-saw-calc.js";

describe("cutPrecision", () => {
  it("japanese pull dozuki most precise", () => {
    expect(cutPrecision("japanese_pull_dozuki")).toBeGreaterThan(cutPrecision("carcass_rip_deep"));
  });
});

describe("cutSpeed", () => {
  it("carcass rip deep fastest cut", () => {
    expect(cutSpeed("carcass_rip_deep")).toBeGreaterThan(cutSpeed("gents_brass_back"));
  });
});

describe("bladeControl", () => {
  it("gents brass back best blade control", () => {
    expect(bladeControl("gents_brass_back")).toBeGreaterThan(bladeControl("frame_adjustable_blade"));
  });
});

describe("kerfWidth", () => {
  it("japanese pull dozuki thinnest kerf", () => {
    expect(kerfWidth("japanese_pull_dozuki")).toBeGreaterThan(kerfWidth("carcass_rip_deep"));
  });
});

describe("sawCost", () => {
  it("gents brass back more expensive than frame adjustable", () => {
    expect(sawCost("gents_brass_back")).toBeGreaterThan(sawCost("frame_adjustable_blade"));
  });
});

describe("hasBackbone", () => {
  it("western push stroke has backbone", () => {
    expect(hasBackbone("western_push_stroke")).toBe(true);
  });
  it("frame adjustable blade has no backbone", () => {
    expect(hasBackbone("frame_adjustable_blade")).toBe(false);
  });
});

describe("pullStroke", () => {
  it("japanese pull dozuki uses pull stroke", () => {
    expect(pullStroke("japanese_pull_dozuki")).toBe(true);
  });
  it("western push stroke does not use pull stroke", () => {
    expect(pullStroke("western_push_stroke")).toBe(false);
  });
});

describe("toothPattern", () => {
  it("gents brass back uses fine rip 15 tpi", () => {
    expect(toothPattern("gents_brass_back")).toBe("fine_rip_15_tpi");
  });
});

describe("bestJoint", () => {
  it("japanese pull dozuki best for half blind dovetail", () => {
    expect(bestJoint("japanese_pull_dozuki")).toBe("half_blind_dovetail");
  });
});

describe("dovetailSaws", () => {
  it("returns 5 types", () => {
    expect(dovetailSaws()).toHaveLength(5);
  });
});
