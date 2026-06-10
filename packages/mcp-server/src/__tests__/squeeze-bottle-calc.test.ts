import { describe, it, expect } from "vitest";
import {
  flowControl, capacity, easeOfFill, detailWork,
  bottleCost, leakProof, forSpray, bottleMaterial,
  bestUse, squeezeBottles,
} from "../squeeze-bottle-calc.js";

describe("flowControl", () => {
  it("needle tip detail best flow control", () => {
    expect(flowControl("needle_tip_detail")).toBeGreaterThan(flowControl("wide_mouth_pour"));
  });
});

describe("capacity", () => {
  it("wide mouth pour most capacity", () => {
    expect(capacity("wide_mouth_pour")).toBeGreaterThan(capacity("needle_tip_detail"));
  });
});

describe("easeOfFill", () => {
  it("wide mouth pour easiest to fill", () => {
    expect(easeOfFill("wide_mouth_pour")).toBeGreaterThan(easeOfFill("needle_tip_detail"));
  });
});

describe("detailWork", () => {
  it("needle tip detail best for detail", () => {
    expect(detailWork("needle_tip_detail")).toBeGreaterThan(detailWork("wide_mouth_pour"));
  });
});

describe("bottleCost", () => {
  it("trigger spray mist more expensive than wide mouth", () => {
    expect(bottleCost("trigger_spray_mist")).toBeGreaterThan(bottleCost("wide_mouth_pour"));
  });
});

describe("leakProof", () => {
  it("fine tip precision is leak proof", () => {
    expect(leakProof("fine_tip_precision")).toBe(true);
  });
  it("wide mouth pour is not leak proof", () => {
    expect(leakProof("wide_mouth_pour")).toBe(false);
  });
});

describe("forSpray", () => {
  it("trigger spray mist is for spray", () => {
    expect(forSpray("trigger_spray_mist")).toBe(true);
  });
  it("fine tip precision is not for spray", () => {
    expect(forSpray("fine_tip_precision")).toBe(false);
  });
});

describe("bottleMaterial", () => {
  it("needle tip detail uses ldpe needle applicator", () => {
    expect(bottleMaterial("needle_tip_detail")).toBe("ldpe_needle_applicator");
  });
});

describe("bestUse", () => {
  it("fine tip precision best for tie dye line apply", () => {
    expect(bestUse("fine_tip_precision")).toBe("tie_dye_line_apply");
  });
});

describe("squeezeBottles", () => {
  it("returns 5 types", () => {
    expect(squeezeBottles()).toHaveLength(5);
  });
});
