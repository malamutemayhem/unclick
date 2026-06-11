import { describe, it, expect } from "vitest";
import {
  extractYield, filterSpeed, wortClarity, automation,
  mfCost, highGravity, forLargeScale, filterConfig,
  bestUse, mashFilterTypes,
} from "../mash-filter-calc.js";

describe("extractYield", () => {
  it("membrane squeeze best extract yield", () => {
    expect(extractYield("membrane_squeeze")).toBeGreaterThan(extractYield("pressure_vessel"));
  });
});

describe("filterSpeed", () => {
  it("thin bed fastest filter speed", () => {
    expect(filterSpeed("thin_bed")).toBeGreaterThan(filterSpeed("micro_filter"));
  });
});

describe("wortClarity", () => {
  it("membrane squeeze best wort clarity", () => {
    expect(wortClarity("membrane_squeeze")).toBeGreaterThan(wortClarity("thin_bed"));
  });
});

describe("automation", () => {
  it("membrane squeeze highest automation", () => {
    expect(automation("membrane_squeeze")).toBeGreaterThan(automation("pressure_vessel"));
  });
});

describe("mfCost", () => {
  it("membrane squeeze most expensive", () => {
    expect(mfCost("membrane_squeeze")).toBeGreaterThan(mfCost("pressure_vessel"));
  });
});

describe("highGravity", () => {
  it("plate frame supports high gravity", () => {
    expect(highGravity("plate_frame")).toBe(true);
  });
  it("thin bed not high gravity", () => {
    expect(highGravity("thin_bed")).toBe(false);
  });
});

describe("forLargeScale", () => {
  it("membrane squeeze for large scale", () => {
    expect(forLargeScale("membrane_squeeze")).toBe(true);
  });
  it("micro filter not for large scale", () => {
    expect(forLargeScale("micro_filter")).toBe(false);
  });
});

describe("filterConfig", () => {
  it("thin bed uses shallow grain bed rapid cycle", () => {
    expect(filterConfig("thin_bed")).toBe("thin_bed_mash_filter_shallow_grain_bed_rapid_cycle_continuous");
  });
});

describe("bestUse", () => {
  it("membrane squeeze for mega brewery max extract", () => {
    expect(bestUse("membrane_squeeze")).toBe("mega_brewery_membrane_squeeze_filter_maximum_extract_yield_dry");
  });
});

describe("mashFilterTypes", () => {
  it("returns 5 types", () => {
    expect(mashFilterTypes()).toHaveLength(5);
  });
});
