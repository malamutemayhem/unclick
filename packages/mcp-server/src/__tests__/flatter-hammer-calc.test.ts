import { describe, it, expect } from "vitest";
import {
  surfaceFinish, coverArea, controlStrike, faceFlat,
  flatterCost, handled, forFinishing, faceShape,
  bestUse, flatterHammers,
} from "../flatter-hammer-calc.js";

describe("surfaceFinish", () => {
  it("planishing round face best surface finish", () => {
    expect(surfaceFinish("planishing_round_face")).toBeGreaterThan(surfaceFinish("creasing_narrow_edge"));
  });
});

describe("coverArea", () => {
  it("smoothing wide flat best cover area", () => {
    expect(coverArea("smoothing_wide_flat")).toBeGreaterThan(coverArea("creasing_narrow_edge"));
  });
});

describe("controlStrike", () => {
  it("planishing round face best control", () => {
    expect(controlStrike("planishing_round_face")).toBeGreaterThan(controlStrike("smoothing_wide_flat"));
  });
});

describe("faceFlat", () => {
  it("handled flatter top flattest face", () => {
    expect(faceFlat("handled_flatter_top")).toBeGreaterThan(faceFlat("creasing_narrow_edge"));
  });
});

describe("flatterCost", () => {
  it("smoothing wide flat most expensive", () => {
    expect(flatterCost("smoothing_wide_flat")).toBeGreaterThan(flatterCost("set_hammer_square"));
  });
});

describe("handled", () => {
  it("handled flatter top is handled", () => {
    expect(handled("handled_flatter_top")).toBe(true);
  });
  it("smoothing wide flat not handled", () => {
    expect(handled("smoothing_wide_flat")).toBe(false);
  });
});

describe("forFinishing", () => {
  it("planishing round face is for finishing", () => {
    expect(forFinishing("planishing_round_face")).toBe(true);
  });
  it("set hammer square not for finishing", () => {
    expect(forFinishing("set_hammer_square")).toBe(false);
  });
});

describe("faceShape", () => {
  it("planishing round face uses slight crown round", () => {
    expect(faceShape("planishing_round_face")).toBe("slight_crown_round");
  });
});

describe("bestUse", () => {
  it("smoothing wide flat best for broad surface smooth", () => {
    expect(bestUse("smoothing_wide_flat")).toBe("broad_surface_smooth");
  });
});

describe("flatterHammers", () => {
  it("returns 5 types", () => {
    expect(flatterHammers()).toHaveLength(5);
  });
});
