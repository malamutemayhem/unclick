import { describe, it, expect } from "vitest";
import {
  canvasCapacity, stability, angleAdjust, portability,
  easelCost, foldFlat, hasTray, frameMaterial,
  bestUse, easels,
} from "../easel-calc.js";

describe("canvasCapacity", () => {
  it("h frame heavy largest canvas capacity", () => {
    expect(canvasCapacity("h_frame_heavy")).toBeGreaterThan(canvasCapacity("tabletop_mini"));
  });
});

describe("stability", () => {
  it("h frame heavy most stable", () => {
    expect(stability("h_frame_heavy")).toBeGreaterThan(stability("plein_air_field"));
  });
});

describe("angleAdjust", () => {
  it("h frame heavy best angle adjustment", () => {
    expect(angleAdjust("h_frame_heavy")).toBeGreaterThan(angleAdjust("single_mast_display"));
  });
});

describe("portability", () => {
  it("plein air field most portable", () => {
    expect(portability("plein_air_field")).toBeGreaterThan(portability("h_frame_heavy"));
  });
});

describe("easelCost", () => {
  it("h frame heavy most expensive", () => {
    expect(easelCost("h_frame_heavy")).toBeGreaterThan(easelCost("tabletop_mini"));
  });
});

describe("foldFlat", () => {
  it("a frame studio folds flat", () => {
    expect(foldFlat("a_frame_studio")).toBe(true);
  });
  it("h frame heavy does not", () => {
    expect(foldFlat("h_frame_heavy")).toBe(false);
  });
});

describe("hasTray", () => {
  it("a frame studio has tray", () => {
    expect(hasTray("a_frame_studio")).toBe(true);
  });
  it("tabletop mini does not", () => {
    expect(hasTray("tabletop_mini")).toBe(false);
  });
});

describe("frameMaterial", () => {
  it("h frame heavy uses oak h frame crank", () => {
    expect(frameMaterial("h_frame_heavy")).toBe("oak_h_frame_crank");
  });
});

describe("bestUse", () => {
  it("plein air field for outdoor landscape travel", () => {
    expect(bestUse("plein_air_field")).toBe("outdoor_landscape_travel");
  });
});

describe("easels", () => {
  it("returns 5 types", () => {
    expect(easels()).toHaveLength(5);
  });
});
