import { describe, it, expect } from "vitest";
import {
  materialRemoval, finishQuality, controlEase, dustExtraction,
  sanderCost, variableSpeed, handheld, abrasiveType,
  bestJob, sanderTypes,
} from "../sander-type-calc.js";

describe("materialRemoval", () => {
  it("belt sander fastest removal", () => {
    expect(materialRemoval("belt_sander")).toBeGreaterThan(materialRemoval("detail_mouse"));
  });
});

describe("finishQuality", () => {
  it("random orbital best finish", () => {
    expect(finishQuality("random_orbital")).toBeGreaterThan(finishQuality("belt_sander"));
  });
});

describe("controlEase", () => {
  it("detail mouse easiest control", () => {
    expect(controlEase("detail_mouse")).toBeGreaterThan(controlEase("belt_sander"));
  });
});

describe("dustExtraction", () => {
  it("drum stationary best dust extraction", () => {
    expect(dustExtraction("drum_stationary")).toBeGreaterThan(dustExtraction("belt_sander"));
  });
});

describe("sanderCost", () => {
  it("drum stationary most expensive", () => {
    expect(sanderCost("drum_stationary")).toBeGreaterThan(sanderCost("palm_sheet"));
  });
});

describe("variableSpeed", () => {
  it("random orbital has variable speed", () => {
    expect(variableSpeed("random_orbital")).toBe(true);
  });
  it("palm sheet does not", () => {
    expect(variableSpeed("palm_sheet")).toBe(false);
  });
});

describe("handheld", () => {
  it("belt sander is handheld", () => {
    expect(handheld("belt_sander")).toBe(true);
  });
  it("drum stationary is not", () => {
    expect(handheld("drum_stationary")).toBe(false);
  });
});

describe("abrasiveType", () => {
  it("detail mouse uses triangular hook loop", () => {
    expect(abrasiveType("detail_mouse")).toBe("triangular_hook_loop");
  });
});

describe("bestJob", () => {
  it("belt sander for rough stock removal floor", () => {
    expect(bestJob("belt_sander")).toBe("rough_stock_removal_floor");
  });
});

describe("sanderTypes", () => {
  it("returns 5 types", () => {
    expect(sanderTypes()).toHaveLength(5);
  });
});
