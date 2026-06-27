import { describe, it, expect } from "vitest";
import {
  pressForce, heatTransfer, controlFeel, coverageSpeed,
  hammerCost, heated, forCurve, faceShape,
  bestUse, veneerHammers,
} from "../veneer-hammer-calc.js";

describe("pressForce", () => {
  it("cross peen standard most press force", () => {
    expect(pressForce("cross_peen_standard")).toBeGreaterThan(pressForce("wooden_mallet_tap"));
  });
});

describe("heatTransfer", () => {
  it("electric heat iron best heat transfer", () => {
    expect(heatTransfer("electric_heat_iron")).toBeGreaterThan(heatTransfer("wooden_mallet_tap"));
  });
});

describe("controlFeel", () => {
  it("wooden mallet tap best control feel", () => {
    expect(controlFeel("wooden_mallet_tap")).toBeGreaterThan(controlFeel("electric_heat_iron"));
  });
});

describe("coverageSpeed", () => {
  it("roller press hand fastest coverage", () => {
    expect(coverageSpeed("roller_press_hand")).toBeGreaterThan(coverageSpeed("wooden_mallet_tap"));
  });
});

describe("hammerCost", () => {
  it("electric heat iron more expensive than wooden mallet", () => {
    expect(hammerCost("electric_heat_iron")).toBeGreaterThan(hammerCost("wooden_mallet_tap"));
  });
});

describe("heated", () => {
  it("electric heat iron is heated", () => {
    expect(heated("electric_heat_iron")).toBe(true);
  });
  it("cross peen standard not heated", () => {
    expect(heated("cross_peen_standard")).toBe(false);
  });
});

describe("forCurve", () => {
  it("round face broad is for curve", () => {
    expect(forCurve("round_face_broad")).toBe(true);
  });
  it("cross peen standard not for curve", () => {
    expect(forCurve("cross_peen_standard")).toBe(false);
  });
});

describe("faceShape", () => {
  it("roller press hand uses cylinder roller", () => {
    expect(faceShape("roller_press_hand")).toBe("cylinder_roller");
  });
});

describe("bestUse", () => {
  it("electric heat iron best for hide glue reactivate", () => {
    expect(bestUse("electric_heat_iron")).toBe("hide_glue_reactivate");
  });
});

describe("veneerHammers", () => {
  it("returns 5 types", () => {
    expect(veneerHammers()).toHaveLength(5);
  });
});
