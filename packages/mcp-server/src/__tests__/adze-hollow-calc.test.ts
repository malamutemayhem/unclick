import { describe, it, expect } from "vitest";
import {
  hollowDepth, finishSmooth, controlSwing, weightBalance,
  adzeCost, oneHand, forBeams, headCurve,
  bestUse, adzeHollows,
} from "../adze-hollow-calc.js";

describe("hollowDepth", () => {
  it("gutter adze deep deepest hollow", () => {
    expect(hollowDepth("gutter_adze_deep")).toBeGreaterThan(hollowDepth("sculptor_adze_finish"));
  });
});

describe("finishSmooth", () => {
  it("sculptor adze finish smoothest", () => {
    expect(finishSmooth("sculptor_adze_finish")).toBeGreaterThan(finishSmooth("gutter_adze_deep"));
  });
});

describe("controlSwing", () => {
  it("hand adze carving best control", () => {
    expect(controlSwing("hand_adze_carving")).toBeGreaterThan(controlSwing("gutter_adze_deep"));
  });
});

describe("weightBalance", () => {
  it("foot adze beam best balance", () => {
    expect(weightBalance("foot_adze_beam")).toBeGreaterThan(weightBalance("gutter_adze_deep"));
  });
});

describe("adzeCost", () => {
  it("sculptor adze finish most expensive", () => {
    expect(adzeCost("sculptor_adze_finish")).toBeGreaterThan(adzeCost("hand_adze_carving"));
  });
});

describe("oneHand", () => {
  it("hand adze carving is one hand", () => {
    expect(oneHand("hand_adze_carving")).toBe(true);
  });
  it("foot adze beam not one hand", () => {
    expect(oneHand("foot_adze_beam")).toBe(false);
  });
});

describe("forBeams", () => {
  it("foot adze beam is for beams", () => {
    expect(forBeams("foot_adze_beam")).toBe(true);
  });
  it("hand adze carving not for beams", () => {
    expect(forBeams("hand_adze_carving")).toBe(false);
  });
});

describe("headCurve", () => {
  it("lipped adze bowl uses lipped bowl curve", () => {
    expect(headCurve("lipped_adze_bowl")).toBe("lipped_bowl_curve");
  });
});

describe("bestUse", () => {
  it("foot adze beam best for beam face flatten", () => {
    expect(bestUse("foot_adze_beam")).toBe("beam_face_flatten");
  });
});

describe("adzeHollows", () => {
  it("returns 5 types", () => {
    expect(adzeHollows()).toHaveLength(5);
  });
});
