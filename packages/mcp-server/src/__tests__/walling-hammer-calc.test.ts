import { describe, it, expect } from "vitest";
import {
  trimClean, splitForce, controlAim, faceLife,
  hammerCost, doubleFace, forDrystone, headWeight,
  bestUse, wallingHammers,
} from "../walling-hammer-calc.js";

describe("trimClean", () => {
  it("kentish pattern light cleanest trim", () => {
    expect(trimClean("kentish_pattern_light")).toBeGreaterThan(trimClean("geological_pick_field"));
  });
});

describe("splitForce", () => {
  it("yorkshire pattern heavy strongest split", () => {
    expect(splitForce("yorkshire_pattern_heavy")).toBeGreaterThan(splitForce("kentish_pattern_light"));
  });
});

describe("controlAim", () => {
  it("kentish pattern light best control aim", () => {
    expect(controlAim("kentish_pattern_light")).toBeGreaterThan(controlAim("geological_pick_field"));
  });
});

describe("faceLife", () => {
  it("carbide face hard best face life", () => {
    expect(faceLife("carbide_face_hard")).toBeGreaterThan(faceLife("geological_pick_field"));
  });
});

describe("hammerCost", () => {
  it("carbide face hard most expensive", () => {
    expect(hammerCost("carbide_face_hard")).toBeGreaterThan(hammerCost("geological_pick_field"));
  });
});

describe("doubleFace", () => {
  it("double face general has double face", () => {
    expect(doubleFace("double_face_general")).toBe(true);
  });
  it("yorkshire pattern heavy not double face", () => {
    expect(doubleFace("yorkshire_pattern_heavy")).toBe(false);
  });
});

describe("forDrystone", () => {
  it("yorkshire pattern heavy is for drystone", () => {
    expect(forDrystone("yorkshire_pattern_heavy")).toBe(true);
  });
  it("double face general not for drystone", () => {
    expect(forDrystone("double_face_general")).toBe(false);
  });
});

describe("headWeight", () => {
  it("yorkshire pattern heavy uses heavy three pound", () => {
    expect(headWeight("yorkshire_pattern_heavy")).toBe("heavy_three_pound");
  });
});

describe("bestUse", () => {
  it("kentish pattern light best for fine face trim", () => {
    expect(bestUse("kentish_pattern_light")).toBe("fine_face_trim");
  });
});

describe("wallingHammers", () => {
  it("returns 5 types", () => {
    expect(wallingHammers()).toHaveLength(5);
  });
});
