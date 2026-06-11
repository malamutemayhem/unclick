import { describe, it, expect } from "vitest";
import {
  sharpness, capacity, sizeRange, mediaRecovery,
  dmCost, pressurized, forCoal, medium,
  bestUse, denseMediaSepTypes,
} from "../dense-media-sep-calc.js";

describe("sharpness", () => {
  it("cyclone dms sharpest separation", () => {
    expect(sharpness("cyclone_dms_fine")).toBeGreaterThan(sharpness("cone_separator_gravity"));
  });
});

describe("capacity", () => {
  it("larcodems highest capacity", () => {
    expect(capacity("larcodems_large_coal")).toBeGreaterThan(capacity("bath_separator_float_sink"));
  });
});

describe("sizeRange", () => {
  it("cyclone dms widest size range", () => {
    expect(sizeRange("cyclone_dms_fine")).toBeGreaterThan(sizeRange("bath_separator_float_sink"));
  });
});

describe("mediaRecovery", () => {
  it("cone separator best media recovery", () => {
    expect(mediaRecovery("cone_separator_gravity")).toBeGreaterThan(mediaRecovery("cyclone_dms_fine"));
  });
});

describe("dmCost", () => {
  it("larcodems most expensive", () => {
    expect(dmCost("larcodems_large_coal")).toBeGreaterThan(dmCost("cone_separator_gravity"));
  });
});

describe("pressurized", () => {
  it("cyclone dms is pressurized", () => {
    expect(pressurized("cyclone_dms_fine")).toBe(true);
  });
  it("drum separator not pressurized", () => {
    expect(pressurized("drum_separator_coarse")).toBe(false);
  });
});

describe("forCoal", () => {
  it("drum separator for coal", () => {
    expect(forCoal("drum_separator_coarse")).toBe(true);
  });
  it("cone separator not for coal", () => {
    expect(forCoal("cone_separator_gravity")).toBe(false);
  });
});

describe("medium", () => {
  it("bath separator uses heavy liquid", () => {
    expect(medium("bath_separator_float_sink")).toBe("heavy_liquid_bath_float_sink_test");
  });
});

describe("bestUse", () => {
  it("larcodems for large coal wash plant", () => {
    expect(bestUse("larcodems_large_coal")).toBe("large_coal_high_tonnage_wash_plant");
  });
});

describe("denseMediaSepTypes", () => {
  it("returns 5 types", () => {
    expect(denseMediaSepTypes()).toHaveLength(5);
  });
});
