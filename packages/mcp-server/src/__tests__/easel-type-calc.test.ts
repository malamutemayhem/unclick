import { describe, it, expect } from "vitest";
import {
  stabilityRating, maxCanvasSize, portabilityScore, adjustability,
  easelCost, hasStorage, foldFlat, frameMaterial,
  bestSetting, easelTypes,
} from "../easel-type-calc.js";

describe("stabilityRating", () => {
  it("h frame studio most stable", () => {
    expect(stabilityRating("h_frame_studio")).toBeGreaterThan(stabilityRating("tabletop_mini"));
  });
});

describe("maxCanvasSize", () => {
  it("h frame studio largest canvas", () => {
    expect(maxCanvasSize("h_frame_studio")).toBeGreaterThan(maxCanvasSize("tabletop_mini"));
  });
});

describe("portabilityScore", () => {
  it("french portable most portable", () => {
    expect(portabilityScore("french_portable")).toBeGreaterThan(portabilityScore("h_frame_studio"));
  });
});

describe("adjustability", () => {
  it("h frame studio most adjustable", () => {
    expect(adjustability("h_frame_studio")).toBeGreaterThan(adjustability("tabletop_mini"));
  });
});

describe("easelCost", () => {
  it("h frame studio most expensive", () => {
    expect(easelCost("h_frame_studio")).toBeGreaterThan(easelCost("tabletop_mini"));
  });
});

describe("hasStorage", () => {
  it("french portable has storage", () => {
    expect(hasStorage("french_portable")).toBe(true);
  });
  it("a frame lyre does not", () => {
    expect(hasStorage("a_frame_lyre")).toBe(false);
  });
});

describe("foldFlat", () => {
  it("a frame lyre folds flat", () => {
    expect(foldFlat("a_frame_lyre")).toBe(true);
  });
  it("h frame studio does not", () => {
    expect(foldFlat("h_frame_studio")).toBe(false);
  });
});

describe("frameMaterial", () => {
  it("french portable uses beech box with drawer", () => {
    expect(frameMaterial("french_portable")).toBe("beech_box_with_drawer");
  });
});

describe("bestSetting", () => {
  it("tabletop mini for small apartment desk", () => {
    expect(bestSetting("tabletop_mini")).toBe("small_apartment_desk");
  });
});

describe("easelTypes", () => {
  it("returns 5 types", () => {
    expect(easelTypes()).toHaveLength(5);
  });
});
