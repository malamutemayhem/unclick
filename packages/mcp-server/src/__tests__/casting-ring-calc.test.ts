import { describe, it, expect } from "vitest";
import {
  detailCapture, surfaceFinish, setupCost, repeatability,
  castCost, needsBurnout, reusableMold, moldMedium,
  bestMetal, castingRings,
} from "../casting-ring-calc.js";

describe("detailCapture", () => {
  it("lost wax centrifugal best detail capture", () => {
    expect(detailCapture("lost_wax_centrifugal")).toBeGreaterThan(detailCapture("pewter_gravity_pour"));
  });
});

describe("surfaceFinish", () => {
  it("lost wax centrifugal best surface finish", () => {
    expect(surfaceFinish("lost_wax_centrifugal")).toBeGreaterThan(surfaceFinish("sand_cast_cuttlebone"));
  });
});

describe("setupCost", () => {
  it("lost wax centrifugal highest setup cost", () => {
    expect(setupCost("lost_wax_centrifugal")).toBeGreaterThan(setupCost("pewter_gravity_pour"));
  });
});

describe("repeatability", () => {
  it("lost wax centrifugal best repeatability", () => {
    expect(repeatability("lost_wax_centrifugal")).toBeGreaterThan(repeatability("sand_cast_cuttlebone"));
  });
});

describe("castCost", () => {
  it("lost wax centrifugal most expensive", () => {
    expect(castCost("lost_wax_centrifugal")).toBeGreaterThan(castCost("pewter_gravity_pour"));
  });
});

describe("needsBurnout", () => {
  it("lost wax centrifugal needs burnout", () => {
    expect(needsBurnout("lost_wax_centrifugal")).toBe(true);
  });
  it("sand cast cuttlebone does not need burnout", () => {
    expect(needsBurnout("sand_cast_cuttlebone")).toBe(false);
  });
});

describe("reusableMold", () => {
  it("delft clay press has reusable mold", () => {
    expect(reusableMold("delft_clay_press")).toBe(true);
  });
  it("lost wax centrifugal does not have reusable mold", () => {
    expect(reusableMold("lost_wax_centrifugal")).toBe(false);
  });
});

describe("moldMedium", () => {
  it("sand cast cuttlebone uses cuttlefish bone natural", () => {
    expect(moldMedium("sand_cast_cuttlebone")).toBe("cuttlefish_bone_natural");
  });
});

describe("bestMetal", () => {
  it("lost wax centrifugal best for gold platinum fine", () => {
    expect(bestMetal("lost_wax_centrifugal")).toBe("gold_platinum_fine");
  });
});

describe("castingRings", () => {
  it("returns 5 types", () => {
    expect(castingRings()).toHaveLength(5);
  });
});
