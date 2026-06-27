import { describe, it, expect } from "vitest";
import {
  selectivity, insertionLoss, powerHandle, sizeCompact,
  filterCost, tunable, forNarrowband, filterTopology,
  bestUse, rfFilters,
} from "../rf-filter-calc.js";

describe("selectivity", () => {
  it("crystal filter most selective", () => {
    expect(selectivity("crystal_filter_narrow")).toBeGreaterThan(selectivity("lc_bandpass_discrete"));
  });
});

describe("insertionLoss", () => {
  it("cavity filter lowest insertion loss", () => {
    expect(insertionLoss("cavity_filter_high_q")).toBeGreaterThan(insertionLoss("crystal_filter_narrow"));
  });
});

describe("powerHandle", () => {
  it("cavity filter highest power handle", () => {
    expect(powerHandle("cavity_filter_high_q")).toBeGreaterThan(powerHandle("crystal_filter_narrow"));
  });
});

describe("sizeCompact", () => {
  it("saw filter most compact", () => {
    expect(sizeCompact("saw_filter_ceramic")).toBeGreaterThan(sizeCompact("cavity_filter_high_q"));
  });
});

describe("filterCost", () => {
  it("cavity filter most expensive", () => {
    expect(filterCost("cavity_filter_high_q")).toBeGreaterThan(filterCost("lc_bandpass_discrete"));
  });
});

describe("tunable", () => {
  it("lc bandpass is tunable", () => {
    expect(tunable("lc_bandpass_discrete")).toBe(true);
  });
  it("saw filter not tunable", () => {
    expect(tunable("saw_filter_ceramic")).toBe(false);
  });
});

describe("forNarrowband", () => {
  it("crystal filter is for narrowband", () => {
    expect(forNarrowband("crystal_filter_narrow")).toBe(true);
  });
  it("lc bandpass not for narrowband", () => {
    expect(forNarrowband("lc_bandpass_discrete")).toBe(false);
  });
});

describe("filterTopology", () => {
  it("saw filter uses surface acoustic wave", () => {
    expect(filterTopology("saw_filter_ceramic")).toBe("surface_acoustic_wave");
  });
});

describe("bestUse", () => {
  it("cavity filter best for base station duplexer", () => {
    expect(bestUse("cavity_filter_high_q")).toBe("base_station_duplexer");
  });
});

describe("rfFilters", () => {
  it("returns 5 types", () => {
    expect(rfFilters()).toHaveLength(5);
  });
});
