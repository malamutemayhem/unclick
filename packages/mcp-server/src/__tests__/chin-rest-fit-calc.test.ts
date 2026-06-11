import { describe, it, expect } from "vitest";
import {
  comfort, stability, jawClear, fitRange,
  restCost, sideMount, contoured, mountStyle,
  bestUse, chinRestFits,
} from "../chin-rest-fit-calc.js";

describe("comfort", () => {
  it("wave contour ergonomic most comfortable", () => {
    expect(comfort("wave_contour_ergonomic")).toBeGreaterThan(comfort("flesch_flat_wide"));
  });
});

describe("stability", () => {
  it("teka side mount most stable", () => {
    expect(stability("teka_side_mount")).toBeGreaterThan(stability("wave_contour_ergonomic"));
  });
});

describe("jawClear", () => {
  it("kaufman tall offset best jaw clearance", () => {
    expect(jawClear("kaufman_tall_offset")).toBeGreaterThan(jawClear("flesch_flat_wide"));
  });
});

describe("fitRange", () => {
  it("flesch flat wide widest fit range", () => {
    expect(fitRange("flesch_flat_wide")).toBeGreaterThan(fitRange("kaufman_tall_offset"));
  });
});

describe("restCost", () => {
  it("wave contour ergonomic most expensive", () => {
    expect(restCost("wave_contour_ergonomic")).toBeGreaterThan(restCost("flesch_flat_wide"));
  });
});

describe("sideMount", () => {
  it("teka side mount is side mount", () => {
    expect(sideMount("teka_side_mount")).toBe(true);
  });
  it("guarneri standard center not side mount", () => {
    expect(sideMount("guarneri_standard_center")).toBe(false);
  });
});

describe("contoured", () => {
  it("wave contour ergonomic is contoured", () => {
    expect(contoured("wave_contour_ergonomic")).toBe(true);
  });
  it("guarneri standard center not contoured", () => {
    expect(contoured("guarneri_standard_center")).toBe(false);
  });
});

describe("mountStyle", () => {
  it("kaufman tall offset uses raised offset cup", () => {
    expect(mountStyle("kaufman_tall_offset")).toBe("raised_offset_cup");
  });
});

describe("bestUse", () => {
  it("guarneri standard center best for general center chin", () => {
    expect(bestUse("guarneri_standard_center")).toBe("general_center_chin");
  });
});

describe("chinRestFits", () => {
  it("returns 5 types", () => {
    expect(chinRestFits()).toHaveLength(5);
  });
});
