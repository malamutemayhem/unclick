import { describe, it, expect } from "vitest";
import {
  yarnFeed, compactSize, yarnHold, colorSwapSpeed,
  bobbinCost, noToolNeeded, pointedTip, windStyle,
  bestWeave, tapestryBobbins,
} from "../tapestry-bobbin-calc.js";

describe("yarnFeed", () => {
  it("pirn stick point best yarn feed", () => {
    expect(yarnFeed("pirn_stick_point")).toBeGreaterThan(yarnFeed("butterfly_finger_wrap"));
  });
});

describe("compactSize", () => {
  it("butterfly finger wrap most compact", () => {
    expect(compactSize("butterfly_finger_wrap")).toBeGreaterThan(compactSize("cop_tube_wind"));
  });
});

describe("yarnHold", () => {
  it("cop tube wind best yarn hold", () => {
    expect(yarnHold("cop_tube_wind")).toBeGreaterThan(yarnHold("butterfly_finger_wrap"));
  });
});

describe("colorSwapSpeed", () => {
  it("butterfly finger wrap fastest color swap", () => {
    expect(colorSwapSpeed("butterfly_finger_wrap")).toBeGreaterThan(colorSwapSpeed("cop_tube_wind"));
  });
});

describe("bobbinCost", () => {
  it("flute bobbin wood more expensive than butterfly", () => {
    expect(bobbinCost("flute_bobbin_wood")).toBeGreaterThan(bobbinCost("butterfly_finger_wrap"));
  });
});

describe("noToolNeeded", () => {
  it("butterfly finger wrap needs no tool", () => {
    expect(noToolNeeded("butterfly_finger_wrap")).toBe(true);
  });
  it("flute bobbin wood needs tool", () => {
    expect(noToolNeeded("flute_bobbin_wood")).toBe(false);
  });
});

describe("pointedTip", () => {
  it("pirn stick point has pointed tip", () => {
    expect(pointedTip("pirn_stick_point")).toBe(true);
  });
  it("cop tube wind does not have pointed tip", () => {
    expect(pointedTip("cop_tube_wind")).toBe(false);
  });
});

describe("windStyle", () => {
  it("butterfly finger wrap uses figure eight finger", () => {
    expect(windStyle("butterfly_finger_wrap")).toBe("figure_eight_finger");
  });
});

describe("bestWeave", () => {
  it("pirn stick point best for fine detail hatching", () => {
    expect(bestWeave("pirn_stick_point")).toBe("fine_detail_hatching");
  });
});

describe("tapestryBobbins", () => {
  it("returns 5 types", () => {
    expect(tapestryBobbins()).toHaveLength(5);
  });
});
