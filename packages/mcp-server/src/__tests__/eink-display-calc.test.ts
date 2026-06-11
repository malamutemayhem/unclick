import { describe, it, expect } from "vitest";
import {
  resolution, refreshSpeed, powerEfficient, contrastRatio,
  displayCost, color, partialRefresh, panelType,
  bestUse, einkDisplays,
} from "../eink-display-calc.js";

describe("resolution", () => {
  it("large 7 5 inch highest resolution", () => {
    expect(resolution("large_7_5_inch")).toBeGreaterThan(resolution("flexible_eink_bend"));
  });
});

describe("refreshSpeed", () => {
  it("partial refresh fast fastest refresh", () => {
    expect(refreshSpeed("partial_refresh_fast")).toBeGreaterThan(refreshSpeed("tricolor_4_2_inch"));
  });
});

describe("powerEfficient", () => {
  it("mono 2 9 inch most power efficient", () => {
    expect(powerEfficient("mono_2_9_inch")).toBeGreaterThan(powerEfficient("large_7_5_inch"));
  });
});

describe("contrastRatio", () => {
  it("mono 2 9 inch best contrast ratio", () => {
    expect(contrastRatio("mono_2_9_inch")).toBeGreaterThan(contrastRatio("flexible_eink_bend"));
  });
});

describe("displayCost", () => {
  it("flexible eink bend most expensive", () => {
    expect(displayCost("flexible_eink_bend")).toBeGreaterThan(displayCost("mono_2_9_inch"));
  });
});

describe("color", () => {
  it("tricolor 4 2 inch is color", () => {
    expect(color("tricolor_4_2_inch")).toBe(true);
  });
  it("mono 2 9 inch not color", () => {
    expect(color("mono_2_9_inch")).toBe(false);
  });
});

describe("partialRefresh", () => {
  it("partial refresh fast has partial refresh", () => {
    expect(partialRefresh("partial_refresh_fast")).toBe(true);
  });
  it("mono 2 9 inch no partial refresh", () => {
    expect(partialRefresh("mono_2_9_inch")).toBe(false);
  });
});

describe("panelType", () => {
  it("flexible eink bend uses flexible substrate", () => {
    expect(panelType("flexible_eink_bend")).toBe("flexible_substrate");
  });
});

describe("bestUse", () => {
  it("tricolor 4 2 inch best for price tag signage", () => {
    expect(bestUse("tricolor_4_2_inch")).toBe("price_tag_signage");
  });
});

describe("einkDisplays", () => {
  it("returns 5 types", () => {
    expect(einkDisplays()).toHaveLength(5);
  });
});
